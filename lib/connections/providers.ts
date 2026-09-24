/**
 * Integrations the app knows how to wire up.
 *
 * A key on its own is not an integration. What turns "here is my Supabase
 * anon key" into a working ticket-booking app is knowing which fields that
 * provider needs, which of them may reach the browser, which npm package talks
 * to it, and what correct usage looks like - so each provider carries all four.
 *
 * The publishable/secret split is the load-bearing part. A generated app runs
 * in a sandbox anyone with the link can read, so a publishable credential can
 * be handed to it directly and a secret can only ever be used server-side,
 * through /api/proxy. Getting that wrong leaks a key, so it is a property of
 * the field rather than a judgement made at generation time.
 */

export type Field = {
  name: string;
  label: string;
  visibility: "publishable" | "secret";
  required: boolean;
  placeholder: string;
  help: string;
};

export type Provider = {
  slug: string;
  label: string;
  blurb: string;
  fields: Field[];
  /** npm packages the generated app needs, with versions. */
  dependencies: Record<string, string>;
  /** Written into the build prompt when this connection is present. */
  usage: (values: Record<string, string>) => string;
};

export const PROVIDERS: Provider[] = [
  {
    slug: "supabase",
    label: "Supabase",
    blurb: "Postgres database, auth, and storage. Works directly from the browser.",
    fields: [
      {
        name: "NEXT_PUBLIC_SUPABASE_URL",
        label: "Project URL",
        visibility: "publishable",
        required: true,
        placeholder: "https://abcdefgh.supabase.co",
        help: "Project Settings → API → Project URL",
      },
      {
        name: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
        label: "Anon / publishable key",
        visibility: "publishable",
        required: true,
        placeholder: "eyJ… or sb_publishable_…",
        help: "Project Settings → API. Designed to be public; your Row Level Security policies are what protect the data.",
      },
      {
        name: "SUPABASE_SERVICE_ROLE_KEY",
        label: "Service role key (optional)",
        visibility: "secret",
        required: false,
        placeholder: "eyJ…",
        help: "Bypasses every RLS policy. Only ever used server-side, never sent to the generated app.",
      },
    ],
    dependencies: { "@supabase/supabase-js": "^2.116.0" },
    usage: (v) => `SUPABASE IS CONNECTED - use it for real, do not fake persistence.

Create the client once, in its own file, and import it everywhere:

\`\`\`tsx file=/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "${v.NEXT_PUBLIC_SUPABASE_URL ?? ""}",
  "${v.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""}",
);
\`\`\`

Emit that file exactly as written, with the values inlined. There is no
process.env in this sandbox, so reading the keys from it would give undefined.
These two are publishable by design - Row Level Security is what protects the
data, not secrecy of the anon key.

DATA:
- Read with \`await supabase.from("table").select("*")\`, and handle { data, error }
  every time. An error branch that silently renders an empty list is a bug.
- Write with .insert(), .update(), .delete(). Refresh local state from the
  response rather than guessing what the row became.
- Real loading, empty and error states. This is a network call, not useState.

AUTH, when the app needs accounts:
- Sign up and in with supabase.auth.signUp / signInWithPassword.
- Read the session with supabase.auth.getSession() on mount, and subscribe with
  supabase.auth.onAuthStateChange - unsubscribe in the effect's cleanup.
- Gate the parts of the UI that need a user, and give a real signed-out state.

THE TABLES MAY NOT EXIST YET. Do not assume a schema. Put the SQL you need in a
file the user can run, and have the UI show the error rather than a blank page
when a table is missing:

\`\`\`sql file=/schema.sql
-- Run this in the Supabase SQL editor.
create table if not exists ...
alter table ... enable row level security;
create policy ...
\`\`\`

Always enable RLS and write a policy. A table without one is readable and
writable by anyone holding the anon key, which is everyone.`,
  },
  {
    slug: "stripe",
    label: "Stripe",
    blurb: "Payments. Checkout links work from the browser; charges do not.",
    fields: [
      {
        name: "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
        label: "Publishable key",
        visibility: "publishable",
        required: true,
        placeholder: "pk_live_… or pk_test_…",
        help: "Developers → API keys. Safe in browser code.",
      },
      {
        name: "STRIPE_SECRET_KEY",
        label: "Secret key",
        visibility: "secret",
        required: false,
        placeholder: "sk_live_… or sk_test_…",
        help: "Never reaches the generated app. Used only through the server proxy.",
      },
    ],
    dependencies: { "@stripe/stripe-js": "^4.10.0" },
    usage: (v) => `STRIPE IS CONNECTED (publishable key only).

Use "${v.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""}" with @stripe/stripe-js for
Checkout redirects and Elements. Creating a charge, a session or a customer
needs the secret key and therefore a server, which this sandbox does not have -
so build the UI up to the redirect and stop there rather than pretending.`,
  },
  {
    slug: "vercel",
    label: "Vercel",
    blurb: "Publish a finished project to your own Vercel account.",
    fields: [
      {
        name: "VERCEL_TOKEN",
        label: "Access token",
        visibility: "secret",
        required: true,
        placeholder: "vercel_…",
        help: "vercel.com/account/tokens. Used only to publish, on your account, never sent to the generated app.",
      },
      {
        name: "VERCEL_TEAM_ID",
        label: "Team ID (optional)",
        visibility: "secret",
        required: false,
        placeholder: "team_…",
        help: "Only if you publish into a team rather than your personal account.",
      },
    ],
    dependencies: {},
    // Publishing is done by this app, not by the generated one, so the model
    // is never told about it - there is nothing for it to write.
    usage: () => "",
  },
  {
    slug: "openweather",
    label: "OpenWeather",
    blurb: "Weather data by city or coordinates.",
    fields: [
      {
        name: "OPENWEATHER_API_KEY",
        label: "API key",
        visibility: "secret",
        required: true,
        placeholder: "32 hex characters",
        help: "Routed through the server proxy, so it stays out of the generated code.",
      },
    ],
    dependencies: {},
    usage: () => `OPENWEATHER IS CONNECTED through the proxy. Call it with fetch at
the proxy URL listed in the live APIs section - never put the key in your code,
there is none to put.`,
  },
];

export function getProvider(slug: string): Provider | undefined {
  return PROVIDERS.find((p) => p.slug === slug);
}

export function fieldOf(slug: string, name: string): Field | undefined {
  return getProvider(slug)?.fields.find((f) => f.name === name);
}
