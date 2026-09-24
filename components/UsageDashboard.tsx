"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { formatUsd } from "@/lib/pricing";
import type { SpendStatus, TokenSummary } from "@/lib/spend";

/**
 * Live token and spend dashboard.
 *
 * Every number here is read back from the usage rows that real generations
 * wrote: token counts are what the provider reported for that call, and cost
 * is those counts against the published rate for that model. Nothing is
 * simulated, and a model with no published rate is shown as unpriced rather
 * than quietly counted as free.
 */

type Price = { model: string; input: number; output: number; freeTier: boolean };

const WINDOWS = [
  { hours: 1, label: "1h" },
  { hours: 24, label: "24h" },
  { hours: 168, label: "7d" },
  { hours: 720, label: "30d" },
];

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-lg border border-line bg-surface p-4">
      <div className="font-mono text-[11px] uppercase tracking-widest text-faint">{label}</div>
      <div className="mt-2 font-['Manrope',sans-serif] text-3xl tracking-tight text-ink tabular-nums">
        {value}
      </div>
      {sub ? <div className="mt-1 text-xs text-muted">{sub}</div> : null}
    </div>
  );
}

const compact = (n: number) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(2)}M` : n >= 1_000 ? `${(n / 1_000).toFixed(1)}k` : String(n);

export function UsageDashboard({
  initialSummary,
  initialSpend,
  prices,
}: {
  initialSummary: TokenSummary | null;
  initialSpend: SpendStatus;
  prices: Price[];
}) {
  const [hours, setHours] = useState(24);
  const [summary, setSummary] = useState(initialSummary);
  const [spend, setSpend] = useState(initialSpend);
  const [live, setLive] = useState(true);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  const load = useCallback(async (h: number) => {
    try {
      const res = await fetch(`/api/tokens?hours=${h}`, { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      setSummary(data.summary);
      setSpend(data.spend);
      // Rendered only after mount, so the server and client markup agree.
      setUpdatedAt(new Date().toLocaleTimeString());
    } catch {
      // A dropped poll is not worth surfacing; the next one will land.
    }
  }, []);

  useEffect(() => {
    void load(hours);
  }, [hours, load]);

  useEffect(() => {
    if (!live) return;
    const id = setInterval(() => void load(hours), 5_000);
    return () => clearInterval(id);
  }, [live, hours, load]);

  const noCap = spend.capUsd <= 0;
  const pct = noCap ? 0 : Math.min(100, (spend.spentUsd / spend.capUsd) * 100);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <header className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <h1 className="font-['Manrope',sans-serif] text-4xl tracking-tight text-ink">
            Token usage
          </h1>
          <p className="mt-1 text-sm text-muted">
            Real counts reported by the provider, priced at published rates.
          </p>
        </div>
        <Link href="/" className="text-sm text-muted underline-offset-4 hover:text-ink hover:underline">
          Back to the builder
        </Link>
      </header>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {WINDOWS.map((w) => (
          <button
            key={w.hours}
            onClick={() => setHours(w.hours)}
            className={`h-8 cursor-pointer rounded-lg border px-3 font-mono text-xs transition-colors ${
              hours === w.hours
                ? "border-line-strong bg-raised text-ink"
                : "border-line text-muted hover:text-ink"
            }`}
          >
            {w.label}
          </button>
        ))}
        <button
          onClick={() => setLive((v) => !v)}
          className="ml-auto flex h-8 cursor-pointer items-center gap-2 rounded-lg border border-line px-3 font-mono text-xs text-muted transition-colors hover:text-ink"
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${live ? "animate-pulse bg-emerald-400" : "bg-faint"}`}
          />
          {live ? "live" : "paused"}
        </button>
      </div>

      {!summary ? (
        <p className="mt-10 rounded-lg border border-line bg-surface p-6 text-sm text-muted">
          Nothing is being recorded — this deployment has no database configured, so token usage
          cannot be read back.
        </p>
      ) : (
        <>
          <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Stat
              label="Spent"
              value={formatUsd(summary.costUsd)}
              sub={`${summary.generations} generation${summary.generations === 1 ? "" : "s"}`}
            />
            <Stat label="Input" value={compact(summary.inputTokens)} sub="tokens sent" />
            <Stat
              label="Output"
              value={compact(summary.outputTokens)}
              sub="tokens returned, thinking included"
            />
            <Stat
              label="Per build"
              value={summary.generations ? formatUsd(summary.costUsd / summary.generations) : "$0.00"}
              sub="average"
            />
          </section>

          <section className="mt-3 rounded-lg border border-line bg-surface p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="font-mono text-[11px] uppercase tracking-widest text-faint">
                Daily spend cap
              </span>
              <span className="font-mono text-xs text-muted tabular-nums">
                {noCap
                  ? `${formatUsd(spend.spentUsd)} today · no cap`
                  : `${formatUsd(spend.spentUsd)} / ${formatUsd(spend.capUsd)}`}
              </span>
            </div>

            {/* No bar when there is no cap: a track with nothing to fill reads
                as "plenty left" rather than "nothing is stopping this". */}
            {!noCap && (
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-raised">
                <div
                  className={`h-full transition-[width] duration-500 ${
                    pct > 90 ? "bg-red-500" : pct > 70 ? "bg-amber-400" : "bg-emerald-400"
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            )}

            <p className="mt-2 text-xs text-muted">
              {noCap ? (
                <>
                  No cap set. Spend is tracked but nothing is stopping it — set{" "}
                  <code className="font-mono text-[11px]">DAILY_SPEND_CAP_USD</code> to a dollar
                  amount to put a hard stop back.
                </>
              ) : !spend.enforced ? (
                "Cannot be enforced — spend is unreadable without a database."
              ) : spend.exceeded ? (
                "Reached. Generation is blocked until midnight UTC."
              ) : (
                `${formatUsd(spend.remainingUsd)} left today. Resets at midnight UTC.`
              )}
            </p>
          </section>

          {summary.unpricedGenerations > 0 && (
            <p className="mt-3 rounded-lg border border-line bg-surface p-3 text-xs text-muted">
              {summary.unpricedGenerations} generation
              {summary.unpricedGenerations === 1 ? " ran" : "s ran"} on a model with no published
              rate here. Counted in tokens, excluded from cost rather than assumed free.
            </p>
          )}

          <section className="mt-8">
            <h2 className="font-mono text-[11px] uppercase tracking-widest text-faint">By model</h2>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-line text-left font-mono text-[11px] uppercase tracking-widest text-faint">
                    <th className="pb-2 font-normal">Model</th>
                    <th className="pb-2 text-right font-normal">Builds</th>
                    <th className="pb-2 text-right font-normal">Input</th>
                    <th className="pb-2 text-right font-normal">Output</th>
                    <th className="pb-2 text-right font-normal">Cost</th>
                  </tr>
                </thead>
                <tbody className="text-muted">
                  {summary.byModel.map((m) => (
                    <tr key={m.model} className="border-b border-line/50">
                      <td className="py-2 font-mono text-xs text-ink">{m.model}</td>
                      <td className="py-2 text-right tabular-nums">{m.generations}</td>
                      <td className="py-2 text-right tabular-nums">{compact(m.inputTokens)}</td>
                      <td className="py-2 text-right tabular-nums">{compact(m.outputTokens)}</td>
                      <td className="py-2 text-right tabular-nums text-ink">
                        {m.priced ? formatUsd(m.costUsd) : "unpriced"}
                      </td>
                    </tr>
                  ))}
                  {summary.byModel.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-xs text-faint">
                        No generations in this window.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="font-mono text-[11px] uppercase tracking-widest text-faint">
              Recent builds
            </h2>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-line text-left font-mono text-[11px] uppercase tracking-widest text-faint">
                    <th className="pb-2 font-normal">When</th>
                    <th className="pb-2 font-normal">Model</th>
                    <th className="pb-2 text-right font-normal">In</th>
                    <th className="pb-2 text-right font-normal">Out</th>
                    <th className="pb-2 text-right font-normal">Took</th>
                    <th className="pb-2 text-right font-normal">Cost</th>
                  </tr>
                </thead>
                <tbody className="text-muted">
                  {summary.recent.map((r, i) => (
                    <tr key={`${r.createdAt}-${i}`} className="border-b border-line/50">
                      <td className="py-2 font-mono text-xs">
                        {new Date(r.createdAt).toLocaleTimeString()}
                      </td>
                      <td className="py-2 font-mono text-xs">{r.model}</td>
                      <td className="py-2 text-right tabular-nums">{compact(r.inputTokens)}</td>
                      <td className="py-2 text-right tabular-nums">{compact(r.outputTokens)}</td>
                      <td className="py-2 text-right tabular-nums">{Math.round(r.latencyMs / 1000)}s</td>
                      <td className="py-2 text-right tabular-nums text-ink">{formatUsd(r.costUsd)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="font-mono text-[11px] uppercase tracking-widest text-faint">
              Rates used
            </h2>
            <p className="mt-2 text-xs text-muted">
              USD per million tokens, from Google&apos;s published pricing. Output includes thinking
              tokens.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {prices.map((p) => (
                <span
                  key={p.model}
                  className="rounded-lg border border-line bg-surface px-3 py-1.5 font-mono text-[11px] text-muted"
                >
                  {p.model} · in ${p.input} · out ${p.output}
                  {p.freeTier ? "" : " · no free tier"}
                </span>
              ))}
            </div>
          </section>

          <p className="mt-8 font-mono text-[11px] text-faint">
            {updatedAt ? `updated ${updatedAt}` : "loading…"}
          </p>
        </>
      )}
    </main>
  );
}
