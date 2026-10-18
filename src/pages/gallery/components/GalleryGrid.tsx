import { useMemo, useState } from "react";
import { galleryCategories, galleryItems } from "@/mocks/gallery";
import { Link } from "react-router-dom";
import GalleryLightbox from "./GalleryLightbox";

export default function GalleryGrid() {
  const [active, setActive] = useState<string>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (active === "All" ? galleryItems : galleryItems.filter((i) => i.category === active)),
    [active],
  );

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: galleryItems.length };
    galleryCategories.forEach((c) => {
      if (c !== "All") map[c] = galleryItems.filter((i) => i.category === c).length;
    });
    return map;
  }, []);

  const open = openIndex !== null ? filtered[openIndex] : null;
  const goPrev = () =>
    setOpenIndex((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length));
  const goNext = () => setOpenIndex((i) => (i === null ? i : (i + 1) % filtered.length));

  return (
    <section className="px-4 md:px-10 py-14 md:py-20">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 md:mb-14">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground-600 mb-4">
            <span className="w-6 h-px bg-foreground-400"></span>
            Browse the gallery
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-medium text-foreground-950 leading-[1.08]">
            Filter by the clean you need.
          </h2>
        </div>
        <p className="text-foreground-700 text-sm md:text-base max-w-sm leading-relaxed">
          Tap any photo to see it larger. Use the arrows to move through the set.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-8 md:mb-10">
        {galleryCategories.map((c) => {
          const isActive = active === c;
          return (
            <button
              key={c}
              onClick={() => {
                setActive(c);
                setOpenIndex(null);
              }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? "bg-primary-500 text-background-50"
                  : "bg-secondary-100 text-secondary-900 hover:bg-secondary-200"
              }`}
            >
              {c}
              <span
                className={`text-xs ${
                  isActive ? "text-background-100/80" : "text-secondary-900/60"
                }`}
              >
                {counts[c]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Mosaic */}
      <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[150px] md:auto-rows-[200px] gap-3 md:gap-5">
        {filtered.map((item, i) => (
          <button
            key={item.id}
            onClick={() => setOpenIndex(i)}
            className={`group relative overflow-hidden rounded-2xl text-left cursor-pointer ${
              item.size === "feature"
                ? "col-span-2 row-span-2"
                : item.size === "tall"
                  ? "row-span-2"
                  : "row-span-1"
            }`}
          >
            <img loading="lazy" decoding="async"
              src={item.image}
              alt={item.caption}
              title={item.caption}
              className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground-950/85 via-foreground-950/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>

            <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-background-50/90 text-foreground-900 text-[11px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap">
              {item.category}
            </span>

            <span className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-background-50/90 text-foreground-900 opacity-0 group-hover:opacity-100 transition-opacity">
              <i className="ri-expand-diagonal-line text-sm"></i>
            </span>

            <span className="absolute inset-x-0 bottom-0 p-4">
              <span className="block font-heading text-background-50 text-sm md:text-base font-medium leading-tight">
                {item.caption}
              </span>
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-foreground-700 text-base">No photos in this category yet.</p>
        </div>
      )}

      {/* Strip CTA under gallery */}
      <div className="mt-10 md:mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 rounded-2xl bg-background-100 border border-background-200/70 p-6 md:p-8">
        <div>
          <h3 className="font-heading text-foreground-950 text-xl md:text-2xl font-medium">
            Want your space in this gallery?
          </h3>
          <p className="text-foreground-700 text-sm mt-1">
            Book a visit and see the same standard up close.
          </p>
        </div>
        <Link
          to="/booking"
          className="group inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-background-50 pl-6 pr-2 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors"
        >
          Book now
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-background-50">
            <i className="ri-arrow-right-line text-primary-600"></i>
          </span>
        </Link>
      </div>

      {open && (
        <GalleryLightbox
          item={open}
          index={openIndex as number}
          total={filtered.length}
          onClose={() => setOpenIndex(null)}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </section>
  );
}