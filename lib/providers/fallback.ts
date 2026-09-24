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
  // Any 5xx is the vendor's problem, not the prompt's, so another model is
  // worth a try: a concurrency test caught a Cloudflare 524 from one gateway
  // killing a whole build because only 503 was recognised. 4xx stays fatal
  // apart from 429, since a bad request will be just as bad everywhere else.
  if (status === 429 || (status !== undefined && status >= 500 && status < 600)) return true;
  const message = err instanceof Error ? err.message : String(err);
  return (
    /\b(429|5\d\d)\b/.test(message) ||
    /rate.?limit|quota|overloaded|unavailable|too many requests|resource_exhausted/i.test(message) ||
    // A 200 carrying no content: the vendor answered but produced nothing.
    // Another model is far more useful than surfacing this to the user.
    /returned an empty response/i.test(message) ||
    // A model that ran out of time is a model that is too slow or wedged right
    // now. Reasoning models make this common enough that failing the whole
    // build on one slow vendor would be the wrong call.
    /timeout|timed out|aborted|AbortError/i.test(message) ||
    /*
     * A vendor that cannot serve you is not a bad prompt.
     *
     * An unfunded Anthropic account answers 400 "Your credit balance is too
     * low", and a wrong key answers 401 - neither matched anything above, so
     * either would have failed the whole build rather than moving to a model
     * that works. Both are conditions of the account, identical everywhere
     * else in their effect to being rate limited: this provider is out, try
     * the next one.
     */
    /credit balance|insufficient (?:credit|funds|balance)|billing|payment required|invalid x-api-key|authentication_error|invalid.{0,12}api.?key|unauthorized/i.test(
      message,
    )
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

/**
 * Which models have recently said no, and until when.
 *
 * Without this the chain has no memory: a build makes five to eight calls, and
 * every one of them would re-ask the model that just returned 429, wasting a
 * round trip each time - then the next build would do it all again. A measured
 * build burned two of three Gemini tiers this way before reaching a working
 * one, on time that was needed to fix a compile error.
 *
 * Process-local and therefore best-effort: serverless instances do not share
 * it, and it is lost on cold start. That is fine - it is an optimisation, and
 * the worst case is the behaviour we had before.
 */
const coolingUntil = new Map<string, number>();

/** How long to leave a model alone, by what it complained about. */
function cooldownMs(err: unknown): number {
  const message = err instanceof Error ? err.message : String(err);
  // An unfunded or misconfigured account will not fix itself in a minute, and
  // retrying it every build wastes a slot in the attempt budget.
  if (/credit balance|billing|payment required|api.?key|authentication|unauthorized/i.test(message)) {
    return 60 * 60_000;
  }
  // A daily quota will not free up in a minute; stop asking for a good while.
  if (/quota|resource_exhausted|daily/i.test(message)) return 15 * 60_000;
  if (/\b429\b|rate.?limit|too many requests/i.test(message)) return 60_000;
  // Overload, timeout, empty response: transient, worth another look soon.
  return 30_000;
}

function isCooling(id: string): boolean {
  const until = coolingUntil.get(id);
  if (until === undefined) return false;
  if (until <= Date.now()) {
    coolingUntil.delete(id);
    return false;
  }
  return true;
}

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

  const ordered = [{ provider: primary.provider, modelId: primary.modelId }, ...interleaved];

  // Models that recently said no go to the back rather than being dropped: if
  // everything is cooling we still try them, because a stale cooldown is a far
  // smaller problem than refusing to build at all.
  const ready = ordered.filter((c) => !isCooling(qualifyModel(c.provider.id, c.modelId)));
  const cooling = ordered.filter((c) => isCooling(qualifyModel(c.provider.id, c.modelId)));
  const candidates = [...ready, ...cooling].slice(0, Math.max(1, MAX_ATTEMPTS));

  const failures: string[] = [];

  for (const { provider, modelId } of candidates) {
    const model = qualifyModel(provider.id, modelId);
    try {
      const res = await provider.generate({ ...req, model: modelId });
      // It answered, so whatever we remembered about it is out of date.
      coolingUntil.delete(model);
      return { ...res, model, switchedFrom: model === req.model ? undefined : req.model };
    } catch (err) {
      if (!isBusyError(err)) throw err;
      coolingUntil.set(model, Date.now() + cooldownMs(err));
      failures.push(`${model}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  throw new Error(`Every model is busy or rate-limited right now: ${failures.join("; ")}`);
}
