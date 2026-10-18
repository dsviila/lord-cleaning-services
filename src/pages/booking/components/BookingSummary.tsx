import QuoteLink from "@/components/base/QuoteLink";
import { addOns } from "@/mocks/booking";
import type { BookingState } from "@/hooks/useBooking";

type SummaryShape = {
  service: { title: string; basePrice: number };
  frequency: { label: string; discount: number };
  cleaner: { name: string; image: string } | null;
  bedroomSurcharge: number;
  addOnTotal: number;
  subtotal: number;
  discount: number;
  total: number;
};

type Props = {
  state: BookingState;
  summary: SummaryShape;
};

function formatDate(iso: string | null) {
  if (!iso) return "Not set";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export default function BookingSummary({ state, summary }: Props) {
  const selectedAddOns = addOns.filter((a) => state.selectedAddOns.includes(a.id));

  return (
    <aside className="bg-background-50 border border-background-200/70 rounded-2xl p-6 sticky top-24">
      <p className="text-xs uppercase tracking-widest text-foreground-600 mb-3">Your booking</p>
      <h3 className="font-heading text-foreground-950 text-2xl font-medium mb-5">{summary.service.title}</h3>

      <div className="space-y-3 text-sm pb-5 border-b border-background-200">
        <Row label="Frequency" value={summary.frequency.label} />
        <Row label="Home" value={`${state.bedrooms} · ${state.bathrooms} bath`} />
        <Row label="Date" value={formatDate(state.date)} />
        <Row label="Time" value={state.time ?? "Not set"} />
        <Row label="Your team" value="Lord Cleaning crew" />
        <Row
          label="Add-ons"
          value={selectedAddOns.length ? selectedAddOns.map((a) => a.label).join(", ") : "None"}
        />
      </div>

      <div className="pt-5 border-t border-background-200">
        <p className="text-xs text-foreground-600 leading-relaxed mb-4">
          Pricing is tailored to your space. Request a free, no-obligation quote and we'll confirm
          the exact amount before your visit. Free reschedule up to 12 hrs before.
        </p>
        <QuoteLink variant="solid" className="w-full justify-center" />
      </div>
    </aside>
  );
}

function Row({ label, value, muted, accent }: { label: string; value: string; muted?: boolean; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className={`${muted ? "text-foreground-600" : "text-foreground-700"} text-sm`}>{label}</span>
      <span
        className={`text-sm font-medium ${
          accent ? "text-primary-700" : muted ? "text-foreground-800" : "text-foreground-950"
        }`}
      >
        {value}
      </span>
    </div>
  );
}