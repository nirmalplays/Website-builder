// Proves the connection and shows what has been saved. Run: npm run db:check
import { readFileSync } from "node:fs";
import postgres from "postgres";

for (const line of readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
}

if (!process.env.DATABASE_URL) {
  console.error("FAIL: DATABASE_URL is not set in .env.local");
  process.exit(1);
}

const sql = postgres(process.env.DATABASE_URL, { max: 1, prepare: false, ssl: "require", connect_timeout: 10, onnotice: () => {} });
try {
  const started = Date.now();
  const [{ version }] = await sql`select version()`;
  console.log(`connected in ${Date.now() - started}ms: ${version.split(",")[0]}`);
  for (const t of ["projects", "messages", "versions", "usage"]) {
    const [{ count }] = await sql`select count(*)::int as count from ${sql(t)}`;
    console.log(`  ${t.padEnd(10)} ${count} rows`);
  }
  const recent = await sql`
    select model, latency_ms, input_tokens, output_tokens, repaired, created_at
    from usage order by created_at desc limit 5`;
  if (recent.length) {
    console.log("\nrecent generations:");
    for (const r of recent) {
      console.log(
        `  ${r.model.padEnd(22)} ${String(r.latency_ms).padStart(6)}ms  in/out ${r.input_tokens}/${r.output_tokens}${r.repaired ? "  repaired:" + r.repaired : ""}`,
      );
    }
  }
} catch (err) {
  console.error("FAIL:", err.message);
  process.exitCode = 1;
} finally {
  await sql.end();
}
