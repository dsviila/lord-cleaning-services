import { useEffect } from "react";
import type { GalleryItem } from "@/mocks/gallery";

type Props = {
  item: GalleryItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  index: number;
  total: number;
};

export default function GalleryLightbox({ item, onClose, onPrev, onNext, index, total }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 md:p-8">
      <button
        onClick={onClose}
        aria-label="Close gallery viewer"
        className="absolute inset-0 bg-foreground-950/90 backdrop-blur-sm cursor-zoom-out"
      ></button>

      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-background-50/10 text-background-50 hover:bg-background-50/20 transition-colors cursor-pointer"
      >
        <i className="ri-close-line text-2xl"></i>
      </button>

      <button
        onClick={onPrev}
        aria-label="Previous image"
        className="absolute left-3 md:left-6 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-background-50/10 text-background-50 hover:bg-background-50/20 transition-colors cursor-pointer"
      >
        <i className="ri-arrow-left-s-line text-2xl"></i>
      </button>

      <button
        onClick={onNext}
        aria-label="Next image"
        className="absolute right-3 md:right-6 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-background-50/10 text-background-50 hover:bg-background-50/20 transition-colors cursor-pointer"
      >
        <i className="ri-arrow-right-s-line text-2xl"></i>
      </button>

      <figure className="relative z-10 max-w-5xl w-full">
        <div className="relative rounded-2xl overflow-hidden bg-foreground-950/40">
          <img loading="lazy" decoding="async"
            src={item.image}
            alt={item.caption}
            className="w-full max-h-[72vh] object-contain object-center"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground-950/85 to-transparent p-5 md:p-7">
            <span className="inline-flex items-center gap-2 bg-accent-500 text-background-50 text-xs font-medium px-3 py-1 rounded-full mb-3 whitespace-nowrap">
              <i className="ri-price-tag-3-line"></i>
              {item.category}
            </span>
            <figcaption className="font-heading text-background-50 text-xl md:text-2xl font-medium">
              {item.caption}
            </figcaption>
          </div>
        </div>
        <p className="text-center text-background-100/70 text-xs mt-3">
          {index + 1} / {total}
        </p>
      </figure>
    </div>
  );
}