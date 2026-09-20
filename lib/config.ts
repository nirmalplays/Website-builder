// One constant. Swap the model here (or via env) if output disappoints.
export const GEMINI_MODEL = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";

// Packages Sandpack is allowed to resolve. Must match the system prompt's allowlist.
export const SANDPACK_DEPENDENCIES: Record<string, string> = {
  // Pinned: "latest" could resolve to a build missing an icon the model used.
  "lucide-react": "1.47.0",
};

export const MAX_OUTPUT_TOKENS = 8192;

// Flash thinks by default, which costs ~8s per generation. 0 disables it.
// Raise this if output quality drops; it is the main latency dial.
export const THINKING_BUDGET = Number(process.env.GEMINI_THINKING_BUDGET ?? 0);

// How many prior turns to send back with an edit. More context is not the bottleneck today.
export const HISTORY_TURNS = 3;
