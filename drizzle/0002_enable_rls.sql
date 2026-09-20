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

DO $$
BEGIN
  -- These roles exist only on Supabase; skip cleanly on plain Postgres.
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
    REVOKE ALL ON "projects", "messages", "versions", "usage" FROM anon;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
    REVOKE ALL ON "projects", "messages", "versions", "usage" FROM authenticated;
  END IF;
END $$;
