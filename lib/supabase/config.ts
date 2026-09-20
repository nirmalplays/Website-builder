/**
 * Auth is optional, exactly like the database. If these are unset the app runs
 * anonymously: generation works, nothing is saved to an account, and the sign-in
 * UI hides itself. A misconfigured auth provider must never cost you the demo.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isAuthEnabled = SUPABASE_URL !== "" && SUPABASE_ANON_KEY !== "";

export const OAUTH_PROVIDERS = [
  { id: "google", label: "Google" },
  { id: "github", label: "GitHub" },
] as const;

export type OAuthProvider = (typeof OAUTH_PROVIDERS)[number]["id"];
