import { Link, useLocation } from "react-router-dom";

export default function NotFound() {
  const location = useLocation();

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 bg-background-50 text-foreground-900 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute bottom-0 font-heading text-9xl md:text-[12rem] font-medium text-background-200 select-none pointer-events-none z-0"
      >
        404
      </div>
      <div className="relative z-10 max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 mb-8">
          <img
            src="/images/brand/Lord-Logo-Small.webp"
            alt="Lord Cleaning Services logo"
            className="w-10 h-10 rounded-lg object-cover"
          />
          <span className="font-heading text-lg text-foreground-950">Lord Cleaning Services</span>
        </Link>
        <h1 className="font-heading text-3xl md:text-5xl font-medium text-foreground-950">
          We couldn&rsquo;t find that page.
        </h1>
        <p className="mt-3 text-sm text-foreground-600 font-mono break-all">{location.pathname}</p>
        <p className="mt-4 text-base text-foreground-700 leading-relaxed">
          The link may be old or mistyped. Head back home or book your cleaning in a few steps.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-foreground-950 px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-colors"
          >
            Back to home
          </Link>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 border border-foreground-900/15 hover:border-foreground-900/40 text-foreground-900 px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-colors"
          >
            Book a cleaning
          </Link>
        </div>
      </div>
    </main>
  );
}
