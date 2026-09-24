<div align="center">

# ui/gen

### Describe an app. Get one that actually works.

Not a screenshot. Not a mockup. A real React application you can run, edit by
chatting, connect to your database, and publish — in about two minutes.

**[Try it →](https://website-builder-two-mu.vercel.app)**

</div>

---

## The problem with AI website builders

They all produce the same page.

A centred hero. A purple-to-blue gradient heading. Three equal cards in a row.
The system font. Buttons that do nothing. Ask for a booking app and you get a
picture of a booking app — no database, no accounts, nothing that survives a
refresh.

ui/gen was built against that, specifically.

---

## What you get

### Designs that don't look generated

The generator is given an art direction brief before it writes a line of code,
with a list of clichés it is forbidden to produce — no gradient headings, no
three-card grids, no identical section padding, no placeholder copy.

Then it is told what your industry actually looks like. Your prompt is matched
against **192 product categories**, each with a researched palette, page pattern
and set of pitfalls. Ask for a cinema booking app and it arrives with a dark
ground and a spotlight-gold accent — not whatever the model reaches for by
default.

**23 typefaces** load into every preview, deliberately excluding the five fonts
every AI page already uses. Most "AI-generated" design is just the system font
and nothing chosen.

### Motion that came from a real library

**205 [React Bits](https://reactbits.dev) components** — animated backdrops,
kinetic text, pointer-reactive cards — catalogued by what they are *for*. The
planner picks what fits and the real source is installed into your project: one
ambient backdrop behind the hero, one kinetic headline, interactive surfaces for
features. Not scattered everywhere, which reads as a demo rather than a product.

### It checks its own work

Every build is compiled and mounted in a real headless browser. Compile errors,
crashes on mount and buttons wired to nothing are found and repaired before you
see the result — and if something can't be fixed, it says so plainly instead of
handing you a blank page and calling it done.

### Conversation, not regeneration

Say *"make it dark and add testimonials"* and it changes those things. Measured
on a real build: **4 files untouched, 6 modified, 1 added, 0 deleted.** Your
palette, structure and components survive. Follow-up edits are faster than the
first build because there is nothing to re-plan.

### Real backends, not fake ones

Paste your **Supabase** keys and generated apps get genuine authentication and
genuine database queries — real signups, real rows, real persistence. It even
writes the SQL schema with Row Level Security policies for you to run.

Keys are encrypted at rest and split by what is safe to expose: publishable keys
go into the app, secrets never leave the server and are reached through a proxy.
Also supports **Stripe** and **OpenWeather**, and any REST API you register.

### Publish in one click

Hit **Publish** and it deploys to your own Vercel account — your project, your
domain, your billing. A build that doesn't compile is refused with the error
rather than published broken.

### You can see exactly what it costs

A live counter during every build — `11,584 in · 2,635 out · $0.0548` — and a
dashboard with per-model breakdowns and history.

These are the provider's own token counts, including thinking tokens, which are
usually the larger half and which most tools quietly omit. Set a daily spend cap
and generation stops when it's hit.

---

## How it works

```
your prompt
   ↓
 PLAN        industry brief + art direction → structure, palette, files
 COMPONENTS  animated components chosen by role, real source installed
 BUILD       a complete multi-file React project
 REPAIR      write what's missing, wire what's dead
 VERIFY      compile, then run it in a real browser
 FIX         feed the findings back and try again
   ↓
 a working app
```

Typical build: **80–210 seconds.** Slower than tools that answer instantly, and
that is the point — it plans, builds, then checks.

---

## Run it yourself

```bash
git clone https://github.com/nirmalplays/Website-builder.git
cd Website-builder
npm install
cp .env.example .env.local     # add GEMINI_API_KEY
npm run dev
```

One API key is the only requirement. Everything else — database, auth,
integrations, publishing — is optional and can be added later.

Running locally is *better* than hosted in two ways: no function timeout, and
the browser-verification loop actually runs.

### Deploy it

Works on Vercel out of the box. See **[SELF-HOSTING.md](SELF-HOSTING.md)** to run
every part on your own hardware — app, Postgres, auth, preview sandbox — with a
local model via Ollama, vLLM or llama.cpp instead of a hosted API.

---

## Configuration

| Variable | Purpose |
| --- | --- |
| `GEMINI_API_KEY` | Required. |
| `DATABASE_URL` | Saves projects and enforces limits. Optional. |
| `CONNECTION_SECRET` | Encrypts user API keys. Required before any are accepted. |
| `DAILY_SPEND_CAP_USD` | Hard stop per day. `0` disables. |
| `AI_PROVIDER` | Pin one model provider, or leave unset for automatic fallback. |

Full reference in `.env.example`.

**Using Supabase?** Use the *pooler* host, not `db.<ref>.supabase.co` — the
direct host is IPv6-only and unreachable from serverless platforms. Because
persistence fails soft, the symptom is silent: saved projects just stop working.
Set `SUPABASE_POOLER_HOST` and it is rewritten for you.

---

## Honest limits

No product page should hide these.

- **Serverless has no Chromium.** Deployed on Vercel, builds get the compile
  check but not the browser pass. The build tells you which it did.
- **Function timeouts.** Vercel Hobby caps at 300s. Builds run 80–210s, so it
  fits, but with less headroom than running locally.
- **Very large prompts can exceed the model's output limit.** The entry point is
  written first so truncation costs a section rather than the whole app, and
  anything missing is stubbed with a visible marker.
- **Generated apps have no server of their own.** They are real React apps in a
  sandbox. Backends work through Supabase-from-the-browser or the API proxy —
  not route handlers inside the generated project.

---

## Licence and attribution

This project's own source is MIT.

It builds on two others, with different terms:

- **[React Bits](https://github.com/DavidHDev/react-bits)** — MIT **+ Commons
  Clause**. Component source is *not* redistributed here: the catalogue holds
  metadata only, and real source is fetched from the official registry at
  generation time into the end user's own project. Commons Clause restricts
  selling software whose value derives substantially from it; anyone
  commercialising a deployment should read those terms and take their own
  advice.
- **[ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)** —
  MIT. Its palette, product and typography catalogues are included directly.

Fonts are served from Google Fonts under their respective open licences.
