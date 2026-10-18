import { Link } from "react-router-dom";

type Props = {
  summary: {
    service: { title: string };
    total: number;
    cleaner: { name: string } | null;
  };
  date: string | null;
  time: string | null;
  addOns: string[];
  onReset: () => void;
};

function formatDate(iso: string | null) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

export default function BookingSuccess({ summary, date, time, addOns, onReset }: Props) {
  return (
    <div className="max-w-2xl mx-auto text-center py-16 md:py-24">
      <span className="inline-flex w-16 h-16 items-center justify-center rounded-full bg-primary-500 text-background-50 mb-8">
        <i className="ri-check-line text-3xl"></i>
      </span>
      <h2 className="font-heading text-foreground-950 text-4xl md:text-5xl font-medium leading-[1.05] mb-4">
        Booking request received!
      </h2>
      <p className="text-foreground-700 text-base md:text-lg max-w-md mx-auto mb-10">
        Thank you. We'll contact you shortly to confirm your appointment and your free quote.
      </p>

      <div className="bg-background-50 border border-background-200/70 rounded-2xl p-6 text-left max-w-md mx-auto mb-10 space-y-3">
        <Row label="Service" value={summary.service.title} />
        <Row label="When" value={`${formatDate(date)} · ${time}`} />
        <Row label="Your team" value="Lord Cleaning crew" />
        <Row label="Add-ons" value={addOns.length ? addOns.join(", ") : "None"} />
        <div className="border-t border-background-200 pt-3">
          <p className="text-xs text-foreground-600 leading-relaxed">
            We'll send your personalized quote shortly — no payment is taken until you approve it.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-foreground-950 text-background-50 px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap hover:bg-foreground-900"
        >
          Back to home
          <i className="ri-arrow-right-line"></i>
        </Link>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 text-foreground-800 text-sm font-medium px-5 py-3 rounded-full border border-foreground-300 hover:bg-background-100 whitespace-nowrap"
        >
          Book another
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-foreground-600 text-sm">{label}</span>
      <span className="text-foreground-950 text-sm font-medium">{value}</span>
    </div>
  );
}