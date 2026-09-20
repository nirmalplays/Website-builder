import { and, count, eq, gte, or } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import type { Identity } from "@/lib/identity";

/**
 * Daily generation caps. Anonymous gets a small trial (PRD FR-9) and signing in
 * raises it (FR-8/FR-14). These are the app's own guard rails - the provider's
 * free-tier daily quota is a separate ceiling above them.
 */
export const LIMITS = {
  anonymous: Number(process.env.LIMIT_ANONYMOUS ?? 3),
  signedIn: Number(process.env.LIMIT_SIGNED_IN ?? 25),
};

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
