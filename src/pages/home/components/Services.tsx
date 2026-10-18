import { Link } from "react-router-dom";
import { services } from "@/mocks/landing";

export default function Services() {
  return (
    <section id="services" className="bg-background-50 px-4 md:px-10 py-20 md:py-32">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
        <div>
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground-600 mb-4">
            <span className="w-6 h-px bg-foreground-400"></span>
            What we clean
          </p>
          <h2 className="font-heading text-4xl md:text-6xl font-medium text-foreground-950 max-w-3xl leading-[1.05]">
            Every kind of clean,<br />done the right way.
          </h2>
        </div>
        <p className="text-foreground-700 text-base max-w-sm leading-relaxed">
          From a routine weekly tidy to a full move-out reset, every visit is delivered with the
          same detail and the same friendly team.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {services.map((s) => (
          <Link
            key={s.id}
            to={`/services/${s.id}`}
            className="group relative overflow-hidden rounded-2xl h-80 block"
          >
            <img loading="lazy" decoding="async"
              src={s.image}
              alt={s.title}
              className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground-950/88 via-foreground-950/35 to-transparent"></div>

            <div className="relative h-full flex flex-col justify-between p-6 md:p-7">
              <span className="w-11 h-11 flex items-center justify-center rounded-full bg-background-50/90 text-foreground-900">
                <i className={`${s.icon} text-xl`}></i>
              </span>

              <div className="space-y-2">
                <h3 className="font-heading text-background-50 text-2xl font-medium leading-tight">
                  {s.title}
                </h3>
                <p className="text-background-100/90 text-sm leading-relaxed max-w-xs">
                  {s.blurb}
                </p>
                <span className="inline-flex items-center gap-1.5 text-background-50 text-sm font-medium pt-1">
                  Learn more
                  <i className="ri-arrow-right-line transition-transform group-hover:translate-x-1"></i>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}