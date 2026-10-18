import type { ServiceDetail } from "@/mocks/serviceDetails";

type Props = {
  detail: ServiceDetail;
};

export default function ServiceFacts({ detail }: Props) {
  const facts = [
    { icon: "ri-price-tag-3-line", label: "Starting price", value: detail.priceFrom, note: detail.priceNote },
    { icon: "ri-time-line", label: "Typical time", value: detail.duration, note: "On-site estimate" },
    { icon: "ri-team-line", label: "Team size", value: detail.teamSize, note: "Trained & insured" },
  ];

  return (
    <section className="bg-background-100 px-4 md:px-10 py-14 md:py-20">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        {facts.map((f) => (
          <div
            key={f.label}
            className="rounded-2xl bg-background-50 border border-background-200/70 p-6 md:p-7"
          >
            <span className="w-11 h-11 flex items-center justify-center rounded-full bg-secondary-100 text-secondary-900 mb-4">
              <i className={`${f.icon} text-lg`}></i>
            </span>
            <p className="text-xs uppercase tracking-widest text-foreground-600 mb-2">{f.label}</p>
            <p className="font-heading text-foreground-950 text-3xl font-medium leading-none mb-2">
              {f.value}
            </p>
            <p className="text-foreground-600 text-xs leading-relaxed">{f.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
        <p className="text-xs uppercase tracking-widest text-foreground-600 whitespace-nowrap">
          Best for
        </p>
        <div className="flex flex-wrap gap-2.5">
          {detail.bestFor.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 bg-accent-100 text-accent-900 text-sm px-4 py-1.5 rounded-full whitespace-nowrap"
            >
              <i className="ri-checkbox-circle-line"></i>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}