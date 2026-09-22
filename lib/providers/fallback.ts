import { listFallbackCandidates, qualifyModel, resolveQualifiedModel } from "./registry";
import type { GenerateRequest, GenerateResult } from "./types";

/**
 * One model being overloaded (503) or out of its own daily quota (429)
 * should not fail the build - the free tier meters quota per model (and per
 * vendor), and "was 503ing under load" is a real note on one of the Gemini
 * entries. Walk every other configured model, across every configured
 * provider, and keep the first one that actually answers.
 *
 * A non-busy error (bad request, auth, a genuinely broken prompt) is not
 * retried - that would just burn through every model for no reason.
 *
 * `req.model` is a qualified id ("groq:openai/gpt-oss-120b"), produced by
 * lib/config.ts's MODELS list or a previous FallbackResult.
 */

export type FallbackResult = GenerateResult & {
  /** Qualified id ("provider:model") of whatever actually produced this result. */
  model: string;
  /** Set only when the requested model was busy and a different one answered. */
  switchedFrom?: string;
};

function isBusyError(err: unknown): boolean {
  const status = (err as { status?: number } | null | undefined)?.status;
  if (status === 429 || status === 503) return true;
  const message = err instanceof Error ? err.message : String(err);
  return (
    /\b(429|503)\b/.test(message) ||
    /rate.?limit|quota|overloaded|unavailable|too many requests|resource_exhausted/i.test(message) ||
    // A 200 carrying no content: the vendor answered but produced nothing.
    // Another model is far more useful than surfacing this to the user.
    /returned an empty response/i.test(message) ||
    // A model that ran out of time is a model that is too slow or wedged right
    // now. Reasoning models make this common enough that failing the whole
    // build on one slow vendor would be the wrong call.
    /timeout|timed out|aborted|AbortError/i.test(message)
  );
}

/**
 * How many models to try before giving up. Walking the whole chain on a wide
 * outage would hang the request, but most failures here are instant (a 429 or
 * 503 comes back in milliseconds) - it is only a timeout that costs real time.
 * Six was too tight once the non-reasoning models were dropped: free-tier
 * reasoning models are rate-limited often enough that a build could exhaust
 * three vendors without ever reaching a working one.
 */
const MAX_ATTEMPTS = Number(process.env.FALLBACK_MAX_ATTEMPTS ?? 10);

export async function generateWithFallback(req: GenerateRequest): Promise<FallbackResult> {
  const primary = resolveQualifiedModel(req.model);
  if (!primary) {
    throw new Error(`"${req.model}" is not a configured model.`);
  }

  const needsImage = Boolean(req.image);
  const rest = listFallbackCandidates().filter(
    (c) =>
      !(c.provider.id === primary.provider.id && c.modelId === primary.modelId) &&
      (!needsImage || c.supportsImage),
  );

  // Interleave by provider rather than walking one vendor's whole catalogue.
  // A per-model daily quota is worth a second model from the same vendor,
  // but a vendor that is down is down - the next attempt should be someone
  // else. Round-robin gives us both: same-provider second, then spread out.
  const byProvider = new Map<string, typeof rest>();
  for (const c of rest) {
    const group = byProvider.get(c.provider.id);
    if (group) group.push(c);
    else byProvider.set(c.provider.id, [c]);
  }
  // The primary's own provider goes first so its sibling model is attempt #2.
  const groups = [
    ...(byProvider.has(primary.provider.id) ? [byProvider.get(primary.provider.id)!] : []),
    ...[...byProvider.entries()].filter(([id]) => id !== primary.provider.id).map(([, g]) => g),
  ];
  const interleaved: typeof rest = [];
  for (let depth = 0; interleaved.length < rest.length; depth++) {
    for (const group of groups) if (group[depth]) interleaved.push(group[depth]);
  }

  const candidates = [{ provider: primary.provider, modelId: primary.modelId }, ...interleaved].slice(
    0,
    Math.max(1, MAX_ATTEMPTS),
  );
  const failures: string[] = [];

  for (const { provider, modelId } of candidates) {
    try {
      const res = await provider.generate({ ...req, model: modelId });
      const model = qualifyModel(provider.id, modelId);
      return { ...res, model, switchedFrom: model === req.model ? undefined : req.model };
    } catch (err) {
      if (!isBusyError(err)) throw err;
      failures.push(`${provider.id}:${modelId}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  throw new Error(`Every model is busy or rate-limited right now: ${failures.join("; ")}`);
}
