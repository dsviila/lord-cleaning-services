import { useState } from "react";
import { business, faqs } from "@/mocks/landing";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-background-100 px-4 md:px-10 py-20 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
        <div className="lg:col-span-4">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground-600 mb-4">
            <span className="w-6 h-px bg-foreground-400"></span>
            Questions, answered
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium text-foreground-950 leading-[1.05] mb-6">
            Everything you'd want to know before booking.
          </h2>
          <p className="text-foreground-700 text-sm leading-relaxed mb-8">
            Can't find what you're looking for? Our friendly team replies within 2 hours,
            seven days a week.
          </p>
          <a
            href={business.emailHref}
            className="inline-flex items-center gap-2 text-foreground-900 text-sm font-medium border-b border-foreground-400 pb-0.5 hover:text-primary-700 hover:border-primary-700 whitespace-nowrap"
          >
            Email {business.email}
            <i className="ri-arrow-right-up-line"></i>
          </a>
        </div>

        <div className="lg:col-span-8 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <article
                key={f.q}
                className={`rounded-2xl border transition-colors ${
                  isOpen
                    ? "bg-background-50 border-foreground-300"
                    : "bg-background-50/60 border-background-200/70 hover:border-foreground-300"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 text-left px-6 py-5"
                >
                  <h4 className="font-heading text-foreground-950 text-base md:text-lg font-medium">
                    <a href={`#faq-${i}`} className="hover:text-primary-700">
                      {f.q}
                    </a>
                  </h4>
                  <span
                    className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors ${
                      isOpen ? "bg-primary-500 text-background-50" : "bg-background-100 text-foreground-800"
                    }`}
                  >
                    <i className={isOpen ? "ri-subtract-line" : "ri-add-line"}></i>
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 -mt-1">
                    <p className="text-foreground-700 text-sm leading-relaxed max-w-2xl">{f.a}</p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}