import { getTokenSummary, getSpend } from "@/lib/spend";
import { PRICES } from "@/lib/pricing";
import { UsageDashboard } from "@/components/UsageDashboard";

/**
 * Token and spend dashboard.
 *
 * Server-rendered once so the page is populated on arrival, then polled by the
 * client. Every figure comes from the usage rows real builds wrote - token
 * counts are what the provider reported for that call, not an estimate from
 * character counts.
 */
export const dynamic = "force-dynamic";

export default async function UsagePage() {
  const [summary, spend] = await Promise.all([getTokenSummary(24), getSpend()]);

  return (
    <UsageDashboard
      initialSummary={summary}
      initialSpend={spend}
      prices={Object.entries(PRICES).map(([model, p]) => ({
        model,
        input: p.input,
        output: p.output,
        freeTier: p.freeTier,
      }))}
    />
  );
}
