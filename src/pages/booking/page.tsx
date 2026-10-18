import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "@/components/feature/Footer";
import { useBooking } from "@/hooks/useBooking";
import StepIndicator from "./components/StepIndicator";
import BookingSummary from "./components/BookingSummary";
import StepService from "./components/StepService";
import StepHome from "./components/StepHome";
import StepSchedule from "./components/StepSchedule";
import StepCleaner from "./components/StepCleaner";
import StepConfirm from "./components/StepConfirm";
import BookingSuccess from "./components/BookingSuccess";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/moejvqel";

const STEPS = [
  { label: "Service" },
  { label: "Home" },
  { label: "Schedule" },
  { label: "Team" },
  { label: "Confirm" },
];

export default function BookingPage() {
  const { state, update, toggleAddOn, summary, reset } = useBooking();
  const [current, setCurrent] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; phone?: string }>();
  const gotchaRef = useRef<HTMLInputElement>(null);

  const canContinue = (() => {
    if (current === 0) return !!state.serviceId && !!state.frequencyId;
    if (current === 1) return !!state.bedrooms && !!state.bathrooms;
    if (current === 2) return !!state.date && !!state.time;
    if (current === 3) return true; // team is assigned by us, no input needed
    if (current === 4) {
      const a = state.address;
      const c = state.contact;
      return !!a.line1 && !!a.city && !!a.state && !!a.zip && !!c.name && !!c.email && !!c.phone;
    }
    return false;
  })();

  const clearFieldError = (key: "name" | "email" | "phone") =>
    setFieldErrors((prev) => ({ ...prev, [key]: undefined }));

  const handleConfirmBooking = async () => {
    const { name, email, phone } = state.contact;
    const errors: { name?: string; email?: string; phone?: string } = {};
    if (!name.trim()) errors.name = "Please enter your full name.";
    if (!email.trim()) errors.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      errors.email = "Please enter a valid email address.";
    if (!phone.trim()) errors.phone = "Please enter your phone number.";

    setFieldErrors(errors);
    setSubmitError(null);
    if (errors.name || errors.email || errors.phone) return;

    if (gotchaRef.current && gotchaRef.current.value.trim() !== "") return;

    setSubmitting(true);
    try {
      const params = new URLSearchParams();
      params.append("name", name);
      params.append("email", email);
      params.append("phone", phone);
      if (state.contact.notes) params.append("notes", state.contact.notes);
      params.append("address", state.address.line1);
      params.append("city", state.address.city);
      params.append("state", state.address.state);
      params.append("zip", state.address.zip);
      params.append("service", summary.service.title);
      params.append("frequency", summary.frequency.label);
      params.append("home", `${state.bedrooms} \u00b7 ${state.bathrooms} bath`);
      params.append("date", formatShortDate(state.date));
      params.append("time", state.time ?? "");
      params.append("addons", summary.addOnLabels.length ? summary.addOnLabels.join(", ") : "None");

      params.append("_subject", "New booking request - Lord Cleaning Services");
      params.append("form_source", "booking_flow");

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      if (!response.ok) {
        const data: { errors?: { message: string }[] } | null = await response.json().catch(() => null);
        throw new Error(data?.errors?.map((item) => item.message).join(", ") || "Request failed");
      }

      const w = window as unknown as {
        fbq?: (...args: unknown[]) => void;
        gtag?: (...args: unknown[]) => void;
      };
      if (typeof w.fbq === "function") w.fbq("track", "Lead");
      if (typeof w.gtag === "function") w.gtag("event", "generate_lead", { form_name: "booking_form" });

      setConfirmed(true);
    } catch {
      setSubmitError("Something went wrong. Please try again or contact us on WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  const next = () => {
    if (current < STEPS.length - 1) setCurrent(current + 1);
    else void handleConfirmBooking();
  };
  const back = () => setCurrent((c) => Math.max(0, c - 1));

  if (confirmed) {
    return (
      <main className="min-h-screen bg-background-50 flex flex-col">
        <BookingHeader />
        <div className="flex-1 px-4 md:px-10">
          <BookingSuccess
            summary={summary}
            date={state.date}
            time={state.time}
            addOns={summary.addOnLabels}
            onReset={() => {
              reset();
              setCurrent(0);
              setConfirmed(false);
            }}
          />
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background-100">
      <BookingHeader />

      <div className="px-4 md:px-10 pt-8 pb-6">
        <StepIndicator
          current={current}
          steps={STEPS}
          onJump={(i) => i < current && setCurrent(i)}
        />
      </div>

      <section className="px-4 md:px-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
          <div className="lg:col-span-8 bg-background-50 border border-background-200/70 rounded-3xl p-6 md:p-10">
            {current === 0 && <StepService state={state} update={update} />}
            {current === 1 && <StepHome state={state} update={update} toggleAddOn={toggleAddOn} />}
            {current === 2 && <StepSchedule state={state} update={update} />}
            {current === 3 && <StepCleaner />}
            {current === 4 && (
              <>
                <StepConfirm
                  state={state}
                  update={update}
                  errors={fieldErrors}
                  onClearError={clearFieldError}
                />
                <input
                  ref={gotchaRef}
                  type="text"
                  name="contact_alt"
                  className="field-note-offscreen"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  readOnly
                />
              </>
            )}

            <div className="mt-10 pt-6 border-t border-background-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              {current > 0 ? (
                <button
                  type="button"
                  onClick={back}
                  className="inline-flex items-center gap-2 text-foreground-800 text-sm font-medium px-5 py-3 rounded-full border border-foreground-300 hover:bg-background-100 whitespace-nowrap"
                >
                  <i className="ri-arrow-left-line"></i>
                  Back
                </button>
              ) : (
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-foreground-700 text-sm font-medium whitespace-nowrap hover:text-foreground-950"
                >
                  <i className="ri-arrow-left-line"></i>
                  Back to home
                </Link>
              )}
              <div className="flex flex-col items-end gap-2">
                {submitError && (
                  <p className="text-red-600 text-sm text-right max-w-xs">{submitError}</p>
                )}
                <button
                  type="button"
                  disabled={!canContinue || submitting}
                  onClick={next}
                  className={`group inline-flex items-center gap-2 pl-6 pr-2 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    canContinue && !submitting
                      ? "bg-primary-500 text-background-50 hover:bg-primary-600"
                      : "bg-background-200 text-foreground-500 cursor-not-allowed"
                  }`}
                >
                  {submitting ? "Sending..." : current === STEPS.length - 1 ? "Confirm booking" : "Continue"}
                  <span
                    className={`w-8 h-8 flex items-center justify-center rounded-full ${
                      canContinue && !submitting
                        ? "bg-background-50 text-primary-600"
                        : "bg-background-50/40 text-foreground-400"
                    }`}
                  >
                    {submitting ? (
                      <i className="ri-loader-4-line animate-spin"></i>
                    ) : (
                      <i className="ri-arrow-right-line"></i>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <BookingSummary state={state} summary={summary} />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function formatShortDate(iso: string | null) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function BookingHeader() {
  return (
    <header className="bg-background-50/80 backdrop-blur-md border-b border-background-200/70 px-4 md:px-8 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <img loading="lazy" decoding="async"
          src="/images/brand/Lord-Logo.webp"
          alt="Lord Cleaning logo"
          className="w-9 h-9 rounded-lg object-cover"
        />
        <span className="font-heading text-xl font-semibold tracking-tight text-foreground-950">
          Lord Cleaning Services
        </span>
      </Link>
      <div className="flex items-center gap-2 text-xs text-foreground-700">
        <i className="ri-lock-line"></i>
        Secure booking
      </div>
    </header>
  );
}