import { GoogleGenAI } from "@google/genai";
import { AI_CALL_TIMEOUT_MS } from "../config";
import type { GenerateRequest, GenerateResult, ModelOption, Provider } from "./types";

/**
 * Thinking-capable models only. The flash-lite tiers (3.1, 3.5) were dropped:
 * they reject thinkingConfig outright, so the build step's reasoning budget is
 * silently discarded on them and the model goes straight to writing JSX. They
 * were the fastest of the set, which is exactly why they kept winning the
 * fallback race and quietly producing the least considered output.
 *
 * Latencies benchmarked 2026-09-20 on the dashboard prompt, thinking off; all
 * of these are slower now that they actually reason first.
 */
const MODELS: ModelOption[] = [
  { id: "gemini-3.5-flash", label: "Flash 3.5", note: "thinks · solid default" },
  { id: "gemini-3.8-flash", label: "Flash 3.8", note: "thinks · newest · was 503ing under load" },
  { id: "gemini-2.5-flash", label: "Flash 2.5", note: "thinks · only 20/day on free tier" },
];

/** The lite tiers reject thinkingConfig outright with a 400. */
function supportsThinkingConfig(model: string): boolean {
  return !/flash-lite/.test(model);
}

export const geminiProvider: Provider = {
  id: "gemini",
  label: "Google Gemini",
  supportsImage: true,

  isConfigured() {
    return Boolean(process.env.GEMINI_API_KEY);
  },

  listModels() {
    return MODELS;
  },

  async generate(req: GenerateRequest): Promise<GenerateResult> {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

    const contents = [
      ...req.history.map((t) => ({
        role: t.role === "assistant" ? ("model" as const) : ("user" as const),
        parts: [
          { text: t.role === "assistant" ? "```tsx\n" + t.content + "\n```" : t.content },
        ],
      })),
      {
        role: "user" as const,
        parts: [
          ...(req.document
            ? [{ text: `<attached-file name="${req.document.name}">
${req.document.text}
</attached-file>` }]
            : []),
          { text: req.prompt },
          ...(req.image
            ? [{ inlineData: { data: req.image.data, mimeType: req.image.mimeType } }]
            : []),
        ],
      },
    ];

    const res = await ai.models.generateContent({
      model: req.model,
      // The SDK's part union is wider than our text-only history type.
      contents: contents as Parameters<typeof ai.models.generateContent>[0]["contents"],
      config: {
        // Without this the SDK call is unbounded: a wedged connection would
        // hang until the whole serverless function was killed, losing the build.
        abortSignal: AbortSignal.timeout(AI_CALL_TIMEOUT_MS),
        systemInstruction: req.system,
        temperature: req.temperature,
        maxOutputTokens: req.maxOutputTokens,
        ...(supportsThinkingConfig(req.model)
          ? { thinkingConfig: { thinkingBudget: req.thinkingBudget ?? 0 } }
          : {}),
      },
    });

    return {
      text: res.text ?? "",
      inputTokens: res.usageMetadata?.promptTokenCount ?? 0,
      outputTokens: res.usageMetadata?.candidatesTokenCount ?? 0,
    };
  },
};
