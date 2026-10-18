import type { ServiceDetail } from "@/mocks/serviceDetails";

type Props = {
  detail: ServiceDetail;
};

export default function ServiceProcess({ detail }: Props) {
  return (
    <section className="bg-secondary-100 px-4 md:px-10 py-20 md:py-28">
      <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground-600 mb-4">
        <span className="w-6 h-px bg-foreground-400"></span>
        How it works
      </p>
      <h2 className="font-heading text-foreground-950 text-3xl md:text-5xl font-medium leading-[1.08] max-w-3xl mb-14 md:mb-20">
        Simple, careful, and done right the first time.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        {detail.process.map((step, index) => (
          <div key={step.title} className="relative">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-12 h-12 flex items-center justify-center rounded-full bg-accent-500 text-background-50 font-heading text-lg font-medium">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 h-px bg-foreground-300/60"></span>
            </div>
            <h3 className="font-heading text-foreground-950 text-xl md:text-2xl font-medium mb-3 leading-snug">
              {step.title}
            </h3>
            <p className="text-foreground-700 text-sm leading-relaxed">{step.blurb}</p>
          </div>
        ))}
      </div>
    </section>
  );
}