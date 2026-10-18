import { Link } from "react-router-dom";

export default function Cleaners() {
  return (
    <section id="cleaners" className="bg-background-50 px-4 md:px-10 py-20 md:py-32">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
        <div>
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground-600 mb-4">
            <span className="w-6 h-px bg-foreground-400"></span>
            Meet the team
          </p>
          <h2 className="font-heading text-4xl md:text-6xl font-medium text-foreground-950 leading-[1.05] max-w-3xl">
            A local team you can<br />actually rely on.
          </h2>
        </div>
        <Link
          to="/cleaners"
          className="inline-flex items-center gap-2 text-foreground-900 text-sm font-medium hover:text-primary-600 whitespace-nowrap"
        >
          Meet our team
          <i className="ri-arrow-right-up-line"></i>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
        <div className="lg:col-span-7 rounded-2xl overflow-hidden bg-background-100 border border-background-200/70">
          <img loading="lazy" decoding="async"
            src="/images/team/Lord-Team-Crew.webp"
            alt="The full Lord Cleaning team together in a bright home"
            className="w-full h-full min-h-[320px] md:min-h-[420px] object-cover object-top"
          />
        </div>

        <div className="lg:col-span-5 bg-background-100 border border-background-200/70 rounded-2xl p-6 md:p-10 flex flex-col justify-center">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground-600 mb-4">
            <span className="w-6 h-px bg-foreground-400"></span>
            One trusted crew
          </p>
          <h3 className="font-heading text-2xl md:text-3xl font-medium text-foreground-950 leading-[1.15]">
            The same team, every single visit.
          </h3>
          <p className="text-foreground-700 text-sm md:text-base mt-4 leading-relaxed">
            You hire our team, not a stranger. Every pro is background-checked, trained in person and
            fully insured — and we assign the right crew for your home, so the clean gets better each
            time we walk in.
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            <span className="inline-flex items-center gap-1.5 bg-secondary-100 text-secondary-900 text-xs px-3 py-1.5 rounded-full whitespace-nowrap">
              <i className="ri-shield-check-line"></i>
              Background-checked
            </span>
            <span className="inline-flex items-center gap-1.5 bg-secondary-100 text-secondary-900 text-xs px-3 py-1.5 rounded-full whitespace-nowrap">
              <i className="ri-bank-card-line"></i>
              Fully insured
            </span>
            <span className="inline-flex items-center gap-1.5 bg-secondary-100 text-secondary-900 text-xs px-3 py-1.5 rounded-full whitespace-nowrap">
              <i className="ri-translate-2"></i>
              English &amp; Spanish
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}