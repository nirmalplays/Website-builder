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
};

export interface Provider {
  readonly id: string;
  readonly label: string;
  /** False when the provider is missing its key or endpoint. */
  isConfigured(): boolean;
  /** Models this provider offers; may be static config or discovered live. */
  listModels(): ModelOption[];
  generate(req: GenerateRequest): Promise<GenerateResult>;
}
