CREATE TABLE "connections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" text NOT NULL,
	"user_id" uuid,
	"project_id" uuid,
	"provider" text NOT NULL,
	"name" text NOT NULL,
	"visibility" text NOT NULL,
	"value_encrypted" text NOT NULL,
	"hint" text DEFAULT '' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "connections" ADD CONSTRAINT "connections_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint

-- This table holds other services' API credentials, encrypted. Supabase exposes
-- every public-schema table through PostgREST using the anon key, which ships in
-- the browser, so without RLS anyone holding that key could read the ciphertext
-- and every hint. The app reaches Postgres as the owner role over DATABASE_URL
-- and bypasses RLS, so denying anon and authenticated everything costs nothing.
ALTER TABLE "connections" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint

DO $$
BEGIN
  -- These roles exist only on Supabase; skip cleanly on plain Postgres.
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
    REVOKE ALL ON "connections" FROM anon;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
    REVOKE ALL ON "connections" FROM authenticated;
  END IF;
END $$;
