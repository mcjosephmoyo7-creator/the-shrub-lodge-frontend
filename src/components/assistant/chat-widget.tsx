"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

// The conversation panel (and the icons/markdown it renders) is only pulled in
// the first time a guest opens the assistant, keeping it out of the initial
// bundle on every page.
const ChatPanel = dynamic(
  () => import("@/components/assistant/chat-panel").then((module) => module.ChatPanel),
  { ssr: false },
);

export function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [engaged, setEngaged] = useState(false);

  return (
    <>
      {/* Floating launcher */}
      <button
        type="button"
        onClick={() => {
          setEngaged(true);
          setOpen((value) => !value);
        }}
        aria-label={open ? "Close the assistant" : "Chat with the assistant"}
        aria-expanded={open}
        className={cn(
          "fixed bottom-6 right-4 z-[60] inline-flex h-14 items-center justify-center gap-2 rounded-full bg-forest-900 px-5 text-sand-50 shadow-lg shadow-forest-950/25 transition-all duration-300 hover:bg-forest-800 hover:shadow-xl sm:right-6",
          open && "bg-forest-800",
        )}
      >
        {open ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
        )}
        <span className="hidden text-sm font-semibold sm:inline">
          {open ? "Close" : "Ask Shrub Assist"}
        </span>
      </button>

      {engaged ? <ChatPanel open={open} onClose={() => setOpen(false)} /> : null}
    </>
  );
}
