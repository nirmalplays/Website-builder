# Self-hosting

Every part of this app can run on your own hardware. The only piece that is not
inherently self-hostable is the language model, and the provider layer exists so
you can swap in one that is.

| Piece | Self-hostable | How |
| --- | --- | --- |
| App (Next.js) | Yes | `Dockerfile`, standalone output |
| Database | Yes | Postgres in `docker-compose.yml` |
| Auth | Yes | Supabase is open source, or drop auth entirely |
| Model | Yes, with a swap | Ollama / vLLM / llama.cpp via `AI_PROVIDER=openai-compatible` |
| Preview sandbox | Yes | Self-hosted `sandpack-bundler` via `NEXT_PUBLIC_SANDPACK_BUNDLER_URL` |
| Template thumbnails | Yes | Playwright, generated at build time, served as static files |

## Quick start

```bash
cp .env.example .env
# edit .env, then:
docker compose up -d --build
docker compose exec app node scripts/migrate.mjs
```

App on http://localhost:3000.

## Running with no external services at all

```bash
docker compose --profile local-model --profile local-bundler up -d --build
docker compose exec ollama ollama pull qwen2.5-coder:32b
```

Then in `.env`:

```env
AI_PROVIDER=openai-compatible
AI_BASE_URL=http://ollama:11434/v1
AI_MODELS=qwen2.5-coder:32b
NEXT_PUBLIC_SANDPACK_BUNDLER_URL=http://localhost:8080
GLOBAL_DAILY_CAP=0
```

At that point nothing leaves your network except the Tailwind CDN and Unsplash
images used inside generated previews. To close those too, self-host a Tailwind
build and tell the system prompt to stop using Unsplash URLs.

## Deploying to a VPS

Any box with Docker and ~2GB RAM (more if you run a local model). Tested shape:

```bash
# on the VPS
git clone <your repo> && cd <repo>
cp .env.example .env && nano .env        # set POSTGRES_PASSWORD, DOMAIN, provider keys
DOMAIN=ui.example.com docker compose --profile public up -d --build
docker compose exec app node scripts/migrate.mjs
```

Point an A record at the VPS before starting: Caddy requests the TLS
certificate on boot and renews it, so there is no certbot step. Port 80 and 443
must be open; 3000 does not need to be exposed publicly once Caddy fronts it.

Updating later:

```bash
git pull && docker compose --profile public up -d --build
```

If you add or change templates, re-bake and re-shoot them before building, since
both are generated artefacts committed to the repo:

```bash
node scripts/bake-templates.mjs && node scripts/build-template-index.mjs
node scripts/thumbnails.mjs
```

Sizing: the app idles at roughly 150MB. Generation is I/O-bound when using a
hosted model, so a 1-2 vCPU box is enough. A local 32B model is a different
question entirely - that wants a GPU with 24GB+ of VRAM.

## Choosing a local model

The system prompt is demanding: one file, a strict output contract, working
event handlers. Small models struggle with it. From weakest to best:

| Model | Notes |
| --- | --- |
| `qwen2.5-coder:7b` | Runs on 8GB VRAM. Frequently breaks the output contract. |
| `qwen2.5-coder:32b` | ~24GB VRAM. The practical minimum for usable results. |
| `deepseek-coder-v2:16b` | Good code, weaker at visual design. |
| Hosted gateway (OpenRouter etc.) | Same `openai-compatible` provider, no local GPU. |

Expect slower generations than Gemini Flash Lite's ~6s. `AI_TIMEOUT_MS`
(default 180000) is there because local models on modest hardware are slow.

The repair passes matter more with weaker models: malformed output triggers one
retry, missing icon imports are fixed deterministically, and dead controls
trigger an interactivity repair. That machinery is what makes a mid-sized local
model viable at all.

## Adding another provider

Implement the `Provider` interface in `lib/providers/types.ts`, register it in
`lib/providers/index.ts`, and select it with `AI_PROVIDER`. Nothing else in the
app knows which vendor is in use.

## Without Docker

```bash
npm ci
npm run build
DATABASE_URL=... GEMINI_API_KEY=... npm start
```

Postgres is optional. Without `DATABASE_URL` the app still generates - it just
saves nothing and enforces no limits.
