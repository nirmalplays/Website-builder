"use client";

import type { OAuthProvider } from "@/lib/supabase/config";
import { AuthButton, type SessionUser } from "./AuthButton";
import { UsageMeter, type Usage } from "./UsageMeter";

export function TopBar({
  usage,
  user,
  authEnabled,
  providers,
  busy,
  canReset,
  onReset,
}: {
  usage: Usage | null;
  user: SessionUser;
  authEnabled: boolean;
  providers: OAuthProvider[];
  busy: boolean;
  canReset: boolean;
  onReset: () => void;
}) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-line px-4">
      <button
        onClick={onReset}
        disabled={!canReset}
        className="flex cursor-pointer items-center gap-2 transition-opacity duration-200 hover:opacity-80 disabled:cursor-default"
        aria-label="New project"
      >
        <span
          aria-hidden="true"
          className="grid h-6 w-6 place-items-center rounded-md bg-ink text-canvas"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M8 6 3 12l5 6M16 6l5 6-5 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="text-[13px] font-semibold tracking-tight">ui/gen</span>
      </button>

      <span aria-live="polite" className="sr-only">
        {busy ? "Generating component" : ""}
      </span>

      <div className="ml-auto flex items-center gap-3">
        {canReset && (
          <button
            onClick={onReset}
            className="hidden h-8 cursor-pointer items-center gap-1.5 rounded-lg border border-line px-3 text-xs text-muted transition-colors duration-200 hover:border-line-strong hover:text-ink sm:flex"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
            New
          </button>
        )}
        <UsageMeter usage={usage} />
        <AuthButton user={user} enabled={authEnabled} providers={providers} />
      </div>
    </header>
  );
}
