/**
 * Thin provider interface so the app is not married to one vendor.
 *
 * This is what makes self-hosting real: the same generate loop runs against
 * Google's API or a model on your own hardware, chosen by env var alone.
 */

export type Turn = { role: "user" | "assistant"; content: string };

/** Base64 payload sent inline: an image, or a PDF where the provider supports it. */
export type BinaryInput = { data: string; mimeType: string };

/** Text pulled from an uploaded spec, brief or source file. */
export type DocumentInput = { name: string; text: string };

export type GenerateRequest = {
  system: string;
  history: Turn[];
  prompt: string;
  image?: BinaryInput;
  document?: DocumentInput;
  model: string;
  maxOutputTokens: number;
  temperature: number;
  /** 0 disables provider-side reasoning where supported. */
  thinkingBudget?: number;
  /**
   * Abort this call after this long, overriding AI_CALL_TIMEOUT_MS. The caller
   * knows how much of its own deadline is left; the provider does not. Without
   * this a single slow call can outlive the whole request - a serverless host
   * then kills the function and the finished work is lost with it.
   */
  timeoutMs?: number;
};

export type GenerateResult = {
  text: string;
  inputTokens: number;
  outputTokens: number;
};

export type ModelOption = {
  id: string;
  label: string;
  note: string;
  /**
   * Per-model vision support, for vendors whose catalogue is mixed (Mistral
   * serves vision-capable chat models alongside text-only Codestral).
   * Falls back to the provider-level flag when unset.
   */
  supportsImage?: boolean;
};

export interface Provider {
  readonly id: string;
  readonly label: string;
  /** False when the provider is missing its key or endpoint. */
  isConfigured(): boolean;
  /**
   * Vision input support. Fallback candidates that lack this are skipped
   * up front when a request carries an image, instead of being tried and
   * failing with a confusing "model does not accept images" error.
   */
  readonly supportsImage?: boolean;
  /** Models this provider offers; may be static config or discovered live. */
  listModels(): ModelOption[];
  generate(req: GenerateRequest): Promise<GenerateResult>;
}
