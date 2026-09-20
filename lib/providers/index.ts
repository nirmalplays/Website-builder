import { geminiProvider } from "./gemini";
import { openAiCompatibleProvider } from "./openaiCompatible";
import type { Provider } from "./types";

export * from "./types";

const PROVIDERS: Record<string, Provider> = {
  [geminiProvider.id]: geminiProvider,
  [openAiCompatibleProvider.id]: openAiCompatibleProvider,
};

/**
 * AI_PROVIDER picks the backend. Defaults to Gemini, falls back to whichever
 * provider is actually configured so a self-hosted deployment with only
 * AI_BASE_URL set still works without extra wiring.
 */
export function getProvider(): Provider {
  const requested = process.env.AI_PROVIDER;
  if (requested && PROVIDERS[requested]) return PROVIDERS[requested];

  const configured = Object.values(PROVIDERS).find((p) => p.isConfigured());
  return configured ?? geminiProvider;
}

export function listProviders(): Provider[] {
  return Object.values(PROVIDERS);
}
