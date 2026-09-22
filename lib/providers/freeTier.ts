import { createOpenAIStyleProvider } from "./openaiStyle";
import type { Provider } from "./types";

/**
 * Free-tier vendors from https://github.com/mnfst/awesome-free-llm-apis,
 * wired in as extra fallback capacity for generateWithFallback (see
 * ./fallback.ts) - when one model is busy or out of its daily quota, the
 * build keeps going on the next one instead of failing.
 *
 * MODEL IDS COME FROM THE VENDOR, NOT THE README. Where a vendor publishes a
 * public /models endpoint, every id below was checked against it on
 * 2026-09-22 (that check caught 11 ids from the README that no longer
 * exist). Where it doesn't, ids are the README's and are marked unverified.
 * Re-run the check with a script like:
 *   curl -s https://openrouter.ai/api/v1/models | jq '.data[].id'
 *
 * These lists are deliberately CURATED, not exhaustive. The catalogues
 * contain speech, embedding, safety-classifier and domain-tuned models
 * (whisper, nvr-tts-*, embed-qa-4, *-guard, ling-3.0-flash-sante); putting
 * those in a code-generation fallback chain just burns a round trip each to
 * return something unusable. What's here is the subset that can plausibly
 * write a multi-file React app, best first.
 */
export const FREE_TIER_PROVIDERS: Provider[] = [
  createOpenAIStyleProvider({
    id: "groq",
    label: "Groq",
    baseUrl: "https://api.groq.com/openai/v1",
    apiKeyEnv: "GROQ_API_KEY",
    // Unverified: Groq's /models needs a key, so these are the README's ids.
    models: [
      { id: "openai/gpt-oss-120b", label: "GPT-OSS 120B (Groq)", note: "30 RPM, 1,000 RPD" },
      { id: "openai/gpt-oss-20b", label: "GPT-OSS 20B (Groq)", note: "30 RPM, 1,000 RPD" },
      { id: "qwen/qwen3.6-27b", label: "Qwen 3.6 27B (Groq)", note: "30 RPM, 1,000 RPD" },
      { id: "groq/compound", label: "Compound (Groq)", note: "30 RPM, 250 RPD" },
      { id: "groq/compound-mini", label: "Compound Mini (Groq)", note: "30 RPM, 250 RPD" },
    ],
  }),

  createOpenAIStyleProvider({
    id: "openrouter",
    label: "OpenRouter",
    baseUrl: "https://openrouter.ai/api/v1",
    apiKeyEnv: "OPENROUTER_API_KEY",
    // Verified against https://openrouter.ai/api/v1/models on 2026-09-22.
    models: [
      { id: "nvidia/nemotron-3-ultra-550b-a55b:free", label: "Nemotron 3 Ultra 550B (OpenRouter)", note: "20 RPM, 50 RPD" },
      { id: "nvidia/nemotron-3-super-120b-a12b:free", label: "Nemotron 3 Super 120B (OpenRouter)", note: "20 RPM, 50 RPD" },
      { id: "z-ai/glm-5.2:free", label: "GLM 5.2 (OpenRouter)", note: "20 RPM, 50 RPD" },
      { id: "qwen/qwen3.8-27b:free", label: "Qwen 3.8 27B (OpenRouter)", note: "20 RPM, 50 RPD" },
      { id: "thinkingmachines/inkling:free", label: "Inkling (OpenRouter)", note: "20 RPM, 50 RPD" },
      { id: "poolside/laguna-s-2.1:free", label: "Laguna S 2.1 (OpenRouter)", note: "20 RPM, 50 RPD, code" },
      { id: "cohere/north-mini-code:free", label: "North Mini Code (OpenRouter)", note: "20 RPM, 50 RPD, code" },
      { id: "google/gemma-4-31b-it:free", label: "Gemma 4 31B (OpenRouter)", note: "20 RPM, 50 RPD" },
      { id: "google/gemma-4-26b-a4b-it:free", label: "Gemma 4 26B (OpenRouter)", note: "20 RPM, 50 RPD" },
      { id: "nvidia/nemotron-3.5-lightning:free", label: "Nemotron 3.5 Lightning (OpenRouter)", note: "20 RPM, 50 RPD" },
      { id: "nex-agi/nex-n2.5-pro:free", label: "Nex N2.5 Pro (OpenRouter)", note: "20 RPM, 50 RPD" },
      { id: "dots-studio/dots-3-note-preview:free", label: "Dots 3 Note (OpenRouter)", note: "20 RPM, 50 RPD" },
    ],
  }),

  createOpenAIStyleProvider({
    id: "mistral",
    label: "Mistral AI",
    baseUrl: "https://api.mistral.ai/v1",
    apiKeyEnv: "MISTRAL_API_KEY",
    // Verified against https://api.mistral.ai/v1/models on 2026-09-22 (the
    // README's "Mistral Large 3" is not in the catalogue at all). Kept to the
    // models whose own capability flags report reasoning:true - that dropped
    // codestral, mistral-code and both ministral tiers, which report false.
    models: [
      { id: "mistral-medium-latest", label: "Mistral Medium (Mistral)", note: "reasoning · 262K ctx", supportsImage: true },
      { id: "magistral-medium-latest", label: "Magistral Medium (Mistral)", note: "reasoning · 262K ctx", supportsImage: true },
      { id: "mistral-small-latest", label: "Mistral Small (Mistral)", note: "reasoning · 262K ctx", supportsImage: true },
      { id: "magistral-small-latest", label: "Magistral Small (Mistral)", note: "reasoning · 262K ctx", supportsImage: true },
    ],
  }),

  createOpenAIStyleProvider({
    id: "huggingface",
    label: "Hugging Face",
    baseUrl: "https://router.huggingface.co/v1",
    apiKeyEnv: "HF_TOKEN",
    // Verified against https://router.huggingface.co/v1/models on 2026-09-22.
    models: [
      { id: "deepseek-ai/DeepSeek-V4-Pro", label: "DeepSeek V4 Pro (HF)", note: "credit-metered" },
      { id: "moonshotai/Kimi-K3", label: "Kimi K3 (HF)", note: "credit-metered" },
      { id: "zai-org/GLM-5.3", label: "GLM 5.3 (HF)", note: "credit-metered" },
      { id: "Qwen/Qwen3-Coder-Next", label: "Qwen3 Coder Next (HF)", note: "credit-metered, code" },
      { id: "moonshotai/Kimi-K2.7-Code", label: "Kimi K2.7 Code (HF)", note: "credit-metered, code" },
      { id: "deepseek-ai/DeepSeek-V4.1-Flash", label: "DeepSeek V4.1 Flash (HF)", note: "credit-metered" },
      { id: "Qwen/Qwen3.8-27B", label: "Qwen 3.8 27B (HF)", note: "credit-metered" },
      { id: "zai-org/GLM-5.3-Flash", label: "GLM 5.3 Flash (HF)", note: "credit-metered" },
      { id: "openai/gpt-oss-120b", label: "GPT-OSS 120B (HF)", note: "reasoning · credit-metered" },
    ],
  }),

  createOpenAIStyleProvider({
    id: "nvidianim",
    label: "NVIDIA NIM",
    baseUrl: "https://integrate.api.nvidia.com/v1",
    apiKeyEnv: "NVIDIA_API_KEY",
    // Verified against https://integrate.api.nvidia.com/v1/models on 2026-09-22.
    // NVIDIA publishes no reasoning flag, so this is the reasoning-model
    // families only: Nemotron 3 (OpenRouter confirms the family reasons),
    // Kimi K2.6/K3, DeepSeek V4, Gemma 4 and gpt-oss. Dropped the instruct-only
    // generations - mistral-large-2, llama-3.1-nemotron-70b, nemotron-4-340b,
    // mistral-nemotron - and codestral-22b, which Mistral's own API reports
    // as reasoning:false.
    models: [
      { id: "nvidia/nemotron-3-ultra-550b-a55b", label: "Nemotron 3 Ultra 550B (NVIDIA)", note: "reasoning · 10,000 RPD" },
      { id: "nvidia/nemotron-3-super-120b-a12b", label: "Nemotron 3 Super 120B (NVIDIA)", note: "reasoning · 10,000 RPD" },
      { id: "moonshotai/kimi-k3", label: "Kimi K3 (NVIDIA)", note: "reasoning · 10,000 RPD" },
      { id: "deepseek-ai/deepseek-v4.1-flash", label: "DeepSeek V4.1 Flash (NVIDIA)", note: "reasoning · 10,000 RPD" },
      { id: "moonshotai/kimi-k2.6", label: "Kimi K2.6 (NVIDIA)", note: "reasoning · 10,000 RPD" },
      { id: "google/gemma-4-31b-it", label: "Gemma 4 31B (NVIDIA)", note: "reasoning · 10,000 RPD" },
      { id: "openai/gpt-oss-20b", label: "GPT-OSS 20B (NVIDIA)", note: "reasoning · 10,000 RPD" },
    ],
  }),

  createOpenAIStyleProvider({
    id: "ollamacloud",
    label: "Ollama Cloud",
    baseUrl: "https://ollama.com/v1",
    apiKeyEnv: "OLLAMA_API_KEY",
    // Unverified: Ollama's cloud catalogue needs a key. Mistral Large 3 was
    // dropped with the rest of the non-reasoning Mistral line.
    models: [
      { id: "qwen3.5:397b", label: "Qwen 3.5 397B (Ollama)", note: "reasoning · session limits" },
      { id: "gpt-oss:120b", label: "GPT-OSS 120B (Ollama)", note: "reasoning · session limits" },
      { id: "gpt-oss:20b", label: "GPT-OSS 20B (Ollama)", note: "reasoning · session limits" },
    ],
  }),

  createOpenAIStyleProvider({
    id: "aionlabs",
    label: "Aion Labs",
    baseUrl: "https://api.aionlabs.ai/v1",
    apiKeyEnv: "AIONLABS_API_KEY",
    // Unverified: Aion's /models needs a key.
    models: [
      { id: "aion-labs/aion-3.0", label: "Aion 3.0 (Aion Labs)", note: "15 RPM, 20K tokens/day" },
      { id: "aion-labs/aion-3.0-mini", label: "Aion 3.0 Mini (Aion Labs)", note: "15 RPM, 20K tokens/day" },
      { id: "aion-labs/aion-2.0", label: "Aion 2.0 (Aion Labs)", note: "15 RPM, 20K tokens/day" },
    ],
  }),

  createOpenAIStyleProvider({
    id: "modelscope",
    label: "ModelScope",
    baseUrl: "https://api-inference.modelscope.cn/v1",
    apiKeyEnv: "MODELSCOPE_API_KEY",
    // Unverified: needs an Alibaba-bound account to read the catalogue.
    models: [
      { id: "Qwen/Qwen3.5-35B-A3B", label: "Qwen 3.5 35B (ModelScope)", note: "2,000 RPD total" },
      { id: "Qwen/Qwen3.5-27B", label: "Qwen 3.5 27B (ModelScope)", note: "2,000 RPD total" },
    ],
  }),

  createOpenAIStyleProvider({
    id: "siliconflow",
    label: "SiliconFlow",
    baseUrl: "https://api.siliconflow.cn/v1",
    apiKeyEnv: "SILICONFLOW_API_KEY",
    // Unverified: needs identity verification to read the catalogue.
    models: [
      { id: "Qwen/Qwen3-8B", label: "Qwen 3 8B (SiliconFlow)", note: "1,000 RPM, 50,000 TPM" },
    ],
  }),

  // ---- Keyless: usable the moment the app starts, no .env entry needed. ----

  createOpenAIStyleProvider({
    id: "kilocode",
    label: "Kilo Code",
    baseUrl: "https://api.kilo.ai/api/gateway",
    // No key at all. Verified live (a real generation ran through it).
    models: [
      { id: "nvidia/nemotron-3-ultra-550b-a55b:free", label: "Nemotron 3 Ultra 550B (Kilo)", note: "200 req/hr, keyless" },
      { id: "nvidia/nemotron-3-super-120b-a12b:free", label: "Nemotron 3 Super 120B (Kilo)", note: "200 req/hr, keyless" },
      { id: "z-ai/glm-5.2:free", label: "GLM 5.2 (Kilo)", note: "200 req/hr, keyless" },
      { id: "qwen/qwen3.8-27b:free", label: "Qwen 3.8 27B (Kilo)", note: "200 req/hr, keyless" },
      { id: "poolside/laguna-s-2.1:free", label: "Laguna S 2.1 (Kilo)", note: "200 req/hr, keyless, code" },
      { id: "cohere/north-mini-code:free", label: "North Mini Code (Kilo)", note: "200 req/hr, keyless, code" },
      { id: "nvidia/nemotron-3.5-lightning:free", label: "Nemotron 3.5 Lightning (Kilo)", note: "200 req/hr, keyless" },
      { id: "nex-agi/nex-n2.5-pro:free", label: "Nex N2.5 Pro (Kilo)", note: "200 req/hr, keyless" },
      { id: "stepfun/step-3.7-flash:free", label: "Step 3.7 Flash (Kilo)", note: "200 req/hr, keyless" },
      { id: "dots-studio/dots-3-note-preview:free", label: "Dots 3 Note (Kilo)", note: "200 req/hr, keyless" },
    ],
  }),

  createOpenAIStyleProvider({
    id: "ovhcloud",
    label: "OVHcloud AI Endpoints",
    baseUrl: "https://oai.endpoints.kepler.ai.cloud.ovh.net/v1",
    // Anonymous tier needs no key (2 RPM per IP); a key raises the limit.
    apiKeyEnv: "OVH_API_KEY",
    requiresKey: false,
    // Verified against the endpoint's own /models on 2026-09-22 - this is
    // why it's here at all: the README only gave display names.
    models: [
      { id: "Qwen3.5-397B-A17B", label: "Qwen 3.5 397B (OVH)", note: "2 RPM anonymous, keyless" },
      { id: "Qwen3.8-27B", label: "Qwen 3.8 27B (OVH)", note: "2 RPM anonymous, keyless" },
      { id: "gpt-oss-120b", label: "GPT-OSS 120B (OVH)", note: "2 RPM anonymous, keyless" },
      { id: "Qwen3.6-27B", label: "Qwen 3.6 27B (OVH)", note: "reasoning · 2 RPM anonymous, keyless" },
      { id: "gpt-oss-20b", label: "GPT-OSS 20B (OVH)", note: "reasoning · 2 RPM anonymous, keyless" },
      { id: "Qwen3.5-9B", label: "Qwen 3.5 9B (OVH)", note: "2 RPM anonymous, keyless" },
    ],
  }),

  createOpenAIStyleProvider({
    id: "llm7",
    label: "LLM7.io",
    baseUrl: "https://api.llm7.io/v1",
    apiKeyEnv: "LLM7_API_KEY",
    requiresKey: false,
    // Verified against https://api.llm7.io/v1/models on 2026-09-22: the
    // turbo-tier, non-usage-based models are the ones anonymous access
    // reaches, filtered to those whose catalogue entry reports reasoning:true
    // (that dropped codestral-latest and mistral-Nemo, which report false).
    // LLM7 rotates its catalogue faster than most - re-check on a 400.
    models: [
      { id: "GLM-5.3-Flash", label: "GLM 5.3 Flash (LLM7)", note: "reasoning · 10 RPM anonymous, keyless" },
      { id: "minimax-m2.7", label: "MiniMax M2.7 (LLM7)", note: "reasoning · 10 RPM anonymous, keyless" },
    ],
  }),
];

/**
 * Still not wired, and why:
 *
 * - Cohere:   v2 API is not the OpenAI chat-completions shape - needs its
 *             own adapter, not just a base URL.
 * - Cloudflare Workers AI: URL needs your account id path-templated in and
 *             isn't a plain POST {baseUrl}/chat/completions.
 * - Z AI:     no public /models endpoint to verify ids against, and the
 *             README gives display names ("GLM-4.7-Flash") rather than API
 *             slugs. Reachable through OpenRouter (z-ai/glm-5.2:free) and
 *             Hugging Face (zai-org/GLM-5.3) above in the meantime.
 * - Google Gemini: already wired natively in ./gemini.ts, which supports
 *             images, PDFs and thinking budget that this generic adapter
 *             does not.
 */
