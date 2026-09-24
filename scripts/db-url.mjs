// Resolves DATABASE_URL the same way the app does.
//
// lib/db/index.ts rewrites Supabase's direct host onto the pooler, because
// db.<ref>.supabase.co is IPv6-only and unreachable from most places. The
// scripts read DATABASE_URL raw and so failed where the app succeeded, which
// is a confusing way to find out your migration never ran. This keeps the two
// in step.
import { readFileSync } from "node:fs";

export function loadEnv(path = ".env.local") {
  try {
    for (const line of readFileSync(path, "utf8").split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
    }
  } catch {
    // No .env.local is fine when the variables are already in the environment.
  }
}

export function databaseUrl() {
  const raw = process.env.DATABASE_URL;
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
