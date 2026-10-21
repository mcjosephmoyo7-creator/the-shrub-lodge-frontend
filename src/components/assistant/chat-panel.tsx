"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2, RotateCcw, Send, X } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type ChatMessage = { id: number; role: "user" | "assistant"; content: string };

const GREETING: ChatMessage = {
  id: 0,
  role: "assistant",
  content: [
    `Hi, welcome to ${siteConfig.name}! 🌿`,
    "I can help you choose activities, check prices, plan transfers or answer questions about the lodge.",
    "Not sure what to do? Ask me for my top picks.",
  ].join("\n"),
};

const SUGGESTIONS = [
  "I'm not sure what to do",
  "What are the best activities?",
  "How much is a sunset cruise?",
  "Do you have rooms?",
  "How do I book?",
];

// The conversation is remembered in the browser so a guest can reload the page,
// browse around the site and come back without losing the thread.
const STORAGE_KEY = "shrub-assist-conversation-v1";
const MAX_STORED_MESSAGES = 40;
const MAX_SENT_MESSAGES = 30;

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const tokens = text.split(
    /(\*\*[^*]+\*\*|https?:\/\/\S+|\/[a-z][a-z0-9-]*(?:\/[a-z0-9-]+)*)/i,
  );

  return tokens
    .map((token, index) => {
      if (!token) return null;
      const key = `${keyPrefix}-${index}`;

      if (token.startsWith("**") && token.endsWith("**") && token.length > 4) {
        return (
          <strong key={key} className="font-semibold text-forest-950">
            {token.slice(2, -2)}
          </strong>
        );
      }

      const linkMatch = token.match(/^(https?:\/\/\S+|\/[a-z][a-z0-9-]*(?:\/[a-z0-9-]+)*)([.,;:!?)\]]*)$/i);
      if (linkMatch) {
        const [, href, trailing] = linkMatch;
        const isExternal = /^https?:/i.test(href);
        return (
          <span key={key}>
            {isExternal ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all font-medium text-gold-700 underline underline-offset-2"
              >
                {href}
              </a>
            ) : (
              <Link
                href={href}
                className="font-medium text-gold-700 underline underline-offset-2"
              >
                {href}
              </Link>
            )}
            {trailing}
          </span>
        );
      }

      return token;
    })
    .filter(Boolean);
}

function renderMessage(content: string): ReactNode {
  return content.split("\n").map((line, index) => {
    const key = `line-${index}`;
    const trimmed = line.trim();

    if (!trimmed) return <span key={key} className="block h-2" aria-hidden="true" />;

    const isBullet = /^[-•*]\s+/.test(trimmed);
    const text = isBullet ? trimmed.replace(/^[-•*]\s+/, "") : trimmed;
    const inline = renderInline(text, key);

    if (isBullet) {
      return (
        <span key={key} className="flex gap-2">
          <span aria-hidden="true" className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
          <span className="min-w-0">{inline}</span>
        </span>
      );
    }

    return (
      <span key={key} className="block">
        {inline}
      </span>
    );
  });
}

/**
 * The assistant conversation panel. This is loaded lazily (see
 * `chat-widget.tsx`) the first time a guest opens the assistant, so its code
 * and the icons it needs stay out of the initial bundle on every page.
 */
export function ChatPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [restored, setRestored] = useState(false);

  const nextId = useRef(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const inFlight = useRef<AbortController | null>(null);

  // Restore any earlier conversation from this browser (once, after mount so
  // server rendering stays safe).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const stored = JSON.parse(raw) as unknown;
        if (Array.isArray(stored)) {
          const restoredMessages = stored
            .filter(
              (item): item is { role: "user" | "assistant"; content: string } =>
                Boolean(item) &&
                typeof item === "object" &&
                (item as { role?: unknown }).role !== undefined &&
                ((item as { role: string }).role === "user" ||
                  (item as { role: string }).role === "assistant") &&
                typeof (item as { content?: unknown }).content === "string" &&
                (item as { content: string }).content.trim().length > 0,
            )
            .map((item, index) => ({
              id: index,
              role: item.role,
              content: item.content,
            }));

          if (restoredMessages.length > 0) {
            setMessages(restoredMessages);
            nextId.current = restoredMessages.length;
          }
        }
      }
    } catch {
      // Ignore unreadable storage and start a fresh conversation.
    }
    setRestored(true);
  }, []);

  // Save the conversation as it grows so it survives a reload or a return visit.
  useEffect(() => {
    if (!restored) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(
          messages
            .slice(-MAX_STORED_MESSAGES)
            .map(({ role, content }) => ({ role, content })),
        ),
      );
    } catch {
      // Storage may be unavailable (private mode) — memory still works in-session.
    }
  }, [messages, restored]);

  function startOver() {
    inFlight.current?.abort();
    inFlight.current = null;
    setTyping(false);
    setError(null);
    setMessages([GREETING]);
    nextId.current = 1;
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Nothing we can do if storage is unavailable.
    }
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    inputRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    const container = scrollRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, [messages, typing, error, open]);

  useEffect(() => () => inFlight.current?.abort(), []);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    setError(null);
    setDraft("");

    const userMessage: ChatMessage = {
      id: nextId.current++,
      role: "user",
      content: trimmed,
    };
    const history = [...messages, userMessage];
    setMessages(history);
    setTyping(true);

    inFlight.current?.abort();
    const controller = new AbortController();
    inFlight.current = controller;

    try {
      const request = async () => {
        return fetch("/api/assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: history
              .slice(-MAX_SENT_MESSAGES)
              .map(({ role, content }) => ({ role, content })),
          }),
          signal: controller.signal,
        });
      };

      let response = await request().catch(() => null);
      if (!response) {
        if (!controller.signal.aborted) {
          await new Promise((resolve) => setTimeout(resolve, 700));
          response = await request().catch(() => null);
        }
        if (!response) {
          if (!controller.signal.aborted) {
            setError("Sorry, I couldn't get an answer just now. Please try again, or contact us directly.");
          }
          return;
        }
      }

      let payload = (await response.json().catch(() => null)) as {
        reply?: string;
        error?: string;
      } | null;

      if (!response.ok) {
        const infraFailure = !payload?.error && (response.status === 404 || response.status >= 500);
        if (infraFailure && !controller.signal.aborted) {
          await new Promise((resolve) => setTimeout(resolve, 700));
          const retryResponse = await request().catch(() => null);
          if (retryResponse) {
            response = retryResponse;
            payload = (await response.json().catch(() => null)) as {
              reply?: string;
              error?: string;
            } | null;
          }
        }
      }

      if (!response.ok || !payload?.reply) {
        setError(
          payload?.error ??
            "Sorry, I couldn't get an answer just now. Please try again, or contact us directly.",
        );
        return;
      }

      setMessages((current) => [
        ...current,
        { id: nextId.current++, role: "assistant", content: payload.reply as string },
      ]);
    } catch {
      if (!controller.signal.aborted) {
        setError("Sorry, I couldn't get an answer just now. Please try again in a moment.");
      }
    } finally {
      if (inFlight.current === controller) {
        inFlight.current = null;
        setTyping(false);
      }
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void send(draft);
  }

  return (
    <div
      role="dialog"
      aria-label="Shrub Assist — virtual concierge"
      className={cn(
        "fixed bottom-24 right-4 left-4 z-[60] flex max-h-[70vh] w-auto flex-col overflow-hidden rounded-3xl border border-sand-200 bg-sand-50 shadow-2xl shadow-forest-950/30 transition-all duration-300 sm:left-auto sm:right-6 sm:w-[24rem]",
        open
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <header className="flex items-center gap-3 bg-forest-950 px-5 py-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gold-400/40 bg-forest-900 p-1">
          <Image
            src="/images/logo.png"
            alt=""
            aria-hidden="true"
            width={32}
            height={32}
            className="h-full w-full object-contain"
          />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-base leading-tight text-sand-50">
            Shrub Assist
          </span>
          <span className="block text-[0.65rem] font-medium uppercase tracking-[0.2em] text-gold-300/90">
            Your Victoria Falls concierge
          </span>
        </span>
        <button
          type="button"
          onClick={startOver}
          aria-label="Start a new conversation"
          title="Start a new conversation"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sand-200 transition-colors hover:bg-white/10 disabled:opacity-40"
          disabled={messages.length <= 1}
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close the assistant"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sand-200 transition-colors hover:bg-white/10"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </header>

      <div
        ref={scrollRef}
        className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 py-4"
        aria-live="polite"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
              message.role === "user"
                ? "self-end rounded-br-md bg-forest-900 text-sand-50"
                : "self-start rounded-bl-md border border-sand-200 bg-white text-forest-900 shadow-sm",
            )}
          >
            {renderMessage(message.content)}
          </div>
        ))}

        {typing ? (
          <div className="flex items-center gap-1.5 self-start rounded-2xl border border-sand-200 bg-white px-4 py-3.5 shadow-sm">
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className="h-2 w-2 animate-bounce rounded-full bg-gold-500"
                style={{ animationDelay: `${dot * 120}ms` }}
              />
            ))}
            <span className="sr-only">Assistant is typing</span>
          </div>
        ) : null}

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
            {error}
          </div>
        ) : null}
      </div>

      {messages.length <= 1 && !error ? (
        <div className="flex flex-wrap gap-2 border-t border-sand-200 bg-white/70 px-4 pt-3 pb-2">
          {SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => void send(suggestion)}
              className="rounded-full border border-sand-300 bg-white px-3 py-1.5 text-xs font-medium text-forest-800 transition-colors hover:border-gold-400 hover:bg-sand-100"
            >
              {suggestion}
            </button>
          ))}
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="flex items-end gap-2 border-t border-sand-200 bg-white p-3">
        <label htmlFor="assistant-input" className="sr-only">
          Ask a question
        </label>
        <textarea
          id="assistant-input"
          ref={inputRef}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              void send(draft);
            }
          }}
          rows={1}
          placeholder="Ask about activities, prices, rooms..."
          autoComplete="off"
          className="max-h-32 min-w-0 flex-1 resize-none rounded-2xl border border-sand-300 bg-sand-50 px-4 py-2.5 text-sm text-forest-900 placeholder:text-forest-800/40 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/30"
        />
        <button
          type="submit"
          disabled={typing || !draft.trim()}
          aria-label="Send message"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest-900 text-sand-50 transition-colors hover:bg-forest-800 disabled:opacity-40"
        >
          {typing ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </form>
    </div>
  );
}
