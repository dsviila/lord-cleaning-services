import { Link } from "react-router-dom";

export default function GalleryHero() {
  return (
    <section className="relative">
      <div className="relative h-[62vh] min-h-[520px] overflow-hidden">
        <img
          src="/images/gallery/Sofa-Detail.webp"
          alt="A Lord Cleaning professional fluffing cushions on a sofa in a bright, freshly cleaned living room"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/70 via-foreground-950/50 to-foreground-950/90"></div>

        <div className="relative z-10 h-full w-full px-4 md:px-10 flex flex-col justify-end pb-12 md:pb-16">
          <nav className="flex items-center gap-2 text-xs md:text-sm text-background-100/85 mb-6">
            <Link to="/" className="hover:text-background-50 transition-colors">
              Home
            </Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-background-50">Gallery</span>
          </nav>

          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-background-100/90 mb-4">
            <span className="w-6 h-px bg-background-50/60"></span>
            Our work in pictures
          </p>

          <h1 className="font-heading text-background-50 text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.05] max-w-4xl">
            See the standard, room by room.
          </h1>

          <p className="mt-6 text-background-100 text-base md:text-lg max-w-2xl leading-relaxed">
            Real finishes from real visits across Northern Virginia. Browse by the kind of clean you
            need, then picture your own space looking exactly like this.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row flex-wrap items-center gap-3">
            <Link
              to="/booking"
              className="group inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-background-50 pl-6 pr-2 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors"
            >
              Book your clean
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-background-50">
                <i className="ri-arrow-right-line text-primary-600"></i>
              </span>
            </Link>
            <Link
              to="/#services"
              className="inline-flex items-center gap-2 border border-background-50/40 text-background-50 px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap hover:bg-background-50/10 transition-colors"
            >
              Explore our services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}