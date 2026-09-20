"use client";

import { MODELS } from "@/lib/config";
import type { OAuthProvider } from "@/lib/supabase/config";
import { AuthButton, type SessionUser } from "./AuthButton";
import { UsageMeter, type Usage } from "./UsageMeter";

export function TopBar({
  model,
  onModelChange,
  usage,
  user,
  authEnabled,
  providers,
  busy,
}: {
  model: string;
  onModelChange: (id: string) => void;
  usage: Usage | null;
  user: SessionUser;
  authEnabled: boolean;
  providers: OAuthProvider[];
  busy: boolean;
}) {
  const active = MODELS.find((m) => m.id === model);

  return (
    <header className="flex h-12 shrink-0 items-center gap-3 border-b border-line bg-surface/60 px-3 backdrop-blur">
      <div className="flex items-center gap-2">
        <span
          aria-hidden="true"
          className="grid h-6 w-6 place-items-center rounded-md bg-accent text-accent-ink"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M8 6 3 12l5 6M16 6l5 6-5 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="font-mono text-[13px] font-medium tracking-tight">ui&#8202;/&#8202;gen</span>
      </div>

      {/* Live region: screen readers hear generation start and finish. */}
      <span aria-live="polite" className="sr-only">
        {busy ? "Generating component" : ""}
      </span>

      <div className="ml-auto flex items-center gap-3">
        <UsageMeter usage={usage} />

        <div className="hidden sm:block">
          <label htmlFor="model" className="sr-only">
            Model
          </label>
          <select
            id="model"
            value={model}
            onChange={(e) => onModelChange(e.target.value)}
            title={active?.note}
            className="h-8 cursor-pointer rounded-md border border-line bg-raised px-2 font-mono text-xs text-muted transition-colors duration-200 hover:border-line-strong hover:text-ink"
          >
            {MODELS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        <AuthButton user={user} enabled={authEnabled} providers={providers} />
      </div>
    </header>
  );
}
