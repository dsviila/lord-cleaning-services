import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import StepIndicator from "@/pages/booking/components/StepIndicator";
import SignaturePad, { type SignaturePadHandle } from "./SignaturePad";
import { useNoIndex } from "./useNoIndex";
import {
  buildTerms,
  decodeAgreement,
  emptyClient,
  formatDate,
  formatPrice,
  homeLabel,
  priceLabel,
  serviceRows,
  todayYmd,
  type AgreementData,
  type ClientInfo,
} from "./data";
import { downloadAgreementPdf } from "./pdf";
import { business } from "@/mocks/landing";

const STEPS = [{ label: "Review" }, { label: "Your details" }, { label: "Sign" }];

export default function AgreementPage() {
  useNoIndex();
  const [params] = useSearchParams();
  const data = useMemo(() => decodeAgreement(params.get("d")), [params]);

  if (!data) {
    return (
      <main className="min-h-screen bg-background-100">
        <AgreementTopBar />
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <h1 className="font-heading text-3xl md:text-4xl font-medium text-foreground-950">Agreement not found</h1>
          <p className="text-foreground-700 mt-4">
            This link is incomplete or has expired. Please contact us and we'll send you a new one.
          </p>
          <a href={business.phoneHref} className="inline-block mt-6 font-medium text-primary-700 underline">
            {business.phoneDisplay}
          </a>
        </div>
      </main>
    );
  }

  return <AgreementFlow data={data} />;
}

function AgreementFlow({ data }: { data: AgreementData }) {
  const [current, setCurrent] = useState(0);
  const [client, setClient] = useState<ClientInfo>(() => emptyClient(data.clientName));
  const [touched, setTouched] = useState(false);
  const padRef = useRef<SignaturePadHandle>(null);
  const [hasSignature, setHasSignature] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<"idle" | "working" | "done" | "error">("idle");
  const [signedAt, setSignedAt] = useState<Date | null>(null);
  const signatureRef = useRef("");

  const update = <K extends keyof ClientInfo>(key: K, value: ClientInfo[K]) =>
    setClient((prev) => ({ ...prev, [key]: value }));

  const detailErrors = {
    name: client.name.trim().length < 2 ? "Please enter your full name." : "",
    phone: client.phone.replace(/\D/g, "").length < 10 ? "Please enter a valid phone number." : "",
    email:
      client.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(client.email.trim())
        ? "Please enter a valid email address."
        : "",
    street: client.street.trim() ? "" : "Please enter the street address.",
    city: client.city.trim() ? "" : "Please enter the city.",
    state: client.state.trim() ? "" : "Required.",
    zip: /^\d{5}$/.test(client.zip.trim()) ? "" : "5-digit ZIP.",
  };
  const detailsValid = Object.values(detailErrors).every((e) => !e);

  const canContinue =
    current === 0 ? true : current === 1 ? detailsValid : hasSignature && agreed && status !== "working";

  async function makePdf(when: Date) {
    await downloadAgreementPdf(data, client, {
      signatureDataUrl: signatureRef.current,
      signedAt: when,
    });
  }

  async function next() {
    if (current === 1 && !detailsValid) {
      setTouched(true);
      return;
    }
    if (current < STEPS.length - 1) {
      setCurrent(current + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (!padRef.current || padRef.current.isEmpty()) return;
    setStatus("working");
    try {
      const when = new Date();
      signatureRef.current = padRef.current.toDataURL();
      await makePdf(when);
      setSignedAt(when);
      setStatus("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
    }
  }

  const back = () => {
    if (current > 0) setCurrent(current - 1);
  };

  if (status === "done" && signedAt) {
    return (
      <main className="min-h-screen bg-background-100">
        <AgreementTopBar />
        <div className="max-w-2xl mx-auto px-4 py-16 md:py-24 text-center">
          <span className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-primary-100 text-primary-700 text-3xl">
            <i className="ri-check-line"></i>
          </span>
          <h1 className="font-heading text-3xl md:text-5xl font-medium text-foreground-950 mt-6">
            Agreement signed
          </h1>
          <p className="text-foreground-700 mt-4">
            Thank you, {client.name.split(" ")[0]}. Your signed agreement {data.id} was downloaded to
            this device. Please send a copy to {business.name} by WhatsApp at {business.whatsappDisplay}{" "}
            or by email to {business.email}.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button type="button" onClick={() => void makePdf(signedAt)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-500 hover:bg-primary-600 text-background-50 font-medium px-6 py-3">
              <i className="ri-download-2-line"></i>
              Download PDF again
            </button>
            <a href={business.whatsappHref} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] text-white font-medium px-6 py-3 hover:opacity-90">
              <i className="ri-whatsapp-line"></i>
              Open WhatsApp
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background-100">
      <AgreementTopBar />

      <div className="px-4 md:px-10 pt-8 pb-6">
        <StepIndicator current={current} steps={STEPS} onJump={(i) => i < current && setCurrent(i)} />
      </div>

      <section className="px-4 md:px-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
          <div className="lg:col-span-8 bg-background-50 border border-background-200/70 rounded-3xl p-6 md:p-10">
            {current === 0 && <StepReview data={data} />}
            {current === 1 && (
              <StepDetails client={client} update={update} errors={touched ? detailErrors : undefined} />
            )}
            {current === 2 && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-heading text-foreground-950 text-3xl md:text-4xl font-medium mb-2">
                    Read and sign
                  </h2>
                  <p className="text-foreground-700 text-sm md:text-base">
                    Please read the terms, then sign with your finger or mouse.
                  </p>
                </div>

                <div className="max-h-80 overflow-y-auto rounded-2xl border border-background-200 bg-background-100/60 p-5 space-y-4">
                  {buildTerms(data).map((term, i) => (
                    <div key={term.title}>
                      <h3 className="font-semibold text-foreground-950 text-sm md:text-base">
                        {i + 1}. {term.title}
                      </h3>
                      <p className="text-foreground-800 text-sm leading-relaxed mt-1">{term.text}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-foreground-950 text-lg font-medium">Your signature</h3>
                    <button type="button" onClick={() => padRef.current?.clear()}
                      className="inline-flex items-center gap-1 text-sm text-primary-700 hover:underline">
                      <i className="ri-eraser-line"></i>
                      Clear
                    </button>
                  </div>
                  <div className="mt-2">
                    <SignaturePad ref={padRef} onChange={setHasSignature} />
                  </div>
                  <p className="text-xs text-foreground-600 mt-2">
                    Signing as <strong>{client.name}</strong> · {formatDate(todayYmd())}
                  </p>
                </div>

                <label className="flex items-start gap-3 text-sm text-foreground-800">
                  <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 w-5 h-5 accent-primary-600" />
                  <span>
                    I have read and agree to this agreement, and I agree that my electronic signature
                    has the same effect as a handwritten signature.
                  </span>
                </label>
              </div>
            )}

            <div className="mt-10 pt-6 border-t border-background-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              {current > 0 ? (
                <button type="button" onClick={back}
                  className="inline-flex items-center gap-2 text-foreground-800 text-sm font-medium px-5 py-3 rounded-full border border-foreground-300 hover:bg-background-100 whitespace-nowrap">
                  <i className="ri-arrow-left-line"></i>
                  Back
                </button>
              ) : (
                <span />
              )}
              <div className="flex flex-col items-end gap-2">
                {status === "error" && (
                  <p className="text-red-600 text-sm text-right max-w-xs">
                    We couldn't create the PDF. Please try again or call {business.phoneDisplay}.
                  </p>
                )}
                {current === 1 && touched && !detailsValid && (
                  <p className="text-red-600 text-sm text-right max-w-xs">Please complete the highlighted fields.</p>
                )}
                <button type="button" onClick={() => void next()}
                  disabled={current === 2 && !canContinue}
                  className={`group inline-flex items-center gap-2 pl-6 pr-2 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    canContinue ? "bg-primary-500 text-background-50 hover:bg-primary-600" : "bg-background-200 text-foreground-500 cursor-not-allowed"
                  }`}>
                  {status === "working" ? "Preparing PDF..." : current === STEPS.length - 1 ? "Sign and download PDF" : "Continue"}
                  <span className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    canContinue ? "bg-background-50 text-primary-600" : "bg-background-50/40 text-foreground-400"
                  }`}>
                    {status === "working" ? (
                      <i className="ri-loader-4-line animate-spin"></i>
                    ) : current === STEPS.length - 1 ? (
                      <i className="ri-download-2-line"></i>
                    ) : (
                      <i className="ri-arrow-right-line"></i>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <AgreementSummary data={data} />
          </div>
        </div>
      </section>
    </main>
  );
}

function StepReview({ data }: { data: AgreementData }) {
  const first = data.clientName.trim().split(" ")[0];
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-heading text-foreground-950 text-3xl md:text-4xl font-medium mb-2">
          {first ? `Hi ${first}, here's your service.` : "Here's your service."}
        </h2>
        <p className="text-foreground-700 text-sm md:text-base">
          Prepared by {data.preparedBy} on {formatDate(data.prepared)}. Please check that everything
          is right before continuing.
        </p>
      </div>
      <dl className="divide-y divide-background-200 rounded-2xl border border-background-200">
        {serviceRows(data).map(([label, value]) => (
          <div key={label} className="px-5 py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
            <dt className="text-sm text-foreground-600">{label}</dt>
            <dd className="sm:col-span-2 text-foreground-950 font-medium">{value}</dd>
          </div>
        ))}
      </dl>
      {data.scope.trim() && (
        <div className="rounded-2xl bg-background-100/60 border border-background-200 p-5">
          <p className="text-xs uppercase tracking-widest text-foreground-600 mb-2">What's included</p>
          <p className="text-foreground-900 whitespace-pre-line">{data.scope}</p>
        </div>
      )}
      <p className="text-sm text-foreground-600">
        Something doesn't look right? Call or text us at{" "}
        <a href={business.phoneHref} className="text-primary-700 underline">{business.phoneDisplay}</a>{" "}
        before signing.
      </p>
    </div>
  );
}

type DetailErrors = Partial<Record<keyof ClientInfo, string>>;

function StepDetails({
  client,
  update,
  errors,
}: {
  client: ClientInfo;
  update: <K extends keyof ClientInfo>(k: K, v: ClientInfo[K]) => void;
  errors?: DetailErrors;
}) {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-heading text-foreground-950 text-3xl md:text-4xl font-medium mb-2">
          Where should our team go?
        </h2>
        <p className="text-foreground-700 text-sm md:text-base">
          These details appear on your signed agreement.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="font-heading text-foreground-950 text-lg font-medium">Service address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label="Street address" value={client.street} onChange={(v) => update("street", v)}
            placeholder="100 Maple Ave, Unit 2" autoComplete="street-address" error={errors?.street} full />
          <Field label="City" value={client.city} onChange={(v) => update("city", v)}
            placeholder="Sterling" autoComplete="address-level2" error={errors?.city} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="State" value={client.state} onChange={(v) => update("state", v.toUpperCase())}
              placeholder="VA" autoComplete="address-level1" error={errors?.state} />
            <Field label="ZIP" value={client.zip} onChange={(v) => update("zip", v.replace(/\D/g, "").slice(0, 5))}
              placeholder="20164" autoComplete="postal-code" inputMode="numeric" error={errors?.zip} />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="font-heading text-foreground-950 text-lg font-medium">Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label="Full name" value={client.name} onChange={(v) => update("name", v)}
            placeholder="Jane Doe" autoComplete="name" error={errors?.name} full />
          <Field label="Phone" value={client.phone} onChange={(v) => update("phone", v)}
            placeholder="(571) 000-0000" autoComplete="tel" type="tel" error={errors?.phone} />
          <Field label="Email (optional)" value={client.email} onChange={(v) => update("email", v)}
            placeholder="you@email.com" autoComplete="email" type="email" error={errors?.email} />
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
  full,
  error,
  type = "text",
  autoComplete,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  full?: boolean;
  error?: string;
  type?: string;
  autoComplete?: string;
  inputMode?: "numeric" | "text";
}) {
  return (
    <label className={`block ${full ? "md:col-span-2" : ""}`}>
      <span className="block text-xs uppercase tracking-widest text-foreground-600 mb-2">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={error ? true : undefined}
        className={`w-full bg-background-100 rounded-xl px-4 py-3 text-sm text-foreground-950 placeholder-foreground-400 focus:outline-none focus:ring-2 ${
          error ? "ring-2 ring-red-400 focus:ring-red-400" : "focus:ring-primary-400"
        }`}
      />
      {error && <span className="block text-xs text-red-600 mt-1.5">{error}</span>}
    </label>
  );
}

function AgreementSummary({ data }: { data: AgreementData }) {
  const rows: [string, string][] = [
    ["Frequency", data.frequency],
    ["Home", homeLabel(data)],
    ["Date", formatDate(data.startDate)],
    ["Time", data.arrivalTime],
    ["Add-ons", data.addOns.join(", ")],
  ].filter(([, v]) => v) as [string, string][];

  return (
    <aside className="bg-background-50 border border-background-200/70 rounded-2xl p-6 lg:sticky lg:top-6">
      <p className="text-xs uppercase tracking-widest text-foreground-600 mb-3">Your agreement</p>
      <h3 className="font-heading text-foreground-950 text-2xl font-medium mb-5">{data.service}</h3>
      <div className="space-y-3 text-sm pb-5 border-b border-background-200">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-start justify-between gap-3">
            <span className="text-foreground-700">{label}</span>
            <span className="font-medium text-foreground-950 text-right">{value}</span>
          </div>
        ))}
      </div>
      <div className="pt-5 flex items-end justify-between gap-3">
        <span className="text-foreground-700 text-sm">{priceLabel(data)}</span>
        <span className="font-heading text-3xl font-medium text-foreground-950">{formatPrice(data.price)}</span>
      </div>
      <p className="text-xs text-foreground-600 mt-4">
        Agreement {data.id}. Free reschedule up to 12 hrs before your visit.
      </p>
    </aside>
  );
}

function AgreementTopBar() {
  return (
    <header className="bg-background-50/80 backdrop-blur-md border-b border-background-200/70 px-4 md:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img src="/images/brand/Lord-Logo-Small.webp" alt="Lord Cleaning logo" className="w-9 h-9 rounded-lg object-cover" />
        <span className="font-heading text-lg md:text-xl font-semibold tracking-tight text-foreground-950">
          Lord Cleaning Services
        </span>
      </div>
      <div className="flex items-center gap-2 text-xs text-foreground-700 whitespace-nowrap">
        <i className="ri-lock-line"></i>
        Service agreement
      </div>
    </header>
  );
}
