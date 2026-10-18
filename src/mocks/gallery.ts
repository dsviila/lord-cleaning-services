export type GalleryItem = {
  id: string;
  image: string;
  caption: string;
  category: string;
  size: "tall" | "wide" | "feature";
};

export const galleryCategories = [
  "All",
  "Residential",
  "Kitchens",
  "Bathrooms",
  "Deep Clean",
  "Move-Out",
  "Office",
  "Our Team",
] as const;

export const galleryItems: GalleryItem[] = [
  {
    id: "g00",
    image:
      "/images/gallery/Branded-SUV.webp",
    caption: "Our branded SUV, arriving on time",
    category: "Our Team",
    size: "feature",
  },
  {
    id: "g01",
    image:
      "/images/gallery/Gallery-01.webp",
    caption: "Living room reset, Sterling",
    category: "Residential",
    size: "tall",
  },
  {
    id: "g02",
    image:
      "/images/gallery/Gallery-02.webp",
    caption: "Kitchen detailed top to bottom",
    category: "Kitchens",
    size: "wide",
  },
  {
    id: "g03",
    image:
      "/images/gallery/Gallery-03.webp",
    caption: "Bathroom scrubbed and polished",
    category: "Bathrooms",
    size: "tall",
  },
  {
    id: "g04",
    image:
      "/images/gallery/Gallery-04.webp",
    caption: "Baseboards, frames and switches",
    category: "Deep Clean",
    size: "tall",
  },
  {
    id: "g05",
    image:
      "/images/gallery/Gallery-05.webp",
    caption: "Bedrooms tidied and refreshed",
    category: "Residential",
    size: "wide",
  },
  {
    id: "g06",
    image:
      "/images/gallery/Gallery-06.webp",
    caption: "Empty home, move-out ready",
    category: "Move-Out",
    size: "tall",
  },
  {
    id: "g07",
    image:
      "/images/gallery/Gallery-07.webp",
    caption: "Office cleaned after hours",
    category: "Office",
    size: "wide",
  },
  {
    id: "g08",
    image:
      "/images/team/Lord-Team-Group.webp",
    caption: "The crew at work",
    category: "Our Team",
    size: "tall",
  },
  {
    id: "g09",
    image:
      "/images/gallery/Gallery-09.webp",
    caption: "Counters degreased and shining",
    category: "Kitchens",
    size: "tall",
  },
  {
    id: "g10",
    image:
      "/images/gallery/Gallery-10.webp",
    caption: "Glass showers, streak-free",
    category: "Bathrooms",
    size: "wide",
  },
  {
    id: "g11",
    image:
      "/images/gallery/Gallery-11.webp",
    caption: "Inside oven and appliances",
    category: "Deep Clean",
    size: "tall",
  },
  {
    id: "g12",
    image:
      "/images/gallery/Gallery-12.webp",
    caption: "Open living and dining reset",
    category: "Residential",
    size: "wide",
  },
  {
    id: "g13",
    image:
      "/images/gallery/Gallery-13.webp",
    caption: "Meeting rooms, client-ready",
    category: "Office",
    size: "tall",
  },
  {
    id: "g14",
    image:
      "/images/gallery/Living-Room.webp",
    caption: "Supplies ready, on time",
    category: "Our Team",
    size: "tall",
  },
  {
    id: "g15",
    image:
      "/images/gallery/Gallery-15.webp",
    caption: "Deposit-return standard",
    category: "Move-Out",
    size: "wide",
  },
  {
    id: "g16",
    image:
      "/images/gallery/Gallery-16.webp",
    caption: "Warm, sunlit and fresh",
    category: "Residential",
    size: "tall",
  },
  {
    id: "g17",
    image:
      "/images/gallery/Gallery-17.webp",
    caption: "Towels rolled, guest-ready",
    category: "Bathrooms",
    size: "wide",
  },
  {
    id: "g18",
    image:
      "/images/gallery/Gallery-18.webp",
    caption: "Grout and tile restored",
    category: "Deep Clean",
    size: "tall",
  },
  {
    id: "g19",
    image:
      "/images/gallery/Gallery-19.webp",
    caption: "Break areas kept fresh",
    category: "Office",
    size: "wide",
  },
  {
    id: "g20",
    image:
      "/images/gallery/Kitchen.webp",
    caption: "One team, every visit",
    category: "Our Team",
    size: "tall",
  },
  {
    id: "g21",
    image:
      "/images/gallery/Living-Room-2.webp",
    caption: "Main level reset, Ashburn",
    category: "Residential",
    size: "wide",
  },
  {
    id: "g22",
    image:
      "/images/gallery/Cozy-Basement.webp",
    caption: "Finished basement reset, Chantilly",
    category: "Residential",
    size: "wide",
  },
  {
    id: "g23",
    image:
      "/images/gallery/Basement-2.webp",
    caption: "Rec room and game area, Fairfax",
    category: "Residential",
    size: "wide",
  },
  {
    id: "g24",
    image:
      "/images/gallery/Deep-Cleaning-2.webp",
    caption: "Bathroom deep clean, Leesburg",
    category: "Deep Clean",
    size: "wide",
  },
  {
    id: "g25",
    image:
      "/images/gallery/Move-Out-2.webp",
    caption: "Turnover kitchen, Springfield",
    category: "Move-Out",
    size: "wide",
  },
  {
    id: "g26",
    image:
      "/images/gallery/Move-Out-3.webp",
    caption: "Empty unit, handover ready, Burke",
    category: "Move-Out",
    size: "tall",
  },
];