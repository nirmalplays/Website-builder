---
name: react-bits
description: Use React Bits animated components when generating UI. Covers searching the catalogue of 205 components, picking ones that fit, installing real source from the official registry, managing dependencies, composing sections, and knowing when NOT to use them. Load before generating any marketing page, hero, animated background, or when a user asks for 3D/WebGL/particle effects.
---

# React Bits as a generation toolbox

React Bits is a catalogue of 205 animated React components we can pull into
generated applications. Treat it as a toolbox, not a mandate: most screens are
better without any of it.

## Licence — read before you add anything

React Bits is **MIT + Commons Clause**.

- Allowed: putting component source **inside a generated application**.
- Forbidden: selling, sublicensing or redistributing the components themselves,
  "alone, in a bundle, or as a ported version".

What this means in practice:

- Never copy React Bits source into this repository as a component library.
- Never write a "ported" or "inspired by" reimplementation of a component. If the
  real source is unavailable, build the UI plainly instead.
- Keep the attribution header that `install` prepends to each file.
- Only use what the open registry serves. The ~150 Pro components are not in it
  and must not be reproduced from screenshots or descriptions.

## The catalogue

Metadata lives in `lib/react-bits/registry.json` (no source — that is fetched on
demand). Every component carries: category, description, weight, dimension,
layer, interaction, sections, tags, dependencies, all four variants, and
extracted prop signatures.

| Facet | Values |
| --- | --- |
| category | Backgrounds 57, Components 45, Animations 38, Micro 33, Text Animations 32 |
| weight | `none` 44, `light` 51, `medium` 35, `heavy` 75 |
| dimension | `2d`, `3d` |
| layer | `background`, `foreground` |
| interaction | `pointer`, `scroll`, `timed`, `none` |

**Weight is the number that matters.** It is derived from dependencies:

- `none` — no npm packages. Always safe.
- `light` — `motion`. Fine anywhere.
- `medium` — `gsap`, `lenis`. Fine on marketing pages.
- `heavy` — `three`, `ogl`, `@react-three/*`, `postprocessing`. A WebGL canvas.
  Only when the user asked for 3D, and **never more than one per page**.

## How to use it

### 1. Search

```ts
import { searchComponents, summarise } from "@/lib/react-bits/search";

searchComponents({ q: "animated hero heading", maxWeight: "light", limit: 5 });
searchComponents({ layer: "background", dimension: "2d" });
searchComponents({ requiresDependency: "gsap" });
searchComponents({ excludeDependencies: ["three", "ogl"] });
searchComponents({ section: "stats", maxWeight: "light" });
```

Or over HTTP: `GET /api/react-bits/search?q=...&maxWeight=light`,
`?name=BlurText` for one component's full detail, `?facets=1` for the taxonomy.

### 2. Resolve

```ts
import { resolveComponents } from "@/lib/react-bits/resolver";

resolveComponents({ prompt: "futuristic AI SaaS landing page with 3D" });
```

Returns a shortlist with a reason per component, the page kind it inferred, the
new dependencies implied, and notes explaining anything it refused. Budgets:

| Page kind | Max components | Max weight |
| --- | --- | --- |
| marketing | 4 | medium (heavy only if 3D was requested) |
| content | 2 | light |
| app | 2 | light |
| dashboard | 1 | light |
| **form** | **0** | — |

The resolver is a starting point. You may override its picks, but stay inside
the weight budget unless the user explicitly asked for heavier effects.

### 3. Install

```ts
import { installComponents } from "@/lib/react-bits/install";

const { components, dependencies, failed } = await installComponents(
  ["Aurora", "BlurText"],
  { variant: "TS-TW" },
);
```

This fetches real source from `https://reactbits.dev/r/<Name>-<VARIANT>.json`,
returns the files and the exact dependency specs, and prepends attribution.
`failed` entries must be handled: build that part of the UI without the
component, never fake it.

Over HTTP: `POST /api/react-bits/install { names, variant }`.

### 4. Variant selection

Match the target project's stack:

| Project | Variant |
| --- | --- |
| TypeScript + Tailwind | `TS-TW` |
| TypeScript + CSS modules | `TS-CSS` |
| JavaScript + Tailwind | `JS-TW` |
| JavaScript + CSS | `JS-CSS` |

`resolveVariant` falls back along styling first, then language, so a missing
variant still yields working code.

## When NOT to use React Bits

Default to no components. Add one only when it earns its place.

- A settings form, checkout, login or any data-entry screen: none.
- A dashboard: at most a counting number. Never a glitch or particle effect
  behind a data table.
- Content and docs: at most a scroll reveal.
- A marketing hero: this is where it pays — a background plus an animated
  heading, sometimes a card treatment.

Never add a heavy WebGL component because it looks impressive. It costs seconds
of load, battery, and frame budget, and it breaks on low-end devices. If the
user asked for "3D" or "particles", one is appropriate.

Order of priority when they conflict: user requirements, usability,
accessibility, performance, visual quality, then React Bits.

## Composing sections

Components combine into a section; they do not replace your layout work.

```
Hero      = Aurora (background) + BlurText (heading) + your own CTA buttons
Features  = SpotlightCard x3 inside your own grid
Stats     = CountUp inside your own layout
Showcase  = LogoLoop or Carousel
```

You still write the page: spacing, hierarchy, copy, responsiveness and the
non-animated 90% of the UI. React Bits supplies effects, not page structure.

## Accessibility and performance

- Respect `prefers-reduced-motion`: gate decorative animation behind it.
- Backgrounds are decorative — `aria-hidden` and never the only way to convey
  meaning. Keep text contrast over them at 4.5:1.
- A background canvas should sit behind content with `pointer-events: none`.
- One WebGL canvas maximum. Two will fight for the GPU.

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| "Module not found: ogl" | Dependency not installed | Add the spec from `install`'s `dependencies` |
| Blank area where a background should be | Canvas has no height, or is behind an opaque parent | Give the container explicit size; check stacking |
| Component renders but does not animate | Missing CSS file for a `-CSS` variant | Use the `-TW` variant, or install the CSS file too |
| Hydration mismatch in Next.js | Component touches `window` on first render | Mark the file `"use client"` |
| Type errors on props | Variant mismatch (JS source in a TS project) | Re-install with a `TS-` variant |
| Preview very slow | More than one heavy component | Keep one; swap the rest for `light` equivalents via `lightweightAlternatives()` |
