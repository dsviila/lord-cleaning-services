import { bookingServices, frequencyOptions } from "@/mocks/booking";
import QuoteLink from "@/components/base/QuoteLink";
import type { BookingState } from "@/hooks/useBooking";

type Props = {
  state: BookingState;
  update: <K extends keyof BookingState>(k: K, v: BookingState[K]) => void;
};

export default function StepService({ state, update }: Props) {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="font-heading text-foreground-950 text-3xl md:text-4xl font-medium mb-2">
          What kind of clean?
        </h2>
        <p className="text-foreground-700 text-sm md:text-base">
          You can change this later. Every home is priced with a personalized quote.
        </p>

        <div className="mt-5">
          <QuoteLink variant="outline" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-8">
          {bookingServices.map((s) => {
            const active = state.serviceId === s.id;
            return (
              <button
                type="button"
                key={s.id}
                onClick={() => update("serviceId", s.id)}
                className={`text-left rounded-2xl p-5 border-2 transition-all ${
                  active
                    ? "border-primary-500 bg-primary-50"
                    : "border-background-200 bg-background-50 hover:border-foreground-300"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span
                    className={`w-11 h-11 flex items-center justify-center rounded-full ${
                      active ? "bg-primary-500 text-background-50" : "bg-background-100 text-foreground-800"
                    }`}
                  >
                    <i className={`${s.icon} text-lg`}></i>
                  </span>
                  <div className="text-right space-y-1.5">
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-primary-700 bg-primary-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                      <i className="ri-file-list-3-line"></i> To be quoted
                    </span>
                    <p className="text-xs text-foreground-600">{s.duration}</p>
                  </div>
                </div>
                <h3 className="font-heading text-foreground-950 text-lg font-medium">{s.title}</h3>
                <p className="text-foreground-700 text-sm mt-1 leading-relaxed">{s.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="font-heading text-foreground-950 text-xl font-medium mb-1">How often?</h3>
        <p className="text-foreground-700 text-sm mb-5">Set a rhythm and save. Pause anytime.</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {frequencyOptions.map((f) => {
            const active = state.frequencyId === f.id;
            return (
              <button
                type="button"
                key={f.id}
                onClick={() => update("frequencyId", f.id)}
                className={`text-left rounded-xl px-4 py-4 border-2 transition-colors ${
                  active
                    ? "border-foreground-950 bg-foreground-950 text-background-50"
                    : "border-background-200 bg-background-50 hover:border-foreground-400"
                }`}
              >
                <p className="font-medium text-sm">{f.label}</p>
                <p className={`text-xs mt-1 ${active ? "text-background-200" : "text-foreground-600"}`}>
                  {f.sublabel}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}