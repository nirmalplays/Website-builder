# ui/gen

Describe an interface, get a working React app you can keep editing by chatting.

It plans before it writes, pulls in animated components where they earn their
place, runs the result in a real browser, fixes what it finds, and shows you
what the whole thing cost in tokens while it happens.

**Live:** https://website-builder-two-mu.vercel.app

---

## What makes it different from a prompt box

**It plans first.** A separate reasoning pass decides what is being built, what
the sections are, which files exist and what the design direction is — before a
line of JSX. The build step executes that plan rather than improvising.

**It knows the industry.** The prompt is matched against 192 product categories,
and the planner receives a palette, a page pattern and the pitfalls specific to
that category. A cinema booking app arrives with a dark ground and a
spotlight-gold accent instead of whatever the model reaches for by default.
Below a confidence threshold nothing is injected — a florist handed the fintech
palette is a confident wrong answer.

**It has real typefaces.** 23 families load into the preview. Tailwind's default
is the system UI stack, which is most of what "AI-generated" looks like.

**It uses animated components.** 205 [React Bits](https://reactbits.dev)
components are catalogued by role; the planner picks what fits and the installer
fetches the real source into the project — one ambient backdrop behind the hero,
kinetic text on the headline, pointer-reactive cards for features.

**It checks its own work.** Every build is bundled with esbuild and mounted in
headless Chromium. Compile errors, crashes on mount and dead controls are fed
back to the model and repaired, up to a time budget.

**It edits instead of rebuilding.** A follow-up turn gets a different contract:
return only the files that changed, keep the existing palette and structure, and
treat an unrequested improvement as a regression.

---

## Quick start

```bash
git clone https://github.com/nirmalplays/Website-builder.git
cd Website-builder
npm install
cp .env.example .env.local     # add at minimum GEMINI_API_KEY
npm run dev
```

Open http://localhost:3000. Everything except the model is optional — with no
database it still generates, it just does not remember.

Running locally is genuinely better than the hosted version in two ways: there
is no function timeout, and Chromium exists, so the browser-verification loop
actually runs.

---

## Configuration

`.env.example` documents every variable. The ones that matter:

| Variable | Purpose |
| --- | --- |
| `GEMINI_API_KEY` | Required. Google AI Studio. |
| `AI_PROVIDER` | Pin to one provider. Unset uses every configured one as fallback capacity. |
| `DATABASE_URL` | Postgres. Without it nothing is saved and limits are not enforced. |
| `CONNECTION_SECRET` | Encrypts user-supplied API keys. Required before the app accepts any. |
| `DAILY_SPEND_CAP_USD` | Hard stop per UTC day. `0` disables. |
| `NEXT_PUBLIC_SUPABASE_URL` / `_ANON_KEY` | Optional auth. Without them the app runs anonymously. |

**On Supabase:** use the *pooler* host, not `db.<ref>.supabase.co`. The direct
host is IPv6-only and unreachable from most serverless platforms, and because
persistence is fail-soft the failure is silent — saved projects and rate limits
just quietly stop working. `SUPABASE_POOLER_HOST` rewrites the connection string
onto Supavisor.

```bash
npm run db:migrate   # create the schema
npm run db:check     # prove the connection and show what is stored
npm run check        # verify the model key works
```

---

## Integrations

Users paste their own API keys at `/settings`; the app wires them into what it
generates. Values are encrypted with AES-256-GCM and never readable back through
the API.

The split that makes this safe: **publishable** credentials go into the
generated app, **secrets** never leave the server.

A Supabase anon key is *designed* for browser code — Row Level Security protects
the data, not secrecy of the key — so it is inlined and the generated app does
real auth and real queries with no backend of its own. A service-role or Stripe
secret key is reached through `/api/proxy`, which attaches it server-side,
because anyone with a preview link can read the app's source. Visibility is a
property of the field, not a decision made at generation time.

Supported: **Supabase** (database + auth), **Stripe** (publishable only),
**Vercel** (publishing), **OpenWeather**.

---

## Publishing

The **Publish** button deploys to the user's own Vercel account, using a token
they save in Settings. It ships the already-verified bundle as two static files
rather than sources plus a build step — nothing to install, and no build that
can fail after the user was told it worked. A project that does not compile is
refused with the compile error instead of published as a blank page.

---

## Cost tracking

`/usage` shows real token counts and spend. Counts come from the provider's own
`usageMetadata`, never estimated from character counts, and the same numbers
stream live during a build.

Thinking tokens count as output, because that is how they are billed and because
they are usually the larger half — one measured Pro call spent 75 visible output
tokens against 1,065 thought.

---

## Architecture

```
prompt
  │
  ├─ plan            industry brief + art direction → structure, palette, files
  ├─ components      React Bits selected by role, source fetched into the project
  ├─ build           one fenced block per file, /App.tsx first
  ├─ missing files   write what was imported but never emitted
  ├─ wiring          give dead controls something to do
  ├─ verify          esbuild, then mount in headless Chromium
  ├─ repair          feed findings back, up to the time budget
  └─ stub            fake any module still missing, so the preview is never blank
```

Every model call is bounded by the time actually remaining, so no single call
can outlive the request and lose a finished build. Optional passes are started
only if the measured cost of the last call still fits the budget, ranked by what
the user loses: missing files first (a dangling import is a blank screen), then
compile fixes, then interactivity.

| Path | What lives there |
| --- | --- |
| `lib/providers/` | Model abstraction, cross-provider fallback, per-call timeouts |
| `lib/skills/` | Art direction, typography, React Bits manifest, industry briefs |
| `lib/react-bits/` | Component catalogue (metadata only) and installer |
| `lib/verify/` | esbuild bundling and headless browser checks |
| `lib/connections/` | Encrypted user credentials and provider wiring |
| `lib/publish/` | Static site build and Vercel deployment |
| `lib/pricing.ts`, `lib/spend.ts` | Token cost and spend caps |

---

## Licensing

This project is MIT.

**React Bits** is MIT + Commons Clause, which forbids redistributing the
components. `lib/react-bits/registry.json` therefore holds metadata only; source
is fetched from the official registry at generation time and delivered inside
the user's own app, which the licence permits.

**[ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)** is
MIT, so its palette, product and typography catalogues are vendored in
`lib/skills/uiuxData.generated.ts`. Regenerate with
`node scripts/build-uiux-data.mjs`.

---

## Self-hosting

See [SELF-HOSTING.md](SELF-HOSTING.md). Every part runs on your own hardware —
app, database, auth, preview sandbox — and the model swaps out via
`AI_PROVIDER=openai-compatible` for Ollama, vLLM or llama.cpp.

---

## Known limits

- **Serverless has no Chromium.** On Vercel the browser-verification loop is
  skipped and builds get the compile check only. The build says so rather than
  claiming it looked.
- **Function timeout.** Hobby caps at 300s; builds run 80–210s. Locally there is
  no cap.
- **Output tokens.** A very large prompt can exceed the model's output limit. The
  entry point is written first so truncation costs a trailing section rather than
  the whole build, and anything still missing is stubbed.
- **Generated apps have no server.** They are real React apps in a browser
  sandbox, so backends mean Supabase from the browser or the proxy — not route
  handlers of their own.
