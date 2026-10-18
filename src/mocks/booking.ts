export type BookingService = {
  id: string;
  title: string;
  description: string;
  basePrice: number;
  duration: string;
  icon: string;
};

export const bookingServices: BookingService[] = [
  {
    id: "standard",
    title: "Standard Cleaning",
    description: "Routine upkeep for houses, apartments and condos. Fresh, tidy, comfortable.",
    basePrice: 110,
    duration: "≈ 2–4 hrs",
    icon: "ri-home-4-line",
  },
  {
    id: "deep",
    title: "Deep Cleaning",
    description: "A top-to-bottom refresh that reaches every overlooked corner.",
    basePrice: 180,
    duration: "≈ 4–7 hrs",
    icon: "ri-sparkling-2-line",
  },
  {
    id: "move",
    title: "Move-In / Move-Out Cleaning",
    description: "A spotless handover for moving out or settling into a new place.",
    basePrice: 220,
    duration: "≈ 5–8 hrs",
    icon: "ri-truck-line",
  },
  {
    id: "commercial",
    title: "Office & Commercial Cleaning",
    description: "Reliable cleaning that keeps your workplace sharp and professional.",
    basePrice: 0,
    duration: "Flexible schedule",
    icon: "ri-briefcase-4-line",
  },
  {
    id: "construction",
    title: "Post-Construction Cleaning",
    description: "Dust, debris and residue cleared after renovations and new builds.",
    basePrice: 260,
    duration: "≈ 4–8 hrs",
    icon: "ri-tools-line",
  },
  {
    id: "airbnb",
    title: "Airbnb / Short-Term Rental Cleaning",
    description: "Fast, reliable turnovers that protect your five-star reviews.",
    basePrice: 95,
    duration: "≈ 2–3 hrs",
    icon: "ri-key-2-line",
  },
];

export const frequencyOptions = [
  { id: "once", label: "One-time", discount: 0, sublabel: "A single visit" },
  { id: "monthly", label: "Monthly", discount: 0.05, sublabel: "Once a month" },
  { id: "biweekly", label: "Bi-weekly", discount: 0.1, sublabel: "Every two weeks" },
  { id: "weekly", label: "Weekly", discount: 0.15, sublabel: "Every week · most popular" },
] as const;

export const bedroomOptions = ["Studio", "1 BR", "2 BR", "3 BR", "4 BR", "5+ BR"];
export const bathroomOptions = ["1", "1.5", "2", "2.5", "3", "3.5+"];

export const addOns = [
  { id: "laundry", label: "Laundry & folding", price: 25, icon: "ri-shirt-line" },
  { id: "fridge", label: "Inside fridge", price: 30, icon: "ri-fridge-line" },
  { id: "oven", label: "Inside oven", price: 35, icon: "ri-fire-line" },
  { id: "windows", label: "Interior windows", price: 40, icon: "ri-window-line" },
  { id: "cabinets", label: "Inside cabinets", price: 30, icon: "ri-archive-line" },
  { id: "pets", label: "Pet-home extra dust", price: 20, icon: "ri-emotion-happy-line" },
];

export const timeSlots = [
  "8:00 AM",
  "9:30 AM",
  "11:00 AM",
  "12:30 PM",
  "2:00 PM",
  "3:30 PM",
  "5:00 PM",
];

export type BookingCleaner = {
  id: string;
  name: string;
  role: string;
  rate: number;
  rating: number;
  jobs: number;
  bio: string;
  highlights: string[];
  available: string[];
  image: string;
};

export const bookingCleaners: BookingCleaner[] = [
  {
    id: "maya",
    name: "Maya Olsen",
    role: "Senior Cleaner",
    rate: 32,
    rating: 4.96,
    jobs: 612,
    bio: "Six years with Lord Cleaning. Lives for a perfectly streak-free kitchen.",
    highlights: ["Eco products", "Pet-friendly", "English · Norwegian"],
    available: ["8:00 AM", "11:00 AM", "2:00 PM"],
    image:
      "/images/cleaners/Maya-Olsen-Booking.webp",
  },
  {
    id: "daniel",
    name: "Daniel Reyes",
    role: "Deep-Clean Specialist",
    rate: 36,
    rating: 4.92,
    jobs: 438,
    bio: "Detail obsessive. Has been known to send before/after photos unprompted.",
    highlights: ["Deep-clean certified", "Allergen-safe", "English · Spanish"],
    available: ["9:30 AM", "12:30 PM", "3:30 PM"],
    image:
      "/images/cleaners/Daniel-Reyes-Booking.webp",
  },
  {
    id: "aisha",
    name: "Aisha Bennett",
    role: "Eco Clean Lead",
    rate: 34,
    rating: 5.0,
    jobs: 521,
    bio: "Plant-based products only. Will quietly reorganize your spice rack.",
    highlights: ["100% eco", "Plant-based", "English"],
    available: ["8:00 AM", "11:00 AM", "12:30 PM", "5:00 PM"],
    image:
      "/images/cleaners/Aisha-Bennett-Booking.webp",
  },
  {
    id: "liam",
    name: "Liam Hartwell",
    role: "Move-Out Pro",
    rate: 30,
    rating: 4.88,
    jobs: 287,
    bio: "Apartment turnover wizard. Carries his own ladder. Always early.",
    highlights: ["Move-out specialist", "Heavy lift OK", "English"],
    available: ["9:30 AM", "2:00 PM", "3:30 PM", "5:00 PM"],
    image:
      "/images/cleaners/Liam-Hartwell-Booking.webp",
  },
  {
    id: "sofia",
    name: "Sofia Martinez",
    role: "Family Home Specialist",
    rate: 33,
    rating: 4.94,
    jobs: 489,
    bio: "Kid-rooms, pet hair, sticky surfaces — nothing fazes her.",
    highlights: ["Family-safe products", "Pet-friendly", "English · Spanish"],
    available: ["11:00 AM", "2:00 PM", "3:30 PM"],
    image:
      "/images/cleaners/Sofia-Martinez-Booking.webp",
  },
  {
    id: "jonah",
    name: "Jonah Park",
    role: "Studio & Airbnb Pro",
    rate: 31,
    rating: 4.9,
    jobs: 356,
    bio: "Fast, quiet, surgical. Hosts love him. Lives for tight turnovers.",
    highlights: ["Fast turnover", "Linen reset", "English · Korean"],
    available: ["8:00 AM", "9:30 AM", "12:30 PM"],
    image:
      "/images/cleaners/Jonah-Park-Booking.webp",
  },
];