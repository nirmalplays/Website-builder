import { cookies } from "next/headers";
import { randomUUID } from "node:crypto";
import { getUser } from "@/lib/supabase/server";

export const SESSION_COOKIE = "uigen_session";

export type Identity = {
  sessionId: string;
  userId: string | null;
  signedIn: boolean;
};

/**
 * Anonymous owner id, so work and quota can be tracked before auth exists.
 * Only callable from route handlers and server actions - setting a cookie
 * from a server component throws.
 */
export async function getIdentity(): Promise<Identity> {
  const jar = await cookies();
  let sessionId = jar.get(SESSION_COOKIE)?.value;

  if (!sessionId) {
    sessionId = randomUUID();
    jar.set(SESSION_COOKIE, sessionId, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
  }

  const user = await getUser();
  return { sessionId, userId: user?.id ?? null, signedIn: user !== null };
}
