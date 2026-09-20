/**
 * Default templates shown on the landing screen.
 *
 * TO CUSTOMISE: edit this file only. Add an entry, pick a `category` and a
 * `preview` wireframe, and it appears in the gallery with no other changes.
 * Clicking a card loads its prompt into the composer so it can be edited
 * before generating - templates are starting points, not fixed output.
 */

export const CATEGORIES = [
  "Websites",
  "Apps and Games",
  "Landing Pages",
  "Components",
  "Dashboards",
] as const;

export type Category = (typeof CATEGORIES)[number];

/** Abstract wireframe drawn on the card. No image assets to ship or break. */
export type PreviewKind =
  | "website"
  | "gallery"
  | "article"
  | "menu"
  | "listing"
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
    id: "agency-site",
    title: "Creative Agency",
    blurb: "Hero, services, work, contact",
    category: "Websites",
    preview: "website",
    prompt:
      "A complete creative agency website as one page: sticky nav with logo and links, a bold hero with a headline and two CTAs, a services grid of six cards with icons, a selected work gallery of six projects, a team row with four people, a client logo strip, a testimonial, and a footer with columns and social links",
  },
  {
    id: "restaurant-site",
    title: "Restaurant",
    blurb: "Menu, hours, reservations",
    category: "Websites",
    preview: "menu",
    prompt:
      "A complete restaurant website as one page: nav with a Reserve button, a full-bleed hero with the restaurant name and tagline, an about section, a menu with three courses and prices, a chef highlight, opening hours, a reservation form with date, time and party size, a location block with address, and a footer",
  },
  {
    id: "real-estate-site",
    title: "Real Estate",
    blurb: "Listings, search, agents",
    category: "Websites",
    preview: "listing",
    prompt:
      "A complete real estate website as one page: nav, a hero with a property search bar for location, price and bedrooms, a featured listings grid of six property cards with photo, price, beds, baths and square footage, a neighbourhoods section, an agents row, a testimonial, a mortgage calculator teaser, and a footer",
  },
  {
    id: "portfolio-site",
    title: "Developer Portfolio",
    blurb: "About, projects, resume",
    category: "Websites",
    preview: "profile",
    prompt:
      "A complete personal developer portfolio as one page: minimal nav, a hero with name, role and short intro, an about section with a photo placeholder, a skills grid, a projects list of five entries with description and tech tags, a work experience timeline, and a contact section with email and social links",
  },
  {
    id: "ecommerce-site",
    title: "Online Store",
    blurb: "Storefront, cart, categories",
    category: "Websites",
    preview: "listing",
    prompt:
      "A complete e-commerce storefront as one page: nav with search and a cart badge, a promotional hero banner, category tiles, a best sellers product grid of eight items with price and rating, a sale banner, a customer reviews row, a newsletter signup, and a footer with payment icons",
  },
  {
    id: "blog-site",
    title: "Blog & Magazine",
    blurb: "Featured post, grid, sidebar",
    category: "Websites",
    preview: "article",
    prompt:
      "A complete blog homepage as one page: nav with categories, a featured post hero with image placeholder and excerpt, a grid of nine article cards with category tag, title, author and read time, a sidebar with popular posts and tags, pagination, a newsletter block, and a footer",
  },
  {
    id: "conference-site",
    title: "Conference",
    blurb: "Speakers, schedule, tickets",
    category: "Websites",
    preview: "calendar",
    prompt:
      "A complete conference website as one page: nav with a Get tickets button, a hero with event name, date, city and countdown, an about section, a speakers grid of eight people with photo placeholders, a three-track agenda by time slot, ticket tiers with prices, sponsors logos, an FAQ accordion, and a footer",
  },
  {
    id: "gym-site",
    title: "Fitness Studio",
    blurb: "Classes, trainers, membership",
    category: "Websites",
    preview: "website",
    prompt:
      "A complete fitness studio website as one page: nav, a high-energy hero with a join CTA, a class schedule table by weekday, a trainers row of four with specialities, membership pricing tiers, a transformation results section, a testimonial slider layout, a free trial form, and a footer",
  },
  {
    id: "clinic-site",
    title: "Medical Clinic",
    blurb: "Services, doctors, booking",
    category: "Websites",
    preview: "website",
    prompt:
      "A complete medical clinic website as one page: nav with a phone number, a reassuring hero with an appointment CTA, a services grid of six specialities with icons, a doctors row with credentials, opening hours, an insurance accepted strip, patient testimonials, an appointment booking form, and a footer with map placeholder",
  },
  {
    id: "travel-site",
    title: "Travel Agency",
    blurb: "Destinations, packages, booking",
    category: "Websites",
    preview: "gallery",
    prompt:
      "A complete travel agency website as one page: nav, a hero with a destination search, a popular destinations gallery of six cards with country and price from, tour packages with duration and inclusions, a why choose us row, traveller reviews with star ratings, a newsletter for deals, and a footer",
  },
  {
    id: "photography-site",
    title: "Photography",
    blurb: "Gallery, services, enquiry",
    category: "Websites",
    preview: "gallery",
    prompt:
      "A complete photography portfolio website as one page: minimal nav, a full-bleed hero image placeholder with the photographer name, a masonry gallery of nine images, a services and packages section with prices, an about the photographer block, client testimonials, an enquiry form with event type and date, and a minimal footer",
  },
  {
    id: "nonprofit-site",
    title: "Nonprofit",
    blurb: "Mission, impact, donate",
    category: "Websites",
    preview: "website",
    prompt:
      "A complete nonprofit website as one page: nav with a prominent Donate button, a mission hero, an impact statistics row with four large numbers, programmes grid of four, a story section with a beneficiary quote, a donation block with preset amounts and a custom field, volunteer signup, partner logos, and a footer",
  },
  {
    id: "startup-site",
    title: "Startup Launch",
    blurb: "Product, features, waitlist",
    category: "Websites",
    preview: "landing",
    prompt:
      "A complete startup launch website as one page: nav, a hero with product name, one-line pitch and an email waitlist field, a problem and solution section, a features grid of six with icons, a how it works three-step flow, an early access pricing preview, founder bios, an FAQ, and a footer",
  },
  {
    id: "course-site",
    title: "Online Course",
    blurb: "Curriculum, instructor, enroll",
    category: "Websites",
    preview: "article",
    prompt:
      "A complete online course landing page as one page: nav with an Enroll button, a hero with course title, outcome promise and rating, what you will learn checklist, a curriculum accordion of eight modules with lesson counts, an instructor bio with credentials, student testimonials, pricing with a money-back guarantee, an FAQ, and a footer",
  },
  {
    id: "saas-site",
    title: "SaaS Product",
    blurb: "Full marketing site",
    category: "Websites",
    preview: "website",
    prompt:
      "A complete SaaS marketing website as one page: sticky nav with links and a Start free trial button, a hero with headline, subheadline, CTA and a product screenshot placeholder, a logo cloud, a features section alternating text and visuals, an integrations grid, a three-tier pricing table with an annual toggle, customer testimonials with avatars, a final CTA band, and a footer with four link columns",
  },
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

/** Look a template up by id, so chips never break when the list is reordered. */
export function templateById(id: string): Template | undefined {
  return TEMPLATES.find((t) => t.id === id);
}

/** Quick-start chips under the composer. Rotated by the shuffle button. */
export const QUICK_STARTS: { label: string; prompt: string }[] = [
  "saas-site",
  "restaurant-site",
  "memory-game",
  "portfolio-site",
  "pricing-page",
  "ecommerce-site",
  "chat-app",
  "conference-site",
  "data-table",
  "photography-site",
]
  .map((id) => templateById(id))
  .filter((t): t is Template => Boolean(t))
  .map((t) => ({ label: t.title, prompt: t.prompt }));
