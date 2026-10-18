import type { BookingState } from "@/hooks/useBooking";

type Props = {
  state: BookingState;
  update: <K extends keyof BookingState>(k: K, v: BookingState[K]) => void;
  errors?: { name?: string; email?: string; phone?: string };
  onClearError?: (key: "name" | "email" | "phone") => void;
};

export default function StepConfirm({ state, update, errors, onClearError }: Props) {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-heading text-foreground-950 text-3xl md:text-4xl font-medium mb-2">
          Where should our team go?
        </h2>
        <p className="text-foreground-700 text-sm md:text-base">
          Your card won't be charged until our team finishes the visit.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="font-heading text-foreground-950 text-lg font-medium">Service address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field
            label="Street address"
            value={state.address.line1}
            onChange={(v) => update("address", { ...state.address, line1: v })}
            placeholder="100 Maple Ave, Unit 2"
            full
          />
          <Field
            label="City"
            value={state.address.city}
            onChange={(v) => update("address", { ...state.address, city: v })}
            placeholder="Sterling"
          />
          <div className="grid grid-cols-2 gap-3">
            <Field
              label="State"
              value={state.address.state}
              onChange={(v) => update("address", { ...state.address, state: v })}
              placeholder="VA"
            />
            <Field
              label="ZIP"
              value={state.address.zip}
              onChange={(v) => update("address", { ...state.address, zip: v })}
              placeholder="20164"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="font-heading text-foreground-950 text-lg font-medium">Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field
            label="Full name"
            value={state.contact.name}
            onChange={(v) => {
              update("contact", { ...state.contact, name: v });
              onClearError?.("name");
            }}
            placeholder="Eleanor Whitcombe"
            error={errors?.name}
          />
          <Field
            label="Email"
            value={state.contact.email}
            onChange={(v) => {
              update("contact", { ...state.contact, email: v });
              onClearError?.("email");
            }}
            placeholder="eleanor@email.com"
            type="email"
            error={errors?.email}
          />
          <Field
            label="Phone"
            value={state.contact.phone}
            onChange={(v) => {
              update("contact", { ...state.contact, phone: v });
              onClearError?.("phone");
            }}
            placeholder="(571) 300-3094"
            type="tel"
            full
            error={errors?.phone}
          />
          <div className="md:col-span-2">
            <label className="text-xs uppercase tracking-widest text-foreground-700 mb-2 block">
              Notes for our team <span className="lowercase">(optional)</span>
            </label>
            <textarea
              value={state.contact.notes}
              onChange={(e) => update("contact", { ...state.contact, notes: e.target.value.slice(0, 500) })}
              placeholder="Front door code, pets, areas to skip..."
              rows={4}
              maxLength={500}
              className="w-full bg-background-50 border border-background-200 rounded-xl px-4 py-3 text-sm text-foreground-900 placeholder-foreground-400 focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none"
            />
            <p className="text-xs text-foreground-500 mt-1">{state.contact.notes.length}/500</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl bg-primary-50 border border-primary-200 p-5 flex items-start gap-4">
        <span className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-500 text-background-50 flex-shrink-0">
          <i className="ri-shield-check-line"></i>
        </span>
        <div>
          <p className="font-heading text-foreground-950 text-base font-medium mb-1">
            Covered by our satisfaction guarantee
          </p>
          <p className="text-foreground-700 text-sm leading-relaxed">
            If anything's missed, we send our team back the next day at no extra cost. Every Lord Cleaning professional is background-checked, trained in person, and fully insured for complete peace of mind.
          </p>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  full,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  full?: boolean;
  error?: string;
}) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <label className="text-xs uppercase tracking-widest text-foreground-700 mb-2 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-background-50 border rounded-xl px-4 py-3 text-sm text-foreground-900 placeholder-foreground-400 focus:outline-none focus:ring-2 ${
          error ? "border-red-400 focus:ring-red-300" : "border-background-200 focus:ring-primary-400"
        }`}
      />
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
}