import { NextResponse } from "next/server";
import { z } from "zod";
import { streamGemini } from "@/lib/assistant/gemini";
import { offlineAnswer } from "@/lib/assistant/fallback";
import { CONTACT_FALLBACK } from "@/lib/assistant/knowledge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 30;
const recentRequests = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (recentRequests.get(key) ?? []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS,
  );
  timestamps.push(now);
  recentRequests.set(key, timestamps);

  if (recentRequests.size > 1000) {
    for (const [entryKey, times] of recentRequests) {
      if (times.every((time) => now - time > RATE_LIMIT_WINDOW_MS)) {
        recentRequests.delete(entryKey);
      }
    }
  }

  return timestamps.length > RATE_LIMIT_MAX;
}

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1, "Please type a message."),
});

const bodySchema = z.object({
  messages: z.array(messageSchema).min(1),
});

/** Guards against abuse only — long questions are welcome and simply trimmed. */
const MAX_MESSAGE_CHARS = 8_000;
const MAX_HISTORY = 30;

/**
 * Chat endpoint for the site assistant.
 *
 *  • With GEMINI_API_KEY set, Gemini streams its answer using site knowledge
 *    injected server-side.
 *  • Without a key, or if Gemini fails before producing text, the offline
 *    engine streams an answer from the same site data.
 */
export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages right now. Please wait a moment and try again." },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid message." },
      { status: 400 },
    );
  }

  const messages = parsed.data.messages
    .slice(-MAX_HISTORY)
    .map((message) => ({
      ...message,
      content: message.content.slice(0, MAX_MESSAGE_CHARS),
    }));

  const lastUserMessage = [...messages].reverse().find((message) => message.role === "user");

  if (!lastUserMessage) {
    return NextResponse.json(
      { error: "Please send a message." },
      { status: 400 },
    );
  }

  // Everything before the guest's latest question — used as conversation memory
  // when the offline engine has to answer.
  let lastUserIndex = -1;
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    if (messages[index].role === "user") {
      lastUserIndex = index;
      break;
    }
  }
  const priorMessages = messages.filter((_, index) => index !== lastUserIndex);

  const abortController = new AbortController();
  let cancelled = false;
  let timedOut = false;
  const abortForClient = () => {
    cancelled = true;
    abortController.abort();
  };

  if (request.signal.aborted) {
    abortForClient();
  } else {
    request.signal.addEventListener("abort", abortForClient, { once: true });
  }

  const responseStream = new ReadableStream<Uint8Array>({
    start(controller) {
      const encoder = new TextEncoder();
      let timeout: ReturnType<typeof setTimeout> | undefined;
      let emittedText = false;

      const send = (event: Record<string, string>) => {
        if (!cancelled) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
        }
      };

      const sendOfflineAnswer = () => {
        try {
          const answer = offlineAnswer(lastUserMessage.content, priorMessages);
          emittedText = true;
          send({ type: "delta", text: answer });
          send({ type: "done", source: "offline" });
        } catch (error) {
          console.error("[assistant] offline engine failed", error);
          send({
            type: "error",
            message: `Sorry — I couldn't put that answer together just now. Our team can help directly: ${CONTACT_FALLBACK}.`,
          });
        }
      };

      timeout = setTimeout(() => {
        timedOut = true;
        abortController.abort();
      }, 30_000);

      void (async () => {
        try {
          const hasGeminiAnswer = await streamGemini(
            messages,
            (text) => {
              emittedText = true;
              send({ type: "delta", text });
            },
            abortController.signal,
          );

          if (cancelled) return;
          if (!hasGeminiAnswer) {
            sendOfflineAnswer();
          } else {
            send({ type: "done", source: "gemini" });
          }
        } catch (error) {
          if (cancelled) return;
          if (timedOut) {
            if (emittedText) {
              send({
                type: "error",
                message: "The response took too long. Please try again.",
              });
            } else {
              sendOfflineAnswer();
            }
          } else if (!emittedText) {
            sendOfflineAnswer();
          } else {
            console.error("[assistant] Gemini stream failed after sending text", error);
            send({
              type: "error",
              message: "The response was interrupted. Please try again.",
            });
          }
        } finally {
          if (timeout) clearTimeout(timeout);
          request.signal.removeEventListener("abort", abortForClient);
          if (!cancelled) controller.close();
        }
      })();
    },
    cancel() {
      abortForClient();
    },
  });

  return new Response(responseStream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
