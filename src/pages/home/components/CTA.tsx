import { Link } from "react-router-dom";
import { business } from "@/mocks/landing";

export default function CTA() {
  return (
    <section id="cta" className="px-3 md:px-5 py-10 md:py-16">
      <div className="relative h-[80vh] min-h-[560px] rounded-[28px] overflow-hidden">
        <img loading="lazy" decoding="async"
          src="/images/cta/CTA-Background.webp"
          alt="Welcoming home entryway"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-foreground-950/40 via-foreground-950/15 to-foreground-950/55"></div>

        <div className="relative z-10 h-full w-full flex flex-col justify-between p-6 md:p-12 lg:p-16">
          <div className="max-w-2xl">
            <h2 className="font-heading text-background-50 text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.05] lowercase">
              come home to<br />a spotless space.
            </h2>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3">
              <Link
                to="/booking"
                className="group inline-flex items-center justify-between gap-3 bg-background-50 text-foreground-950 pl-6 pr-2 py-2.5 rounded-full w-fit hover:bg-background-100 transition-colors"
              >
                <span className="text-sm font-medium whitespace-nowrap">Book your clean</span>
                <span className="w-9 h-9 flex items-center justify-center rounded-full bg-foreground-950 text-background-50">
                  <i className="ri-arrow-right-line"></i>
                </span>
              </Link>
              <a
                href={business.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-background-50 text-sm font-medium px-5 py-3 rounded-full border border-background-50/40 hover:bg-background-50/10 whitespace-nowrap transition-colors"
              >
                <i className="ri-whatsapp-line text-lg text-[#25D366]"></i>
                Chat on WhatsApp
              </a>
            </div>

            <p className="text-background-100 text-sm md:text-base leading-relaxed max-w-xs md:text-right">
              Free estimate within 2 hours.<br />
              No obligation. Satisfaction guaranteed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}