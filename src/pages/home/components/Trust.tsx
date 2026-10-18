import { trustReasons } from "@/mocks/landing";

export default function Trust() {
  return (
    <section id="why-us" className="bg-background-100 px-4 md:px-10 py-20 md:py-32">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground-600 mb-4">
            <span className="w-6 h-px bg-foreground-400"></span>
            Why choose us
          </p>
          <h2 className="font-heading text-4xl md:text-6xl font-light text-foreground-950 leading-[1.05]">
            Cleaning you can<br />actually count on.
          </h2>
        </div>
        <p className="text-foreground-700 text-sm max-w-xs leading-relaxed">
          Vetted cleaners, clear pricing and a guarantee in writing. Here is what you get
          every time we walk in.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {trustReasons.map((r) => (
          <article
            key={r.title}
            className="rounded-2xl bg-background-50 border border-background-200 p-6 md:p-7 h-full"
          >
            <span className="w-12 h-12 flex items-center justify-center rounded-full bg-secondary-100 text-secondary-800 mb-5">
              <i className={`${r.icon} text-xl`}></i>
            </span>
            <h3 className="font-heading text-foreground-950 text-xl font-medium mb-2 leading-snug">
              {r.title}
            </h3>
            <p className="text-foreground-700 text-sm leading-relaxed">{r.blurb}</p>
          </article>
        ))}
      </div>
    </section>
  );
}