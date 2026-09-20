"use client";

import { Preview } from "./Preview";

const DEVICES = [
  { width: 375, label: "Mobile", hint: "375px" },
  { width: 768, label: "Tablet", hint: "768px" },
  { width: 1280, label: "Desktop", hint: "1280px" },
  { width: null, label: "Fill", hint: "Full width" },
] as const;

function CopyButton({ code }: { code: string }) {
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(code);
        } catch {
          // Clipboard can be blocked; the code tab is still selectable.
        }
      }}
      className="flex h-7 cursor-pointer items-center gap-1.5 rounded-md border border-line px-2 font-mono text-[11px] text-muted transition-colors duration-200 hover:border-line-strong hover:text-ink"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="9" y="9" width="11" height="11" rx="2" />
        <path d="M5 15V5a2 2 0 0 1 2-2h10" strokeLinecap="round" />
      </svg>
      Copy
    </button>
  );
}

export function PreviewPanel({
  code,
  generation,
  tab,
  onTabChange,
  deviceWidth,
  onDeviceChange,
  loading,
}: {
  code: string;
  generation: number;
  tab: "preview" | "code";
  onTabChange: (tab: "preview" | "code") => void;
  deviceWidth: number | null;
  onDeviceChange: (width: number | null) => void;
  loading: boolean;
}) {
  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col">
      <div className="flex h-10 shrink-0 items-center gap-2 border-b border-line bg-surface/60 px-2">
        {/* Segmented tabs */}
        <div role="tablist" aria-label="Result view" className="flex items-center gap-0.5 rounded-lg bg-raised p-0.5">
          {(["preview", "code"] as const).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => onTabChange(t)}
              disabled={!code}
              className={`h-7 cursor-pointer rounded-md px-2.5 font-mono text-[11px] capitalize transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40 ${
                tab === t && code ? "bg-surface text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "preview" && code && (
          <div className="hidden items-center gap-0.5 rounded-lg bg-raised p-0.5 sm:flex">
            {DEVICES.map((d) => (
              <button
                key={d.label}
                onClick={() => onDeviceChange(d.width)}
                title={d.hint}
                aria-pressed={deviceWidth === d.width}
                className={`h-7 cursor-pointer rounded-md px-2 font-mono text-[11px] transition-colors duration-200 ${
                  deviceWidth === d.width ? "bg-surface text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {d.width ?? "fill"}
              </button>
            ))}
          </div>
        )}

        <div className="ml-auto flex items-center gap-2">
          {code && <CopyButton code={code} />}
        </div>
      </div>

      <div className="relative min-h-0 flex-1 bg-surface">
        {code ? (
          <Preview code={code} generation={generation} tab={tab} deviceWidth={deviceWidth} />
        ) : (
          <div className="grid h-full place-items-center p-6">
            {loading ? (
              // Skeleton mirrors a typical generated page, so the wait previews the result.
              <div className="w-full max-w-3xl space-y-4" aria-busy="true" aria-label="Generating preview">
                <div className="h-8 w-1/3 animate-pulse rounded-md bg-raised" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-raised/70" />
                <div className="grid gap-3 sm:grid-cols-3">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-40 animate-pulse rounded-xl bg-raised/70"
                      style={{ animationDelay: `${i * 120}ms` }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="max-w-xs text-center">
                <div
                  aria-hidden="true"
                  className="mx-auto grid h-11 w-11 place-items-center rounded-xl border border-line bg-raised"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-faint" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <path d="M3 9h18" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="mt-3 text-[13px] text-muted">Your component renders here.</p>
                <p className="mt-1 font-mono text-[11px] text-faint">
                  Pick an example or describe one.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
