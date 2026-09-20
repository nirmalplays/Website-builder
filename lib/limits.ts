import { and, count, eq, gte, or } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import type { Identity } from "@/lib/identity";

/**
 * Daily generation caps.
 *
 * Sized against measured provider headroom rather than guessed: ~75 calls a day
 * to gemini-3.1-flash-lite never hit a quota wall, while gemini-2.5-flash cut
 * out at exactly 20. A generation averages ~1.2k in / 1.1k out tokens.
 *
 * Anonymous gets a trial you can actually build something with; signing in
 * raises it roughly tenfold. Both are env-tunable without a redeploy.
 */
export const LIMITS = {
  anonymous: Number(process.env.LIMIT_ANONYMOUS ?? 10),
  signedIn: Number(process.env.LIMIT_SIGNED_IN ?? 100),
};

/**
 * Safety valve. Every user shares one API key, so a busy day (or one abusive
 * session) could exhaust the provider quota for everyone. This caps the whole
 * app per day, well under the provider ceiling, and fails with a clear message
 * instead of a raw 429. Set GLOBAL_DAILY_CAP=0 to disable.
 */
export const GLOBAL_DAILY_CAP = Number(process.env.GLOBAL_DAILY_CAP ?? 500);

export type UsageStatus = {
  used: number;
  limit: number;
  remaining: number;
  signedIn: boolean;
  resetsAt: string;
  /** False when the database is unavailable: we cannot count, so we do not block. */
  enforced: boolean;
};

/** Quotas run on the UTC day, which is what resetsAt reports back to the UI. */
function periodStart(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

function periodEnd(): Date {
  const start = periodStart();
  return new Date(start.getTime() + 24 * 60 * 60 * 1000);
}

/** Generations made by everyone today; null when it cannot be counted. */
export async function getGlobalUsage(): Promise<number | null> {
  if (!db || GLOBAL_DAILY_CAP <= 0) return null;
  try {
    const [row] = await db
      .select({ value: count() })
      .from(schema.usage)
      .where(gte(schema.usage.createdAt, periodStart()));
    return row?.value ?? 0;
  } catch (err) {
    console.error("[limits] global count failed:", err instanceof Error ? err.message : err);
    return null;
  }
}

export async function getUsage(identity: Identity): Promise<UsageStatus> {
  const limit = identity.signedIn ? LIMITS.signedIn : LIMITS.anonymous;
  const base: UsageStatus = {
    used: 0,
    limit,
    remaining: limit,
    signedIn: identity.signedIn,
    resetsAt: periodEnd().toISOString(),
    enforced: false,
  };

  if (!db) return base;

  try {
    // A signed-in user's quota follows the account, including generations made
    // from this browser before they signed in.
    const owner = identity.userId
      ? or(
          eq(schema.usage.userId, identity.userId),
          eq(schema.usage.sessionId, identity.sessionId),
        )
      : eq(schema.usage.sessionId, identity.sessionId);

    const [row] = await db
      .select({ value: count() })
      .from(schema.usage)
      .where(and(owner, gte(schema.usage.createdAt, periodStart())));

    const used = row?.value ?? 0;
    return { ...base, used, remaining: Math.max(0, limit - used), enforced: true };
  } catch (err) {
    // Counting must never take generation down with it.
    console.error("[limits] usage query failed:", err instanceof Error ? err.message : err);
    return base;
  }
}
