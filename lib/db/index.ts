import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

/**
 * The database is optional on purpose. Persistence is a nice-to-have; the
 * generate loop is not allowed to fail because Postgres is unreachable.
 * Every caller must handle `db` being null.
 */
const url = process.env.DATABASE_URL;

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
