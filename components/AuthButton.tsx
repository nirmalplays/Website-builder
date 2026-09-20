"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { OAUTH_PROVIDERS, type OAuthProvider } from "@/lib/supabase/config";

export type SessionUser = { email: string; avatarUrl: string | null } | null;

export function AuthButton({
  user,
  enabled,
  providers,
}: {
  user: SessionUser;
  enabled: boolean;
  providers: OAuthProvider[];
}) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState<OAuthProvider | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Auth not configured: say nothing rather than showing a button that cannot work.
  if (!enabled) return null;

  const available = OAUTH_PROVIDERS.filter((p) => providers.includes(p.id));

  async function signIn(provider: OAuthProvider) {
    const supabase = createClient();
    if (!supabase) return;
    setBusy(provider);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) {
      setError(error.message);
      setBusy(null);
    }
  }

  if (user) {
    return (
      <div className="relative">
        <button
          onClick={() => setOpen((o) => !o)}
          className="grid h-8 w-8 cursor-pointer place-items-center overflow-hidden rounded-full border border-line bg-raised text-[11px] font-medium text-muted transition-colors duration-200 hover:border-line-strong hover:text-ink"
          title={user.email}
          aria-label={`Signed in as ${user.email}`}
        >
          {user.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.avatarUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            user.email.slice(0, 1).toUpperCase()
          )}
        </button>
        {open && (
          <div className="absolute right-0 top-10 z-30 w-60 rounded-xl border border-line bg-raised p-1 shadow-2xl shadow-black/40">
            <p className="truncate px-2.5 py-2 font-mono text-[11px] text-faint">{user.email}</p>
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="w-full cursor-pointer rounded-md px-2.5 py-2 text-left text-xs text-muted transition-colors duration-200 hover:bg-surface hover:text-ink"
              >
                Sign out
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="h-8 cursor-pointer rounded-md border border-line bg-raised px-3 text-xs text-muted transition-colors duration-200 hover:border-line-strong hover:text-ink"
      >
        Sign in
      </button>
      {open && (
        <div className="absolute right-0 top-10 z-30 w-64 rounded-xl border border-line bg-raised p-1 shadow-2xl shadow-black/40">
          <p className="px-2.5 py-2 text-[11px] leading-snug text-faint">
            Sign in to keep your projects. Generating works either way.
          </p>
          {available.length === 0 && (
            <p className="px-2.5 py-1.5 text-[11px] leading-snug text-warn">
              No OAuth provider is enabled on this Supabase project yet. Enable GitHub or
              Google under Authentication &rarr; Providers.
            </p>
          )}
          {available.map((p) => (
            <button
              key={p.id}
              onClick={() => signIn(p.id)}
              disabled={busy !== null}
              className="w-full cursor-pointer rounded-md px-2.5 py-2 text-left text-xs text-muted transition-colors duration-200 hover:bg-surface hover:text-ink disabled:opacity-50"
            >
              {busy === p.id ? `Opening ${p.label}…` : `Continue with ${p.label}`}
            </button>
          ))}
          {error && <p className="px-2.5 py-1.5 text-[11px] text-danger">{error}</p>}
        </div>
      )}
    </div>
  );
}
