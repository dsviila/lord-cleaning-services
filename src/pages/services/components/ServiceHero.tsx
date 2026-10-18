import { Link } from "react-router-dom";
import type { ServiceDetail } from "@/mocks/serviceDetails";

type Props = {
  detail: ServiceDetail;
};

export default function ServiceHero({ detail }: Props) {
  return (
    <section className="relative">
      <div className="relative h-[74vh] min-h-[580px] overflow-hidden">
        <img
          src={detail.heroImage}
          alt={detail.eyebrow}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/65 via-foreground-950/45 to-foreground-950/85"></div>

        <div className="relative z-10 h-full w-full px-4 md:px-10 flex flex-col justify-end pb-12 md:pb-16">
          <nav className="flex items-center gap-2 text-xs md:text-sm text-background-100/85 mb-6">
            <Link to="/" className="hover:text-background-50 transition-colors">
              Home
            </Link>
            <i className="ri-arrow-right-s-line"></i>
            <Link to="/#services" className="hover:text-background-50 transition-colors">
              Services
            </Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-background-50">{detail.eyebrow}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 bg-primary-500 text-background-50 text-xs font-medium px-4 py-1.5 rounded-full whitespace-nowrap">
              <i className="ri-price-tag-3-line"></i>
              From {detail.priceFrom}
            </span>
            <span className="inline-flex items-center gap-2 border border-background-50/40 text-background-50 text-xs font-medium px-4 py-1.5 rounded-full whitespace-nowrap">
              <i className="ri-time-line"></i>
              {detail.duration}
            </span>
          </div>

          <h1 className="font-heading text-background-50 text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.05] max-w-4xl">
            {detail.headline}
          </h1>

          <p className="mt-6 text-background-100 text-base md:text-lg max-w-2xl leading-relaxed">
            {detail.intro}
          </p>

          <div className="mt-9 flex flex-col sm:flex-row flex-wrap items-center gap-3">
            <Link
              to="/booking"
              className="group inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-background-50 pl-6 pr-2 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors"
            >
              Book this service
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-background-50">
                <i className="ri-arrow-right-line text-primary-600"></i>
              </span>
            </Link>
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 bg-background-50 text-foreground-950 pl-6 pr-2 py-2 rounded-full text-sm font-medium whitespace-nowrap hover:bg-background-100 transition-colors"
            >
              Get free estimate
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-500">
                <i className="ri-arrow-right-line text-background-50"></i>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}