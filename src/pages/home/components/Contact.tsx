import { useState, type FormEvent } from "react";
import { business } from "@/mocks/landing";

const FORM_ENDPOINT = "https://formspree.io/f/moejvqel";

const serviceOptions = [
  "Standard Cleaning",
  "Deep Cleaning",
  "Move-In / Move-Out Cleaning",
  "Office & Commercial Cleaning",
  "Post-Construction Cleaning",
  "Airbnb / Short-Term Rental Cleaning",
  "Kitchen & Bathroom Cleaning",
  "Something else",
];

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const honeypot = (formData.get("website_alt") as string | null)?.trim() ?? "";
    if (honeypot) {
      setStatus("success");
      setMessage("Thanks! Your free estimate request is on its way.");
      form.reset();
      return;
    }
    formData.delete("website_alt");

    const name = (formData.get("name") as string | null)?.trim() ?? "";
    const email = (formData.get("email") as string | null)?.trim() ?? "";
    const phone = (formData.get("phone") as string | null)?.trim() ?? "";

    if (!name) {
      setStatus("error");
      setMessage("Please tell us your name.");
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    if (!phone) {
      setStatus("error");
      setMessage("Please add a phone number so we can reach you.");
      return;
    }

    const params = new URLSearchParams();
    formData.forEach((value, key) => params.append(key, String(value)));
    params.append("_subject", "New estimate request (short form) - Lord Cleaning Services");
    params.append("form_source", "short_form");

    try {
      setStatus("loading");
      setMessage("");
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: params.toString(),
      });
      if (!res.ok) {
        const data: { errors?: { message: string }[] } | null = await res.json().catch(() => null);
        setStatus("error");
        setMessage(
          data?.errors?.map((item) => item.message).join(", ") ||
            "We couldn't send that. Please call or text (571) 300-3094.",
        );
        return;
      }

      const w = window as unknown as {
        fbq?: (...args: unknown[]) => void;
        gtag?: (...args: unknown[]) => void;
      };
      if (typeof w.fbq === "function") w.fbq("track", "Lead");
      if (typeof w.gtag === "function") w.gtag("event", "generate_lead", { form_name: "short_form" });

      setStatus("success");
      setMessage("Thanks! We'll send your free estimate within 2 hours.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please call or text (571) 300-3094.");
    }
  }

  return (
    <section id="contact" className="bg-primary-50 px-4 md:px-10 py-20 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14">
        {/* Contact details */}
        <div className="lg:col-span-5">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground-600 mb-4">
            <span className="w-6 h-px bg-foreground-400"></span>
            Get in touch
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-medium text-foreground-950 leading-[1.05] mb-4">
            Let's get you a free estimate.
          </h2>
          <p className="text-foreground-700 text-base leading-relaxed mb-8 max-w-md">
            Tell us a little about your space and we'll send a clear, no-obligation quote within
            2 hours. New clients get 25% off their first cleaning.
          </p>

          <div className="space-y-3 mb-8">
            <a
              href={business.phoneHref}
              className="group flex items-center gap-4 p-4 rounded-2xl bg-background-50 border border-background-200 hover:border-primary-300 transition-colors"
            >
              <span className="w-11 h-11 flex items-center justify-center rounded-full bg-primary-100 text-primary-700 flex-shrink-0">
                <i className="ri-phone-line text-lg"></i>
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs uppercase tracking-widest text-foreground-600">Call or Text</p>
                <p className="font-heading text-foreground-950 text-lg font-medium">
                  {business.phoneDisplay}
                </p>
              </div>
              <i className="ri-arrow-right-up-line text-foreground-500 group-hover:text-primary-700"></i>
            </a>

            <a
              href={business.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 rounded-2xl bg-background-50 border border-background-200 hover:border-primary-300 transition-colors"
            >
              <span className="w-11 h-11 flex items-center justify-center rounded-full bg-secondary-100 text-secondary-800 flex-shrink-0">
                <i className="ri-whatsapp-line text-lg text-[#25D366]"></i>
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs uppercase tracking-widest text-foreground-600">WhatsApp</p>
                <p className="font-heading text-foreground-950 text-lg font-medium">
                  {business.whatsappDisplay}
                </p>
              </div>
              <i className="ri-arrow-right-up-line text-foreground-500 group-hover:text-primary-700"></i>
            </a>

            <a
              href={business.emailHref}
              className="group flex items-center gap-4 p-4 rounded-2xl bg-background-50 border border-background-200 hover:border-primary-300 transition-colors"
            >
              <span className="w-11 h-11 flex items-center justify-center rounded-full bg-accent-100 text-accent-700 flex-shrink-0">
                <i className="ri-mail-line text-lg"></i>
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs uppercase tracking-widest text-foreground-600">Email</p>
                <p className="font-heading text-foreground-950 text-base font-medium truncate">
                  {business.email}
                </p>
              </div>
              <i className="ri-arrow-right-up-line text-foreground-500 group-hover:text-primary-700"></i>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-background-50 border border-background-200">
              <p className="text-xs uppercase tracking-widest text-foreground-600 mb-2">
                Business hours
              </p>
              <p className="text-foreground-800 text-sm">{business.hoursWeek}</p>
              <p className="text-foreground-800 text-sm mt-1">{business.hoursSunday}</p>
            </div>
            <div className="p-4 rounded-2xl bg-background-50 border border-background-200">
              <p className="text-xs uppercase tracking-widest text-foreground-600 mb-2">
                Service area
              </p>
              <p className="text-foreground-800 text-sm leading-relaxed">
                {business.cityLine}
              </p>
            </div>
          </div>
        </div>

        {/* Quote form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-background-50 border border-background-200 p-6 md:p-9 h-full">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-500 text-background-50">
                <i className="ri-file-list-3-line text-lg"></i>
              </span>
              <div>
                <h3 className="font-heading text-foreground-950 text-xl font-medium">
                  Request your free estimate
                </h3>
                <p className="text-foreground-600 text-xs">Takes less than a minute</p>
              </div>
            </div>

            <form
              id="free-estimate-form"
              data-readdy-form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="ce-name" className="block text-sm font-medium text-foreground-800 mb-1.5">
                    Full name
                  </label>
                  <input
                    id="ce-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 rounded-lg bg-background-100 border border-background-200 text-sm text-foreground-950 placeholder:text-foreground-500 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
                  />
                </div>
                <div>
                  <label htmlFor="ce-phone" className="block text-sm font-medium text-foreground-800 mb-1.5">
                    Phone
                  </label>
                  <input
                    id="ce-phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="(571) 000-0000"
                    className="w-full px-4 py-3 rounded-lg bg-background-100 border border-background-200 text-sm text-foreground-950 placeholder:text-foreground-500 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="ce-email" className="block text-sm font-medium text-foreground-800 mb-1.5">
                    Email
                  </label>
                  <input
                    id="ce-email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@email.com"
                    className="w-full px-4 py-3 rounded-lg bg-background-100 border border-background-200 text-sm text-foreground-950 placeholder:text-foreground-500 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
                  />
                </div>
                <div>
                  <label htmlFor="ce-city" className="block text-sm font-medium text-foreground-800 mb-1.5">
                    City
                  </label>
                  <input
                    id="ce-city"
                    name="city"
                    type="text"
                    placeholder="Sterling, VA"
                    className="w-full px-4 py-3 rounded-lg bg-background-100 border border-background-200 text-sm text-foreground-950 placeholder:text-foreground-500 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="ce-service" className="block text-sm font-medium text-foreground-800 mb-1.5">
                  Service needed
                </label>
                <select
                  id="ce-service"
                  name="service"
                  defaultValue={serviceOptions[0]}
                  className="w-full px-4 py-3 rounded-lg bg-background-100 border border-background-200 text-sm text-foreground-950 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 cursor-pointer"
                >
                  {serviceOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="ce-message" className="block text-sm font-medium text-foreground-800 mb-1.5">
                  Tell us about your space <span className="text-foreground-500">(optional)</span>
                </label>
                <textarea
                  id="ce-message"
                  name="message"
                  rows={4}
                  maxLength={500}
                  placeholder="Bedrooms, bathrooms, square footage, preferred days, anything else..."
                  className="w-full px-4 py-3 rounded-lg bg-background-100 border border-background-200 text-sm text-foreground-950 placeholder:text-foreground-500 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 resize-none"
                ></textarea>
              </div>

              {/* Off-screen optional field */}
              <input
                className="field-note-offscreen"
                type="text"
                name="website_alt"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                readOnly
              />

              {message && (
                <div
                  className={`flex items-start gap-2 px-4 py-3 rounded-lg text-sm ${
                    status === "success"
                      ? "bg-primary-100 text-primary-800"
                      : "bg-accent-100 text-accent-900"
                  }`}
                >
                  <i
                    className={`mt-0.5 ${
                      status === "success" ? "ri-checkbox-circle-line" : "ri-error-warning-line"
                    }`}
                  ></i>
                  <span>{message}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="group w-full flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed text-background-50 px-6 py-3.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors"
              >
                {status === "loading" ? (
                  <>
                    <i className="ri-loader-4-line animate-spin"></i>
                    Sending your request…
                  </>
                ) : (
                  <>
                    Get My Free Estimate
                    <i className="ri-arrow-right-line group-hover:translate-x-0.5 transition-transform"></i>
                  </>
                )}
              </button>

              <p className="text-xs text-foreground-600 text-center">
                Prefer to talk? Call or text{" "}
                <a href={business.phoneHref} className="text-primary-700 font-medium hover:text-primary-800">
                  {business.phoneDisplay}
                </a>{" "}
                or{" "}
                <a
                  href={business.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-700 font-medium hover:text-primary-800"
                >
                  chat on WhatsApp
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}