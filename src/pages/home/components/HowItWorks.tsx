import { howItWorksSteps, stats } from "@/mocks/landing";
import CountUp from "@/components/base/CountUp";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-secondary-100 px-4 md:px-10 py-20 md:py-32">
      <div className="flex items-center gap-3 mb-8">
        <span className="inline-flex items-center gap-2 bg-background-50 text-foreground-900 text-xs uppercase tracking-widest px-4 py-1.5 rounded-full">
          <i className="ri-shield-check-line text-primary-600"></i>
          How it works
        </span>
      </div>

      <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-medium text-foreground-950 max-w-4xl leading-[1.02] mb-16 md:mb-24">
        Free estimate in 2 hours,<br />a spotless space in days.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-20 md:mb-28">
        {howItWorksSteps.map((step) => (
          <div key={step.number} className="relative">
            <div className="flex items-center gap-3 mb-5">
              <span className="font-heading text-foreground-950 text-xl font-medium">{step.number}</span>
              <span className="flex-1 h-px bg-foreground-300/60"></span>
            </div>
            <h3 className="font-heading text-foreground-950 text-xl md:text-2xl font-medium mb-3 leading-snug">
              {step.title}
            </h3>
            <p className="text-foreground-700 text-sm leading-relaxed">{step.blurb}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 pt-10 md:pt-14 border-t border-foreground-300/40">
        {stats.map((stat, index) => (
          <CountUp
            key={stat.label}
            value={stat.value}
            delay={index * 180}
            className="font-heading text-foreground-950 text-4xl md:text-6xl font-medium leading-none mb-3"
            label={stat.label}
            labelClassName="text-foreground-700 text-xs md:text-sm uppercase tracking-wider"
          />
        ))}
      </div>
    </section>
  );
}