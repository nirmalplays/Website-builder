import type { GenerateRequest, GenerateResult, ModelOption, Provider } from "./types";

/**
 * Anything that speaks the OpenAI chat-completions API.
 *
 * That covers the whole self-hosted stack - Ollama, LM Studio, llama.cpp's
 * server, vLLM, LocalAI, text-generation-webui - as well as hosted gateways
 * like OpenRouter or Together. Point AI_BASE_URL at it and you are running
 * with no dependency on anyone else's cloud.
 *
 *   AI_PROVIDER=openai-compatible
 *   AI_BASE_URL=http://localhost:11434/v1     # Ollama
 *   AI_MODELS=qwen2.5-coder:32b,deepseek-coder-v2
 *   AI_API_KEY=                               # usually unused locally
 */

function baseUrl(): string {
  return (process.env.AI_BASE_URL ?? "http://localhost:11434/v1").replace(/\/+$/, "");
}

function configuredModels(): ModelOption[] {
  const raw = process.env.AI_MODELS ?? "qwen2.5-coder:32b";
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((id, i) => ({
      id,
      label: id.split(/[:/]/)[0],
      note: i === 0 ? "local · default" : "local",
    }));
}

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string | Array<Record<string, unknown>>;
};

export const openAiCompatibleProvider: Provider = {
  id: "openai-compatible",
  label: "Local / OpenAI-compatible",

  isConfigured() {
    return Boolean(process.env.AI_BASE_URL);
  },

  listModels() {
    return configuredModels();
  },

  async generate(req: GenerateRequest): Promise<GenerateResult> {
    const messages: ChatMessage[] = [
      { role: "system", content: req.system },
      ...req.history.map((t) => ({
        role: t.role,
        content: t.role === "assistant" ? "```tsx\n" + t.content + "\n```" : t.content,
      })),
    ];

    if (req.image) {
      // Vision models take the image alongside the text in one user turn.
      messages.push({
        role: "user",
        content: [
          { type: "text", text: req.prompt },
          {
            type: "image_url",
            image_url: { url: `data:${req.image.mimeType};base64,${req.image.data}` },
          },
        ],
      });
    } else {
      messages.push({ role: "user", content: req.prompt });
    }

    const res = await fetch(`${baseUrl()}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.AI_API_KEY ? { Authorization: `Bearer ${process.env.AI_API_KEY}` } : {}),
      },
      body: JSON.stringify({
        model: req.model,
        messages,
        temperature: req.temperature,
        max_tokens: req.maxOutputTokens,
        stream: false,
      }),
      // Local models on modest hardware are slow; do not cut them off early.
      signal: AbortSignal.timeout(Number(process.env.AI_TIMEOUT_MS ?? 180_000)),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(`${res.status} from ${baseUrl()}: ${detail.slice(0, 200)}`);
    }

    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
      usage?: { prompt_tokens?: number; completion_tokens?: number };
    };

    return {
      text: data.choices?.[0]?.message?.content ?? "",
      inputTokens: data.usage?.prompt_tokens ?? 0,
      outputTokens: data.usage?.completion_tokens ?? 0,
    };
  },
};
