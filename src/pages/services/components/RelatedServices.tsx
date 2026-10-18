import { Link } from "react-router-dom";
import { services } from "@/mocks/landing";

type Props = {
  currentId: string;
};

export default function RelatedServices({ currentId }: Props) {
  const related = services.filter((s) => s.id !== currentId).slice(0, 3);

  return (
    <section className="bg-background-50 px-4 md:px-10 py-20 md:py-28">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
        <div>
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground-600 mb-4">
            <span className="w-6 h-px bg-foreground-400"></span>
            Explore more
          </p>
          <h2 className="font-heading text-foreground-950 text-3xl md:text-5xl font-medium leading-[1.08]">
            Other services you might need.
          </h2>
        </div>
        <Link
          to="/#services"
          className="inline-flex items-center gap-2 text-foreground-800 text-sm font-medium whitespace-nowrap hover:text-primary-600 transition-colors"
        >
          View all services
          <i className="ri-arrow-right-line"></i>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {related.map((s) => (
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
                <p className="text-background-100/90 text-sm leading-relaxed max-w-xs">{s.blurb}</p>
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