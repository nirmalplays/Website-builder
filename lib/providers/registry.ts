import { geminiProvider, geminiProvider2 } from "./gemini";
import { openAiCompatibleProvider } from "./openaiCompatible";
import { FREE_TIER_PROVIDERS } from "./freeTier";
import type { Provider } from "./types";

/**
 * Registration order doubles as fallback priority: Gemini and your own
 * self-hosted endpoint come first (best quality / lowest latency for most
 * setups), then the free-tier vendors in roughly the order they appear in
 * https://github.com/mnfst/awesome-free-llm-apis.
 */
const PROVIDER_LIST: Provider[] = [
  geminiProvider,
  geminiProvider2,
  openAiCompatibleProvider,
  ...FREE_TIER_PROVIDERS,
];

const PROVIDERS: Record<string, Provider> = Object.fromEntries(
  PROVIDER_LIST.map((p) => [p.id, p]),
);

export function listProviders(): Provider[] {
  return PROVIDER_LIST;
}

/** Every provider that is actually usable right now - has its key set, or needs none. */
export function listConfiguredProviders(): Provider[] {
  const configured = PROVIDER_LIST.filter((p) => p.isConfigured());

  /*
   * AI_PROVIDER says "use this backend and no other", and until now it only
   * reached getProvider() - the fallback chain read this function directly and
   * happily reached for every other configured vendor, so pinning did not
   * actually pin anything. Applying it here makes one key mean one key, while
   * still allowing fallback BETWEEN that provider's own models, which is what
   * you want when the strongest one is rate-limited.
   *
   * Ignored when it names a provider with no key, so a stale pin cannot leave
   * the app with no backend at all.
   */
  const pinned = process.env.AI_PROVIDER;
  const only = pinned ? configured.filter((p) => p.id === pinned) : [];
  return only.length > 0 ? only : configured;
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

  // Resolve through the configured list rather than the raw map, so a provider
  // excluded by an AI_PROVIDER pin cannot be reached by naming it directly -
  // otherwise GEMINI_MODEL, or a model id in the request body, quietly routes
  // around the pin and spends a key the operator meant to stop using.
  const provider = listConfiguredProviders().find((p) => p.id === providerId);
  if (!provider) return null;
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
