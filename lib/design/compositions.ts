/**
 * Layout vocabulary: named compositions a direction may use.
 *
 * "Vary the section rhythm" and "avoid a centred hero" did not change what got
 * built, because the model had nothing specific to use in their place. Each entry
 * here is a layout described precisely enough to build (grid spans, alignment,
 * what goes where), so the planner assigns one by id and the build carries it out.
 */

export type Composition = { id: string; name: string; build: string };

export const HEROES: Record<string, Composition> = {
  "split-bleed": {
    id: "split-bleed",
    name: "Split with bleed",
    build:
      "Tall hero (min-h-[88vh]) on a 12-column grid. Headline spans columns 1-7, anchored to the BOTTOM of the section (flex flex-col justify-end), left-aligned. A single image fills columns 8-12 at full section height and bleeds off the right edge of the viewport (no right padding, no radius unless the direction is rounded). A small caption or key fact in the meta style sits under the image. One primary action under the headline; the secondary is a text link, not a second button.",
  },
  "type-wall": {
    id: "type-wall",
    name: "Type wall",
    build:
      "The headline IS the hero: set at the direction's display size or bigger, full width, broken deliberately onto 2-4 lines of one idea each, left-aligned. No hero image, or one small image inset into the gap after a short line. Beneath it, a row of 3-4 label/value pairs (eyebrow label over a short value) separated by the direction's rule style, e.g. Location / Founded / Clients / Next opening. Action sits at the end of that row.",
  },
  "full-bleed-photo": {
    id: "full-bleed-photo",
    name: "Full-bleed photograph",
    build:
      "One photograph covering the whole first screen (h-[100svh], object-cover). A bottom-up scrim (bg-gradient-to-t from-black/70 via-black/10 to-transparent) for legibility. The headline sits in the BOTTOM-LEFT corner, never centred. A small practical info block (hours, location, next date) sits in the top-right or bottom-right corner in the meta style. Navigation is overlaid and transparent over the photo.",
  },
  "offset-collage": {
    id: "offset-collage",
    name: "Offset collage",
    build:
      "Headline and intro on the left (columns 1-6). On the right, 2-3 images of DIFFERENT sizes and aspect ratios, overlapping each other with absolute positioning or negative margins (one tall portrait, one smaller landscape offset down and left over it, one small detail). One small tag or stamp overlaps an image edge. On mobile the images stack as one large and one small offset.",
  },
  "index-list": {
    id: "index-list",
    name: "Index list",
    build:
      "Two columns. Left (columns 1-5): eyebrow, a short headline, one paragraph, one action. Right (columns 7-12): a numbered list of the 4-6 main offerings, each row separated by a rule, showing number, name and a short descriptor, with a hover state that changes the row (accent colour on the number, arrow slides in). Clicking a row scrolls to or opens its detail.",
  },
  "product-frame": {
    id: "product-frame",
    name: "Product in frame",
    build:
      "Headline, one-sentence proof and actions on the left (columns 1-5). On the right (columns 6-12), the product itself built in JSX, not an image: a window or panel with a title bar, containing real-looking working UI (a table with 5 rows, a terminal with output, a chart made of divs, an invoice) using realistic names and figures. It should respond to interaction: tabs switch, a row highlights, a value updates.",
  },
  "centered-manifesto": {
    id: "centered-manifesto",
    name: "Centred manifesto",
    build:
      "The ONE centred layout allowed, and only for quiet directions. A narrow column (max-w-2xl) with lots of space above and below: a tiny eyebrow, a two-to-three line statement in the display face, and a single text-link action. No second button, no badge, no stats. A thin vertical line below as a scroll cue.",
  },
  "band-stack": {
    id: "band-stack",
    name: "Stacked bands",
    build:
      "The first screen is 3 full-width horizontal bands stacked on top of each other, each a different flat colour from the palette (ground, accent, band). Each band holds one huge line of the headline, so the headline reads across the colours. One band contains a thin marquee of offerings or dates. The primary action sits in the last band.",
  },
  "split-form": {
    id: "split-form",
    name: "Split with working form",
    build:
      "Left (columns 1-6): headline, a short lead, and 3 short proof points as a list with small icons or checks (licences, response time, rating with a count). Right (columns 8-12): a real, working form card above the fold (booking, quote or sign-up, 3-4 fields) with validation and a success state. The form is the primary action, so no separate hero button.",
  },
  ticket: {
    id: "ticket",
    name: "Ticket",
    build:
      "The event's date, time and place set as a huge typographic block (the date may be the biggest thing on screen). Beside or below it, a ticket-stub card: a dashed perforation line (border-dashed) dividing the stub, the price, and a working button to pick a ticket type. A live countdown to the date in the meta or mono style, updating every second.",
  },
};

export const SECTIONS: Record<string, Composition> = {
  "numbered-rows": {
    id: "numbered-rows",
    name: "Numbered rows",
    build:
      "Services or features as full-width rows, not cards. Each row: number (01), name in the h3 style, one-line description, and a price, duration or arrow aligned right. Rows separated by rules. Hover changes the row. Use when there are 3-7 items; use numbering only if order matters or the direction calls for it.",
  },
  "bento-asym": {
    id: "bento-asym",
    name: "Asymmetric bento",
    build:
      "A grid of 4-5 tiles with DIFFERENT spans (e.g. md:grid-cols-6 with tiles spanning 4, 2, 2, 2, 2, or 3 and 3 over 2 and 4). The largest tile holds the most important thing with a real visual inside it (a mini UI, a photo, a big number). Tiles differ in fill, not just in content. Never three equal cards.",
  },
  "sticky-split": {
    id: "sticky-split",
    name: "Sticky split",
    build:
      "Two columns. The left (columns 1-4) holds the section heading and a short intro and stays in place while scrolling (md:sticky md:top-24 self-start). The right (columns 6-12) holds a longer run of content: paragraphs, a list of items, or images, which scrolls past it.",
  },
  "pull-quote": {
    id: "pull-quote",
    name: "Single pull quote",
    build:
      "ONE testimonial set very large in the display or lead face across most of the width, with the person's name, role and a specific detail in the meta style underneath. If there are more testimonials, a small working previous/next control switches between them. Never a row of three testimonial cards with stars.",
  },
  "stat-ledger": {
    id: "stat-ledger",
    name: "Stat ledger",
    build:
      "3-4 figures in a single row, separated by vertical rules (divide-x), each a large number in tabular figures with a short label and, where possible, a source or date in the meta style. The numbers must be specific (1,284 not 1000+).",
  },
  "timeline-rail": {
    id: "timeline-rail",
    name: "Timeline rail",
    build:
      "A vertical line down the left with markers for each dated entry. Each entry: date in mono, title, 1-2 sentences. Used for history, process or milestones.",
  },
  "itinerary-rail": {
    id: "itinerary-rail",
    name: "Itinerary rail",
    build:
      "A day-by-day vertical rail: Day 1, Day 2... each with a place name, distance or duration in mono, and a short description; one image beside the current day. The days are selectable and the selected day expands.",
  },
  "changelog-rail": {
    id: "changelog-rail",
    name: "Changelog rail",
    build:
      "A list of recent releases: version and date in mono on the left, a title and 2-3 bullet changes on the right, rules between entries. Shows a product that ships.",
  },
  "marquee-strip": {
    id: "marquee-strip",
    name: "Marquee strip",
    build:
      "A thin full-width band (py-4) with one line of text or items scrolling horizontally forever: duplicate the content twice inside a flex row and animate it with a CSS keyframe (defined in a <style> tag inside the component) from translateX(0) to translateX(-50%). Add motion-reduce:animate-none. Separators between items are a symbol from the direction (•, ✱, /).",
  },
  "big-cta-band": {
    id: "big-cta-band",
    name: "Closing band",
    build:
      "A full-width section in the band or accent colour, with a statement in the display face across most of the width and one action. It is the one place the page shouts. Not a centred card with a gradient.",
  },
  "footnote-footer": {
    id: "footnote-footer",
    name: "Footnote footer",
    build:
      "A quiet footer laid out like the colophon of a book: 3-4 columns of small meta-style text (address, hours, contact, credits), a very large wordmark set in the display face across the bottom, cropped by the page edge.",
  },
  "menu-leaders": {
    id: "menu-leaders",
    name: "Menu with leaders",
    build:
      "A price list in two columns grouped by category headings. Each line: item name, a dotted leader that fills the gap (flex-1 border-b border-dotted mx-2 translate-y-[-4px]), then the price. A one-line description under some items in the muted colour. Working category tabs or filters if there are more than 3 categories.",
  },
  "offset-collage-band": {
    id: "offset-collage-band",
    name: "Collage band",
    build:
      "A section in the surface colour where 3 images of different sizes overlap at different heights across the width, with a short caption tag pinned to one of them and a paragraph of story text placed in the gap.",
  },
  "hours-card": {
    id: "hours-card",
    name: "Hours and location",
    build:
      "A practical block: opening hours as a small table (day, hours, today's row highlighted using the real current weekday), address, phone number as a tel: link, and a map stand-in (a styled div with the street name and a marker). Place it early, not only in the footer.",
  },
  "gallery-stagger": {
    id: "gallery-stagger",
    name: "Staggered gallery",
    build:
      "Images of different aspect ratios in 2-3 columns where each column is offset vertically (e.g. the middle column starts lower, mt-24). Each image has a small caption. Clicking an image opens a working lightbox with next/previous and Escape to close.",
  },
  "index-list-section": {
    id: "index-list-section",
    name: "Work index",
    build:
      "A plain numbered list of projects or items, one per row: number, title, category, year aligned right. Hovering or focusing a row reveals its image (fixed or floating preview). Filters above it narrow the list.",
  },
  "grid-specimen": {
    id: "grid-specimen",
    name: "Grid specimen",
    build:
      "A strict grid of items with a visible structure: each cell outlined by shared borders (grid with gap-px and a line-coloured background showing through), a number in the corner, a title and a line of detail. Cells are not rounded and do not float.",
  },
  "code-split": {
    id: "code-split",
    name: "Code split",
    build:
      "Left: a short explanation and 3 bullets. Right: a code or config panel in mono with a filename tab bar, real syntax-coloured tokens (spans in 2-3 muted colours plus the accent), working tabs to switch language or example, and a copy button that shows Copied.",
  },
  "schedule-grid": {
    id: "schedule-grid",
    name: "Schedule grid",
    build:
      "A timetable: days as working tabs or columns, each slot with time in big mono, name, and a tag. Slots can be filtered by type and selected or booked, with the state visibly changing.",
  },
  "comparison-table": {
    id: "comparison-table",
    name: "Comparison table",
    build:
      "Plans as columns of a real table rather than cards: a sticky header row with plan names and prices (with a working monthly/annual toggle), then rows of features with checks, limits and figures right-aligned in tabular numbers. The recommended column is marked with a thin accent top border, not a glow.",
  },
  "service-rows": {
    id: "service-rows",
    name: "Service rows with prices",
    build:
      "Each treatment or service as a row: name and short plain description, typical duration, and price, with a working 'Book' action per row that pre-fills the booking form. Group by category with small headings.",
  },
  "team-portraits": {
    id: "team-portraits",
    name: "Team portraits",
    build:
      "Portraits in a consistent crop (aspect-[4/5]) with name, role/credentials and one human detail each. Different number per row than the features above (e.g. 4 here if features were 2). Clicking a portrait expands a short bio.",
  },
  "faq-split": {
    id: "faq-split",
    name: "FAQ split",
    build:
      "Heading and a direct contact line on the left; a working accordion on the right where one item is open at a time, the open item's question in the accent colour, and a plus that turns into a minus.",
  },
  "steps-path": {
    id: "steps-path",
    name: "Steps path",
    build:
      "3-5 steps laid out along a path: large step numbers in the display face, a short title, and a sentence each, connected by a line (horizontal on desktop, vertical on mobile). Include how long each step takes.",
  },
  "news-list": {
    id: "news-list",
    name: "News list",
    build:
      "A list of 3-4 recent items: one featured with a large image on the left, the others as text rows on the right with date in meta style and a title in h3. A working category filter.",
  },
  "spec-table": {
    id: "spec-table",
    name: "Spec table",
    build:
      "Key facts as a two-column spec sheet with rules between rows: label in mono uppercase on the left, value on the right (licence numbers, coverage area, warranty, response time).",
  },
};

export function hero(id: string): Composition | undefined {
  return HEROES[id];
}

export function section(id: string): Composition | undefined {
  return SECTIONS[id];
}
