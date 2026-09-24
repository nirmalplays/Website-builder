import { and, gte, sql } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { costOf } from "@/lib/pricing";

/**
 * Money guardrails.
 *
 * The generation cap counts requests, which was fine while every model had a
 * free tier. It is not fine now: gemini-3.1-pro-preview has no free tier and
 * bills $2/1M in and $12/1M out, so a build costs real money and ten of them
 * is not a fixed amount - a heavy prompt can cost several times a light one.
 * A public URL with a request cap and no spend cap is a way to be surprised by
 * a bill.
 *
 * Deliberately a hard stop rather than a warning. A cap that only warns is a
 * cap you find out about afterwards.
 */

/** USD per UTC day across the whole deployment. 0 disables the cap. */
export const DAILY_SPEND_CAP_USD = Number(process.env.DAILY_SPEND_CAP_USD ?? 5);

export type SpendStatus = {
  spentUsd: number;
  capUsd: number;
  remainingUsd: number;
  /** False when there is no database - the cap cannot be enforced blind. */
  enforced: boolean;
  exceeded: boolean;
};

function startOfUtcDay(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

/**
 * Today's spend, priced per row.
 *
 * Summed in the application rather than in SQL because the rate depends on the
 * model and on whether the prompt crossed the long-context boundary, and
 * encoding that as a CASE expression would mean the pricing table lived in two
 * places and drifted.
 */
export async function getSpend(): Promise<SpendStatus> {
  const capUsd = DAILY_SPEND_CAP_USD;

  if (!db || capUsd <= 0) {
    return { spentUsd: 0, capUsd, remainingUsd: capUsd, enforced: false, exceeded: false };
  }

  try {
    const rows = await db
      .select({
        model: schema.usage.model,
        inputTokens: schema.usage.inputTokens,
        outputTokens: schema.usage.outputTokens,
      })
      .from(schema.usage)
      .where(gte(schema.usage.createdAt, startOfUtcDay()));

    const spentUsd = rows.reduce(
      (sum, r) => sum + costOf(r.model, r.inputTokens, r.outputTokens).total,
      0,
    );

    return {
      spentUsd,
      capUsd,
      remainingUsd: Math.max(0, capUsd - spentUsd),
      enforced: true,
      exceeded: spentUsd >= capUsd,
    };
  } catch (err) {
    // Persistence is fail-soft everywhere else, but a spend cap that silently
    // stops enforcing is the one failure that costs money. Say so loudly and
    // let the caller decide.
    console.error("[spend] could not read today's spend:", err instanceof Error ? err.message : err);
    return { spentUsd: 0, capUsd, remainingUsd: capUsd, enforced: false, exceeded: false };
  }
}

export type TokenSummary = {
  windowHours: number;
  generations: number;
  inputTokens: number;
  outputTokens: number;
  costUsd: number;
  /** Runs on a model with no published price, counted but not costed. */
  unpricedGenerations: number;
  byModel: {
    model: string;
    generations: number;
    inputTokens: number;
    outputTokens: number;
    costUsd: number;
    priced: boolean;
  }[];
  recent: {
    model: string;
    inputTokens: number;
    outputTokens: number;
    costUsd: number;
    latencyMs: number;
    repaired: string | null;
    createdAt: string;
  }[];
};

/** Everything the dashboard shows, from the rows actually written. */
export async function getTokenSummary(windowHours = 24): Promise<TokenSummary | null> {
  if (!db) return null;

  const since = new Date(Date.now() - windowHours * 3_600_000);
  const rows = await db
    .select({
      model: schema.usage.model,
      inputTokens: schema.usage.inputTokens,
      outputTokens: schema.usage.outputTokens,
      latencyMs: schema.usage.latencyMs,
      repaired: schema.usage.repaired,
      createdAt: schema.usage.createdAt,
    })
    .from(schema.usage)
    .where(and(gte(schema.usage.createdAt, since), sql`1 = 1`))
    .orderBy(sql`${schema.usage.createdAt} desc`);

  const byModel = new Map<string, TokenSummary["byModel"][number]>();
  let inputTokens = 0;
  let outputTokens = 0;
  let costUsd = 0;
  let unpricedGenerations = 0;

  for (const r of rows) {
    const cost = costOf(r.model, r.inputTokens, r.outputTokens);
    inputTokens += r.inputTokens;
    outputTokens += r.outputTokens;
    costUsd += cost.total;
    if (!cost.priced) unpricedGenerations++;

    const entry = byModel.get(r.model) ?? {
      model: r.model,
      generations: 0,
      inputTokens: 0,
      outputTokens: 0,
      costUsd: 0,
      priced: cost.priced,
    };
    entry.generations++;
    entry.inputTokens += r.inputTokens;
    entry.outputTokens += r.outputTokens;
    entry.costUsd += cost.total;
    byModel.set(r.model, entry);
  }

  return {
    windowHours,
    generations: rows.length,
    inputTokens,
    outputTokens,
    costUsd,
    unpricedGenerations,
    byModel: [...byModel.values()].sort((a, b) => b.costUsd - a.costUsd),
    recent: rows.slice(0, 30).map((r) => ({
      model: r.model,
      inputTokens: r.inputTokens,
      outputTokens: r.outputTokens,
      costUsd: costOf(r.model, r.inputTokens, r.outputTokens).total,
      latencyMs: r.latencyMs,
      repaired: r.repaired,
      createdAt: r.createdAt.toISOString(),
    })),
  };
}
