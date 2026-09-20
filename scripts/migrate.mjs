// Applies drizzle/*.sql to DATABASE_URL. Run: npm run db:migrate
import { readFileSync } from "node:fs";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

for (const line of readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
}

if (!process.env.DATABASE_URL) {
  console.error("FAIL: DATABASE_URL is not set in .env.local");
  process.exit(1);
}

const client = postgres(process.env.DATABASE_URL, { max: 1, prepare: false, ssl: "require" });
try {
  await migrate(drizzle(client), { migrationsFolder: "drizzle" });
  console.log("OK: migrations applied");
} catch (err) {
  console.error("FAIL:", err.message);
  process.exitCode = 1;
} finally {
  await client.end();
}
