/**
 * Benchmarked 2026-09-20 on the dashboard prompt (free tier, thinking off where supported).
 * Free-tier daily quota is per project PER MODEL, so switching model is also how you
 * recover from a daily quota wall mid-session.
 */
import { getProvider } from "./providers";
export type { ModelOption } from "./providers";

/** Models offered by whichever provider is configured (Gemini, or your own). */
export const MODELS = getProvider().listModels();

export const DEFAULT_MODEL = process.env.GEMINI_MODEL ?? MODELS[0]?.id ?? "gemini-3.1-flash-lite";

export function isAllowedModel(id: string): boolean {
  return MODELS.some((m) => m.id === id);
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
/** Self-hosted sandpack-bundler, if you run one. Empty = CodeSandbox's public one. */
export const SANDPACK_BUNDLER_URL = process.env.NEXT_PUBLIC_SANDPACK_BUNDLER_URL ?? "";

export const MAX_OUTPUT_TOKENS = Number(process.env.GEMINI_MAX_OUTPUT_TOKENS ?? 32768);

// How many prior turns to send back with an edit. More context is not the bottleneck today.
export const HISTORY_TURNS = 3;
