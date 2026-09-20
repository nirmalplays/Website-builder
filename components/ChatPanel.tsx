"use client";

import { useEffect, useRef } from "react";

export type Turn = { role: "user" | "assistant"; content: string };

const EXAMPLES = [
  {
    title: "Pricing page",
    prompt:
      "A pricing page with three tiers, a monthly/annual toggle and a highlighted middle plan",
  },
  {
    title: "SaaS dashboard",
    prompt: "A dark SaaS dashboard with a sidebar, four stat cards and a recent activity table",
  },
  {
    title: "Sign-in screen",
    prompt: "A sign-in screen for a fintech app with social buttons and a subtle gradient",
  },
  {
    title: "Product hero",
    prompt:
      "A landing hero for a running shoe brand with a big product photo and an email capture",
  },
];

export function ChatPanel({
  history,
  loading,
  error,
  input,
  onInput,
  onSend,
  outOfQuota,
  isEdit,
}: {
  history: Turn[];
  loading: boolean;
  error: string | null;
  input: string;
  onInput: (value: string) => void;
  onSend: (prompt: string) => void;
  outOfQuota: boolean;
  isEdit: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const empty = history.length === 0 && !loading;

  // Follow the conversation as it grows, without yanking on first paint.
  useEffect(() => {
    if (history.length === 0) return;
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [history.length, loading]);

  let versionNo = 0;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        {empty ? (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <h2 className="text-[15px] font-semibold tracking-tight">Describe a UI.</h2>
              <p className="text-[13px] leading-relaxed text-muted">
                You get live React, not a screenshot. Then keep talking to it &mdash; each message
                edits the same component.
              </p>
            </div>
            <ul className="grid gap-1.5">
              {EXAMPLES.map((e) => (
                <li key={e.title}>
                  <button
                    onClick={() => onSend(e.prompt)}
                    disabled={outOfQuota}
                    className="group w-full cursor-pointer rounded-lg border border-line bg-surface px-3 py-2.5 text-left transition-colors duration-200 hover:border-line-strong hover:bg-raised disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span className="block font-mono text-[11px] uppercase tracking-wider text-faint transition-colors group-hover:text-accent">
                      {e.title}
                    </span>
                    <span className="mt-1 block text-[13px] leading-snug text-muted transition-colors group-hover:text-ink">
                      {e.prompt}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <ol className="space-y-2.5">
            {history.map((turn, i) => {
              if (turn.role === "user") {
                return (
                  <li key={i} className="flex justify-end">
                    <p className="max-w-[92%] rounded-xl rounded-br-sm bg-raised px-3 py-2 text-[13px] leading-snug text-ink">
                      {turn.content}
                    </p>
                  </li>
                );
              }
              versionNo += 1;
              const lines = turn.content.split("\n").length;
              return (
                <li key={i} className="flex items-center gap-2 pl-0.5">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="font-mono text-[11px] text-faint">
                    v{versionNo} &middot; App.tsx &middot; {lines} lines
                  </span>
                </li>
              );
            })}
            {loading && (
              <li className="flex items-center gap-2 pl-0.5" aria-busy="true">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent"
                />
                <span className="font-mono text-[11px] text-muted">
                  {isEdit ? "editing component" : "designing component"}
                </span>
              </li>
            )}
          </ol>
        )}

        {error && (
          <p
            role="alert"
            className="mt-3 rounded-lg border border-danger/40 bg-danger/10 px-3 py-2 text-[13px] leading-snug text-danger"
          >
            {error}
          </p>
        )}
      </div>

      <div className="shrink-0 p-3">
        <div className="rounded-xl border border-line bg-surface transition-colors duration-200 focus-within:border-accent/60">
          <label htmlFor="prompt" className="sr-only">
            Describe the UI you want
          </label>
          <textarea
            id="prompt"
            value={input}
            onChange={(e) => onInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSend(input);
              }
            }}
            rows={3}
            autoFocus
            disabled={outOfQuota}
            placeholder={
              outOfQuota
                ? "Daily limit reached."
                : isEdit
                  ? "make it dark and add a testimonials section"
                  : "a pricing page with three tiers"
            }
            className="block w-full resize-none bg-transparent px-3 py-2.5 text-[13px] leading-snug text-ink outline-none placeholder:text-faint disabled:cursor-not-allowed"
          />
          <div className="flex items-center justify-between gap-2 px-2.5 pb-2.5">
            <span className="font-mono text-[11px] text-faint">
              <kbd className="rounded border border-line px-1 py-0.5">Enter</kbd> send
              <span className="mx-1.5 text-line-strong">&middot;</span>
              <kbd className="rounded border border-line px-1 py-0.5">&#8679;&#8629;</kbd> newline
            </span>
            <button
              onClick={() => onSend(input)}
              disabled={loading || !input.trim() || outOfQuota}
              className="flex h-8 cursor-pointer items-center gap-1.5 rounded-lg bg-accent px-3 text-xs font-semibold text-accent-ink transition-colors duration-200 enabled:hover:bg-accent-hover disabled:cursor-not-allowed disabled:bg-line disabled:text-faint"
            >
              {loading ? (
                <>
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
                  Working
                </>
              ) : outOfQuota ? (
                "Limit reached"
              ) : (
                <>
                  {isEdit ? "Edit" : "Generate"}
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
