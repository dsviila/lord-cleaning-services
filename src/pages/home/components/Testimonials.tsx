import { useState } from "react";
import { testimonials } from "@/mocks/landing";

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const t = testimonials[idx];
  const hasMultiple = testimonials.length > 1;

  return (
    <section
      id="reviews"
      className="bg-background-50 px-4 md:px-10 py-20 md:py-32 border-t border-background-200/60"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-end">
        <div className="lg:col-span-7 order-2 lg:order-1">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-foreground-950"></span>
            <p className="text-xs uppercase tracking-widest text-foreground-700">Google reviews</p>
          </div>

          <p className="font-heading text-foreground-950 text-lg md:text-2xl lg:text-3xl font-light leading-snug max-w-3xl">
            <span className="text-accent-500">“</span>
            {t.quote}
          </p>

          <div className="mt-10 flex items-center gap-4">
            <span className="w-12 h-12 rounded-full bg-accent-500 text-background-50 flex items-center justify-center font-heading text-lg font-medium flex-shrink-0">
              {t.initials}
            </span>
            <div>
              <p className="font-heading text-foreground-950 text-base font-medium">{t.name}</p>
              <p className="text-foreground-600 text-sm flex items-center gap-2">
                <i className="ri-shield-check-line text-primary-600"></i>
                Verified Google review
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <span className="flex items-center gap-0.5 text-amber-400 text-base">
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
            </span>
            <span className="text-foreground-700 text-sm font-medium">5.0 on Google</span>
          </div>

          <a
            href="https://g.page/r/CTGvw-jFUqUWEAI/review"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 bg-primary-500 text-foreground-950 rounded-md px-5 py-2.5 text-sm font-medium whitespace-nowrap hover:bg-primary-600 transition-colors"
          >
            <i className="ri-google-fill"></i>
            Leave us a review on Google
          </a>

          {hasMultiple && (
            <div className="mt-10 flex items-center gap-3">
              <button
                onClick={() => setIdx((idx - 1 + testimonials.length) % testimonials.length)}
                className="w-11 h-11 flex items-center justify-center rounded-full border border-foreground-300 text-foreground-800 hover:bg-foreground-950 hover:text-background-50 hover:border-foreground-950 transition-colors"
                aria-label="Previous"
              >
                <i className="ri-arrow-left-line"></i>
              </button>
              <button
                onClick={() => setIdx((idx + 1) % testimonials.length)}
                className="w-11 h-11 flex items-center justify-center rounded-full border border-foreground-300 text-foreground-800 hover:bg-foreground-950 hover:text-background-50 hover:border-foreground-950 transition-colors"
                aria-label="Next"
              >
                <i className="ri-arrow-right-line"></i>
              </button>
              <span className="ml-2 text-foreground-600 text-sm">
                {String(idx + 1).padStart(2, "0")}{" "}
                <span className="text-foreground-400">/ {String(testimonials.length).padStart(2, "0")}</span>
              </span>
            </div>
          )}
        </div>

        <div className="lg:col-span-5 order-1 lg:order-2">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-background-100">
            <img loading="lazy" decoding="async"
              key={idx}
              src={t.image}
              alt={`Home cleaned by Lord Cleaning Services — review by ${t.name}`}
              className="w-full h-full object-cover object-top animate-review-fade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}