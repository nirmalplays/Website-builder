import { AI_CALL_TIMEOUT_MS } from "./timeouts";
import type { GenerateRequest, GenerateResult, ModelOption, Provider } from "./types";

/**
 * Anthropic's Messages API.
 *
 * Not OpenAI-shaped, so it does not go through createOpenAIStyleProvider: the
 * system prompt is a top-level field rather than a message, images are inline
 * `source` blocks, and extended thinking has its own object. Close enough to
 * be tempting, different enough that pretending would break on the details.
 */

/**
 * Thinking-capable models, strongest first - the head of this list is what the
 * picker offers by default and what the fallback chain reaches for first.
 */
const MODELS: ModelOption[] = [
  { id: "claude-opus-5-5", label: "Opus 5.5", note: "thinks hardest · newest" },
  { id: "claude-opus-5", label: "Opus 5", note: "thinks hard · best judgement" },
  { id: "claude-sonnet-5", label: "Sonnet 5", note: "thinks · fast, strong default" },
  { id: "claude-fable-5-1", label: "Fable 5.1", note: "thinks · newest" },
  { id: "claude-haiku-4-5-20251001", label: "Haiku 4.5", note: "quickest · lighter work" },
];

/**
 * Extended thinking needs headroom: the budget is spent before any visible
 * output, so max_tokens has to exceed it or the reply is cut off mid-thought.
 */
const THINKING_HEADROOM = 8192;

export const anthropicProvider: Provider = {
  id: "anthropic",
  label: "Anthropic",
  supportsImage: true,

  isConfigured() {
    return Boolean(process.env.ANTHROPIC_API_KEY);
  },

  listModels() {
    return MODELS;
  },

  async generate(req: GenerateRequest): Promise<GenerateResult> {
    const messages: Record<string, unknown>[] = req.history.map((t) => ({
      role: t.role === "assistant" ? "assistant" : "user",
      content: t.role === "assistant" ? "```tsx\n" + t.content + "\n```" : t.content,
    }));

    const parts: Record<string, unknown>[] = [];
    if (req.document) {
      parts.push({
        type: "text",
        text: `<attached-file name="${req.document.name}">\n${req.document.text}\n</attached-file>`,
      });
    }
    parts.push({ type: "text", text: req.prompt });
    if (req.image) {
      parts.push({
        type: "image",
        source: { type: "base64", media_type: req.image.mimeType, data: req.image.data },
      });
    }
    messages.push({ role: "user", content: parts });

    // Thinking is billed and returned as output, so the ceiling must cover both
    // the budget and the code that follows it.
    const thinking = req.thinkingBudget && req.thinkingBudget > 0 ? req.thinkingBudget : 0;
    const maxTokens = thinking
      ? Math.max(req.maxOutputTokens, thinking + THINKING_HEADROOM)
      : req.maxOutputTokens;

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: req.model,
        system: req.system,
        messages,
        max_tokens: maxTokens,
        // Temperature must be 1 when thinking is on; the API rejects anything else.
        temperature: thinking ? 1 : req.temperature,
        ...(thinking ? { thinking: { type: "enabled", budget_tokens: thinking } } : {}),
      }),
      signal: AbortSignal.timeout(req.timeoutMs ?? AI_CALL_TIMEOUT_MS),
    });

    if (!res.ok) {
      const body = await res.text();
      let message = `${res.status}`;
      try {
        message = JSON.parse(body)?.error?.message ?? message;
      } catch {
        message = body.slice(0, 200) || message;
      }
      throw new Error(`Anthropic ${res.status}: ${message}`);
    }

    const data = (await res.json()) as {
      content?: { type: string; text?: string }[];
      usage?: { input_tokens?: number; output_tokens?: number };
    };

    // Thinking blocks come back alongside the answer; only the text is the reply.
    const text = (data.content ?? [])
      .filter((b) => b.type === "text")
      .map((b) => b.text ?? "")
      .join("");

    // An empty reply must not look like success - the fallback chain treats a
    // thrown error as "try the next model", which is the right response here.
    if (!text.trim()) throw new Error("Anthropic returned an empty message.");

    return {
      text,
      inputTokens: data.usage?.input_tokens ?? 0,
      // output_tokens already includes thinking tokens on this API.
      outputTokens: data.usage?.output_tokens ?? 0,
    };
  },
};
