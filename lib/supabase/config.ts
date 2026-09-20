/**
 * Auth is optional, exactly like the database. If these are unset the app runs
 * anonymously: generation works, nothing is saved to an account, and the sign-in
 * UI hides itself. A misconfigured auth provider must never cost you the demo.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

// Supabase is migrating from the legacy anon JWT to `sb_publishable_...` keys.
// Accept either; prefer the new one. Both are safe in the browser bundle.
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "";

export const isAuthEnabled = SUPABASE_URL !== "" && SUPABASE_ANON_KEY !== "";

export const OAUTH_PROVIDERS = [
  { id: "google", label: "Google" },
  { id: "github", label: "GitHub" },
] as const;

export type OAuthProvider = (typeof OAUTH_PROVIDERS)[number]["id"];

/**
 * Which providers the project actually has enabled. A sign-in button that
 * cannot work is worse than no button, so the UI asks before offering.
 * Failures return all providers: better a button that errors than none at all.
 */
export async function getEnabledProviders(): Promise<OAuthProvider[]> {
  if (!isAuthEnabled) return [];
  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/settings`, {
      headers: { apikey: SUPABASE_ANON_KEY },
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`settings ${res.status}`);
    const settings = (await res.json()) as { external?: Record<string, boolean> };
    return OAUTH_PROVIDERS.filter((p) => settings.external?.[p.id]).map((p) => p.id);
  } catch (err) {
    console.error("[auth] provider probe failed:", err instanceof Error ? err.message : err);
    return OAUTH_PROVIDERS.map((p) => p.id);
  }
}
