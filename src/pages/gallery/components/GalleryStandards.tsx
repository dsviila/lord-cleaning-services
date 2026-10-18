const standards = [
  {
    icon: "ri-shield-check-line",
    title: "Vetted & insured",
    blurb: "Every pro is background-checked, trained in person and covered by liability insurance.",
  },
  {
    icon: "ri-sparkling-2-line",
    title: "Detail-obsessed",
    blurb: "Baseboards, vents, grout and glass — the corners others skip are where we shine.",
  },
  {
    icon: "ri-heart-3-line",
    title: "Satisfaction guaranteed",
    blurb: "If something's not right, tell us within 24 hours and we'll return to make it right.",
  },
  {
    icon: "ri-leaf-line",
    title: "Family-friendly products",
    blurb: "Quality, low-scent supplies that are safe for kids, pets and everyday living.",
  },
];

export default function GalleryStandards() {
  return (
    <section className="bg-background-100 border-y border-background-200/70 px-4 md:px-10 py-14 md:py-20">
      <div className="max-w-2xl mb-10 md:mb-12">
        <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground-600 mb-4">
          <span className="w-6 h-px bg-foreground-400"></span>
          Behind every photo
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-medium text-foreground-950 leading-[1.1]">
          The same standard, every single visit.
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {standards.map((s, i) => (
          <div
            key={s.title}
            className="bg-background-50 border border-background-200/70 rounded-2xl p-6"
          >
            <span
              className={`w-12 h-12 flex items-center justify-center rounded-full mb-5 ${
                i === 1 ? "bg-accent-100 text-accent-900" : "bg-secondary-100 text-secondary-900"
              }`}
            >
              <i className={`${s.icon} text-xl`}></i>
            </span>
            <h3 className="font-heading text-foreground-950 text-lg font-medium mb-2">
              {s.title}
            </h3>
            <p className="text-foreground-700 text-sm leading-relaxed">{s.blurb}</p>
          </div>
        ))}
      </div>
    </section>
  );
}