/**
 * Art directions: complete, opinionated design systems the build executes.
 *
 * Why this exists. The previous approach described good design in prose,
 * listed things to avoid, and let the model pick a palette and typeface itself.
 * Every build still converged on the same page, because a model asked to choose
 * picks the most probable choice, and the most probable page is the average of
 * every page it has seen. Adding more bans did not fix that.
 *
 * So this file makes the choices in code. Each direction fixes exact hex values,
 * a font pairing, Tailwind class strings for every level of type, button and
 * surface treatments, the layouts it may use, and how its copy should sound. The
 * model's job becomes carrying out a specific design, which models do well,
 * instead of inventing one, which is where they fall back on the average.
 *
 * Every font named here must be loaded by lib/skills/typography.ts, or the
 * page falls back to the system stack. The test in scripts/test-design.mjs
 * checks this.
 */

export type Motion = "none" | "subtle" | "ambient";

export type Palette = {
  /** Page background. */
  ground: string;
  /** Cards, panels, alternate bands. */
  surface: string;
  /** Primary text. */
  ink: string;
  /** Secondary text. Must still pass 4.5:1 against ground. */
  muted: string;
  /** Hairlines and borders. */
  line: string;
  /** The one accent. Used a handful of times per page. */
  accent: string;
  /** Text colour that sits on the accent. */
  onAccent: string;
  /** Optional band colour for one inverted or contrasting section. */
  band?: string;
  onBand?: string;
};

export type Direction = {
  id: string;
  name: string;
  /** One line the model reads first: what this looks and feels like. */
  essence: string;
  /** Subjects this direction suits. Matched against the prompt. */
  fits: string[];
  /** Style words in a prompt that pull towards this direction. */
  styleWords: string[];
  palette: Palette;
  fonts: { display: string; body: string; mono: string };
  /** Exact Tailwind class strings. The build copies these verbatim. */
  type: {
    display: string;
    h2: string;
    h3: string;
    body: string;
    lead: string;
    eyebrow: string;
    meta: string;
  };
  ui: {
    primaryButton: string;
    secondaryButton: string;
    surface: string;
    link: string;
    input: string;
  };
  /** One sentence on shape language, so new elements match. */
  shape: string;
  /** Ids from compositions.ts. The planner chooses from these only. */
  heroes: string[];
  sections: string[];
  /** Concrete moves that make this direction recognisable. */
  signature: string[];
  /** How the copy should sound, with an example line. */
  voice: string;
  imagery: string;
  motion: Motion;
};

const f = (name: string, fallback: string) => `font-['${name.replace(/ /g, "_")}',${fallback}]`;

export const DIRECTIONS: Direction[] = [
  {
    id: "editorial",
    name: "Editorial broadsheet",
    essence:
      "A serious magazine layout: paper-coloured page, a large serif headline, thin rules between sections, an asymmetric column grid and small, tight captions.",
    fits: [
      "law", "lawyer", "attorney", "firm", "blog", "magazine", "news", "journal", "publishing",
      "author", "writer", "book", "consultancy", "consulting", "think", "research", "museum",
      "architecture", "newsletter", "essay", "podcast", "history", "policy",
    ],
    styleWords: ["editorial", "classic", "serious", "literary", "newspaper", "timeless", "elegant"],
    palette: {
      ground: "#F4F1EA", surface: "#ECE7DC", ink: "#1A1814", muted: "#5F594F",
      line: "#D6CFC1", accent: "#8A2B1E", onAccent: "#F4F1EA", band: "#1A1814", onBand: "#F4F1EA",
    },
    fonts: { display: "Instrument Serif", body: "IBM Plex Sans", mono: "IBM Plex Mono" },
    type: {
      display: `${f("Instrument Serif", "serif")} text-[clamp(3.25rem,8vw,7.5rem)] leading-[0.92] tracking-[-0.02em] font-normal`,
      h2: `${f("Instrument Serif", "serif")} text-4xl md:text-6xl leading-[1] tracking-[-0.01em]`,
      h3: `${f("IBM Plex Sans", "sans-serif")} text-lg font-semibold tracking-tight`,
      body: `${f("IBM Plex Sans", "sans-serif")} text-[17px] leading-[1.65] text-[#1A1814]`,
      lead: `${f("Instrument Serif", "serif")} text-2xl md:text-3xl leading-snug italic text-[#1A1814]`,
      eyebrow: `${f("IBM Plex Mono", "monospace")} text-[11px] uppercase tracking-[0.18em] text-[#5F594F]`,
      meta: `${f("IBM Plex Mono", "monospace")} text-xs text-[#5F594F]`,
    },
    ui: {
      primaryButton:
        "inline-flex items-center gap-3 bg-[#1A1814] text-[#F4F1EA] px-6 py-3.5 text-sm font-medium hover:bg-[#8A2B1E] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8A2B1E]",
      secondaryButton:
        "inline-flex items-center gap-2 text-sm font-medium underline decoration-1 underline-offset-[6px] hover:decoration-[#8A2B1E] hover:text-[#8A2B1E]",
      surface: "border-t border-[#1A1814] pt-6",
      link: "underline decoration-[#D6CFC1] underline-offset-4 hover:decoration-[#8A2B1E]",
      input:
        "w-full bg-transparent border-0 border-b border-[#1A1814]/40 px-0 py-3 focus:border-[#8A2B1E] focus:ring-0 outline-none",
    },
    shape: "Square corners everywhere (rounded-none). Structure comes from 1px rules, never from boxes or shadows.",
    heroes: ["split-bleed", "type-wall", "index-list"],
    sections: ["numbered-rows", "sticky-split", "pull-quote", "stat-ledger", "timeline-rail", "footnote-footer"],
    signature: [
      "A full-width 1px ink rule above every section, with the section's eyebrow and number (§ 02) sitting on it",
      "Drop cap on the first paragraph of the main story block (first-letter:text-7xl first-letter:float-left first-letter:mr-3 in the display face)",
      "A running masthead bar across the top with the date or edition in mono, like a newspaper",
      "Captions under images in mono, prefixed Fig. 1, Fig. 2",
    ],
    voice:
      "Measured, specific, a little literary. Makes claims it can back with a fact. e.g. \"Forty-one years of employment law, and we still answer our own phones.\"",
    imagery: "Black-and-white or desaturated photography, cropped tight, set in hard rectangles. Never rounded.",
    motion: "none",
  },
  {
    id: "artisan",
    name: "Warm artisan",
    essence:
      "Warm and hand-made: cream paper, a soft old-style serif, terracotta and olive, rounded photos, handwritten-feeling details. Like a good bakery's menu board.",
    fits: [
      "bakery", "coffee", "cafe", "restaurant", "bistro", "food", "farm", "florist", "flowers",
      "pottery", "ceramics", "craft", "brewery", "winery", "deli", "tea", "chocolate", "kitchen",
      "catering", "market", "handmade", "candle", "soap", "pizza", "bar",
    ],
    styleWords: ["warm", "cozy", "cosy", "rustic", "organic", "homely", "handmade", "friendly"],
    palette: {
      ground: "#F6EFE3", surface: "#EDE2CF", ink: "#2B1D14", muted: "#6E5A48",
      line: "#DCCBB2", accent: "#B84A26", onAccent: "#FFF8EE", band: "#3E4A2A", onBand: "#F6EFE3",
    },
    fonts: { display: "Fraunces", body: "DM Sans", mono: "IBM Plex Mono" },
    type: {
      display: `${f("Fraunces", "serif")} text-[clamp(3rem,7.5vw,6.75rem)] leading-[0.95] tracking-[-0.03em] font-[600]`,
      h2: `${f("Fraunces", "serif")} text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em] font-[500]`,
      h3: `${f("Fraunces", "serif")} text-2xl font-[600]`,
      body: `${f("DM Sans", "sans-serif")} text-[17px] leading-relaxed text-[#2B1D14]`,
      lead: `${f("DM Sans", "sans-serif")} text-xl leading-relaxed text-[#6E5A48]`,
      eyebrow: `${f("DM Sans", "sans-serif")} text-xs font-bold uppercase tracking-[0.2em] text-[#B84A26]`,
      meta: `${f("IBM Plex Mono", "monospace")} text-xs text-[#6E5A48]`,
    },
    ui: {
      primaryButton:
        "inline-flex items-center gap-2 rounded-full bg-[#B84A26] text-[#FFF8EE] px-7 py-3.5 font-semibold hover:bg-[#9A3B1C] active:translate-y-px transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B84A26]",
      secondaryButton:
        "inline-flex items-center gap-2 rounded-full border-2 border-[#2B1D14] px-7 py-3 font-semibold hover:bg-[#2B1D14] hover:text-[#F6EFE3] transition",
      surface: "rounded-[28px] bg-[#EDE2CF] p-8",
      link: "font-semibold text-[#B84A26] hover:underline underline-offset-4",
      input:
        "w-full rounded-2xl border-2 border-[#DCCBB2] bg-[#FFF8EE] px-4 py-3 focus:border-[#B84A26] outline-none",
    },
    shape: "Generously rounded: photos rounded-[28px] or arched (rounded-t-full), buttons fully round. No sharp boxes, no hairline grids.",
    heroes: ["offset-collage", "split-bleed", "full-bleed-photo"],
    sections: ["menu-leaders", "offset-collage-band", "pull-quote", "hours-card", "bento-asym", "big-cta-band"],
    signature: [
      "One arched photo (rounded-t-full) somewhere prominent, like a shop window",
      "Menu or price list with dotted leaders between item and price (border-b border-dotted, flex-1)",
      "A small rotated circular stamp badge (rotate-[-8deg], rounded-full, border-2) with a fact like \"Baked daily since 1998\"",
      "An olive-green inverted band for the opening hours and address",
    ],
    voice:
      "Warm, concrete, sensory. Talk about the thing itself, not about \"experiences\". e.g. \"The sourdough goes in at 4am. It is usually gone by 11.\"",
    imagery: "Warm, close-up, natural-light food and hands-at-work photography. Rounded or arched crops.",
    motion: "subtle",
  },
  {
    id: "quiet-luxury",
    name: "Quiet luxury",
    essence:
      "Near-black, very sparse, a delicate high-contrast serif set large, a brass accent used three or four times on the whole page, and a lot of empty space.",
    fits: [
      "jewelry", "jewellery", "watch", "hotel", "resort", "perfume", "fragrance", "luxury", "wine",
      "fine dining", "couture", "villa", "yacht", "spa", "boutique", "atelier", "gallery", "cognac",
      "private", "concierge", "estate",
    ],
    styleWords: ["luxury", "luxurious", "premium", "exclusive", "dark", "moody", "sophisticated", "high-end", "elegant"],
    palette: {
      ground: "#0E0D0B", surface: "#171512", ink: "#EDE6DA", muted: "#A39A8B",
      line: "#2C2823", accent: "#C9A96E", onAccent: "#0E0D0B",
    },
    fonts: { display: "Cormorant Garamond", body: "Manrope", mono: "IBM Plex Mono" },
    type: {
      display: `${f("Cormorant Garamond", "serif")} text-[clamp(3.25rem,8vw,8rem)] leading-[0.9] tracking-[-0.01em] font-[400]`,
      h2: `${f("Cormorant Garamond", "serif")} text-4xl md:text-6xl leading-[1] font-[400]`,
      h3: `${f("Cormorant Garamond", "serif")} text-2xl italic`,
      body: `${f("Manrope", "sans-serif")} text-[15px] leading-[1.8] text-[#EDE6DA]/85 font-[400]`,
      lead: `${f("Cormorant Garamond", "serif")} text-2xl md:text-3xl italic leading-snug text-[#EDE6DA]`,
      eyebrow: `${f("Manrope", "sans-serif")} text-[10px] uppercase tracking-[0.35em] text-[#A39A8B]`,
      meta: `${f("Manrope", "sans-serif")} text-[11px] uppercase tracking-[0.25em] text-[#A39A8B]`,
    },
    ui: {
      primaryButton:
        "inline-flex items-center gap-4 border border-[#C9A96E] text-[#C9A96E] px-8 py-4 text-[11px] uppercase tracking-[0.3em] hover:bg-[#C9A96E] hover:text-[#0E0D0B] transition-colors duration-500 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#C9A96E]",
      secondaryButton:
        "inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-[#EDE6DA] border-b border-[#EDE6DA]/30 pb-1 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors",
      surface: "border border-[#2C2823] p-10",
      link: "text-[#C9A96E] hover:text-[#EDE6DA] transition-colors",
      input:
        "w-full bg-transparent border-0 border-b border-[#2C2823] px-0 py-3 text-[#EDE6DA] placeholder:text-[#A39A8B]/60 focus:border-[#C9A96E] focus:ring-0 outline-none",
    },
    shape: "Radius zero. Thin 1px borders in the line colour. No shadows at all. Emptiness is the material.",
    heroes: ["full-bleed-photo", "centered-manifesto", "split-bleed"],
    sections: ["sticky-split", "gallery-stagger", "pull-quote", "numbered-rows", "footnote-footer"],
    signature: [
      "Sections separated by very tall vertical space (py-32 md:py-48) rather than by colour changes",
      "A thin vertical brass line (w-px h-24 bg-[#C9A96E]) as a scroll cue under the hero",
      "Product or room names in italic serif, prices or details in small uppercase sans with wide tracking",
      "Images in tall portrait ratios (aspect-[3/4]) placed off-centre, with generous margin around them",
    ],
    voice:
      "Understated. Short sentences. Never exclaims, never sells hard. e.g. \"Twelve rooms. One view. Reservations by letter or telephone.\"",
    imagery: "Dark, low-key, grainy photography with warm highlights. Portrait crops. Never bright stock imagery.",
    motion: "subtle",
  },
  {
    id: "swiss",
    name: "Swiss grid",
    essence:
      "International Typographic Style: off-white page, black grotesque type at extreme sizes, a strict visible 12-column grid, one signal-red accent, flush-left everything.",
    fits: [
      "agency", "studio", "architecture", "architect", "conference", "exhibition",
      "portfolio", "event", "branding", "creative", "workshop",
      "symposium", "summit",
    ],
    styleWords: ["minimal", "swiss", "grid", "bold", "modernist", "structured", "graphic"],
    palette: {
      ground: "#F2F1ED", surface: "#E7E5DF", ink: "#111111", muted: "#5C5C5C",
      line: "#111111", accent: "#E4002B", onAccent: "#FFFFFF", band: "#111111", onBand: "#F2F1ED",
    },
    fonts: { display: "Inter Tight", body: "Archivo", mono: "JetBrains Mono" },
    type: {
      display: `${f("Inter Tight", "sans-serif")} text-[clamp(3.5rem,11vw,11rem)] leading-[0.82] tracking-[-0.055em] font-[700]`,
      h2: `${f("Inter Tight", "sans-serif")} text-5xl md:text-7xl leading-[0.9] tracking-[-0.04em] font-[700]`,
      h3: `${f("Inter Tight", "sans-serif")} text-xl font-[700] tracking-tight`,
      body: `${f("Archivo", "sans-serif")} text-base leading-[1.55] text-[#111111]`,
      lead: `${f("Archivo", "sans-serif")} text-2xl md:text-[28px] leading-[1.2] tracking-tight font-[500]`,
      eyebrow: `${f("JetBrains Mono", "monospace")} text-[11px] uppercase tracking-[0.12em] text-[#111111]`,
      meta: `${f("JetBrains Mono", "monospace")} text-[11px] text-[#5C5C5C]`,
    },
    ui: {
      primaryButton:
        "inline-flex items-center justify-between gap-10 bg-[#E4002B] text-white px-5 py-4 text-sm font-[700] hover:bg-[#111111] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]",
      secondaryButton:
        "inline-flex items-center gap-2 border border-[#111111] px-5 py-4 text-sm font-[700] hover:bg-[#111111] hover:text-[#F2F1ED] transition-colors",
      surface: "border-t-2 border-[#111111] pt-4",
      link: "underline underline-offset-2 hover:text-[#E4002B]",
      input:
        "w-full bg-transparent border border-[#111111] px-4 py-3 focus:outline focus:outline-2 focus:outline-[#E4002B] outline-offset-0",
    },
    shape: "Radius zero, no shadows. Heavy 2px ink rules and a visible grid. Everything flush-left, nothing centred.",
    heroes: ["type-wall", "index-list", "split-bleed"],
    sections: ["numbered-rows", "stat-ledger", "grid-specimen", "marquee-strip", "sticky-split", "big-cta-band"],
    signature: [
      "Numbers as structure: every section starts with a large index number (01, 02) in the grid's first column",
      "Faint 12-column grid lines visible in the hero background (absolute inset-0 grid grid-cols-12, each column border-l border-[#111111]/10)",
      "Headline words broken onto separate lines deliberately, one idea per line",
      "The red accent used only for the primary action and one highlighted figure",
    ],
    voice:
      "Declarative and compressed. Facts, dates, places. No adjectives it cannot prove. e.g. \"Zurich. 14–16 May. 38 speakers. No keynotes.\"",
    imagery: "High-contrast photography or none. Hard rectangular crops aligned to the grid columns.",
    motion: "none",
  },
  {
    id: "technical",
    name: "Technical instrument",
    essence:
      "A precise dark tool: graphite ground, a grotesque plus monospace, hairline borders, dense real information, and a product panel built in JSX as the hero instead of an illustration.",
    fits: [
      "developer", "api", "sdk", "cli", "devtools", "infrastructure", "database", "cloud", "hosting",
      "monitoring", "observability", "security", "ai", "llm", "model", "automation", "saas", "software",
      "platform", "startup", "analytics", "data", "open source", "terminal", "code",
    ],
    styleWords: ["technical", "dark", "developer", "dev", "hacker", "precise", "terminal", "data"],
    palette: {
      ground: "#0B0C0E", surface: "#121418", ink: "#E8EAED", muted: "#8E959F",
      line: "#23272E", accent: "#9BF26B", onAccent: "#0B0C0E",
    },
    fonts: { display: "Space Grotesk", body: "IBM Plex Sans", mono: "JetBrains Mono" },
    type: {
      display: `${f("Space Grotesk", "sans-serif")} text-[clamp(2.75rem,6.5vw,5.75rem)] leading-[0.98] tracking-[-0.045em] font-[500]`,
      h2: `${f("Space Grotesk", "sans-serif")} text-3xl md:text-5xl leading-[1.02] tracking-[-0.035em] font-[500]`,
      h3: `${f("Space Grotesk", "sans-serif")} text-lg font-[500] tracking-tight`,
      body: `${f("IBM Plex Sans", "sans-serif")} text-[15px] leading-relaxed text-[#8E959F]`,
      lead: `${f("IBM Plex Sans", "sans-serif")} text-lg md:text-xl leading-relaxed text-[#8E959F]`,
      eyebrow: `${f("JetBrains Mono", "monospace")} text-xs text-[#9BF26B]`,
      meta: `${f("JetBrains Mono", "monospace")} text-xs text-[#8E959F] tabular-nums`,
    },
    ui: {
      primaryButton:
        "inline-flex items-center gap-2 rounded-md bg-[#E8EAED] text-[#0B0C0E] px-4 py-2.5 text-sm font-[500] hover:bg-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9BF26B]",
      secondaryButton:
        "inline-flex items-center gap-2 rounded-md border border-[#23272E] px-4 py-2.5 text-sm text-[#E8EAED] hover:border-[#8E959F] transition font-['JetBrains_Mono',monospace]",
      surface: "rounded-lg border border-[#23272E] bg-[#121418]",
      link: "text-[#E8EAED] underline decoration-[#23272E] underline-offset-4 hover:decoration-[#9BF26B]",
      input:
        "w-full rounded-md border border-[#23272E] bg-[#0B0C0E] px-3 py-2.5 text-sm text-[#E8EAED] focus:border-[#9BF26B] outline-none font-['JetBrains_Mono',monospace]",
    },
    shape: "Small radius (rounded-md / rounded-lg), 1px hairline borders, no drop shadows. Density over decoration.",
    heroes: ["product-frame", "type-wall", "split-form"],
    sections: ["bento-asym", "code-split", "stat-ledger", "changelog-rail", "numbered-rows", "big-cta-band"],
    signature: [
      "The hero shows the product working: a terminal, a request/response pair, or a live-updating table, built in JSX with realistic data",
      "A copyable install command in a mono pill ($ npm i ...) with a working copy-to-clipboard button that shows Copied",
      "Section eyebrows written like code comments or paths (// 02 — pricing, /docs/limits)",
      "Real numbers in tabular mono: p99 latency, regions, uptime, version numbers",
    ],
    voice:
      "Precise, dry, confident. Says exactly what it does with numbers. e.g. \"Postgres branches in 400ms. Copy-on-write, so a 2TB database costs nothing to fork.\"",
    imagery: "No stock photos. Product UI built in JSX, diagrams from bordered divs, monospace output.",
    motion: "ambient",
  },
  {
    id: "clinical-calm",
    name: "Clinical calm",
    essence:
      "Reassuring and very legible: pale mineral ground, deep teal, a friendly serif for headings over a highly legible sans, large touch targets, and plain, kind language.",
    fits: [
      "clinic", "dentist", "dental", "doctor", "medical", "health", "healthcare", "therapy",
      "therapist", "physio", "physiotherapy", "counselling", "counseling", "mental", "veterinary",
      "vet", "pharmacy", "hospital", "care", "nursing", "optician", "wellness", "insurance", "pediatric",
    ],
    styleWords: ["calm", "trustworthy", "clean", "accessible", "reassuring", "soft"],
    palette: {
      ground: "#F5F8F7", surface: "#FFFFFF", ink: "#10292D", muted: "#4E6569",
      line: "#D8E3E1", accent: "#0E6B66", onAccent: "#FFFFFF", band: "#DCEFEA", onBand: "#10292D",
    },
    fonts: { display: "DM Serif Display", body: "Atkinson Hyperlegible", mono: "IBM Plex Mono" },
    type: {
      display: `${f("DM Serif Display", "serif")} text-[clamp(2.75rem,6vw,5.25rem)] leading-[1.02] tracking-[-0.015em]`,
      h2: `${f("DM Serif Display", "serif")} text-3xl md:text-5xl leading-[1.08]`,
      h3: `${f("Atkinson Hyperlegible", "sans-serif")} text-xl font-bold`,
      body: `${f("Atkinson Hyperlegible", "sans-serif")} text-[17px] leading-[1.7] text-[#10292D]`,
      lead: `${f("Atkinson Hyperlegible", "sans-serif")} text-xl leading-relaxed text-[#4E6569]`,
      eyebrow: `${f("Atkinson Hyperlegible", "sans-serif")} text-sm font-bold text-[#0E6B66]`,
      meta: `${f("Atkinson Hyperlegible", "sans-serif")} text-sm text-[#4E6569]`,
    },
    ui: {
      primaryButton:
        "inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-[#0E6B66] text-white px-6 py-3 font-bold hover:bg-[#0A524E] transition focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0E6B66]",
      secondaryButton:
        "inline-flex min-h-[48px] items-center gap-2 rounded-xl border-2 border-[#D8E3E1] bg-white px-6 py-3 font-bold text-[#10292D] hover:border-[#0E6B66] transition",
      surface: "rounded-2xl bg-white border border-[#D8E3E1] p-7",
      link: "font-bold text-[#0E6B66] underline underline-offset-4",
      input:
        "w-full min-h-[48px] rounded-xl border-2 border-[#D8E3E1] bg-white px-4 text-[17px] focus:border-[#0E6B66] outline-none",
    },
    shape: "Consistent rounded-xl / rounded-2xl, 1px mineral borders, no shadows. Nothing smaller than 44px to tap.",
    heroes: ["split-form", "split-bleed", "full-bleed-photo"],
    sections: ["service-rows", "hours-card", "team-portraits", "faq-split", "pull-quote", "big-cta-band"],
    signature: [
      "Opening hours and the phone number visible in the first screen, in a small card, not buried in the footer",
      "Real practitioner portraits with name, credentials and one human detail each (\"Runs the Saturday clinic\")",
      "A soft mint band (#DCEFEA) behind one section, used once",
      "Costs stated plainly in a simple table: treatment, time, price",
    ],
    voice:
      "Plain, warm and direct, written for someone who is a bit anxious. No jargon. e.g. \"Same-week appointments. We tell you the price before we start.\"",
    imagery: "Natural-light photos of real rooms and people, calm and uncluttered. Rounded-2xl crops.",
    motion: "none",
  },
  {
    id: "poster",
    name: "Loud poster",
    essence:
      "Neo-brutalist poster: flat saturated colour blocks, thick black borders, hard offset shadows, a heavy wide display face in capitals, and a scrolling marquee strip.",
    fits: [
      "gym", "fitness", "boxing", "crossfit", "music", "band", "festival", "concert", "gig", "club",
      "streetwear", "skate", "sneaker", "barbershop", "barber", "tattoo", "esports", "record",
      "radio", "zine", "comedy", "food truck", "burger", "youth", "merch",
    ],
    styleWords: ["bold", "loud", "brutalist", "punk", "fun", "energetic", "playful", "retro", "raw"],
    palette: {
      ground: "#F4EFE6", surface: "#FFFFFF", ink: "#0A0A0A", muted: "#3D3D3D",
      line: "#0A0A0A", accent: "#FF4F1A", onAccent: "#0A0A0A", band: "#1F3BFF", onBand: "#F4EFE6",
    },
    fonts: { display: "Unbounded", body: "Space Grotesk", mono: "Space Mono" },
    type: {
      display: `${f("Unbounded", "sans-serif")} text-[clamp(2.75rem,9vw,8.5rem)] leading-[0.88] tracking-[-0.04em] font-[900] uppercase`,
      h2: `${f("Unbounded", "sans-serif")} text-4xl md:text-6xl leading-[0.95] tracking-[-0.03em] font-[900] uppercase`,
      h3: `${f("Unbounded", "sans-serif")} text-lg font-[700] uppercase`,
      body: `${f("Space Grotesk", "sans-serif")} text-[17px] leading-snug text-[#0A0A0A] font-[500]`,
      lead: `${f("Space Grotesk", "sans-serif")} text-xl md:text-2xl leading-tight font-[500]`,
      eyebrow: `${f("Space Mono", "monospace")} text-xs uppercase font-[700] tracking-wide`,
      meta: `${f("Space Mono", "monospace")} text-xs uppercase`,
    },
    ui: {
      primaryButton:
        "inline-flex items-center gap-2 border-[3px] border-[#0A0A0A] bg-[#FF4F1A] px-6 py-3.5 font-['Unbounded',sans-serif] text-sm font-[700] uppercase shadow-[5px_5px_0_#0A0A0A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0_#0A0A0A] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none transition-all",
      secondaryButton:
        "inline-flex items-center gap-2 border-[3px] border-[#0A0A0A] bg-white px-6 py-3.5 font-['Unbounded',sans-serif] text-sm font-[700] uppercase hover:bg-[#0A0A0A] hover:text-white transition-colors",
      surface: "border-[3px] border-[#0A0A0A] bg-white shadow-[8px_8px_0_#0A0A0A]",
      link: "font-[700] underline decoration-[3px] underline-offset-4 hover:bg-[#FF4F1A]",
      input:
        "w-full border-[3px] border-[#0A0A0A] bg-white px-4 py-3 font-[500] focus:shadow-[4px_4px_0_#FF4F1A] outline-none",
    },
    shape: "Radius zero. 3px black borders and hard offset shadows (shadow-[8px_8px_0_#0A0A0A]), never soft shadows or blur.",
    heroes: ["band-stack", "type-wall", "ticket"],
    sections: ["marquee-strip", "schedule-grid", "bento-asym", "big-cta-band", "numbered-rows", "pull-quote"],
    signature: [
      "A marquee strip of words or dates scrolling horizontally between sections (CSS keyframes translateX, duplicated content, motion-reduce:animate-none)",
      "One element rotated a few degrees (rotate-[-3deg]) like a sticker slapped on the poster",
      "A full-bleed electric-blue band (#1F3BFF) for one section, with cream text",
      "Prices, dates and times in big mono, like a gig poster",
    ],
    voice:
      "Short, loud, confident, a little funny. Imperatives and numbers. e.g. \"6AM. NO MIRRORS. NO EXCUSES. FIRST CLASS FREE.\"",
    imagery: "High-contrast, grainy photography, sometimes duotone. Hard rectangles with black borders.",
    motion: "subtle",
  },
  {
    id: "soft-playful",
    name: "Soft and playful",
    essence:
      "Friendly and tactile: warm off-white, a quirky grotesque, chunky rounded cards in three soft tints, one coral accent, and small illustrated shapes made from CSS.",
    fits: [
      "kids", "children", "daycare", "nursery", "preschool", "pet", "dog", "cat", "grooming",
      "course", "learning", "education", "language", "habit", "mobile app", "consumer app",
      "toy", "family", "tutor", "planner", "recipe", "dating",
    ],
    styleWords: ["playful", "friendly", "fun", "cute", "soft", "rounded", "colorful", "colourful", "cheerful"],
    palette: {
      ground: "#FBF7F2", surface: "#FFFFFF", ink: "#1F1B2D", muted: "#5F5A70",
      line: "#EAE3DA", accent: "#FF6B4A", onAccent: "#FFFFFF", band: "#FFE3D8", onBand: "#1F1B2D",
    },
    fonts: { display: "Bricolage Grotesque", body: "DM Sans", mono: "Space Mono" },
    type: {
      display: `${f("Bricolage Grotesque", "sans-serif")} text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] tracking-[-0.045em] font-[800]`,
      h2: `${f("Bricolage Grotesque", "sans-serif")} text-4xl md:text-5xl leading-[1] tracking-[-0.035em] font-[800]`,
      h3: `${f("Bricolage Grotesque", "sans-serif")} text-xl font-[700] tracking-tight`,
      body: `${f("DM Sans", "sans-serif")} text-[17px] leading-relaxed text-[#1F1B2D]`,
      lead: `${f("DM Sans", "sans-serif")} text-xl leading-relaxed text-[#5F5A70]`,
      eyebrow: `${f("DM Sans", "sans-serif")} inline-block rounded-full bg-[#FFE3D8] px-3 py-1 text-xs font-bold text-[#C2412A]`,
      meta: `${f("DM Sans", "sans-serif")} text-sm text-[#5F5A70]`,
    },
    ui: {
      primaryButton:
        "inline-flex items-center gap-2 rounded-2xl bg-[#FF6B4A] px-6 py-3.5 font-bold text-white shadow-[0_4px_0_#C2412A] hover:-translate-y-0.5 active:translate-y-1 active:shadow-none transition focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#1F1B2D]",
      secondaryButton:
        "inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 font-bold text-[#1F1B2D] border-2 border-[#EAE3DA] hover:border-[#1F1B2D] transition",
      surface: "rounded-[32px] p-8",
      link: "font-bold text-[#C2412A] hover:underline",
      input:
        "w-full rounded-2xl border-2 border-[#EAE3DA] bg-white px-4 py-3 focus:border-[#FF6B4A] outline-none",
    },
    shape: "Chunky radius (rounded-[32px] cards, rounded-2xl controls). Cards are filled with soft tints (#FFE3D8, #DDEBFF, #DDF3E4), not outlined.",
    heroes: ["offset-collage", "split-form", "product-frame"],
    sections: ["bento-asym", "steps-path", "pull-quote", "faq-split", "big-cta-band", "team-portraits"],
    signature: [
      "Feature cards in three different soft tints (#FFE3D8, #DDEBFF, #DDF3E4) and different sizes, never three identical white cards",
      "Simple geometric shapes made from divs (a circle, a half-circle, a squiggle made of rounded borders) tucked behind photos",
      "Buttons with a solid 'pressable' bottom edge (shadow-[0_4px_0_...]) that press down on click",
      "Real small details: a star rating with a count, a tiny avatar stack, a price per week",
    ],
    voice:
      "Warm, light, a bit cheeky, like a friend explaining it. e.g. \"Ten minutes a day. Your Spanish will thank you (and so will your waiter).\"",
    imagery: "Bright, candid, natural photos cut into rounded or blob-like shapes, with tinted backgrounds behind them.",
    motion: "subtle",
  },
  {
    id: "field-guide",
    name: "Field guide",
    essence:
      "Outdoors and grounded: sage and bark tones, a sturdy serif with a clean geometric sans, big landscape photography, trail-map details like coordinates and elevations.",
    fits: [
      "travel", "tour", "tours", "yoga", "retreat", "outdoor", "hiking", "camping", "cabin",
      "eco", "sustainable", "sustainability", "garden", "landscaping", "nature", "national park",
      "surf", "ski", "adventure", "expedition", "cycling", "wildlife", "safari", "glamping",
    ],
    styleWords: ["natural", "earthy", "organic", "calm", "outdoorsy", "grounded", "green"],
    palette: {
      ground: "#EEF0E7", surface: "#E2E6D8", ink: "#1C2A20", muted: "#536156",
      line: "#C9D0BE", accent: "#C8632B", onAccent: "#FFFFFF", band: "#1C2A20", onBand: "#EEF0E7",
    },
    fonts: { display: "DM Serif Display", body: "Outfit", mono: "Space Mono" },
    type: {
      display: `${f("DM Serif Display", "serif")} text-[clamp(3rem,8vw,7.25rem)] leading-[0.92] tracking-[-0.02em]`,
      h2: `${f("DM Serif Display", "serif")} text-4xl md:text-6xl leading-[1]`,
      h3: `${f("Outfit", "sans-serif")} text-xl font-[500]`,
      body: `${f("Outfit", "sans-serif")} text-[17px] leading-relaxed text-[#1C2A20] font-[300]`,
      lead: `${f("Outfit", "sans-serif")} text-xl leading-relaxed text-[#536156] font-[300]`,
      eyebrow: `${f("Space Mono", "monospace")} text-[11px] uppercase tracking-[0.15em] text-[#536156]`,
      meta: `${f("Space Mono", "monospace")} text-[11px] text-[#536156]`,
    },
    ui: {
      primaryButton:
        "inline-flex items-center gap-3 rounded-full bg-[#1C2A20] px-7 py-3.5 text-[#EEF0E7] font-[500] hover:bg-[#C8632B] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8632B]",
      secondaryButton:
        "inline-flex items-center gap-2 rounded-full border border-[#1C2A20]/30 px-7 py-3.5 font-[500] hover:border-[#1C2A20] transition",
      surface: "rounded-sm bg-[#E2E6D8] p-8",
      link: "underline decoration-[#C8632B] decoration-2 underline-offset-4",
      input:
        "w-full rounded-sm border border-[#C9D0BE] bg-[#F7F8F3] px-4 py-3 focus:border-[#1C2A20] outline-none",
    },
    shape: "Nearly square (rounded-sm) blocks, fully round buttons. Photos full-bleed and wide. No shadows.",
    heroes: ["full-bleed-photo", "split-bleed", "offset-collage"],
    sections: ["itinerary-rail", "gallery-stagger", "stat-ledger", "sticky-split", "pull-quote", "big-cta-band"],
    signature: [
      "Coordinates, elevations and distances in mono as metadata (46.5582° N · 2,450 m · 6 days)",
      "An itinerary or schedule on a vertical rail with day markers, like a trail map",
      "One very wide panoramic image (aspect-[21/9]) running the full width",
      "A dark bark-coloured band for the booking section",
    ],
    voice:
      "Grounded and evocative but concrete. Distances, days, what you will actually do. e.g. \"Six days, 74 km, three huts. Your bags go ahead by mule.\"",
    imagery: "Wide landscape photography, natural light, people small in the frame.",
    motion: "none",
  },
  {
    id: "ledger",
    name: "Ledger precision",
    essence:
      "Serious and precise: a light, warm-white ground, navy ink, one deep-green accent, tabular figures everywhere, clean tables and restrained charts drawn from divs.",
    fits: [
      "accounting", "accountant", "bookkeeping", "tax", "bank", "banking", "fintech", "finance",
      "investment", "wealth", "payroll", "invoice", "insurance", "b2b", "enterprise", "crm",
      "dashboard", "admin", "hr", "legal tech", "procurement", "compliance", "budget", "expense",
    ],
    styleWords: ["professional", "corporate", "trustworthy", "precise", "serious", "clean"],
    palette: {
      ground: "#FAFAF7", surface: "#FFFFFF", ink: "#0D1B2A", muted: "#56626F",
      line: "#E2E5E9", accent: "#12704F", onAccent: "#FFFFFF", band: "#0D1B2A", onBand: "#FAFAF7",
    },
    fonts: { display: "Sora", body: "IBM Plex Sans", mono: "IBM Plex Mono" },
    type: {
      display: `${f("Sora", "sans-serif")} text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[1.02] tracking-[-0.04em] font-[600]`,
      h2: `${f("Sora", "sans-serif")} text-3xl md:text-[44px] leading-[1.08] tracking-[-0.03em] font-[600]`,
      h3: `${f("Sora", "sans-serif")} text-lg font-[600] tracking-tight`,
      body: `${f("IBM Plex Sans", "sans-serif")} text-base leading-relaxed text-[#0D1B2A]`,
      lead: `${f("IBM Plex Sans", "sans-serif")} text-lg md:text-xl leading-relaxed text-[#56626F]`,
      eyebrow: `${f("IBM Plex Mono", "monospace")} text-xs uppercase tracking-[0.12em] text-[#12704F]`,
      meta: `${f("IBM Plex Mono", "monospace")} text-xs text-[#56626F] tabular-nums`,
    },
    ui: {
      primaryButton:
        "inline-flex items-center gap-2 rounded-lg bg-[#0D1B2A] px-5 py-3 text-sm font-[600] text-white hover:bg-[#12704F] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12704F]",
      secondaryButton:
        "inline-flex items-center gap-2 rounded-lg border border-[#E2E5E9] bg-white px-5 py-3 text-sm font-[600] text-[#0D1B2A] hover:border-[#0D1B2A] transition",
      surface: "rounded-xl border border-[#E2E5E9] bg-white",
      link: "font-[600] text-[#12704F] hover:underline underline-offset-4",
      input:
        "w-full rounded-lg border border-[#E2E5E9] bg-white px-3.5 py-2.5 text-sm focus:border-[#12704F] focus:ring-2 focus:ring-[#12704F]/15 outline-none",
    },
    shape: "Modest radius (rounded-lg controls, rounded-xl panels), 1px borders, at most one soft shadow on a floating panel.",
    heroes: ["product-frame", "split-form", "index-list"],
    sections: ["stat-ledger", "comparison-table", "bento-asym", "sticky-split", "faq-split", "big-cta-band"],
    signature: [
      "Every figure in tabular mono (tabular-nums), right-aligned in tables, with currency and units",
      "A hero panel showing a realistic statement, invoice or ledger with 5-6 rows built in JSX",
      "Small up/down deltas in green/red next to key numbers",
      "A comparison table instead of pricing cards, with a sticky header row",
    ],
    voice:
      "Exact and calm. Numbers and deadlines, no hype. e.g. \"Quarterly VAT filed in 11 minutes. We check every line before HMRC does.\"",
    imagery: "Mostly product UI and data. If photos, restrained office or portrait photography.",
    motion: "none",
  },
  {
    id: "gallery",
    name: "White-cube gallery",
    essence:
      "Almost nothing but the work: pure white, a high-fashion didone at huge size, tiny captions, vast images of varied proportions, and a single thin accent colour for links.",
    fits: [
      "photography", "photographer", "fashion", "model", "artist", "art", "gallery", "interior",
      "interior design", "film", "director", "cinematographer", "illustrator", "designer",
      "portfolio", "stylist", "makeup", "furniture", "lookbook",
      // Not "collection": it also means pickup, and matched a bakery.
      "art collection",
    ],
    styleWords: ["minimal", "minimalist", "fashion", "artsy", "white", "sleek", "stark"],
    palette: {
      ground: "#FFFFFF", surface: "#F3F3F1", ink: "#0A0A0A", muted: "#6B6B6B",
      line: "#E8E8E6", accent: "#D23B1F", onAccent: "#FFFFFF",
    },
    fonts: { display: "Bodoni Moda", body: "Inter Tight", mono: "IBM Plex Mono" },
    type: {
      display: `${f("Bodoni Moda", "serif")} text-[clamp(3.5rem,10vw,10rem)] leading-[0.85] tracking-[-0.035em] font-[400] italic`,
      h2: `${f("Bodoni Moda", "serif")} text-4xl md:text-6xl leading-[0.95] tracking-[-0.02em]`,
      h3: `${f("Inter Tight", "sans-serif")} text-sm font-[500] uppercase tracking-[0.08em]`,
      body: `${f("Inter Tight", "sans-serif")} text-[15px] leading-relaxed text-[#0A0A0A]`,
      lead: `${f("Inter Tight", "sans-serif")} text-lg leading-snug text-[#0A0A0A] max-w-md`,
      eyebrow: `${f("Inter Tight", "sans-serif")} text-[11px] uppercase tracking-[0.14em] text-[#6B6B6B]`,
      meta: `${f("IBM Plex Mono", "monospace")} text-[11px] text-[#6B6B6B]`,
    },
    ui: {
      primaryButton:
        "inline-flex items-center gap-3 bg-[#0A0A0A] px-6 py-3 text-[12px] uppercase tracking-[0.14em] text-white hover:bg-[#D23B1F] transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#0A0A0A]",
      secondaryButton:
        "inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] border-b border-[#0A0A0A] pb-0.5 hover:text-[#D23B1F] hover:border-[#D23B1F]",
      surface: "",
      link: "hover:text-[#D23B1F] transition-colors",
      input:
        "w-full border-0 border-b border-[#0A0A0A] bg-transparent px-0 py-2.5 focus:border-[#D23B1F] focus:ring-0 outline-none",
    },
    shape: "Radius zero, no borders on images, no shadows, no cards. White space and alignment are the only structure.",
    heroes: ["type-wall", "offset-collage", "full-bleed-photo"],
    sections: ["gallery-stagger", "index-list-section", "sticky-split", "pull-quote", "footnote-footer"],
    signature: [
      "Images of deliberately different proportions (aspect-[3/4], aspect-[4/5], aspect-[16/10]) in an uneven column layout",
      "Every image has a tiny caption: title in italic serif, then year and medium in mono",
      "The name or brand set enormous in italic didone, cropped by the viewport edge",
      "A work index: a plain numbered list of projects where hovering a row shows its image",
    ],
    voice:
      "Almost silent. Names, places, years. Let the work talk. e.g. \"Commissions, editorial and still life. Based in Lisbon.\"",
    imagery: "Striking, high-quality editorial photography, presented big with no frame.",
    motion: "subtle",
  },
  {
    id: "night-signal",
    name: "Night signal",
    essence:
      "After-dark and electric: blue-black ground, a wide heavy display face, an acid-lime accent, scanline and grid textures, countdowns and live-looking data.",
    fits: [
      "gaming", "game", "games", "esports", "nightclub", "club night", "dj", "rave", "techno",
      "crypto", "web3", "nft", "blockchain", "hackathon", "vr", "arcade", "stream", "streamer",
      "producer", "synth", "cyber",
    ],
    styleWords: ["neon", "futuristic", "cyberpunk", "edgy", "dark", "electric", "night", "gamer"],
    palette: {
      ground: "#07080C", surface: "#10121A", ink: "#F1F3F8", muted: "#8A90A6",
      line: "#1E2230", accent: "#D4FF3A", onAccent: "#07080C",
    },
    fonts: { display: "Unbounded", body: "Space Grotesk", mono: "Space Mono" },
    type: {
      display: `${f("Unbounded", "sans-serif")} text-[clamp(2.75rem,8.5vw,8rem)] leading-[0.88] tracking-[-0.05em] font-[800] uppercase`,
      h2: `${f("Unbounded", "sans-serif")} text-3xl md:text-5xl leading-[0.95] tracking-[-0.04em] font-[700] uppercase`,
      h3: `${f("Space Grotesk", "sans-serif")} text-lg font-[700]`,
      body: `${f("Space Grotesk", "sans-serif")} text-base leading-relaxed text-[#8A90A6]`,
      lead: `${f("Space Grotesk", "sans-serif")} text-xl leading-snug text-[#F1F3F8]`,
      eyebrow: `${f("Space Mono", "monospace")} text-[11px] uppercase tracking-[0.2em] text-[#D4FF3A]`,
      meta: `${f("Space Mono", "monospace")} text-[11px] uppercase text-[#8A90A6] tabular-nums`,
    },
    ui: {
      primaryButton:
        "inline-flex items-center gap-3 bg-[#D4FF3A] px-6 py-3.5 font-['Space_Mono',monospace] text-sm font-[700] uppercase text-[#07080C] [clip-path:polygon(0_0,100%_0,100%_70%,92%_100%,0_100%)] hover:bg-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4FF3A]",
      secondaryButton:
        "inline-flex items-center gap-2 border border-[#1E2230] px-6 py-3.5 font-['Space_Mono',monospace] text-sm uppercase text-[#F1F3F8] hover:border-[#D4FF3A] hover:text-[#D4FF3A] transition-colors",
      surface: "border border-[#1E2230] bg-[#10121A]",
      link: "text-[#D4FF3A] hover:underline underline-offset-4",
      input:
        "w-full border border-[#1E2230] bg-[#07080C] px-4 py-3 font-['Space_Mono',monospace] text-sm text-[#F1F3F8] focus:border-[#D4FF3A] outline-none",
    },
    shape: "Sharp corners with one clipped corner on primary actions (clip-path). 1px borders. Glow is not a style here: no blurred blobs.",
    heroes: ["type-wall", "ticket", "product-frame"],
    sections: ["schedule-grid", "marquee-strip", "stat-ledger", "bento-asym", "numbered-rows", "big-cta-band"],
    signature: [
      "A live countdown or ticking counter in big mono that actually updates every second",
      "Corner registration marks (small L-shaped borders) on key panels, like a HUD",
      "A faint grid or scanline texture in the hero made from a repeating linear-gradient background",
      "Lineup, specs or stats as a dense mono table with row hover in the accent",
    ],
    voice:
      "Clipped, confident, insider. Dates, specs, drop times. e.g. \"Season 4 drops 19.10. 64 teams. One map. No respawns.\"",
    imagery: "Dark, high-contrast photography or UI screenshots built in JSX. Never generic purple gradients.",
    motion: "ambient",
  },
  {
    id: "civic",
    name: "Civic warm",
    essence:
      "Open, credible and human: warm white, a bookish serif for headings, a highly legible sans for text, navy with a sunflower highlight, big clear calls to action.",
    fits: [
      "university", "college", "school", "academy", "nonprofit", "non-profit", "charity", "foundation",
      "government", "council", "library", "community", "church", "volunteer", "donation", "donate",
      "campaign", "association", "union", "museum", "public", "ngo", "fundraiser",
    ],
    styleWords: ["trustworthy", "institutional", "warm", "accessible", "hopeful", "community"],
    palette: {
      ground: "#FFFDF7", surface: "#F5F0E4", ink: "#18202B", muted: "#4F5966",
      line: "#E3DDCE", accent: "#1C4587", onAccent: "#FFFFFF", band: "#F2C14E", onBand: "#18202B",
    },
    fonts: { display: "Libre Baskerville", body: "Atkinson Hyperlegible", mono: "IBM Plex Mono" },
    type: {
      display: `${f("Libre Baskerville", "serif")} text-[clamp(2.5rem,6vw,5.25rem)] leading-[1.05] tracking-[-0.02em] font-[700]`,
      h2: `${f("Libre Baskerville", "serif")} text-3xl md:text-5xl leading-[1.1] font-[700]`,
      h3: `${f("Atkinson Hyperlegible", "sans-serif")} text-xl font-bold`,
      body: `${f("Atkinson Hyperlegible", "sans-serif")} text-[17px] leading-[1.7] text-[#18202B]`,
      lead: `${f("Atkinson Hyperlegible", "sans-serif")} text-xl leading-relaxed text-[#4F5966]`,
      eyebrow: `${f("Atkinson Hyperlegible", "sans-serif")} text-sm font-bold uppercase tracking-[0.1em] text-[#1C4587]`,
      meta: `${f("Atkinson Hyperlegible", "sans-serif")} text-sm text-[#4F5966]`,
    },
    ui: {
      primaryButton:
        "inline-flex min-h-[48px] items-center gap-2 rounded-md bg-[#1C4587] px-6 py-3 font-bold text-white hover:bg-[#143366] transition focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#F2C14E]",
      secondaryButton:
        "inline-flex min-h-[48px] items-center gap-2 rounded-md border-2 border-[#18202B] px-6 py-3 font-bold hover:bg-[#18202B] hover:text-white transition",
      surface: "rounded-md border border-[#E3DDCE] bg-white p-7",
      link: "font-bold text-[#1C4587] underline underline-offset-4 decoration-2",
      input:
        "w-full min-h-[48px] rounded-md border-2 border-[#E3DDCE] bg-white px-4 focus:border-[#1C4587] outline-none",
    },
    shape: "Small, consistent radius (rounded-md). Clear borders. A yellow highlighter treatment on one key phrase.",
    heroes: ["split-bleed", "split-form", "full-bleed-photo"],
    sections: ["stat-ledger", "steps-path", "pull-quote", "news-list", "big-cta-band", "faq-split"],
    signature: [
      "One key phrase in the headline marked with a sunflower highlighter (bg-[linear-gradient(transparent_60%,#F2C14E_60%)])",
      "Impact figures stated large with a plain source line under each (\"2,340 meals — March 2026 report\")",
      "A donation or enquiry form with preset amount chips that actually select",
      "Real named people with roles, in stories rather than testimonials",
    ],
    voice:
      "Clear, hopeful, concrete. Says who is helped and how, in plain words. e.g. \"£25 keeps the library open for one more evening.\"",
    imagery: "Candid documentary photography of real people and places. No stock handshakes.",
    motion: "none",
  },
  {
    id: "industrial",
    name: "Industrial trade",
    essence:
      "Built like a site sign: concrete grey, black, safety yellow, a heavy condensed-feeling grotesque in capitals, spec-sheet tables and bold numbered process steps.",
    fits: [
      "construction", "builder", "contractor", "plumbing", "plumber", "electrician", "electrical",
      "roofing", "hvac", "renovation", "remodeling", "auto", "car", "mechanic", "garage", "dealership",
      "logistics", "moving", "removals", "warehouse", "manufacturing", "engineering", "trucking",
      "home services", "cleaning", "handyman", "solar", "welding",
    ],
    styleWords: ["rugged", "industrial", "tough", "bold", "practical", "no-nonsense"],
    palette: {
      ground: "#EFEEEA", surface: "#FFFFFF", ink: "#141517", muted: "#55595F",
      line: "#CFCDC6", accent: "#F5B700", onAccent: "#141517", band: "#141517", onBand: "#EFEEEA",
    },
    fonts: { display: "Archivo", body: "IBM Plex Sans", mono: "JetBrains Mono" },
    type: {
      display: `${f("Archivo", "sans-serif")} text-[clamp(2.75rem,8vw,7rem)] leading-[0.88] tracking-[-0.03em] font-[900] uppercase`,
      h2: `${f("Archivo", "sans-serif")} text-4xl md:text-6xl leading-[0.92] tracking-[-0.02em] font-[900] uppercase`,
      h3: `${f("Archivo", "sans-serif")} text-lg font-[700] uppercase tracking-tight`,
      body: `${f("IBM Plex Sans", "sans-serif")} text-base leading-relaxed text-[#141517]`,
      lead: `${f("IBM Plex Sans", "sans-serif")} text-xl leading-snug font-[500] text-[#55595F]`,
      eyebrow: `${f("JetBrains Mono", "monospace")} text-xs uppercase font-[700] tracking-wide`,
      meta: `${f("JetBrains Mono", "monospace")} text-xs uppercase text-[#55595F]`,
    },
    ui: {
      primaryButton:
        "inline-flex min-h-[48px] items-center gap-3 bg-[#F5B700] px-6 py-3 font-['Archivo',sans-serif] font-[800] uppercase text-[#141517] hover:bg-[#141517] hover:text-[#F5B700] transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#141517]",
      secondaryButton:
        "inline-flex min-h-[48px] items-center gap-2 border-2 border-[#141517] px-6 py-3 font-[800] uppercase hover:bg-[#141517] hover:text-white transition-colors",
      surface: "bg-white border-l-4 border-[#F5B700] p-7",
      link: "font-[700] underline decoration-[#F5B700] decoration-[3px] underline-offset-4",
      input:
        "w-full min-h-[48px] border-2 border-[#141517] bg-white px-4 font-[500] focus:bg-[#FFF6D6] outline-none",
    },
    shape: "Square corners, heavy borders, a thick yellow edge on key panels. Diagonal hazard stripes used once as an accent.",
    heroes: ["split-form", "full-bleed-photo", "band-stack"],
    sections: ["numbered-rows", "spec-table", "stat-ledger", "gallery-stagger", "steps-path", "big-cta-band"],
    signature: [
      "A thin hazard-stripe bar (bg-[repeating-linear-gradient(45deg,#F5B700_0_12px,#141517_12px_24px)] h-2) used once, at the top or above the quote form",
      "Licence numbers, insurance cover and years trading shown as a spec strip in mono",
      "Process as big numbered steps (01–05) in heavy type with the duration of each",
      "A quote form above the fold with real fields: job type, postcode, timeframe",
    ],
    voice:
      "Direct, practical, trustworthy. What, how long, how much. e.g. \"Boilers fitted in a day. Fixed price, written down before we start.\"",
    imagery: "Real job-site and workshop photography, high contrast. No smiling-worker stock clichés.",
    motion: "none",
  },
];

/** Directions used when nothing in the prompt points anywhere. Chosen to differ from each other. */
const GENERAL = ["swiss", "editorial", "technical", "soft-playful", "ledger", "gallery"];

function normalise(text: string): string {
  return ` ${text.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ")} `;
}

function hits(haystack: string, needle: string): boolean {
  const n = needle.toLowerCase();
  // Whole-word match, tolerating a plural or possessive.
  return new RegExp(`\\s${n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:s|es|'s)?\\s`).test(haystack);
}

export type DirectionPick = { direction: Direction; score: number; reason: string };

/**
 * Chooses the direction for a brief.
 *
 * Subject keywords decide most of it; style words in the prompt ("dark",
 * "playful") pull strongly, because a user who asked for a look should get it.
 * When two directions are close, one is picked at random so regenerating the
 * same prompt does not always produce the same page. Pass `seed` for a
 * reproducible choice.
 */
export function pickDirection(prompt: string, seed?: number): DirectionPick {
  const text = normalise(prompt);

  /*
   * Where a keyword lands matters as much as whether it appears. "A sourdough
   * bakery with pre-order for collection" hit artisan on "bakery" and gallery
   * on "collection" - pickup, not an art collection - and tied 3-3, so a
   * bakery came out as a white-cube gallery half the time. The subject of a
   * brief is almost always named in its opening words, so a match there counts
   * double and a trailing clause cannot outvote it.
   */
  const position = (needle: string): number => {
    const at = text.indexOf(` ${needle.toLowerCase()}`);
    if (at < 0) return 1;
    return at / text.length < 0.35 ? 2 : 1;
  };

  const scored = DIRECTIONS.map((d) => {
    let score = 0;
    for (const k of d.fits) if (hits(text, k)) score += (k.includes(" ") ? 4 : 3) * position(k);
    for (const s of d.styleWords) if (hits(text, s)) score += 4 * position(s);
    return { direction: d, score };
  }).sort((a, b) => b.score - a.score);

  const rand = seed === undefined ? Math.random() : mulberry(seed);
  const top = scored[0];

  if (top.score === 0) {
    const pool = DIRECTIONS.filter((d) => GENERAL.includes(d.id));
    const direction = pool[Math.floor(rand * pool.length)];
    return { direction, score: 0, reason: "no subject match; picked a general-purpose direction" };
  }

  /*
   * Anything within a few points of the leader is a fair fit, and choosing
   * between them is what keeps two bakery sites from looking identical. The
   * choice was uniform though, so a direction scoring 3 was as likely as one
   * scoring 5 - variety bought at the cost of picking the wrong look.
   * Weighting by the square of the margin leaves a genuine tie a coin flip
   * while letting a clear leader win most of the time.
   */
  const window = 3;
  const close = scored.filter((s) => s.score > 0 && top.score - s.score <= window);
  const floor = top.score - window;
  const weights = close.map((c) => (c.score - floor) ** 2);
  const total = weights.reduce((a, b) => a + b, 0);

  let ticket = rand * total;
  let chosen = close[close.length - 1];
  for (let i = 0; i < close.length; i++) {
    ticket -= weights[i];
    if (ticket <= 0) {
      chosen = close[i];
      break;
    }
  }
  return {
    direction: chosen.direction,
    score: chosen.score,
    reason: close.length > 1 ? `close fit among ${close.map((c) => c.direction.id).join(", ")}` : "best subject match",
  };
}

export function getDirection(id: string): Direction | undefined {
  return DIRECTIONS.find((d) => d.id === id);
}

function mulberry(seed: number): number {
  let t = (seed + 0x6d2b79f5) | 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
