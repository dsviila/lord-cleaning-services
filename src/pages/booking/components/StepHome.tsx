import { addOns, bathroomOptions, bedroomOptions } from "@/mocks/booking";
import type { BookingState } from "@/hooks/useBooking";

type Props = {
  state: BookingState;
  update: <K extends keyof BookingState>(k: K, v: BookingState[K]) => void;
  toggleAddOn: (id: string) => void;
};

export default function StepHome({ state, update, toggleAddOn }: Props) {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="font-heading text-foreground-950 text-3xl md:text-4xl font-medium mb-2">
          Tell us about your home.
        </h2>
        <p className="text-foreground-700 text-sm md:text-base">
          We use this to send the right cleaner with the right amount of time.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <label className="text-xs uppercase tracking-widest text-foreground-700 mb-3 block">Bedrooms</label>
          <div className="flex flex-wrap gap-2">
            {bedroomOptions.map((b) => {
              const active = state.bedrooms === b;
              return (
                <button
                  type="button"
                  key={b}
                  onClick={() => update("bedrooms", b)}
                  className={`px-4 py-2.5 rounded-full text-sm font-medium border-2 whitespace-nowrap transition-colors ${
                    active
                      ? "border-foreground-950 bg-foreground-950 text-background-50"
                      : "border-background-200 bg-background-50 text-foreground-800 hover:border-foreground-400"
                  }`}
                >
                  {b}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-widest text-foreground-700 mb-3 block">Bathrooms</label>
          <div className="flex flex-wrap gap-2">
            {bathroomOptions.map((b) => {
              const active = state.bathrooms === b;
              return (
                <button
                  type="button"
                  key={b}
                  onClick={() => update("bathrooms", b)}
                  className={`px-4 py-2.5 rounded-full text-sm font-medium border-2 whitespace-nowrap transition-colors ${
                    active
                      ? "border-foreground-950 bg-foreground-950 text-background-50"
                      : "border-background-200 bg-background-50 text-foreground-800 hover:border-foreground-400"
                  }`}
                >
                  {b}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <h3 className="font-heading text-foreground-950 text-xl font-medium">Add-ons</h3>
            <p className="text-foreground-700 text-sm">Optional extras for this visit only.</p>
          </div>
          <span className="text-xs text-foreground-600">{state.selectedAddOns.length} selected</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {addOns.map((a) => {
            const active = state.selectedAddOns.includes(a.id);
            return (
              <button
                type="button"
                key={a.id}
                onClick={() => toggleAddOn(a.id)}
                className={`flex items-center justify-between gap-3 px-4 py-4 rounded-xl border-2 text-left transition-colors ${
                  active
                    ? "border-primary-500 bg-primary-50"
                    : "border-background-200 bg-background-50 hover:border-foreground-300"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`w-10 h-10 flex items-center justify-center rounded-full ${
                      active ? "bg-primary-500 text-background-50" : "bg-background-100 text-foreground-800"
                    }`}
                  >
                    <i className={`${a.icon} text-base`}></i>
                  </span>
                  <span>
                    <p className="text-sm font-medium text-foreground-950">{a.label}</p>
                    <p className="text-xs text-foreground-600">Optional extra</p>
                  </span>
                </span>
                <span
                  className={`w-6 h-6 flex items-center justify-center rounded-full text-xs ${
                    active ? "bg-primary-500 text-background-50" : "border border-foreground-300 text-foreground-500"
                  }`}
                >
                  {active && <i className="ri-check-line" />}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}