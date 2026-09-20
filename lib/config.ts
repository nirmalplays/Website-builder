/**
 * Benchmarked 2026-09-20 on the dashboard prompt (free tier, thinking off where supported).
 * Free-tier daily quota is per project PER MODEL, so switching model is also how you
 * recover from a daily quota wall mid-session.
 */
export type ModelOption = {
  id: string;
  label: string;
  note: string;
};

export const MODELS: ModelOption[] = [
  { id: "gemini-3.1-flash-lite", label: "Flash Lite 3.1", note: "~6s · fastest · default" },
  { id: "gemini-2.5-flash", label: "Flash 2.5", note: "~12s · only 20/day on free tier" },
  { id: "gemini-3.5-flash-lite", label: "Flash Lite 3.5", note: "~14s · more verbose output" },
  { id: "gemini-3.5-flash", label: "Flash 3.5", note: "~27s · too slow for a live demo" },
  { id: "gemini-3.8-flash", label: "Flash 3.8", note: "newest · was 503ing under load" },
];

export const DEFAULT_MODEL = process.env.GEMINI_MODEL ?? MODELS[0].id;

export function isAllowedModel(id: string): boolean {
  return MODELS.some((m) => m.id === id);
}

/** The lite tiers reject thinkingConfig outright with a 400. */
export function supportsThinkingConfig(model: string): boolean {
  return !/flash-lite/.test(model);
}

// Flash thinks by default, which costs ~7s per generation. 0 disables it.
// Raise this if output quality drops; it is the main latency dial.
export const THINKING_BUDGET = Number(process.env.GEMINI_THINKING_BUDGET ?? 0);

// Packages Sandpack is allowed to resolve. Must match the system prompt's allowlist.
export const SANDPACK_DEPENDENCIES: Record<string, string> = {
  // Pinned: "latest" could resolve to a build missing an icon the model used.
  "lucide-react": "1.47.0",
};

// Full-page website templates run long; 8k truncated them mid-JSX.
export const MAX_OUTPUT_TOKENS = Number(process.env.GEMINI_MAX_OUTPUT_TOKENS ?? 32768);

// How many prior turns to send back with an edit. More context is not the bottleneck today.
export const HISTORY_TURNS = 3;
