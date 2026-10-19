import { useEffect, useState, type MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { business, navLinks } from "@/mocks/landing";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id: string, attempt = 0) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (attempt < 10) {
      window.setTimeout(() => scrollToSection(id, attempt + 1), 80);
    }
  };

  const handleSectionClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpen(false);
    e.preventDefault();
    const id = href.replace("#", "");
    if (pathname === "/") {
      scrollToSection(id);
    } else {
      navigate(`/${href}`);
      window.setTimeout(() => scrollToSection(id), 150);
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background-50/90 backdrop-blur-md border-b border-background-200/70"
          : "bg-transparent"
      }`}
    >
      <nav className="w-full px-4 md:px-8 py-4 flex items-center justify-between">
        <Link
          to="/"
          onClick={() => {
            setOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2.5 group"
        >
          <img
            src="/images/brand/Lord-Logo-Small.webp"
            alt="Lord Cleaning logo"
            className="w-10 h-10 rounded-lg object-cover transition-transform group-hover:scale-105"
          />
          <span
            className={`font-heading text-xl font-semibold tracking-tight ${
              scrolled ? "text-foreground-950" : "text-background-50"
            }`}
          >
            Lord Cleaning Services
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                to={`/${l.href}`}
                onClick={(e) => handleSectionClick(e, l.href)}
                className={`text-sm font-medium transition-colors whitespace-nowrap ${
                  scrolled
                    ? "text-foreground-700 hover:text-primary-600"
                    : "text-background-50/90 hover:text-background-50"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/gallery"
              className={`text-sm font-medium transition-colors whitespace-nowrap ${
                scrolled
                  ? "text-foreground-700 hover:text-primary-600"
                  : "text-background-50/90 hover:text-background-50"
              }`}
            >
              Gallery
            </Link>
          </li>
        </ul>

        <div className="hidden md:flex items-center gap-3 lg:pl-10">
          <a
            href={business.phoneHref}
            className={`hidden lg:inline-flex items-center gap-1.5 text-sm font-medium whitespace-nowrap transition-colors ${
              scrolled
                ? "text-foreground-800 hover:text-primary-600"
                : "text-background-50/90 hover:text-background-50"
            }`}
          >
            <i className="ri-phone-line"></i>
            {business.phoneDisplay}
          </a>
          <Link
            to="/#contact"
            onClick={(e) => handleSectionClick(e, "#contact")}
            className="group flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-background-50 pl-5 pr-2 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors"
          >
            Get Free Estimate
            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-background-50">
              <i className="ri-arrow-right-up-line text-primary-600 text-sm"></i>
            </span>
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden w-10 h-10 flex items-center justify-center rounded-full ${
            scrolled ? "bg-background-100 text-foreground-900" : "bg-background-50/20 text-background-50"
          }`}
          aria-label="Toggle menu"
        >
          <i className={`${open ? "ri-close-line" : "ri-menu-line"} text-xl`}></i>
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-background-50 border-t border-background-200 px-4 py-6 space-y-4">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              to={`/${l.href}`}
              onClick={(e) => handleSectionClick(e, l.href)}
              className="block text-foreground-800 font-medium"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/gallery"
            onClick={() => setOpen(false)}
            className="block text-foreground-800 font-medium"
          >
            Gallery
          </Link>
          <div className="flex flex-col gap-2 pt-2">
            <Link
              to="/#contact"
              onClick={(e) => handleSectionClick(e, "#contact")}
              className="inline-flex items-center justify-center gap-2 bg-primary-500 text-background-50 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap"
            >
              Get Free Estimate <i className="ri-arrow-right-up-line"></i>
            </Link>
            <a
              href={business.phoneHref}
              className="inline-flex items-center justify-center gap-2 border border-background-300 text-foreground-800 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap"
            >
              <i className="ri-phone-line"></i>
              Call or Text {business.phoneDisplay}
            </a>
            <a
              href={business.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-background-300 text-foreground-800 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap"
            >
              <i className="ri-whatsapp-line"></i>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}