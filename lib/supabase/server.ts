import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isAuthEnabled } from "./config";

/** Server-side Supabase client bound to the request's cookies. Null when auth is off. */
export async function createClient() {
  if (!isAuthEnabled) return null;
  const jar = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => jar.getAll(),
      setAll: (list) => {
        try {
          for (const { name, value, options } of list) jar.set(name, value, options);
        } catch {
          // Called from a Server Component; middleware refreshes the session instead.
        }
      },
    },
  });
}

/** The signed-in user, or null when signed out or auth is disabled. */
export async function getUser() {
  const supabase = await createClient();
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) return null;
    return data.user;
  } catch (err) {
    console.error("[auth] getUser failed:", err instanceof Error ? err.message : err);
    return null;
  }
}
