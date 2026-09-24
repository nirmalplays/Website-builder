/**
 * What a generation actually costs.
 *
 * Prices are USD per million tokens, from ai.google.dev/gemini-api/docs/pricing
 * as of 2026-09-24. They are not inferred, estimated or scaled from another
 * model: an invented number is worse than no number, because it looks like
 * information.
 *
 * Several Gemini models bill input at a higher rate once a prompt passes
 * 200k tokens. Builds here run well under that - the largest observed prompt
 * was around 25k - but the tier is modelled rather than ignored, because the
 * React Bits manifest and a long edit history both push the prompt upward and
 * a silent 2x underestimate is exactly the kind of error nobody notices.
 *
 * Output prices include thinking tokens on every model listed, which matters:
 * these are reasoning models and thinking is usually the larger half.
 */

export type Price = {
  /** USD per 1M input tokens, prompts at or below the tier boundary. */
  input: number;
  /** USD per 1M output tokens, including thinking tokens. */
  output: number;
  /** Prompt size in tokens above which the long rates apply. */
  longContextFrom?: number;
  inputLong?: number;
  outputLong?: number;
  freeTier: boolean;
};

export const PRICES: Record<string, Price> = {
  "gemini-3.1-pro-preview": {
    input: 2.0,
    output: 12.0,
    longContextFrom: 200_000,
    inputLong: 4.0,
    outputLong: 18.0,
    freeTier: false,
  },
  "gemini-2.5-pro": {
    input: 1.25,
    output: 10.0,
    longContextFrom: 200_000,
    inputLong: 2.5,
    outputLong: 15.0,
    freeTier: true,
  },
  "gemini-3.5-flash": { input: 1.5, output: 9.0, freeTier: true },

  // Anthropic, from anthropic.com/pricing. Output includes thinking tokens on
  // this API too, and usage.output_tokens already reflects that.
  "claude-opus-5": { input: 5.0, output: 25.0, freeTier: false },
  "claude-sonnet-5": { input: 3.0, output: 15.0, freeTier: false },
  "claude-fable-5-1": { input: 3.0, output: 15.0, freeTier: false },
  "claude-haiku-4-5-20251001": { input: 1.0, output: 5.0, freeTier: false },
  "gemini-2.5-flash": { input: 0.3, output: 2.5, freeTier: true },
};

/** Models the app can run that have no published price here. */
export function isPriced(model: string): boolean {
  return bareModel(model) in PRICES;
}

/** Usage rows store "provider:model"; pricing is per model. */
export function bareModel(qualified: string): string {
  const i = qualified.indexOf(":");
  return i === -1 ? qualified : qualified.slice(i + 1);
}

export type Cost = { input: number; output: number; total: number; priced: boolean };

const ZERO: Cost = { input: 0, output: 0, total: 0, priced: false };

/**
 * Cost of one generation in USD.
 *
 * `priced: false` means this model has no published rate here and the run is
 * counted in tokens but not in money - reported separately rather than folded
 * in as zero, which would quietly understate the bill.
 */
export function costOf(model: string, inputTokens: number, outputTokens: number): Cost {
  const price = PRICES[bareModel(model)];
  if (!price) return ZERO;

  const long = price.longContextFrom !== undefined && inputTokens > price.longContextFrom;
  const inRate = long ? (price.inputLong ?? price.input) : price.input;
  const outRate = long ? (price.outputLong ?? price.output) : price.output;

  const input = (inputTokens / 1_000_000) * inRate;
  const output = (outputTokens / 1_000_000) * outRate;
  return { input, output, total: input + output, priced: true };
}

/** Small amounts need more than two decimals to be worth showing at all. */
export function formatUsd(amount: number): string {
  if (amount === 0) return "$0.00";
  if (amount < 0.01) return `$${amount.toFixed(4)}`;
  if (amount < 1) return `$${amount.toFixed(3)}`;
  return `$${amount.toFixed(2)}`;
}
