import { useMemo, useState, type FormEvent } from "react";
import AgreementHeader from "../AgreementHeader";
import { useNoIndex } from "../useNoIndex";
import { addOns as ADD_ONS, bathroomOptions, bedroomOptions } from "@/mocks/booking";
import {
  FREQUENCY_OPTIONS,
  PAYMENT_OPTIONS,
  SERVICE_OPTIONS,
  emptyAgreement,
  encodeAgreement,
  formatPrice,
  type AgreementData,
} from "../data";

const inputClass =
  "mt-1 block w-full rounded-xl border border-background-300 bg-background-50 px-3.5 py-2.5 text-foreground-950 " +
  "placeholder-foreground-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30";
const labelClass = "block text-sm font-medium text-foreground-800";
const cardClass = "bg-background-50 border border-background-200/70 rounded-3xl p-6 md:p-8 space-y-5";

export default function AgreementBuilderPage() {
  useNoIndex();
  const [data, setData] = useState<AgreementData>(emptyAgreement);
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);

  const set = <K extends keyof AgreementData>(key: K, value: AgreementData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setLink("");
    setCopied(false);
  };

  const toggleAddOn = (label: string) =>
    set("addOns", data.addOns.includes(label) ? data.addOns.filter((a) => a !== label) : [...data.addOns, label]);

  const priceValid = useMemo(() => {
    const n = Number(data.price);
    return data.price.trim() !== "" && !Number.isNaN(n) && n > 0;
  }, [data.price]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!priceValid) return;
    setLink(`${window.location.origin}/service-agreement?d=${encodeAgreement(data)}`);
    setCopied(false);
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const whatsappHref = useMemo(() => {
    if (!link) return "";
    const phone = data.clientPhone.replace(/\D/g, "");
    const to = phone.length === 10 ? `1${phone}` : phone;
    const first = data.clientName.trim().split(" ")[0];
    const text = `Hi${first ? ` ${first}` : ""}! Here is your Lord Cleaning Services agreement. Please review it, add your details, sign at the end and download your copy: ${link}`;
    return `https://wa.me/${to}?text=${encodeURIComponent(text)}`;
  }, [link, data.clientName, data.clientPhone]);

  return (
    <main className="min-h-screen bg-background-100 text-foreground-900">
      <AgreementHeader label="Internal · Prepare agreement" />

      <div className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <h1 className="font-heading text-3xl md:text-5xl font-medium text-foreground-950">
          Prepare a service agreement
        </h1>
        <p className="text-foreground-700 mt-3 text-sm md:text-base">
          Fill in the service and the price you quoted. This creates a private link: the client
          opens it, adds their name and address, signs with their finger and downloads the PDF.
          Nothing is saved on the website.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <section className={cardClass}>
            <h2 className="font-heading text-xl md:text-2xl font-medium text-foreground-950">Service</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass} htmlFor="ag-service">Service *</label>
                <select id="ag-service" className={inputClass} value={data.service}
                  onChange={(e) => set("service", e.target.value)}>
                  {SERVICE_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass} htmlFor="ag-frequency">Frequency *</label>
                <select id="ag-frequency" className={inputClass} value={data.frequency}
                  onChange={(e) => set("frequency", e.target.value)}>
                  {FREQUENCY_OPTIONS.map((f) => <option key={f}>{f}</option>)}
                </select>
              </div>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="font-heading text-xl md:text-2xl font-medium text-foreground-950">Home</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass} htmlFor="ag-bed">Bedrooms</label>
                <select id="ag-bed" className={inputClass} value={data.bedrooms}
                  onChange={(e) => set("bedrooms", e.target.value)}>
                  <option value="">—</option>
                  {bedroomOptions.map((b) => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass} htmlFor="ag-bath">Bathrooms</label>
                <select id="ag-bath" className={inputClass} value={data.bathrooms}
                  onChange={(e) => set("bathrooms", e.target.value)}>
                  <option value="">—</option>
                  {bathroomOptions.map((b) => <option key={b}>{b}</option>)}
                </select>
              </div>
            </div>
            <div>
              <p className={labelClass}>Add-ons</p>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ADD_ONS.map((a) => {
                  const on = data.addOns.includes(a.label);
                  return (
                    <button key={a.id} type="button" onClick={() => toggleAddOn(a.label)}
                      className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left text-sm transition-colors ${
                        on ? "border-primary-500 bg-primary-50 text-foreground-950" : "border-background-300 bg-background-50 text-foreground-800 hover:border-primary-300"
                      }`}>
                      <i className={`${a.icon} text-lg ${on ? "text-primary-700" : "text-foreground-500"}`}></i>
                      <span className="flex-1">{a.label}</span>
                      {on && <i className="ri-check-line text-primary-700"></i>}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label className={labelClass} htmlFor="ag-scope">What's included / notes</label>
              <textarea id="ag-scope" rows={3} className={inputClass} value={data.scope}
                placeholder="Rooms and anything specific agreed with the client"
                onChange={(e) => set("scope", e.target.value)} />
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="font-heading text-xl md:text-2xl font-medium text-foreground-950">Schedule</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass} htmlFor="ag-date">First service date *</label>
                <input id="ag-date" type="date" required className={inputClass} value={data.startDate}
                  onChange={(e) => set("startDate", e.target.value)} />
              </div>
              <div>
                <label className={labelClass} htmlFor="ag-time">Arrival time</label>
                <input id="ag-time" className={inputClass} value={data.arrivalTime}
                  placeholder="e.g. 9:00 AM or 9–10 AM"
                  onChange={(e) => set("arrivalTime", e.target.value)} />
              </div>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="font-heading text-xl md:text-2xl font-medium text-foreground-950">Price</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass} htmlFor="ag-price">
                  {data.frequency === "One-time" ? "Price (USD) *" : "Price per visit (USD) *"}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 mt-0.5 text-foreground-500">$</span>
                  <input id="ag-price" type="number" inputMode="decimal" min="1" step="0.01" required
                    className={`${inputClass} pl-7`} value={data.price}
                    onChange={(e) => set("price", e.target.value)} />
                </div>
                {data.price && !priceValid && (
                  <p className="text-sm text-red-700 mt-1">Enter a price greater than 0.</p>
                )}
              </div>
              <div>
                <label className={labelClass} htmlFor="ag-late">Late cancellation fee (USD)</label>
                <input id="ag-late" type="number" inputMode="decimal" min="0" step="0.01"
                  className={inputClass} value={data.lateCancelFee}
                  placeholder="Leave empty for no fee"
                  onChange={(e) => set("lateCancelFee", e.target.value)} />
              </div>
            </div>
            <div>
              <label className={labelClass} htmlFor="ag-payment">Payment terms *</label>
              <select id="ag-payment" className={inputClass} value={data.payment}
                onChange={(e) => set("payment", e.target.value)}>
                {PAYMENT_OPTIONS.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="ag-by">Prepared by (estimator) *</label>
              <input id="ag-by" required className={inputClass} value={data.preparedBy}
                onChange={(e) => set("preparedBy", e.target.value)} />
            </div>
          </section>

          <section className={cardClass}>
            <div>
              <h2 className="font-heading text-xl md:text-2xl font-medium text-foreground-950">Send to</h2>
              <p className="text-sm text-foreground-600 mt-1">
                Optional. Used to greet the client and to open WhatsApp with their number. The client
                types their full name and address when signing.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass} htmlFor="ag-name">Client name</label>
                <input id="ag-name" className={inputClass} value={data.clientName}
                  onChange={(e) => set("clientName", e.target.value)} />
              </div>
              <div>
                <label className={labelClass} htmlFor="ag-phone">Client phone (WhatsApp)</label>
                <input id="ag-phone" type="tel" className={inputClass} value={data.clientPhone}
                  onChange={(e) => set("clientPhone", e.target.value)} />
              </div>
            </div>
          </section>

          <button type="submit" disabled={!priceValid}
            className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-background-50 font-medium px-6 py-3.5 transition-colors">
            Create agreement link
            <i className="ri-arrow-right-line"></i>
          </button>
        </form>

        {link && (
          <section className="mt-8 bg-background-50 rounded-3xl border border-primary-300 p-6 md:p-8" aria-live="polite">
            <h2 className="font-heading text-xl md:text-2xl font-medium text-foreground-950">Link ready</h2>
            <p className="text-sm text-foreground-700 mt-1">
              Agreement {data.id} · {data.service} · {formatPrice(data.price)}
              {data.frequency === "One-time" ? "" : " per visit"}
            </p>
            <div className="mt-4 rounded-xl bg-background-100 border border-background-200 p-3 text-xs break-all text-foreground-800">
              {link}
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button type="button" onClick={copyLink}
                className="flex-1 whitespace-nowrap rounded-full border border-foreground-300 px-5 py-3 font-medium hover:bg-background-100">
                <i className="ri-file-copy-line mr-2"></i>{copied ? "Copied!" : "Copy link"}
              </button>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer"
                className="flex-1 text-center whitespace-nowrap rounded-full bg-[#25D366] text-white px-5 py-3 font-medium hover:opacity-90">
                <i className="ri-whatsapp-line mr-2"></i>Send by WhatsApp
              </a>
              <a href={link} target="_blank" rel="noopener noreferrer"
                className="flex-1 text-center whitespace-nowrap rounded-full border border-foreground-300 px-5 py-3 font-medium hover:bg-background-100">
                <i className="ri-eye-line mr-2"></i>Preview
              </a>
            </div>
            <p className="text-xs text-foreground-600 mt-4">
              The details travel inside the link, so anyone with the link can open it. Keep a note of
              the agreement number and price to compare with the signed PDF the client sends back.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
