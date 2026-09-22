import { geminiProvider } from "./gemini";
import { openAiCompatibleProvider } from "./openaiCompatible";
import { FREE_TIER_PROVIDERS } from "./freeTier";
import type { Provider } from "./types";

/**
 * Registration order doubles as fallback priority: Gemini and your own
 * self-hosted endpoint come first (best quality / lowest latency for most
 * setups), then the free-tier vendors in roughly the order they appear in
 * https://github.com/mnfst/awesome-free-llm-apis.
 */
const PROVIDER_LIST: Provider[] = [geminiProvider, openAiCompatibleProvider, ...FREE_TIER_PROVIDERS];

const PROVIDERS: Record<string, Provider> = Object.fromEntries(
  PROVIDER_LIST.map((p) => [p.id, p]),
);

export function listProviders(): Provider[] {
  return PROVIDER_LIST;
}

/** Every provider that is actually usable right now - has its key set, or needs none. */
export function listConfiguredProviders(): Provider[] {
  return PROVIDER_LIST.filter((p) => p.isConfigured());
}

/**
 * AI_PROVIDER pins the backend to exactly one provider (the old, single-model
 * behaviour). Leave it unset to use every configured provider as fallback
 * capacity instead - see generateWithFallback.
 */
export function getProvider(): Provider {
  const requested = process.env.AI_PROVIDER;
  if (requested && PROVIDERS[requested]) return PROVIDERS[requested];

  return listConfiguredProviders()[0] ?? geminiProvider;
}

/** "gemini:gemini-3.1-flash-lite" - a model id namespaced to its provider. */
export function qualifyModel(providerId: string, modelId: string): string {
  return `${providerId}:${modelId}`;
}

/**
 * Splits a qualified id back into its provider and model, and confirms the
 * provider is both known and currently configured, and actually offers that
 * model. Returns null for anything that doesn't check out - callers treat
 * that as "not an allowed model" rather than throwing.
 */
export function resolveQualifiedModel(
  qualifiedId: string,
): { provider: Provider; modelId: string } | null {
  const sep = qualifiedId.indexOf(":");
  if (sep === -1) return null;
  const providerId = qualifiedId.slice(0, sep);
  const modelId = qualifiedId.slice(sep + 1);

  const provider = PROVIDERS[providerId];
  if (!provider || !provider.isConfigured()) return null;
  if (!provider.listModels().some((m) => m.id === modelId)) return null;

  return { provider, modelId };
}

/** Every (provider, model) pair available for fallback, across every configured provider. */
export function listFallbackCandidates(): {
  provider: Provider;
  modelId: string;
  supportsImage: boolean;
}[] {
  return listConfiguredProviders().flatMap((provider) =>
    provider.listModels().map((m) => ({
      provider,
      modelId: m.id,
      // Per-model capability wins; the provider flag is the default.
      supportsImage: m.supportsImage ?? provider.supportsImage ?? false,
    })),
  );
}
