export type ServiceDetail = {
  id: string;
  eyebrow: string;
  headline: string;
  intro: string;
  priceFrom: string;
  priceNote: string;
  duration: string;
  teamSize: string;
  heroImage: string;
  bestFor: string[];
  includes: string[];
  addOns: string[];
  process: { title: string; blurb: string }[];
  gallery: { image: string; caption: string }[];
  faqs: { q: string; a: string }[];
};

export const serviceDetails: ServiceDetail[] = [
  {
    id: "standard",
    eyebrow: "Standard Cleaning",
    headline: "A home that always feels fresh and put together.",
    intro:
      "Our standard cleaning is the routine upkeep that keeps every room fresh, tidy and comfortable — whether you live in a family house, an apartment, a condo or a townhome. The same trained team, the same eye for detail, on a schedule that fits your life.",
    priceFrom: "$110",
    priceNote: "Starting price · final quote is personalized",
    duration: "2–4 hours",
    teamSize: "1–2 pros",
    heroImage:
      "/images/services/Standard-Cleaning-Hero.webp",
    bestFor: ["Family homes", "Apartments", "Condos & townhomes", "Busy professionals"],
    includes: [
      "Kitchen surfaces, sink and stovetop degreased",
      "Bathrooms scrubbed, sanitized and polished",
      "Dusting of all reachable surfaces and décor",
      "Floors vacuumed and mopped throughout",
      "Trash removed and liners replaced",
      "Beds made and cushions arranged",
    ],
    addOns: [
      "Inside oven",
      "Inside fridge",
      "Interior windows",
      "Laundry & folding",
      "Inside cabinets",
    ],
    process: [
      {
        title: "We walk through",
        blurb: "You tell us your priorities and anything to avoid. We note it for every visit.",
      },
      {
        title: "Room by room",
        blurb: "Top to bottom in every room: dust high, clean surfaces, then floors last.",
      },
      {
        title: "Final check",
        blurb: "A quick walkthrough together so you're happy before we leave.",
      },
    ],
    gallery: [
      {
        image:
          "/images/services/Standard-Cleaning-Gallery-1.webp",
        caption: "Bedrooms tidied and refreshed",
      },
      {
        image:
          "/images/services/Standard-Cleaning-Gallery-2.webp",
        caption: "Bathrooms scrubbed and polished",
      },
      {
        image:
          "/images/services/Standard-Cleaning.webp",
        caption: "Living areas left fresh",
      },
    ],
    faqs: [
      {
        q: "Do you bring your own supplies?",
        a: "Yes. We arrive with quality, family-friendly products, microfiber cloths and a HEPA vacuum. Prefer your own? Just leave a note.",
      },
      {
        q: "Can I use the same cleaner every time?",
        a: "Absolutely. Regular clients are matched with a consistent team whenever possible.",
      },
      {
        q: "How often should I book?",
        a: "Most homes choose weekly or bi-weekly. We'll help you find the rhythm that keeps your space feeling its best.",
      },
    ],
  },
  {
    id: "deep",
    eyebrow: "Deep Cleaning",
    headline: "A top-to-bottom reset for the whole home.",
    intro:
      "Deep cleaning reaches every overlooked corner — baseboards, vents, grout, behind appliances and the details a routine clean can't touch. Ideal as a first-time visit, a seasonal reset, or before guests arrive.",
    priceFrom: "$180",
    priceNote: "Starting price · final quote is personalized",
    duration: "4–7 hours",
    teamSize: "2 pros",
    heroImage:
      "/images/services/Deep-Cleaning-Hero.webp",
    bestFor: ["First-time visits", "Seasonal resets", "Before hosting", "Neglected areas"],
    includes: [
      "Everything in a standard residential clean",
      "Baseboards, door frames and light switches",
      "Inside oven and inside fridge",
      "Grout, tile and glass shower doors",
      "Vents, fans and window sills",
      "Behind and under movable furniture",
    ],
    addOns: ["Inside cabinets", "Interior windows", "Garage sweep", "Wall spot-cleaning", "Blinds"],
    process: [
      {
        title: "Details first",
        blurb: "We start with the hidden, high-touch and hard-to-reach areas others skip.",
      },
      {
        title: "Deep clean core",
        blurb: "Kitchen and bathrooms get the full treatment — degrease, descale, sanitize.",
      },
      {
        title: "Reset and shine",
        blurb: "Floors, surfaces and finishes polished last for a crisp, complete finish.",
      },
    ],
    gallery: [
      {
        image:
          "/images/services/Deep-Cleaning-Gallery-1.webp",
        caption: "Inside oven and appliances",
      },
      {
        image:
          "/images/services/Deep-Cleaning-Gallery-2.webp",
        caption: "Grout, tile and glass restored",
      },
      {
        image:
          "/images/services/Deep-Cleaning.webp",
        caption: "Kitchen deep-cleaned and degreased",
      },
    ],
    faqs: [
      {
        q: "How is this different from a regular clean?",
        a: "A regular clean maintains a tidy home. A deep clean resets it — reaching buildup, grime and the areas routine visits don't cover.",
      },
      {
        q: "How often do I need one?",
        a: "Most homes do one to two deep cleans a year, then maintain with regular visits.",
      },
      {
        q: "Does it take longer?",
        a: "Yes — plan for roughly double the time of a standard clean. We'll confirm before we start.",
      },
    ],
  },
  {
    id: "move",
    eyebrow: "Move-In / Move-Out Cleaning",
    headline: "A spotless handover, from keys to keys.",
    intro:
      "Moving is stressful enough. Our move-in and move-out cleaning delivers a truly spotless handover — whether you're settling into a new place, handing back keys or prepping for a sale.",
    priceFrom: "$220",
    priceNote: "Starting price · final quote is personalized",
    duration: "5–8 hours",
    teamSize: "2 pros",
    heroImage:
      "/images/services/Move-In-Move-Out-Hero.webp",
    bestFor: ["Moving out", "New home keys", "Landlords", "Real-estate prep"],
    includes: [
      "Every room cleaned top to bottom",
      "Inside all cabinets, drawers and closets",
      "Inside oven and fridge",
      "Baseboards, doors and light fixtures",
      "Floors vacuumed and mopped",
      "Windows, tracks and blinds",
    ],
    addOns: ["Garage clean-out", "Patio & balcony", "Wall spot-cleaning", "Carpet steam", "Appliance detail"],
    process: [
      {
        title: "Empty-home clean",
        blurb: "With the space cleared, we reach every surface, corner and cabinet.",
      },
      {
        title: "Deep appliance care",
        blurb: "Oven, fridge and cupboards are cleaned inside and out to handover standard.",
      },
      {
        title: "Ready for keys",
        blurb: "A final walkthrough so the home is photo-ready and inspection-ready.",
      },
    ],
    gallery: [
      {
        image:
          "/images/services/Move-In-Move-Out-Gallery-1.webp",
        caption: "Empty rooms, fully reset",
      },
      {
        image:
          "/images/services/Move-In-Move-Out-Gallery-2.webp",
        caption: "Cabinets and appliances inside-out",
      },
      {
        image:
          "/images/services/Move-In-Move-Out.webp",
        caption: "Sunlit, spotless and ready",
      },
    ],
    faqs: [
      {
        q: "How much notice do you need?",
        a: "Ideally 2–3 days. Moving-day turnarounds can sometimes be arranged faster — just ask.",
      },
      {
        q: "Do you clean the garage?",
        a: "Garage and patio clean-outs are available as add-ons so your whole property is covered.",
      },
      {
        q: "Will it pass landlord inspection?",
        a: "Yes. We clean to deposit-return standard, including cabinets, appliances and details.",
      },
    ],
  },
  {
    id: "commercial",
    eyebrow: "Office & Commercial Cleaning",
    headline: "A workplace that looks as sharp as you do.",
    intro:
      "First impressions start at the front door. Our commercial cleaning keeps offices, studios and workspaces consistently clean, professional and ready for clients — with flexible after-hours scheduling.",
    priceFrom: "Custom",
    priceNote: "Tailored quote · scheduled around your hours",
    duration: "Flexible",
    teamSize: "Dedicated crew",
    heroImage:
      "/images/services/Office-Commercial-Hero.webp",
    bestFor: ["Offices", "Studios", "Clinics", "Retail spaces"],
    includes: [
      "Desks, surfaces and shared areas disinfected",
      "Kitchen and break-room cleaning",
      "Restrooms sanitized and restocked",
      "Floors vacuumed, swept and mopped",
      "Trash and recycling emptied",
      "Glass, doors and high-touch points",
    ],
    addOns: ["Carpet extraction", "Interior windows", "Refrigerator detail", "Event prep", "Weekly deep cycles"],
    process: [
      {
        title: "Site walkthrough",
        blurb: "We assess your layout, priorities and preferred cleaning windows.",
      },
      {
        title: "Custom schedule",
        blurb: "Daily, weekly or monthly — we work before opening or after close.",
      },
      {
        title: "Consistent standard",
        blurb: "A dedicated crew and checklist keep quality steady over time.",
      },
    ],
    gallery: [
      {
        image:
          "/images/services/Office-Commercial-Gallery-1.webp",
        caption: "Meeting rooms, client-ready",
      },
      {
        image:
          "/images/services/Office-Commercial-Gallery-2.webp",
        caption: "Break areas kept fresh",
      },
      {
        image:
          "/images/services/Office-Commercial.webp",
        caption: "Workstations disinfected",
      },
    ],
    faqs: [
      {
        q: "Can you clean outside business hours?",
        a: "Yes. We schedule early mornings, evenings or weekends so we never disrupt your team.",
      },
      {
        q: "Do you offer ongoing contracts?",
        a: "We do — daily, weekly or monthly plans with a consistent crew and clear checklists.",
      },
      {
        q: "Are you insured for business premises?",
        a: "Yes, every job is covered by liability insurance for complete peace of mind.",
      },
    ],
  },
  {
    id: "construction",
    eyebrow: "Post-Construction Cleaning",
    headline: "From dusty build site to move-in ready.",
    intro:
      "After a renovation or new build, fine dust and residue get everywhere. Our post-construction cleaning removes debris and coating so your finished space looks exactly the way you designed it.",
    priceFrom: "$260",
    priceNote: "Starting price · final quote is personalized",
    duration: "4–8 hours",
    teamSize: "2–3 pros",
    heroImage:
      "/images/services/Post-Construction-Hero.webp",
    bestFor: ["Renovations", "New builds", "Remodels", "Contractors"],
    includes: [
      "Construction dust removal from all surfaces",
      "Paint spots, stickers and residue cleared",
      "Inside cabinets, drawers and closets",
      "Fixtures, vents and light fittings cleaned",
      "Floors detailed, polished and finished",
      "Windows, tracks and frames cleared",
    ],
    addOns: ["Debris haul-away", "Exterior windows", "Garage and porch", "Wall wash", "Final detail pass"],
    process: [
      {
        title: "Rough removal",
        blurb: "We clear debris, dust and protective films left behind by the build.",
      },
      {
        title: "Detail deep clean",
        blurb: "Every surface, fixture and cabinet is cleaned of residue and fine dust.",
      },
      {
        title: "Final polish",
        blurb: "Floors and glass are finished for a true move-in-ready reveal.",
      },
    ],
    gallery: [
      {
        image:
          "/images/services/Post-Construction-Gallery-1.webp",
        caption: "New kitchens revealed",
      },
      {
        image:
          "/images/services/Post-Construction-Gallery-2.webp",
        caption: "Dust and residue removed",
      },
      {
        image:
          "/images/services/Post-Construction.webp",
        caption: "Move-in ready finishes",
      },
    ],
    faqs: [
      {
        q: "Do you work with contractors?",
        a: "Often. We coordinate directly with builders and project managers for a smooth final clean.",
      },
      {
        q: "Is dust after renovation harmful to surfaces?",
        a: "Fine construction dust can scratch finishes, so a proper post-construction clean protects your investment.",
      },
      {
        q: "Do you remove leftover materials?",
        a: "Debris and packaging haul-away is available as an add-on for a fully clear site.",
      },
    ],
  },
  {
    id: "airbnb",
    eyebrow: "Airbnb & Short-Term Rental Cleaning",
    headline: "Fast turnovers that protect your five-star reviews.",
    intro:
      "Five-star reviews are won in the details between guests. Our short-term rental cleaning delivers quick, reliable turnovers — fresh linens, spotless surfaces and restocked essentials, on your checkout schedule.",
    priceFrom: "$95",
    priceNote: "Starting price per turnover",
    duration: "2–3 hours",
    teamSize: "1–2 pros",
    heroImage:
      "/images/services/Airbnb-Rental-Hero.webp",
    bestFor: ["Airbnb hosts", "Vacation rentals", "Short-term lets", "Guest suites"],
    includes: [
      "Linen change and fresh bed styling",
      "Full bathroom clean and sanitize",
      "Kitchen and dish reset",
      "Floors vacuumed and mopped",
      "Trash removed and restocking",
      "Cushions, décor and staging reset",
    ],
    addOns: ["Laundry service", "Restock supplies", "Welcome staging", "Exterior tidy", "Deep cycle between stays"],
    process: [
      {
        title: "Sync with checkout",
        blurb: "We align to your guest calendar so every turnover hits the check-in window.",
      },
      {
        title: "Reset everything",
        blurb: "Fresh linens, sparkling bath, staged décor and restocked essentials.",
      },
      {
        title: "Guest-ready check",
        blurb: "A final review against your checklist so reviews stay five stars.",
      },
    ],
    gallery: [
      {
        image:
          "/images/services/Airbnb-Rental-Gallery-1.webp",
        caption: "Fresh linens, hotel-style",
      },
      {
        image:
          "/images/services/Airbnb-Rental-Gallery-2.webp",
        caption: "Bathrooms staged for guests",
      },
      {
        image:
          "/images/services/Airbnb-Rental.webp",
        caption: "Turnovers ready for check-in",
      },
    ],
    faqs: [
      {
        q: "Can you work same-day between guests?",
        a: "Yes — tight same-day turnovers are our specialty. Share the checkout and check-in times and we'll plan around them.",
      },
      {
        q: "Do you handle laundry and restocking?",
        a: "Both are available. We can wash linens on-site or bring fresh sets, and restock guest essentials.",
      },
      {
        q: "Do you cover multiple properties?",
        a: "Yes. Many hosts have us manage several rentals on one coordinated schedule.",
      },
    ],
  },
];