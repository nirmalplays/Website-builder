/**
 * Shared timing for provider calls.
 *
 * This lives in the provider layer rather than lib/config.ts on purpose:
 * config.ts imports the provider registry to build its model list, so a
 * provider importing config back would close a cycle. That cycle happens to
 * survive webpack, which resolves the binding lazily, but it breaks outright
 * under plain Node - which is exactly the sort of difference that only shows
 * up in a script or a test, long after the change that caused it.
 */

/**
 * How long any single model call may take. Deliberately generous: a reasoning
 * model writing a whole multi-file application is doing minutes of work, and
 * cutting it off mid-thought wastes everything it had done. It is a backstop
 * against a wedged connection, not a latency target.
 */
export const AI_CALL_TIMEOUT_MS = Number(process.env.AI_TIMEOUT_MS ?? 240_000);
