import { GoogleGenAI } from "@google/genai";
import type { GenerateRequest, GenerateResult, ModelOption, Provider } from "./types";

/** Benchmarked 2026-09-20 on the dashboard prompt (free tier, thinking off). */
const MODELS: ModelOption[] = [
  { id: "gemini-3.1-flash-lite", label: "Flash Lite 3.1", note: "~6s · fastest · default" },
  { id: "gemini-2.5-flash", label: "Flash 2.5", note: "~12s · only 20/day on free tier" },
  { id: "gemini-3.5-flash-lite", label: "Flash Lite 3.5", note: "~14s · more verbose output" },
  { id: "gemini-3.5-flash", label: "Flash 3.5", note: "~27s · too slow for a live demo" },
  { id: "gemini-3.8-flash", label: "Flash 3.8", note: "newest · was 503ing under load" },
];

/** The lite tiers reject thinkingConfig outright with a 400. */
function supportsThinkingConfig(model: string): boolean {
  return !/flash-lite/.test(model);
}

export const geminiProvider: Provider = {
  id: "gemini",
  label: "Google Gemini",

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
