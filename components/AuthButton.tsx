"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { OAUTH_PROVIDERS, type OAuthProvider } from "@/lib/supabase/config";

export type SessionUser = { email: string; avatarUrl: string | null } | null;

export function AuthButton({ user, enabled }: { user: SessionUser; enabled: boolean }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState<OAuthProvider | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Auth not configured: say nothing rather than showing a button that cannot work.
  if (!enabled) return null;

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
          className="grid h-7 w-7 place-items-center overflow-hidden rounded-full border border-neutral-700 bg-neutral-800 text-[11px] font-medium text-neutral-300 transition hover:border-neutral-600"
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
          <div className="absolute right-0 top-9 z-20 w-56 rounded-lg border border-neutral-800 bg-neutral-900 p-1 shadow-xl">
            <p className="truncate px-2.5 py-2 text-[11px] text-neutral-500">{user.email}</p>
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="w-full rounded-md px-2.5 py-1.5 text-left text-xs text-neutral-300 transition hover:bg-neutral-800"
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
        className="rounded-md border border-neutral-800 bg-neutral-900 px-2.5 py-1 text-xs text-neutral-300 transition hover:border-neutral-700 hover:text-neutral-100"
      >
        Sign in
      </button>
      {open && (
        <div className="absolute right-0 top-8 z-20 w-56 rounded-lg border border-neutral-800 bg-neutral-900 p-1 shadow-xl">
          <p className="px-2.5 py-2 text-[11px] leading-snug text-neutral-500">
            Sign in to keep your projects. Generating works either way.
          </p>
          {OAUTH_PROVIDERS.map((p) => (
            <button
              key={p.id}
              onClick={() => signIn(p.id)}
              disabled={busy !== null}
              className="w-full rounded-md px-2.5 py-1.5 text-left text-xs text-neutral-300 transition hover:bg-neutral-800 disabled:opacity-50"
            >
              {busy === p.id ? `Opening ${p.label}…` : `Continue with ${p.label}`}
            </button>
          ))}
          {error && <p className="px-2.5 py-1.5 text-[11px] text-red-400">{error}</p>}
        </div>
      )}
    </div>
  );
}
