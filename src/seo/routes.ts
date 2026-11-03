// Per-page SEO data. Used in two places:
//  1. src/seo/Seo.tsx updates <head> in the browser when the route changes.
//  2. scripts/prerender-head.mjs writes a real HTML file per route at build time,
//     so Google, Bing, Facebook and AI crawlers see the right title/canonical
//     without running JavaScript.
// If you add a page, add it here (and to public/sitemap.xml).

export const SITE_URL = "https://lordcleaningservices.com";
export const DEFAULT_IMAGE = "/images/hero/Hero-Living-Room.webp";

export type SeoEntry = {
  path: string;
  title: string;
  description: string;
  image?: string;
  noindex?: boolean;
};

export const seoRoutes: SeoEntry[] = [
  {
    path: "/",
    title: "Lord Cleaning Services | House Cleaning in Northern Virginia",
    description:
      "Lord Cleaning Services offers reliable residential and commercial cleaning across Northern Virginia. Get a free estimate in 2 hours — deep cleaning, recurring, move-out and more. New clients get 25% off.",
  },
  {
    path: "/services/standard",
    title: "Standard House Cleaning in Northern Virginia | Lord Cleaning Services",
    description:
      "Recurring house cleaning for homes, apartments, condos and townhomes in Sterling, Ashburn, Reston and Northern Virginia. Same trained team, from $110. Free estimate in 2 hours.",
    image: "/images/services/Standard-Cleaning-Hero.webp",
  },
  {
    path: "/services/deep",
    title: "Deep Cleaning Services in Northern Virginia | Lord Cleaning Services",
    description:
      "Top-to-bottom deep cleaning in Northern Virginia: baseboards, vents, grout, behind appliances and every overlooked corner. Ideal for first visits and seasonal resets.",
    image: "/images/services/Deep-Cleaning-Hero.webp",
  },
  {
    path: "/services/move",
    title: "Move-In & Move-Out Cleaning in Northern Virginia | Lord Cleaning Services",
    description:
      "Spotless move-in and move-out cleaning for renters, owners and sellers in Sterling, Ashburn, Reston and Northern Virginia. Inside appliances, cabinets and more.",
    image: "/images/services/Move-In-Move-Out-Hero.webp",
  },
  {
    path: "/services/commercial",
    title: "Office & Commercial Cleaning in Northern Virginia | Lord Cleaning Services",
    description:
      "Reliable office and commercial cleaning across Northern Virginia, with flexible after-hours schedules. Keep your workspace clean, professional and client-ready.",
    image: "/images/services/Office-Commercial-Hero.webp",
  },
  {
    path: "/services/construction",
    title: "Post-Construction Cleaning in Northern Virginia | Lord Cleaning Services",
    description:
      "Post-construction and renovation cleaning in Northern Virginia. We remove fine dust, debris and residue so your finished space looks the way you designed it.",
    image: "/images/services/Post-Construction-Hero.webp",
  },
  {
    path: "/services/airbnb",
    title: "Airbnb & Short-Term Rental Cleaning in Northern Virginia | Lord Cleaning Services",
    description:
      "Fast, reliable Airbnb and short-term rental turnovers in Northern Virginia: fresh linens, spotless surfaces and restocked essentials on your checkout schedule.",
    image: "/images/services/Airbnb-Rental-Hero.webp",
  },
  {
    path: "/gallery",
    title: "Cleaning Before & After Photos | Lord Cleaning Services",
    description:
      "See real results from Lord Cleaning Services visits across Northern Virginia — kitchens, bathrooms, living rooms and more, room by room.",
  },
  {
    path: "/cleaners",
    title: "Meet Our Cleaning Team | Lord Cleaning Services",
    description:
      "Meet the trained, background-checked cleaners behind Lord Cleaning Services, a local cleaning company based in Sterling, Virginia.",
  },
  {
    path: "/booking",
    title: "Book a House Cleaning Online | Lord Cleaning Services",
    description:
      "Book your house or office cleaning in Northern Virginia in a few steps. Choose your service, date and time — new clients get 25% off their first clean.",
  },
  {
    path: "/privacy",
    title: "Privacy Policy | Lord Cleaning Services",
    description: "How Lord Cleaning Services collects, uses and protects your information.",
  },
];

const PRIVATE_PREFIX = "/service-agreement";

export function getSeo(pathname: string): SeoEntry | null {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (clean.startsWith(PRIVATE_PREFIX)) {
    return {
      path: clean,
      title: "Service Agreement | Lord Cleaning Services",
      description: "Private service agreement.",
      noindex: true,
    };
  }
  return seoRoutes.find((r) => r.path === clean) ?? null;
}
