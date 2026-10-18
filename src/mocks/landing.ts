export const business = {
  name: "Lord Cleaning Services",
  shortName: "Lord Cleaning",
  tagline: "Reliable Cleaning You Can Trust",
  phoneDisplay: "(571) 300-3094",
  phoneHref: "tel:+15713003094",
  email: "trylordcleaning@gmail.com",
  emailHref: "mailto:trylordcleaning@gmail.com",
  whatsappDisplay: "(571) 300-3094",
  whatsappHref: "https://wa.me/15713003094",
  hoursWeek: "Monday–Friday · 7:00 AM–6:00 PM",
  hoursSunday: "Saturday–Sunday · 10:00 AM–5:00 PM",
  region: "Northern Virginia",
  cities: [
    "Sterling",
    "Reston",
    "Ashburn",
    "Leesburg",
    "Herndon",
    "Chantilly",
    "Great Falls",
    "McLean",
    "Tysons",
    "Vienna",
  ],
  cityLine:
    "Sterling · Reston · Ashburn · Leesburg · Herndon · Chantilly · Great Falls · McLean · Tysons · Vienna & nearby",
  offerTitle: "Limited Time Offer",
  offerLine: "New clients get 25% OFF their first cleaning.",
} as const;

export const services = [
  {
    id: "standard",
    title: "Standard Cleaning",
    blurb: "Routine upkeep for houses, apartments, condos and townhomes — fresh and tidy.",
    image:
      "/images/services/Standard-Cleaning.webp",
    icon: "ri-home-4-line",
  },
  {
    id: "deep",
    title: "Deep Cleaning",
    blurb: "A top-to-bottom refresh that reaches every overlooked corner.",
    image:
      "/images/services/Deep-Cleaning.webp",
    icon: "ri-sparkling-2-line",
  },
  {
    id: "move",
    title: "Move-In / Move-Out Cleaning",
    blurb: "A spotless handover for moving out or settling into a new place.",
    image:
      "/images/services/Move-In-Move-Out.webp",
    icon: "ri-truck-line",
  },
  {
    id: "commercial",
    title: "Office & Commercial Cleaning",
    blurb: "Reliable cleaning that keeps your workplace sharp and professional.",
    image:
      "/images/services/Office-Commercial.webp",
    icon: "ri-briefcase-4-line",
  },
  {
    id: "construction",
    title: "Post-Construction Cleaning",
    blurb: "Dust, debris and residue cleared after renovations and new builds.",
    image:
      "/images/services/Post-Construction.webp",
    icon: "ri-tools-line",
  },
  {
    id: "airbnb",
    title: "Airbnb / Short-Term Rental Cleaning",
    blurb: "Fast, reliable turnovers that protect your five-star reviews.",
    image:
      "/images/services/Airbnb-Rental.webp",
    icon: "ri-key-2-line",
  },
] as const;

export const howItWorksSteps = [
  {
    number: "01",
    title: "Request your free estimate",
    blurb: "Call, text, or send the form below. We reply within 2 hours.",
  },
  {
    number: "02",
    title: "Get a clear, honest quote",
    blurb: "No obligation, no pressure — just straightforward pricing for your space.",
  },
  {
    number: "03",
    title: "Schedule your clean",
    blurb: "Pick a day and time that fits your life, seven days a week.",
  },
  {
    number: "04",
    title: "Relax, we handle the rest",
    blurb: "Our team arrives on time and leaves everything fresh, clean and organized.",
  },
];

export const stats = [
  { value: "99+", label: "Clients in Northern VA" },
  { value: "2 hr", label: "Average response time" },
  { value: "4.9", label: "Average customer rating" },
  { value: "100%", label: "Satisfaction guaranteed" },
];

export const trustReasons = [
  {
    icon: "ri-shield-user-line",
    title: "Background-checked & insured",
    blurb: "Every cleaner is vetted, trained in person and fully insured before entering your home.",
  },
  {
    icon: "ri-thumb-up-line",
    title: "Satisfaction guaranteed",
    blurb: "If anything is missed, we come back the next day and fix it at no extra cost.",
  },
  {
    icon: "ri-price-tag-3-line",
    title: "Clear quote before we start",
    blurb: "You get the exact price up front. No hidden fees, no pressure to book.",
  },
  {
    icon: "ri-calendar-check-line",
    title: "Flexible scheduling",
    blurb: "Reschedule for free up to 12 hours before your visit.",
  },
  {
    icon: "ri-brush-line",
    title: "Supplies included",
    blurb: "We bring our own products and equipment. You don't need to prepare anything.",
  },
  {
    icon: "ri-translate-2",
    title: "English & Spanish",
    blurb: "Talk to us in the language you prefer, by phone, text or WhatsApp.",
  },
];


export const testimonials = [
  {
    quote:
      "I recently hired LORD Cleaning Services and was very impressed with the quality of their work. They were professional, punctual, and paid attention to the small details that are often overlooked. My kitchen, bathrooms, and living areas looked spotless when they finished. Communication was easy, pricing was fair, and the entire experience was stress-free. I would definitely recommend LORD Cleaning Services to anyone looking for reliable and professional cleaning services in Northern Virginia.",
    name: "DSVIILA",
    initials: "D",
    image:
      "/images/testimonials/Testimonial-Kitchen.webp",
  },
  {
    quote:
      "They did an excellent job. The girls arrived on time, and I'm so glad I hired Lord Cleaning Service. It's the best thing that's ever happened to me. They are fantastic and very professional. They cleaned parts of the house that I've never seen so clean, especially the corners and hard-to-reach areas. I'm very happy with the service. I would definitely recommend them.",
    name: "Maura Juana Flores Juan de Dios",
    initials: "MF",
    image:
      "/images/testimonials/Testimonial-Bathroom.webp",
  },
] as const;

export const faqs = [
  {
    q: "What's included in a standard cleaning?",
    a: "Every standard visit covers kitchens, bathrooms, dusting, floors, trash and bed making. You can add inside-oven, fridge, windows or laundry at booking.",
  },
  {
    q: "How fast will I get my quote?",
    a: "We reply to every estimate request within 2 hours during business hours. There's no cost and no obligation to book.",
  },
  {
    q: "Do you bring your own supplies?",
    a: "Yes. Our team arrives with quality, family-friendly products, microfiber cloths and a HEPA vacuum. Prefer your own products? Just leave a note when you request your quote.",
  },
  {
    q: "Are you insured and background-checked?",
    a: "Every Lord Cleaning professional is background-checked, trained in person and covered by liability insurance on each job, for total peace of mind.",
  },
  {
    q: "What if I'm not happy with the result?",
    a: "We stand behind every clean with our satisfaction guarantee. If anything is missed, tell us within 24 hours and we'll return to make it right at no extra cost.",
  },
  {
    q: "Which areas do you serve?",
    a: "We serve Northern Virginia including Sterling, Reston, Ashburn, Leesburg, Herndon, Chantilly, Great Falls, McLean, Tysons, Vienna and nearby areas.",
  },
];

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Why us", href: "#why-us" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];