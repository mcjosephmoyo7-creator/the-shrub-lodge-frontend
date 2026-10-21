import { siteConfig } from "@/lib/site";
import { guestFavourites } from "@/lib/assistant/favourites";
import { knowledgeDocument } from "@/lib/assistant/knowledge";

export type AssistantMessage = {
  role: "user" | "assistant";
  content: string;
};

const DEFAULT_MODEL = "gemini-flash-latest";

function modelCandidates(): string[] {
  const configured = process.env.GEMINI_MODEL?.trim();
  // Google's model line-up and per-model availability change often, and the
  // free tier can return 503 "high demand" for a busy model. We try the
  // "latest" alias first (auto-upgrades), then a spread of concrete models so
  // the assistant keeps working as long as any of them is available.
  const fallbacks = [
    DEFAULT_MODEL,
    "gemini-3.6-flash",
    "gemini-3.5-flash",
    "gemini-flash-lite-latest",
    "gemini-3.1-flash-lite",
  ];
  return [...new Set([configured, ...fallbacks].filter(Boolean) as string[])];
}

export function isAssistantConfigured(): boolean {
  return Boolean(process.env.GEMINI_API_KEY?.trim());
}

function buildSystemPrompt(): string {
  const reservations = `${siteConfig.email.reservations} · ${siteConfig.phoneDisplay.reservations}`;

  return `You are "Shrub Assist", the friendly virtual concierge for ${siteConfig.name}, a family-run 3-star lodge in Victoria Falls, Zimbabwe. You are happy to answer any question a guest asks.

HOW TO ANSWER — follow these rules:
1. Be genuinely helpful and answer the guest's actual question, whatever it is — including general questions about Victoria Falls, Zimbabwe, travel, wildlife, weather, currency, safety, local customs, packing, and everyday knowledge.
2. For anything specific to ${siteConfig.name} — activities, prices, rooms, transfers, the restaurant, contact details, hours or policies — use ONLY the KNOWLEDGE DOCUMENT below. Never invent lodge details, prices, availability or policies. If the knowledge doesn't cover it, say you don't have that detail and point the guest to our team (${reservations}).
3. Never state a star rating, review score or review count. The "guest favourites" list is a hand-picked shortlist: describe it as "the activities guests love most", never as rated or scored.
4. Quote lodge prices exactly as listed, in US dollars, and mention they are per person and can change.
5. If a guest is unsure what to do, enthusiastically recommend up to three guest favourites, best fit first, each with a short reason and its booking link.
6. When you are not certain about a general fact, say so honestly instead of guessing — accuracy matters more than sounding confident. Today's date is ${new Date().toISOString().slice(0, 10)}.
7. You can see the earlier messages in this conversation and you remember them. Use what the guest has already told you (their interests, group, dates, earlier questions) and refer back to it naturally instead of asking again. If the guest asks what you have talked about, give them an accurate short recap of the conversation so far. Never contradict something you said earlier — if you need to correct yourself, say so.
8. Be warm, clear and human. Plain text with short lines or "-" bullets. Put any link on its own line. Never use markdown tables, headings or code. Give a complete answer — longer detail is fine when the question needs it.
9. Write only your final answer. Never include internal reasoning, deliberation or self-corrections in the reply — no "wait", "actually, let me reconsider", or half-finished sentences. Check a price or link against the knowledge document before you write it, then write it once and write it correctly. Always finish your sentences, and never cut a booking link short — copy the full URL exactly.
10. When a guest asks for the cheapest, budget or best-value options, compare the prices in the knowledge document and rank the lowest first — cover activities (per person) and rooms (per night) whenever both are relevant, and say plainly which is the cheapest. If the question names a category (e.g. safari, cruise, helicopter), show the lowest prices within that category first.

Our curated guest favourites, in priority order: ${guestFavourites.map((favourite) => favourite.activity).join(", ")}.

KNOWLEDGE DOCUMENT
==================
${knowledgeDocument}
==================`;
}

async function callGemini(
  model: string,
  apiKey: string,
  messages: AssistantMessage[],
  signal: AbortSignal,
  attempt = 0,
): Promise<string | null> {
  const contents = messages.map((message) => ({
    role: message.role === "user" ? "user" : "model",
    parts: [{ text: message.content }],
  }));

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: buildSystemPrompt() }] },
        contents,
        generationConfig: {
          temperature: 0.4,
          topP: 0.95,
          // Gemini 3.x spends part of this budget on internal "thinking", so a
          // small cap truncates real answers mid-sentence. Keep it generous.
          maxOutputTokens: 4096,
        },
      }),
      signal,
    },
  );

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    // 503 means the model is briefly busy — worth one retry. 429 means we are
    // out of quota, so retrying would only waste more of it.
    const busy = response.status === 503;

    console.warn(
      `[assistant] Gemini ${model} responded ${response.status}${busy ? " (model busy)" : ""}`,
      detail.slice(0, 160),
    );

    if (busy && attempt === 0) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return callGemini(model, apiKey, messages, signal, attempt + 1);
    }

    return null;
  }

  const payload = (await response.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };

  const text = payload.candidates?.[0]?.content?.parts
    ?.map((part) => part.text ?? "")
    .join("")
    .trim();

  return text && text.length > 0 ? text : null;
}

/**
 * Sends the conversation to Gemini with the site knowledge injected. Returns
 * null when the model is unavailable so the caller can fall back to the
 * offline engine.
 */
export async function askGemini(
  messages: AssistantMessage[],
): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) return null;

  const controller = new AbortController();
  // Several models may each retry once when they report being busy, so allow
  // a generous window before giving up and using the offline engine.
  const timeout = setTimeout(() => controller.abort(), 30_000);

  try {
    for (const model of modelCandidates()) {
      try {
        const answer = await callGemini(model, apiKey, messages, controller.signal);
        if (answer) return answer;
      } catch (error) {
        console.warn(`[assistant] Gemini ${model} failed`, error);
      }
    }
    return null;
  } finally {
    clearTimeout(timeout);
  }
}
