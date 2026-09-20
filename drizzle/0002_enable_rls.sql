-- Supabase exposes every public-schema table through PostgREST using the anon key,
-- which is public by design (it ships in the browser bundle). With RLS off, anyone
-- with that key could read or write these tables directly.
--
-- The app never uses PostgREST: it talks to Postgres over DATABASE_URL as the owner
-- role, which bypasses RLS. So enabling RLS with no policies denies anon and
-- authenticated clients everything, while the app keeps working unchanged.
ALTER TABLE "projects" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "messages" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "versions" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "usage" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint

REVOKE ALL ON "projects" FROM anon, authenticated;--> statement-breakpoint
REVOKE ALL ON "messages" FROM anon, authenticated;--> statement-breakpoint
REVOKE ALL ON "versions" FROM anon, authenticated;--> statement-breakpoint
REVOKE ALL ON "usage" FROM anon, authenticated;
