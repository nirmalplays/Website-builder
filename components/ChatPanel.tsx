"use client";

import { useEffect, useRef, useState } from "react";
import { Composer, type Attachment } from "./Composer";
import { formatUsd } from "@/lib/pricing";

/** `lines` is set when a turn is restored from history and the file body was not sent. */
export type Turn = { role: "user" | "assistant"; content: string; lines?: number };

/** A progress event streamed by /api/generate while a build runs. */
export type BuildStage = {
  type: "stage";
  stage: string;
  detail?: string;
  round?: number;
  of?: number;
};

/** Running token total, pushed by the server after each model call. */
export type LiveTokens = {
  inputTokens: number;
  outputTokens: number;
  model: string;
  costUsd: number;
};

/** What each stage is actually doing, in the user's words. */
const STAGE_LABEL: Record<string, string> = {
  planning: "thinking about the design",
  planned: "plan ready",
  components: "fetching React Bits components",
  "missing-files": "writing files the app referenced",
  editing: "reading the current app",
  building: "writing the code",
  wiring: "wiring up the controls",
  verifying: "running it in a browser",
  fixing: "fixing what the browser found",
};

const STAGE_ORDER = ["planning", "components", "building", "missing-files", "wiring", "verifying", "fixing"];

function elapsedLabel(ms: number): string {
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return m > 0 ? `${m}:${String(s).padStart(2, "0")}` : `${s}s`;
}

/**
 * Live build readout. Thinking is on and the result is checked in a real
 * browser, so a build takes minutes rather than seconds - a bare spinner
 * would look like a hang.
 */
function BuildProgress({
  stage,
  startedAt,
  isEdit,
  tokens,
}: {
  stage: BuildStage | null;
  startedAt: number | null;
  isEdit: boolean;
  tokens: LiveTokens | null;
}) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const elapsed = startedAt ? now - startedAt : 0;
  const current = stage?.stage ?? (isEdit ? "editing" : "planning");
  const label = STAGE_LABEL[current] ?? current;
  const stepIndex = STAGE_ORDER.indexOf(current === "planned" ? "planning" : current);

  return (
    <li className="ml-1 space-y-1.5" aria-busy="true" aria-live="polite">
      <div className="flex items-center gap-2">
        <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink" />
        <span className="font-mono text-[11px] text-ink">{label}</span>
        <span className="ml-auto font-mono text-[11px] tabular-nums text-faint">
          {elapsedLabel(elapsed)}
        </span>
      </div>

      {/* Real counts from the provider, updated after every call rather than
          only once the build finishes and writes its usage row. */}
      {tokens && (
        <p className="pl-3.5 font-mono text-[11px] leading-snug tabular-nums text-faint">
          {tokens.inputTokens.toLocaleString()} in · {tokens.outputTokens.toLocaleString()} out ·{" "}
          <span className="text-muted">{formatUsd(tokens.costUsd)}</span>
        </p>
      )}

      {stage?.detail && (
        <p className="pl-3.5 text-[11px] leading-snug text-faint">{stage.detail}</p>
      )}
      {stage?.round && stage.of && (
        <p className="pl-3.5 text-[11px] leading-snug text-faint">
          pass {stage.round} of {stage.of}
        </p>
      )}

      {/* Which steps are done, which is running, which are still ahead. */}
      <div className="flex gap-1 pl-3.5" aria-hidden="true">
        {STAGE_ORDER.map((s, i) => (
          <span
            key={s}
            title={STAGE_LABEL[s]}
            className={`h-0.5 w-6 rounded-full transition-colors duration-500 ${
              stepIndex < 0 ? "bg-line" : i < stepIndex ? "bg-success" : i === stepIndex ? "bg-ink" : "bg-line"
            }`}
          />
        ))}
      </div>

      {elapsed > 45_000 && (
        <p className="pl-3.5 text-[11px] leading-snug text-faint">
          Taking its time on purpose - it plans, builds, then checks the result in a
          real browser before handing it over.
        </p>
      )}
    </li>
  );
}

export function ChatPanel({
  history,
  loading,
  error,
  input,
  onInput,
  onSend,
  outOfQuota,
  isEdit,
  buildNotes,
  attachment,
  onAttach,
  stage,
  buildStartedAt,
  liveTokens,
}: {
  history: Turn[];
  loading: boolean;
  error: string | null;
  input: string;
  onInput: (value: string) => void;
  onSend: (prompt: string) => void;
  outOfQuota: boolean;
  isEdit: boolean;
  buildNotes: string[];
  attachment: Attachment | null;
  onAttach: (a: Attachment | null) => void;
  stage: BuildStage | null;
  buildStartedAt: number | null;
  liveTokens: LiveTokens | null;
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
            // Restored turns carry a line count instead of the file body.
            const lines = turn.lines ?? turn.content.split("\n").length;
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
            <BuildProgress stage={stage} startedAt={buildStartedAt} isEdit={isEdit} tokens={liveTokens} />
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
