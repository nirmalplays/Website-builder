/**
 * Default templates shown on the landing screen.
 *
 * TO CUSTOMISE: edit this file only. Add an entry, pick a `category` and a
 * `preview` wireframe, and it appears in the gallery with no other changes.
 * Clicking a card loads its prompt into the composer so it can be edited
 * before generating - templates are starting points, not fixed output.
 */

export const CATEGORIES = [
  "Apps and Games",
  "Landing Pages",
  "Components",
  "Dashboards",
] as const;

export type Category = (typeof CATEGORIES)[number];

/** Abstract wireframe drawn on the card. No image assets to ship or break. */
export type PreviewKind =
  | "dashboard"
  | "landing"
  | "pricing"
  | "form"
  | "grid"
  | "table"
  | "chat"
  | "game"
  | "calendar"
  | "profile";

export type Template = {
  id: string;
  title: string;
  blurb: string;
  category: Category;
  preview: PreviewKind;
  prompt: string;
};

export const TEMPLATES: Template[] = [
  {
    id: "analytics-dashboard",
    title: "Analytics Dashboard",
    blurb: "Sidebar, stat cards, activity table",
    category: "Dashboards",
    preview: "dashboard",
    prompt:
      "A dark analytics dashboard with a left sidebar, four stat cards with trend indicators, and a recent activity table with status badges",
  },
  {
    id: "pricing-page",
    title: "Pricing Page",
    blurb: "Three tiers, annual toggle",
    category: "Landing Pages",
    preview: "pricing",
    prompt:
      "A pricing page with three tiers, a monthly/annual toggle and a highlighted middle plan with a feature comparison list",
  },
  {
    id: "saas-hero",
    title: "SaaS Landing Hero",
    blurb: "Headline, CTA, logo strip",
    category: "Landing Pages",
    preview: "landing",
    prompt:
      "A SaaS landing hero with a bold headline, a subheading, two call-to-action buttons, a product screenshot placeholder and a row of customer logos",
  },
  {
    id: "contact-form",
    title: "Contact Form",
    blurb: "Validated fields, helper text",
    category: "Components",
    preview: "form",
    prompt:
      "A contact form card with name, email, subject and message fields, visible labels, helper text under each field and a submit button",
  },
  {
    id: "product-grid",
    title: "Product Grid",
    blurb: "Filterable store listing",
    category: "Apps and Games",
    preview: "grid",
    prompt:
      "An e-commerce product grid with filter chips along the top, product cards with image, name, price and an add-to-cart button",
  },
  {
    id: "data-table",
    title: "Data Table",
    blurb: "Sortable rows, pagination",
    category: "Components",
    preview: "table",
    prompt:
      "A data table of team members with avatar, name, role, status badge and actions, plus a search field, column headers and pagination controls",
  },
  {
    id: "chat-app",
    title: "Chat Interface",
    blurb: "Threads, composer, presence",
    category: "Apps and Games",
    preview: "chat",
    prompt:
      "A chat interface with a conversation list on the left, a message thread with alternating bubbles and timestamps, and a message composer at the bottom",
  },
  {
    id: "memory-game",
    title: "Memory Game",
    blurb: "Card grid, score, timer",
    category: "Apps and Games",
    preview: "game",
    prompt:
      "A memory card matching game with a 4x4 grid of flippable cards, a move counter, a timer and a restart button, using React state",
  },
  {
    id: "booking-calendar",
    title: "Booking Calendar",
    blurb: "Month view, slot picker",
    category: "Apps and Games",
    preview: "calendar",
    prompt:
      "A booking calendar with a month grid, selectable days, a list of available time slots for the selected day and a confirm button",
  },
  {
    id: "profile-settings",
    title: "Profile Settings",
    blurb: "Tabs, avatar, toggles",
    category: "Components",
    preview: "profile",
    prompt:
      "A profile settings page with tabbed sections, an avatar upload block, text fields for name and bio, and toggle switches for notification preferences",
  },
  {
    id: "finance-overview",
    title: "Finance Overview",
    blurb: "Balance, transactions, cards",
    category: "Dashboards",
    preview: "dashboard",
    prompt:
      "A personal finance dashboard with a balance summary, a spending breakdown by category, a payment card visual and a recent transactions list",
  },
  {
    id: "waitlist-page",
    title: "Waitlist Page",
    blurb: "Email capture, social proof",
    category: "Landing Pages",
    preview: "landing",
    prompt:
      "A minimal waitlist landing page with a centered headline, an email capture field with inline validation, and a line of social proof underneath",
  },
];

/** Quick-start chips under the composer. Shuffled so the set feels alive. */
export const QUICK_STARTS: { label: string; prompt: string }[] = [
  { label: "Contact form", prompt: TEMPLATES[3].prompt },
  { label: "Memory game", prompt: TEMPLATES[7].prompt },
  { label: "Pricing page", prompt: TEMPLATES[1].prompt },
  { label: "Data table", prompt: TEMPLATES[5].prompt },
  { label: "Chat interface", prompt: TEMPLATES[6].prompt },
  { label: "Finance dashboard", prompt: TEMPLATES[10].prompt },
  { label: "Booking calendar", prompt: TEMPLATES[8].prompt },
  { label: "Product grid", prompt: TEMPLATES[4].prompt },
];
