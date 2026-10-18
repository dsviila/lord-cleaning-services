import { useState } from "react";
import type { ServiceDetail } from "@/mocks/serviceDetails";

type Props = {
  detail: ServiceDetail;
};

export default function ServiceFaq({ detail }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-background-100 px-4 md:px-10 py-20 md:py-28">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14">
        <div className="lg:col-span-4">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground-600 mb-4">
            <span className="w-6 h-px bg-foreground-400"></span>
            Good to know
          </p>
          <h2 className="font-heading text-foreground-950 text-3xl md:text-4xl font-medium leading-[1.1]">
            Questions about this service.
          </h2>
        </div>

        <div className="lg:col-span-8 space-y-3">
          {detail.faqs.map((faq, index) => {
            const isOpen = open === index;
            return (
              <div
                key={faq.q}
                className="rounded-2xl bg-background-50 border border-background-200/70 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 md:px-7 py-5 cursor-pointer"
                >
                  <span className="font-heading text-foreground-950 text-base md:text-lg font-medium">
                    {faq.q}
                  </span>
                  <span
                    className={`w-8 h-8 flex items-center justify-center rounded-full shrink-0 transition-colors ${
                      isOpen ? "bg-primary-500 text-background-50" : "bg-background-100 text-foreground-800"
                    }`}
                  >
                    <i className={`${isOpen ? "ri-subtract-line" : "ri-add-line"} text-base`}></i>
                  </span>
                </button>
                {isOpen && (
                  <p className="px-5 md:px-7 pb-6 text-foreground-700 text-sm md:text-base leading-relaxed max-w-2xl">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}