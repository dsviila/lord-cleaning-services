// Shared data, encoding and contract text for the private service agreement pages.
import { deflateSync, inflateSync } from "fflate";
import { business } from "@/mocks/landing";
import { addOns, bathroomOptions, bedroomOptions } from "@/mocks/booking";

/** Add-on labels in a fixed order; their position is the code used in the link (max 10). */
const ADD_ON_LABELS = addOns.map((a) => a.label);

export const SERVICE_OPTIONS = [
  "Standard Cleaning",
  "Deep Cleaning",
  "Move-In / Move-Out Cleaning",
  "Office & Commercial Cleaning",
  "Post-Construction Cleaning",
  "Airbnb / Short-Term Rental Cleaning",
] as const;

export const FREQUENCY_OPTIONS = ["One-time", "Weekly", "Bi-weekly", "Monthly"] as const;

export const PAYMENT_OPTIONS = [
  "Due on the day of service, after the cleaning is completed",
  "Due before the service",
  "50% deposit to book, balance due on the day of service",
] as const;

/** What the estimator prepares. Travels inside the link. */
export type AgreementData = {
  /** Agreement number, e.g. LCS-20261029-4821 */
  id: string;
  /** Date the agreement was prepared (YYYY-MM-DD, local time) */
  prepared: string;
  preparedBy: string;
  /** Optional, only used to greet the client and prefill their name */
  clientName: string;
  /** Optional, only used for the WhatsApp message (not included in the link) */
  clientPhone: string;
  service: string;
  frequency: string;
  bedrooms: string;
  bathrooms: string;
  addOns: string[];
  startDate: string;
  arrivalTime: string;
  price: string;
  payment: string;
  lateCancelFee: string;
  scope: string;
};

/** What the client fills in before signing. Never leaves the client's device except in the PDF. */
export type ClientInfo = {
  name: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zip: string;
};

export const emptyClient = (name = ""): ClientInfo => ({
  name,
  phone: "",
  email: "",
  street: "",
  city: "",
  state: "VA",
  zip: "",
});

/** Today's date as YYYY-MM-DD in the device's local time. */
export function todayYmd(): string {
  const today = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
}

export const emptyAgreement = (): AgreementData => {
  const ymd = todayYmd();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return {
    id: `LCS-${ymd.replace(/-/g, "")}-${rand}`,
    prepared: ymd,
    preparedBy: "",
    clientName: "",
    clientPhone: "",
    service: SERVICE_OPTIONS[0],
    frequency: FREQUENCY_OPTIONS[0],
    bedrooms: "",
    bathrooms: "",
    addOns: [],
    startDate: "",
    arrivalTime: "",
    price: "",
    payment: PAYMENT_OPTIONS[0],
    lateCancelFee: "",
    scope: "",
  };
};

// --- Link encoding ---
// The agreement travels inside the link (?d=...). To keep the link short, it is stored as a
// positional array, with codes instead of repeated text, then deflate-compressed when that helps.
// Format: "z" + base64url(deflate(json)) or "j" + base64url(json).

const toB64Url = (bytes: Uint8Array) => {
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

const fromB64Url = (value: string) => {
  const b64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(b64 + "=".repeat((4 - (b64.length % 4)) % 4));
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
};

const ymdCompact = (ymd: string) => ymd.replace(/-/g, "");
const ymdExpand = (v: string) => (v.length === 8 ? `${v.slice(0, 4)}-${v.slice(4, 6)}-${v.slice(6, 8)}` : "");
const indexOf = (list: readonly string[], value: string) => Math.max(0, list.indexOf(value));
const optIndex = (list: readonly string[], value: string) => (value ? list.indexOf(value) + 1 : 0);

export function encodeAgreement(d: AgreementData): string {
  const rand = d.id.split("-").pop() ?? "";
  const packed = [
    1, // format version
    ymdCompact(d.prepared),
    rand,
    d.preparedBy,
    d.clientName,
    indexOf(SERVICE_OPTIONS, d.service),
    indexOf(FREQUENCY_OPTIONS, d.frequency),
    optIndex(bedroomOptions, d.bedrooms),
    optIndex(bathroomOptions, d.bathrooms),
    d.addOns.map((label) => ADD_ON_LABELS.indexOf(label)).filter((i) => i >= 0).join(""),
    ymdCompact(d.startDate),
    d.arrivalTime,
    d.price,
    indexOf(PAYMENT_OPTIONS, d.payment),
    d.lateCancelFee,
    d.scope,
  ];
  const json = new TextEncoder().encode(JSON.stringify(packed));
  const zipped = deflateSync(json, { level: 9 });
  return zipped.length < json.length ? `z${toB64Url(zipped)}` : `j${toB64Url(json)}`;
}

export function decodeAgreement(value: string | null): AgreementData | null {
  if (!value || value.length < 2) return null;
  try {
    const raw = fromB64Url(value.slice(1));
    const bytes = value[0] === "z" ? inflateSync(raw) : value[0] === "j" ? raw : null;
    if (!bytes) return null;
    const p = JSON.parse(new TextDecoder().decode(bytes)) as unknown[];
    if (!Array.isArray(p) || p[0] !== 1) return null;
    const str = (i: number) => (typeof p[i] === "string" ? (p[i] as string) : "");
    const num = (i: number) => (typeof p[i] === "number" ? (p[i] as number) : 0);
    const prepared = ymdExpand(str(1));
    const data: AgreementData = {
      id: `LCS-${str(1)}-${str(2)}`,
      prepared,
      preparedBy: str(3),
      clientName: str(4),
      clientPhone: "",
      service: SERVICE_OPTIONS[num(5)] ?? SERVICE_OPTIONS[0],
      frequency: FREQUENCY_OPTIONS[num(6)] ?? FREQUENCY_OPTIONS[0],
      bedrooms: bedroomOptions[num(7) - 1] ?? "",
      bathrooms: bathroomOptions[num(8) - 1] ?? "",
      addOns: str(9)
        .split("")
        .map((c) => ADD_ON_LABELS[Number(c)])
        .filter(Boolean),
      startDate: ymdExpand(str(10)),
      arrivalTime: str(11),
      price: str(12),
      payment: PAYMENT_OPTIONS[num(13)] ?? PAYMENT_OPTIONS[0],
      lateCancelFee: str(14),
      scope: str(15),
    };
    if (!prepared || !data.price) return null;
    return data;
  } catch {
    return null;
  }
}

// --- Formatting helpers ---

export function formatDate(ymd: string): string {
  if (!ymd) return "";
  const [y, m, d] = ymd.split("-").map(Number);
  if (!y || !m || !d) return ymd;
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatPrice(price: string): string {
  const n = Number(String(price).replace(/[^0-9.]/g, ""));
  if (!price || Number.isNaN(n)) return price;
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export function priceLabel(d: AgreementData): string {
  return d.frequency === "One-time" ? "Price" : "Price per visit";
}

export function homeLabel(d: AgreementData): string {
  return [d.bedrooms, d.bathrooms && `${d.bathrooms} bath`].filter(Boolean).join(" · ");
}

export function fullAddress(c: ClientInfo): string {
  const cityLine = [c.city, [c.state, c.zip].filter(Boolean).join(" ")].filter(Boolean).join(", ");
  return [c.street, cityLine].filter(Boolean).join(", ");
}

/** Service rows prepared by the estimator. */
export function serviceRows(d: AgreementData): [string, string][] {
  const rows: [string, string][] = [
    ["Service", d.service],
    ["Frequency", d.frequency],
    ["Home", homeLabel(d)],
    ["Add-ons", d.addOns.join(", ")],
    ["First service date", formatDate(d.startDate)],
    ["Arrival time", d.arrivalTime],
    [priceLabel(d), formatPrice(d.price)],
    ["Payment", d.payment],
  ];
  return rows.filter(([, v]) => v && v.trim() !== "");
}

/** Client rows entered by the client. */
export function clientRows(c: ClientInfo): [string, string][] {
  const rows: [string, string][] = [
    ["Client", c.name],
    ["Phone", c.phone],
    ["Email", c.email],
    ["Service address", fullAddress(c)],
  ];
  return rows.filter(([, v]) => v && v.trim() !== "");
}

// --- Contract terms ---

export type Term = { title: string; text: string };

export function buildTerms(d: AgreementData): Term[] {
  const recurring = d.frequency !== "One-time";
  const terms: Term[] = [
    {
      title: "Services",
      text:
        `${business.name} ("the Company") will provide ${d.service.toLowerCase()} at the service address provided by the Client` +
        (recurring ? `, on a ${d.frequency.toLowerCase()} schedule starting on the first service date.` : ", on the service date listed in this agreement.") +
        (d.scope.trim() ? ` The service includes: ${d.scope.trim()}` : "") +
        " Any additional work requested on the day of service may change the price and will be agreed with the Client before it is done.",
    },
    {
      title: "Price and payment",
      text:
        `The Client agrees to pay ${formatPrice(d.price)}` +
        (recurring ? " for each visit" : "") +
        `. Payment terms: ${d.payment.charAt(0).toLowerCase() + d.payment.slice(1)}. ` +
        "The price is based on the information the Client provided about the property. If the condition or size of the property is materially different on the day of service, the Company will explain any price change to the Client before continuing.",
    },
    {
      title: "Access and preparation",
      text:
        "The Client will give the team access to the property at the agreed arrival time, with running water and electricity available. The Client will secure pets, and put away cash, jewelry, important documents and other valuables or fragile items before the visit.",
    },
    {
      title: "Rescheduling and cancellation",
      text:
        "The Client may reschedule or cancel a visit at no charge with at least 12 hours' notice by calling, texting or sending a WhatsApp message to the Company." +
        (d.lateCancelFee.trim() && Number(d.lateCancelFee) > 0
          ? ` Cancellations with less than 12 hours' notice, or visits where the team cannot access the property, may be charged a fee of ${formatPrice(d.lateCancelFee)}.`
          : ""),
    },
    {
      title: "Satisfaction guarantee",
      text:
        "If anything included in the service was missed, the Client should notify the Company within 24 hours of the visit. The Company will return, normally the next day, to clean the missed areas at no extra cost.",
    },
    {
      title: "Insurance, damage and safety",
      text:
        "The Company's team members are background-checked and the Company is insured. If the Client believes something was damaged during the service, the Client should report it within 24 hours with photos, and the Company will review the claim in good faith. The Company is not responsible for pre-existing damage, normal wear, or items that were not secured as described above. The team may decline to clean areas that are unsafe, or substances such as mold or biohazards.",
    },
  ];
  if (recurring) {
    terms.push({
      title: "Recurring service",
      text:
        "Either party may pause or end the recurring service at any time by notifying the other party at least 12 hours before the next scheduled visit. Visits already completed remain payable.",
    });
  }
  terms.push(
    {
      title: "Changes and entire agreement",
      text:
        "This agreement, together with the service details in it, is the entire agreement between the Client and the Company for these services. Any change must be agreed in writing, including by text message or email.",
    },
    {
      title: "Governing law and electronic signature",
      text:
        "This agreement is governed by the laws of the Commonwealth of Virginia. The parties agree that the Client's electronic signature on this agreement has the same effect as a handwritten signature.",
    },
  );
  return terms;
}
