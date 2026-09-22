/**
 * Benchmarked 2026-09-20 on the dashboard prompt (free tier, thinking off where supported).
 * Free-tier daily quota is per project PER MODEL, so switching model is also how you
 * recover from a daily quota wall mid-session.
 */
import { listConfiguredProviders, qualifyModel, resolveQualifiedModel } from "./providers";
export type { ModelOption } from "./providers";

/**
 * One flagship model per configured provider, for the model picker - a
 * dropdown with every free-tier model from every vendor would be unusable.
 * Every model from every configured provider still participates in
 * automatic fallback when one is busy; see lib/providers/fallback.ts.
 */
export const MODELS = listConfiguredProviders().flatMap((provider) => {
  const [flagship] = provider.listModels();
  if (!flagship) return [];
  return [
    {
      id: qualifyModel(provider.id, flagship.id),
      label: provider.label,
      note: flagship.note,
    },
  ];
});

/**
 * GEMINI_MODEL still pins the default, but only if it names a model that is
 * actually in the catalogue. An env var left pointing at a retired model - a
 * flash-lite, say, now that the non-reasoning tiers are gone - would otherwise
 * make every build fail with "not a configured model" before it started.
 */
const pinned = process.env.GEMINI_MODEL
  ? qualifyModel("gemini", process.env.GEMINI_MODEL)
  : undefined;

export const DEFAULT_MODEL =
  (pinned && resolveQualifiedModel(pinned) ? pinned : undefined) ?? MODELS[0]?.id ?? "";

/** Accepts any model from any configured provider, not just the dropdown's flagships. */
export function isAllowedModel(id: string): boolean {
  return resolveQualifiedModel(id) !== null;
}

/**
 * Reasoning budget for the build step. This was 0 - thinking disabled - to keep
 * the demo feeling instant, at a real cost in output quality: the model went
 * straight to writing JSX without working out the component breakdown or state
 * first. A considered application is worth the extra seconds.
 *
 * Note the lite tiers reject thinkingConfig outright (see providers/gemini.ts),
 * so this only takes effect on a model that supports it - gemini-2.5-flash and
 * up. 0 disables it again.
 */
export const THINKING_BUDGET = Number(process.env.GEMINI_THINKING_BUDGET ?? 8192);

/** Reasoning budget for the planning step, where the architecture is decided. */
export const PLANNER_THINKING_BUDGET = Number(process.env.PLANNER_THINKING_BUDGET ?? 4096);

/**
 * How long any single model call may take. Deliberately generous: a reasoning
 * model writing a whole multi-file application is doing minutes of work, and
 * cutting it off mid-thought wastes everything it had done. It is a backstop
 * against a wedged connection, not a latency target.
 *
 * This is per call, and a build makes several (plan, build, then a model call
 * per repair round), so it is not the total - see BUILD_DEADLINE_MS.
 */
export const AI_CALL_TIMEOUT_MS = Number(process.env.AI_TIMEOUT_MS ?? 240_000);

/**
 * Total wall-clock budget for one build, kept under the route's maxDuration.
 * The route checks this before starting another repair round and ships the
 * best version it has instead of being killed mid-round and returning
 * nothing - work already done should never be thrown away.
 */
export const BUILD_DEADLINE_MS = Number(process.env.BUILD_DEADLINE_MS ?? 700_000);

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
