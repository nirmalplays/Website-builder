import { AI_CALL_TIMEOUT_MS } from "./timeouts";
import type { GenerateRequest, GenerateResult, ModelOption, Provider } from "./types";

/**
 * Factory for the many free-tier vendors that speak OpenAI's chat-completions
 * shape (see https://github.com/mnfst/awesome-free-llm-apis). One fetch-based
 * implementation, parameterized per vendor, instead of a bespoke provider
 * file for each - the request/response shape is identical, only the base
 * URL, auth header and model catalogue differ.
 */

export type OpenAIStyleConfig = {
  id: string;
  label: string;
  baseUrl: string;
  /** Appended to baseUrl. Every vendor wired through this factory uses the default. */
  chatPath?: string;
  /** Env var holding the API key. Omit for a vendor whose free tier needs no key. */
  apiKeyEnv?: string;
  /**
   * False for a vendor whose free tier works anonymously but accepts an
   * optional key for a higher limit (e.g. LLM7.io) - apiKeyEnv is then used
   * for auth when set, without being required for isConfigured(). Defaults
   * to true (a key in apiKeyEnv is mandatory).
   */
  requiresKey?: boolean;
  models: ModelOption[];
  supportsImage?: boolean;
  timeoutMs?: number;
};

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string | Array<Record<string, unknown>>;
};

export function createOpenAIStyleProvider(config: OpenAIStyleConfig): Provider {
  const chatUrl = `${config.baseUrl.replace(/\/+$/, "")}${config.chatPath ?? "/chat/completions"}`;

  return {
    id: config.id,
    label: config.label,
    supportsImage: config.supportsImage,

    isConfigured() {
      if (!config.apiKeyEnv || config.requiresKey === false) return true;
      return Boolean(process.env[config.apiKeyEnv]);
    },

    listModels() {
      return config.models;
    },

    async generate(req: GenerateRequest): Promise<GenerateResult> {
      const messages: ChatMessage[] = [
        { role: "system", content: req.system },
        ...req.history.map((t) => ({
          role: t.role,
          content: t.role === "assistant" ? "```tsx\n" + t.content + "\n```" : t.content,
        })),
      ];

      if (req.document) {
        messages.push({
          role: "user",
          content: `<attached-file name="${req.document.name}">
${req.document.text}
</attached-file>`,
        });
      }

      if (req.image && req.image.mimeType === "application/pdf") {
        throw new Error(`${config.label} cannot read PDFs inline.`);
      }

      if (req.image) {
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

      const apiKey = config.apiKeyEnv ? process.env[config.apiKeyEnv] : undefined;

      /*
       * No reasoning parameter is sent on purpose. The models wired through
       * this adapter are reasoning models that think by default - a probe on
       * 2026-09-22 showed Nemotron 3 Ultra spending reasoning_tokens with no
       * parameter at all. Passing OpenRouter's `reasoning: { max_tokens }`
       * made the same endpoint return HTTP 200 with an entirely empty message,
       * which is far worse than not asking: it fails silently.
       */

      const res = await fetch(chatUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
        },
        body: JSON.stringify({
          model: req.model,
          messages,
          temperature: req.temperature,
          max_tokens: req.maxOutputTokens,
          stream: false,
        }),
        // Reasoning models think before they answer, and a full multi-file app
        // is a long completion - 60s was cutting real builds off mid-thought.
        signal: AbortSignal.timeout(req.timeoutMs ?? config.timeoutMs ?? AI_CALL_TIMEOUT_MS),
      });

      if (!res.ok) {
        const body = await res.text().catch(() => "");
        // Gateways answer with a full HTML error page when they time out; the
        // whole <!DOCTYPE html> document used to end up in the user's error
        // message. Keep JSON detail, summarise anything else.
        const detail = /^\s*</.test(body)
          ? `${body.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().slice(0, 120)}`
          : body.slice(0, 200);
        const err = new Error(`${res.status} from ${config.label}: ${detail}`);
        (err as Error & { status?: number }).status = res.status;
        throw err;
      }

      const data = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
        usage?: { prompt_tokens?: number; completion_tokens?: number };
      };

      const text = data.choices?.[0]?.message?.content ?? "";
      // A 200 with no content is a real failure mode on these gateways. Treat
      // it as a failure so the chain moves on, rather than handing the build
      // an empty string that parseFiles will reject far from the cause.
      if (!text.trim()) {
        throw new Error(`${config.label} returned an empty response for ${req.model}`);
      }

      return {
        text,
        inputTokens: data.usage?.prompt_tokens ?? 0,
        outputTokens: data.usage?.completion_tokens ?? 0,
      };
    },
  };
}
