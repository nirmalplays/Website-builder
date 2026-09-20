"use client";

import { useEffect } from "react";
import { useSandpack } from "@codesandbox/sandpack-react";

/**
 * Sandpack surfaces compile and runtime errors through its client state.
 * A broken preview shows the error and a way out, never a blank pane (FR-6).
 * Must be rendered inside SandpackProvider.
 */
export function PreviewErrorOverlay({
  onFix,
  fixing,
  onErrorChange,
}: {
  onFix: (message: string) => void;
  fixing: boolean;
  onErrorChange: (message: string | null) => void;
}) {
  const { sandpack } = useSandpack();
  const message = sandpack.error?.message ?? null;

  useEffect(() => {
    onErrorChange(message);
  }, [message, onErrorChange]);

  if (!message) return null;

  return (
    <div className="absolute inset-0 z-10 flex items-end justify-center p-4 sm:items-center">
      <div className="w-full max-w-lg rounded-xl border border-danger/40 bg-surface p-4 shadow-2xl shadow-black/60">
        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-danger/15 text-danger"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 8v5M12 17h.01" strokeLinecap="round" />
              <circle cx="12" cy="12" r="9" />
            </svg>
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-[13px] font-medium text-ink">This preview did not compile</h3>
            <pre className="mt-2 max-h-32 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-canvas p-2 font-mono text-[11px] leading-relaxed text-muted">
              {message}
            </pre>
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => onFix(message)}
                disabled={fixing}
                className="flex h-8 cursor-pointer items-center gap-1.5 rounded-lg bg-accent px-3 text-xs font-medium text-accent-ink transition-opacity duration-200 enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:bg-raised disabled:text-faint"
              >
                {fixing ? (
                  <>
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
                    Fixing
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Fix with AI
                  </>
                )}
              </button>
              <span className="font-mono text-[11px] text-faint">costs one generation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
