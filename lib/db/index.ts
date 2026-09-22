import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

/**
 * The database is optional on purpose. Persistence is a nice-to-have; the
 * generate loop is not allowed to fail because Postgres is unreachable.
 * Every caller must handle `db` being null.
 */
const url = viaPooler(process.env.DATABASE_URL);

/**
 * Supabase's direct host, db.<ref>.supabase.co, resolves to IPv6 only. Vercel's
 * functions have no IPv6 egress, so every query against it fails - and because
 * persistence here is deliberately fail-soft, nothing surfaces: saved projects
 * and the rate limits just quietly stop working while the app looks healthy.
 *
 * Setting SUPABASE_POOLER_HOST sends the same credentials through Supavisor
 * instead. Only the endpoint and the pooler's `user.<ref>` login form change;
 * the password is untouched, so the connection string itself stays put. Unset,
 * this does nothing, and a URL that is not a Supabase direct host is left
 * alone - so a Neon or local Postgres URL passes straight through.
 */
function viaPooler(raw: string | undefined): string | undefined {
  const host = process.env.SUPABASE_POOLER_HOST;
  if (!raw || !host) return raw;
  try {
    const u = new URL(raw);
    const ref = /^db\.([a-z0-9]+)\.supabase\.co$/.exec(u.hostname)?.[1];
    if (!ref) return raw;
    u.username = `${u.username}.${ref}`;
    u.hostname = host;
    u.port = process.env.SUPABASE_POOLER_PORT ?? "5432";
    return u.toString();
  } catch {
    return raw;
  }
}

declare global {
  // eslint-disable-next-line no-var
  var __dbClient: ReturnType<typeof postgres> | undefined;
}

function createClient() {
  if (!url) return undefined;
  // prepare:false is required by Supabase's transaction pooler, which does not
  // support prepared statements. max:1 suits serverless, where each invocation
  // is its own process. Hosted Postgres requires SSL; local usually forbids it.
  const isLocal = /@(localhost|127\.0\.0\.1)/.test(url);
  return postgres(url, {
    prepare: false,
    max: 1,
    idle_timeout: 20,
    connect_timeout: 10,
    ssl: isLocal ? false : "require",
  });
}

const client = globalThis.__dbClient ?? createClient();
if (process.env.NODE_ENV !== "production") globalThis.__dbClient = client;

export const db = client ? drizzle(client, { schema }) : null;
export const isDbEnabled = db !== null;
export { schema };

/** Runs a persistence step without ever taking the request down with it. */
export async function tryPersist<T>(label: string, fn: () => Promise<T>): Promise<T | null> {
  if (!db) return null;
  try {
    return await fn();
  } catch (err) {
    console.error(`[db] ${label} failed:`, err instanceof Error ? err.message : err);
    return null;
  }
}
