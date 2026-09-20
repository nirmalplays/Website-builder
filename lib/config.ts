// One constant. Swap the model here (or via env) if output disappoints.
export const GEMINI_MODEL = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";

// Packages Sandpack is allowed to resolve. Must match the system prompt's allowlist.
export const SANDPACK_DEPENDENCIES: Record<string, string> = {
  "lucide-react": "latest",
};

export const MAX_OUTPUT_TOKENS = 8192;

// How many prior turns to send back with an edit. More context is not the bottleneck today.
export const HISTORY_TURNS = 3;
