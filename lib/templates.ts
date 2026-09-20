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
    id: "wedding-site",
    title: "Wedding",
    blurb: "Story, schedule, RSVP",
    category: "Websites",
    preview: "landing",
    prompt:
      "A complete wedding website as one page: elegant nav, a hero with the couple names and wedding date, an our story timeline, ceremony and reception details with times and addresses, a bridal party grid, a photo gallery, an RSVP form with meal choice and plus-one, a gift registry list, travel and accommodation notes, and a footer",
  },
  {
    id: "law-firm-site",
    title: "Law Firm",
    blurb: "Practice areas, attorneys",
    category: "Websites",
    preview: "website",
    prompt:
      "A complete law firm website as one page: professional nav with a phone number, a hero with a confident headline and free consultation CTA, a practice areas grid of six, attorney profiles with credentials and bar admissions, case results with figures, client testimonials, an about the firm section, a consultation request form, and a footer with office addresses",
  },
  {
    id: "construction-site",
    title: "Construction",
    blurb: "Projects, services, quote",
    category: "Websites",
    preview: "listing",
    prompt:
      "A complete construction company website as one page: nav with a Get a quote button, a hero over a site photo placeholder, a services grid of six, a completed projects gallery with project type and year, a process timeline of five steps, certifications and safety record, team foremen, a quote request form with project type and budget range, and a footer",
  },
  {
    id: "barbershop-site",
    title: "Barbershop",
    blurb: "Services, barbers, booking",
    category: "Websites",
    preview: "menu",
    prompt:
      "A complete barbershop website as one page: bold nav, a hero with a book now CTA, a services price list of cuts and shaves, barber profiles with specialities and years of experience, a gallery of cuts, opening hours by day, a booking form with barber and time selection, customer reviews, and a footer with address",
  },
  {
    id: "coffee-shop-site",
    title: "Coffee Shop",
    blurb: "Menu, story, locations",
    category: "Websites",
    preview: "menu",
    prompt:
      "A complete coffee shop website as one page: warm nav, a hero with the shop name and tagline, a drinks menu by category with prices, a food menu, a roastery story section, a bean sourcing section, locations with hours, a loyalty programme block, and a footer",
  },
  {
    id: "bakery-site",
    title: "Bakery",
    blurb: "Products, orders, gallery",
    category: "Websites",
    preview: "grid",
    prompt:
      "A complete artisan bakery website as one page: nav with a cart, a hero featuring the daily bakes, a product grid of breads and pastries with prices, a custom cake ordering section with tiers and flavours, a bakers story section, a gallery, delivery and pickup info, a contact form, and a footer",
  },
  {
    id: "dentist-site",
    title: "Dental Practice",
    blurb: "Services, team, appointments",
    category: "Websites",
    preview: "website",
    prompt:
      "A complete dental practice website as one page: nav with an emergency number, a reassuring hero with a book appointment CTA, a treatments grid including cosmetic and general dentistry, meet the dentists with qualifications, a before and after gallery with image placeholders, insurance and payment plans, patient reviews, an appointment form, and a footer",
  },
  {
    id: "veterinary-site",
    title: "Veterinary Clinic",
    blurb: "Services, vets, booking",
    category: "Websites",
    preview: "website",
    prompt:
      "A complete veterinary clinic website as one page: friendly nav, a hero with an emergency banner, services for dogs cats and exotics, veterinarian profiles with specialities, a pet wellness plans pricing section, clinic hours, patient stories with pet names, an appointment booking form with pet type, and a footer",
  },
  {
    id: "yoga-studio-site",
    title: "Yoga Studio",
    blurb: "Classes, teachers, passes",
    category: "Websites",
    preview: "calendar",
    prompt:
      "A complete yoga studio website as one page: calm nav, a hero with a first class free offer, a weekly class schedule grid by day and time, class type descriptions, teacher profiles, membership and class pass pricing, a studio gallery, student testimonials, a trial signup form, and a footer",
  },
  {
    id: "spa-site",
    title: "Spa and Wellness",
    blurb: "Treatments, packages, booking",
    category: "Websites",
    preview: "menu",
    prompt:
      "A complete spa website as one page: serene nav, a hero with a book a treatment CTA, a treatments menu with durations and prices, spa packages, a facilities list, therapist profiles, a gift vouchers block, opening hours, a booking enquiry form, and a footer",
  },
  {
    id: "music-band-site",
    title: "Music Band",
    blurb: "Tour dates, music, merch",
    category: "Websites",
    preview: "gallery",
    prompt:
      "A complete band website as one page: nav, a full-bleed hero with the band name and a new album banner, upcoming tour dates with venue city and ticket buttons, a discography grid of albums, a music player mockup with a track list, a photo gallery, a merch row, a mailing list signup, and a footer",
  },
  {
    id: "podcast-site",
    title: "Podcast",
    blurb: "Episodes, hosts, subscribe",
    category: "Websites",
    preview: "article",
    prompt:
      "A complete podcast website as one page: nav, a hero with the show name, tagline and subscribe buttons, the latest episode featured with a player mockup and show notes, an episode list of eight with numbers durations and dates, about the hosts, guest highlights, listener reviews, a newsletter signup, and a footer",
  },
  {
    id: "news-magazine-site",
    title: "News Magazine",
    blurb: "Headlines, sections, ticker",
    category: "Websites",
    preview: "article",
    prompt:
      "A complete news magazine homepage as one page: a top bar with the date and a breaking news ticker, nav with sections, a lead story with a large image placeholder, a secondary stories grid, a most read sidebar list, sections for business technology and culture each with three stories, an opinion column block, a newsletter signup, and a footer",
  },
  {
    id: "job-board-site",
    title: "Job Board",
    blurb: "Listings, filters, apply",
    category: "Websites",
    preview: "table",
    prompt:
      "A complete job board website as one page: nav with a post a job button, a hero with a job search bar for role location and type, filter chips for remote and seniority, a job listings list of eight with company role salary range and posted date, a featured companies row, a candidate signup block, and a footer",
  },
  {
    id: "crypto-site",
    title: "Crypto Platform",
    blurb: "Markets, features, security",
    category: "Websites",
    preview: "dashboard",
    prompt:
      "A complete crypto exchange landing page as one page: nav with a sign up CTA, a hero with a price ticker strip of four coins, a market table of eight assets with price change and volume, a platform features grid, a security and custody section, a fee comparison, supported countries, an FAQ, and a footer with a regulatory disclaimer",
  },
  {
    id: "mobile-app-site",
    title: "Mobile App",
    blurb: "Features, screens, download",
    category: "Websites",
    preview: "landing",
    prompt:
      "A complete mobile app landing page as one page: nav, a hero with the app name, a value line, app store download buttons and a phone mockup placeholder, a features grid of six with icons, a three-screen walkthrough, user reviews with star ratings, a free tier block, an FAQ, and a footer",
  },
  {
    id: "game-studio-site",
    title: "Game Studio",
    blurb: "Games, trailer, team",
    category: "Websites",
    preview: "gallery",
    prompt:
      "A complete game studio website as one page: dark nav, a hero with the flagship game title and a watch trailer CTA, a games grid of six with platform tags and release years, a features showcase for the latest title, the studio team, press quotes with outlet names, a wishlist and newsletter block, and a footer",
  },
  {
    id: "interior-design-site",
    title: "Interior Design",
    blurb: "Projects, process, consult",
    category: "Websites",
    preview: "gallery",
    prompt:
      "A complete interior design studio website as one page: refined nav, a hero with a portfolio image placeholder, a projects gallery with room type and location, a design process in four steps, services and packages with starting prices, designer profiles, client testimonials, a consultation booking form, and a footer",
  },
  {
    id: "architecture-site",
    title: "Architecture Firm",
    blurb: "Works, practice, contact",
    category: "Websites",
    preview: "gallery",
    prompt:
      "A complete architecture firm website as one page: minimal nav, a hero with a signature building image placeholder, a selected works grid with project name year and typology, a practice philosophy section, a services list, awards and publications, the team, a contact block with studio address, and a footer",
  },
  {
    id: "car-dealership-site",
    title: "Car Dealership",
    blurb: "Inventory, finance, trade-in",
    category: "Websites",
    preview: "listing",
    prompt:
      "A complete car dealership website as one page: nav with a phone number, a hero with an inventory search by make model and price, a featured vehicles grid of six with mileage year and price, a finance calculator teaser, a trade-in valuation form, a why buy from us section, customer reviews, a service department block, and a footer",
  },
  {
    id: "hotel-site",
    title: "Hotel",
    blurb: "Rooms, amenities, booking",
    category: "Websites",
    preview: "listing",
    prompt:
      "A complete hotel website as one page: elegant nav, a hero with a check-in check-out and guests booking bar, room types with image placeholders rates and occupancy, an amenities grid, dining and spa sections, a location and nearby attractions block, guest reviews with ratings, an offers section, and a footer",
  },
  {
    id: "university-site",
    title: "University",
    blurb: "Programmes, campus, apply",
    category: "Websites",
    preview: "website",
    prompt:
      "A complete university website as one page: nav with an Apply button, a hero with an admissions deadline banner, a programmes grid by faculty, a campus life gallery, admissions requirements and key dates, tuition and scholarships, student testimonials, faculty highlights, a request info form, and a footer",
  },
  {
    id: "daycare-site",
    title: "Daycare and Preschool",
    blurb: "Programmes, staff, enrol",
    category: "Websites",
    preview: "website",
    prompt:
      "A complete daycare and preschool website as one page: warm friendly nav, a hero with an enrol now CTA, age-group programmes with daily schedules, teachers with certifications, safety and licensing information, a typical day timeline, tuition rates, parent testimonials, an enrolment enquiry form, and a footer",
  },
  {
    id: "pet-store-site",
    title: "Pet Store",
    blurb: "Products, grooming, deals",
    category: "Websites",
    preview: "grid",
    prompt:
      "A complete pet store website as one page: playful nav with a cart, a hero promo banner, category tiles for dogs cats and small pets, a bestselling products grid with prices and ratings, a grooming services section with prices, a subscription box offer, a customer pet photos section, a newsletter block, and a footer",
  },
  {
    id: "fashion-brand-site",
    title: "Fashion Brand",
    blurb: "Lookbook, collection, shop",
    category: "Websites",
    preview: "gallery",
    prompt:
      "A complete fashion brand website as one page: minimal nav with a cart, a full-bleed campaign hero, a new collection product grid with prices, a lookbook gallery, a brand story and materials section, a sizing and fit block, press mentions, an email signup for drops, and a footer",
  },
  {
    id: "jewelry-site",
    title: "Jewelry Store",
    blurb: "Collections, craft, custom",
    category: "Websites",
    preview: "grid",
    prompt:
      "A complete jewellery store website as one page: refined nav, a hero with a featured collection, a collections grid with prices, a custom design consultation section, materials and craftsmanship, care instructions, customer stories, an appointment booking block, and a footer with certifications",
  },
  {
    id: "furniture-store-site",
    title: "Furniture Store",
    blurb: "Rooms, products, delivery",
    category: "Websites",
    preview: "grid",
    prompt:
      "A complete furniture store website as one page: nav with a cart, a hero with a seasonal sale banner, shop by room tiles, a featured products grid with prices and materials, a design services block, delivery and assembly information, a warranty section, customer reviews, and a footer",
  },
  {
    id: "home-services-site",
    title: "Home Services",
    blurb: "Services, quote, coverage",
    category: "Websites",
    preview: "website",
    prompt:
      "A complete home services company website as one page: nav with a 24/7 phone number, a hero with an emergency callout CTA, a services grid for plumbing heating and electrical, a transparent pricing table for common jobs, a service area coverage list, technicians with certifications, customer reviews, a booking form with urgency selection, and a footer",
  },
  {
    id: "accounting-site",
    title: "Accounting Firm",
    blurb: "Services, industries, consult",
    category: "Websites",
    preview: "website",
    prompt:
      "A complete accounting firm website as one page: professional nav, a hero with a free consultation CTA, a services grid including tax bookkeeping and advisory, industries served, pricing packages for individuals and businesses, accountants with qualifications, client testimonials with company names, key tax deadlines, a contact form, and a footer",
  },
  {
    id: "coworking-site",
    title: "Coworking Space",
    blurb: "Spaces, plans, tour",
    category: "Websites",
    preview: "listing",
    prompt:
      "A complete coworking space website as one page: nav with a book a tour button, a hero with the space name and a day pass offer, workspace types with capacity and pricing, an amenities grid, a photo gallery of the space, a membership plans comparison, a community events list, member testimonials, a tour booking form, and a footer with location",
  },
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
