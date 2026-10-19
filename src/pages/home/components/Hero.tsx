import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { business } from "@/mocks/landing";

export default function Hero() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const trigger = 320;
      const next = Math.min(Math.max(window.scrollY / trigger, 0), 1);
      setProgress(next);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sidePadding = progress * 20;
  const topPadding = progress * 20;
  const radius = progress * 28;
  const heightVh = 100 - progress * 12;
  const minHeight = 640;

  return (
    <section
      className="relative"
      style={{
        paddingLeft: `${sidePadding}px`,
        paddingRight: `${sidePadding}px`,
        paddingTop: `${topPadding}px`,
      }}
    >
      <div
        className="relative overflow-hidden transition-[border-radius] duration-200 ease-out"
        style={{
          height: `${heightVh}vh`,
          minHeight: `${minHeight}px`,
          borderRadius: `${radius}px`,
        }}
      >
        <picture>
          <source media="(max-width: 767px)" srcSet="/images/hero/Hero-Living-Room-Mobile.webp" />
          <img
            src="/images/hero/Hero-Living-Room.webp"
            fetchPriority="high"
            alt="Lord Cleaning Services team arriving at a home with a branded van"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/50 via-foreground-950/35 to-foreground-950/65"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(var(--foreground-950)/0.5),transparent_72%)]"></div>

        <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center px-4 md:px-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-background-50/40 text-background-50 text-xs tracking-widest uppercase backdrop-blur-sm animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-400"></span>
            Limited time · 25% off your first clean
          </span>

          <h1 className="font-heading text-background-50 text-5xl md:text-7xl lg:text-[88px] font-medium leading-[1.02] mt-6 max-w-5xl drop-shadow-[0_2px_20px_rgba(15,23,42,0.55)]">
            Reliable cleaning<br />you can trust.
          </h1>

          <p className="mt-6 text-background-50 text-base md:text-lg max-w-xl leading-relaxed drop-shadow-[0_1px_12px_rgba(15,23,42,0.6)] animate-fade-up">
            Professional residential and commercial cleaning across Northern Virginia.
            Detail-obsessed, dependable and easy to book — so your home or business always
            feels fresh, clean and comfortable.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 animate-fade-up">
            <Link
              to="/booking"
              className="group inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-background-50 pl-6 pr-2 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors"
            >
              Book your clean
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-background-50 transition-colors">
                <i className="ri-arrow-right-line text-primary-600"></i>
              </span>
            </Link>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 bg-background-50 text-foreground-950 pl-6 pr-2 py-2 rounded-full text-sm font-medium whitespace-nowrap hover:bg-background-100 transition-colors"
            >
              Get Free Estimate
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-500 group-hover:bg-primary-600 transition-colors">
                <i className="ri-arrow-right-line text-background-50"></i>
              </span>
            </a>
            <a
              href={business.phoneHref}
              className="inline-flex items-center gap-2 text-background-50 text-sm font-medium px-5 py-3 rounded-full border border-background-50/40 hover:bg-background-50/10 whitespace-nowrap transition-colors"
            >
              <i className="ri-phone-line text-lg"></i>
              Call or Text {business.phoneDisplay}
            </a>
          </div>

          <div className="mt-14 hidden md:flex items-center gap-10 text-background-50 drop-shadow-[0_1px_10px_rgba(15,23,42,0.5)] animate-fade-up">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <img
                  src="/images/hero/Hero-Avatar-1.webp"
                  alt="Cleaner Maya"
                  className="w-9 h-9 rounded-full border-2 border-background-50 object-cover object-top"
                />
                <img
                  src="/images/hero/Hero-Avatar-2.webp"
                  alt="Cleaner Daniel"
                  className="w-9 h-9 rounded-full border-2 border-background-50 object-cover object-top"
                />
                <img
                  src="/images/hero/Hero-Avatar-3.webp"
                  alt="Cleaner Aisha"
                  className="w-9 h-9 rounded-full border-2 border-background-50 object-cover object-top"
                />
                <img
                  src="/images/hero/Hero-Avatar-4.webp"
                  alt="Cleaner Liam"
                  className="w-9 h-9 rounded-full border-2 border-background-50 object-cover object-top"
                />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">99+ clients in Northern VA</p>
                <p className="text-xs text-background-100/75">Sterling · Reston · Ashburn &amp; nearby</p>
              </div>
            </div>
            <div className="h-8 w-px bg-background-50/30"></div>
            <div className="flex items-center gap-2">
              <div className="flex text-secondary-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <i key={i} className="ri-star-fill text-sm"></i>
                ))}
              </div>
              <p className="text-sm">4.9 average rating · 2-hour response</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}