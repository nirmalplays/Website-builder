"use client";

import { useState } from "react";
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

function IconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      className="grid h-7 w-7 cursor-pointer place-items-center rounded-md border border-line text-muted transition-colors duration-200 hover:border-line-strong hover:text-ink"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
        {children}
      </svg>
    </button>
  );
}

function ShareButton({ onShare }: { onShare: () => Promise<string | null> }) {
  const [state, setState] = useState<"idle" | "working" | "copied" | "failed">("idle");

  return (
    <button
      onClick={async () => {
        setState("working");
        const url = await onShare();
        if (!url) return setState("failed");
        try {
          await navigator.clipboard.writeText(url);
          setState("copied");
        } catch {
          setState("copied");
        }
        setTimeout(() => setState("idle"), 2500);
      }}
      className="flex h-7 cursor-pointer items-center gap-1.5 rounded-md border border-line px-2 font-mono text-[11px] text-muted transition-colors duration-200 hover:border-line-strong hover:text-ink"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" strokeLinecap="round" />
        <path d="M12 16V3m0 0L8 7m4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {state === "working" ? "Sharing" : state === "copied" ? "Link copied" : state === "failed" ? "Failed" : "Share"}
    </button>
  );
}

/**
 * Publishes to the user's own Vercel account.
 *
 * Deliberately shows the failure rather than swallowing it: a publish button
 * that silently does nothing is worse than no button, and the two real reasons
 * it fails - no token saved, or a build that does not compile - are both
 * things the user can act on.
 */
function PublishButton({
  onPublish,
}: {
  onPublish: () => Promise<{ url?: string; error?: string; needsToken?: boolean }>;
}) {
  const [state, setState] = useState<"idle" | "working" | "done" | "failed">("idle");
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="relative">
      <button
        onClick={async () => {
          setState("working");
          setError(null);
          const res = await onPublish();
          if (res.url) {
            setUrl(res.url);
            setState("done");
            try {
              await navigator.clipboard.writeText(res.url);
            } catch {
              // The link is on screen either way.
            }
            setTimeout(() => setState("idle"), 6000);
          } else {
            setError(res.error ?? "Publish failed.");
            setState("failed");
            setTimeout(() => setState("idle"), 8000);
          }
        }}
        disabled={state === "working"}
        className="flex h-7 cursor-pointer items-center gap-1.5 rounded-md border border-line px-2 font-mono text-[11px] text-muted transition-colors duration-200 hover:border-line-strong hover:text-ink disabled:cursor-not-allowed"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2 2 20h20L12 2z" strokeLinejoin="round" />
        </svg>
        {state === "working" ? "Publishing" : state === "done" ? "Published" : state === "failed" ? "Failed" : "Publish"}
      </button>

      {state === "done" && url && (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="absolute right-0 top-9 z-20 w-max max-w-[22rem] truncate rounded-md border border-emerald-500/40 bg-emerald-500/10 px-2 py-1.5 font-mono text-[11px] text-emerald-200 underline-offset-2 hover:underline"
        >
          {url.replace(/^https:\/\//, "")} - copied
        </a>
      )}
      {state === "failed" && error && (
        <p className="absolute right-0 top-9 z-20 w-max max-w-[24rem] rounded-md border border-red-500/40 bg-red-500/10 px-2 py-1.5 text-[11px] leading-snug text-red-200">
          {error}
        </p>
      )}
    </div>
  );
}

export function PreviewPanel({
  code,
  files,
  dependencies,
  generation,
  tab,
  onTabChange,
  deviceWidth,
  onDeviceChange,
  loading,
  onFix,
  fixing,
  onErrorChange,
  versions,
  onRestore,
  fullscreen,
  onFullscreenChange,
  onShare,
  onPublish,
  onDownload,
}: {
  code: string;
  files?: Record<string, string>;
  dependencies?: Record<string, string>;
  generation: number;
  tab: "preview" | "code";
  onTabChange: (tab: "preview" | "code") => void;
  deviceWidth: number | null;
  onDeviceChange: (width: number | null) => void;
  loading: boolean;
  onFix: (message: string) => void;
  fixing: boolean;
  onErrorChange: (message: string | null) => void;
  versions: string[];
  onRestore: (index: number) => void;
  fullscreen: boolean;
  onFullscreenChange: (on: boolean) => void;
  onShare: () => Promise<string | null>;
  onPublish: () => Promise<{ url?: string; error?: string; needsToken?: boolean }>;
  onDownload: () => void;
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

        <div className="ml-auto flex items-center gap-1.5">
          {versions.length > 1 && (
            <>
              <label htmlFor="version" className="sr-only">
                Version
              </label>
              <select
                id="version"
                value={versions.length - 1}
                onChange={(e) => onRestore(Number(e.target.value))}
                title="Restore an earlier version"
                className="h-7 cursor-pointer rounded-md border border-line bg-raised px-2 font-mono text-[11px] text-muted transition-colors duration-200 hover:border-line-strong hover:text-ink"
              >
                {versions.map((_, i) => (
                  <option key={i} value={i}>
                    v{i + 1}
                    {i === versions.length - 1 ? " (latest)" : ""}
                  </option>
                ))}
              </select>
            </>
          )}
          {code && <CopyButton code={code} />}
          {code && <ShareButton onShare={onShare} />}
          {code && <PublishButton onPublish={onPublish} />}
          {code && (
            <IconButton label="Download project as ZIP" onClick={onDownload}>
              <path d="M12 3v12m0 0 4-4m-4 4-4-4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" />
            </IconButton>
          )}
          {code && (
            <IconButton
              label={fullscreen ? "Exit full screen" : "Full screen preview"}
              onClick={() => onFullscreenChange(!fullscreen)}
            >
              {fullscreen ? (
                <path d="M9 3v6H3M15 21v-6h6M3 15h6v6M21 9h-6V3" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M4 9V4h5M20 15v5h-5M15 4h5v5M9 20H4v-5" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </IconButton>
          )}
        </div>
      </div>

      <div className="relative min-h-0 flex-1 bg-surface">
        {code ? (
          <Preview
            code={code}
            files={files}
            dependencies={dependencies}
            generation={generation}
            tab={tab}
            deviceWidth={deviceWidth}
            onFix={onFix}
            fixing={fixing}
            onErrorChange={onErrorChange}
          />
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
