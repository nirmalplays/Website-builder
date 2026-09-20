"use client";

import { useEffect, useRef } from "react";
import { Composer, type Attachment } from "./Composer";

export type Turn = { role: "user" | "assistant"; content: string };

export function ChatPanel({
  history,
  loading,
  error,
  input,
  onInput,
  onSend,
  model,
  onModelChange,
  outOfQuota,
  isEdit,
  buildNotes,
  attachment,
  onAttach,
}: {
  history: Turn[];
  loading: boolean;
  error: string | null;
  input: string;
  onInput: (value: string) => void;
  onSend: (prompt: string) => void;
  model: string;
  onModelChange: (id: string) => void;
  outOfQuota: boolean;
  isEdit: boolean;
  buildNotes: string[];
  attachment: Attachment | null;
  onAttach: (a: Attachment | null) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [history.length, loading]);

  let versionNo = 0;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
        <ol className="space-y-2.5">
          {history.map((turn, i) => {
            if (turn.role === "user") {
              return (
                <li key={i} className="flex justify-end">
                  <p className="max-w-[92%] rounded-2xl rounded-br-md bg-raised px-3 py-2 text-[13px] leading-snug text-ink">
                    {turn.content}
                  </p>
                </li>
              );
            }
            versionNo += 1;
            const lines = turn.content.split("\n").length;
            return (
              <li key={i} className="flex items-center gap-2 pl-1">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-success" />
                <span className="font-mono text-[11px] text-faint">
                  v{versionNo} &middot; App.tsx &middot; {lines} lines
                </span>
              </li>
            );
          })}
          {!loading && buildNotes.length > 0 && (
            <li className="ml-3 space-y-1 border-l border-line pl-3">
              {buildNotes.map((note, i) => (
                <p key={i} className="text-[11px] leading-snug text-faint">
                  {note}
                </p>
              ))}
            </li>
          )}
          {loading && (
            <li className="flex items-center gap-2 pl-1" aria-busy="true">
              <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink" />
              <span className="font-mono text-[11px] text-muted">
                {isEdit ? "editing the app" : "planning, building and checking it in a browser"}
              </span>
            </li>
          )}
        </ol>

        {error && (
          <p
            role="alert"
            className="mt-3 rounded-lg border border-danger/40 bg-danger/10 px-3 py-2 text-[13px] leading-snug text-danger"
          >
            {error}
          </p>
        )}
      </div>

      <div className="shrink-0 p-3 pt-0">
        <Composer
          value={input}
          onChange={onInput}
          onSubmit={onSend}
          model={model}
          onModelChange={onModelChange}
          loading={loading}
          outOfQuota={outOfQuota}
          isEdit={isEdit}
          attachment={attachment}
          onAttach={onAttach}
        />
        <p className="mt-2 px-1 font-mono text-[10px] text-faint">
          Enter to send &middot; Shift+Enter for a newline &middot; Cmd/Ctrl+K to focus
        </p>
      </div>
    </div>
  );
}
