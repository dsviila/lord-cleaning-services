import { Link } from "react-router-dom";
import { business } from "@/mocks/landing";

export default function GalleryCta() {
  return (
    <section className="px-3 md:px-5 py-10 md:py-16">
      <div className="relative overflow-hidden rounded-[28px] bg-secondary-100 px-6 md:px-16 py-14 md:py-20">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-accent-500/15"></div>
        <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-primary-500/10"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground-600 mb-5">
              <span className="w-6 h-px bg-foreground-400"></span>
              Ready when you are
            </p>
            <h2 className="font-heading text-foreground-950 text-4xl md:text-6xl font-medium leading-[1.05]">
              Let&rsquo;s add your home to the gallery.
            </h2>
            <p className="text-foreground-700 text-base md:text-lg mt-5 max-w-xl leading-relaxed">
              Free estimate within 2 hours, no obligation, and our satisfaction guarantee on every
              single visit.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3">
            <Link
              to="/booking"
              className="group inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-background-50 pl-6 pr-2 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors"
            >
              Book your clean
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-background-50">
                <i className="ri-arrow-right-line text-primary-600"></i>
              </span>
            </Link>
            <a
              href={business.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-background-50 text-foreground-950 pl-6 pr-2 py-2 rounded-full text-sm font-medium whitespace-nowrap hover:bg-background-100 transition-colors"
            >
              <i className="ri-whatsapp-line text-lg text-[#25D366]"></i>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}