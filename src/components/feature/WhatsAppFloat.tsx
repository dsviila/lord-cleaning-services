import { business } from "@/mocks/landing";

export default function WhatsAppFloat() {
  return (
    <a
      href={business.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Lord Cleaning Services on WhatsApp"
      className="group fixed bottom-24 right-5 md:bottom-[92px] md:right-7 z-40 flex items-center gap-3 cursor-pointer"
    >
      <span className="hidden md:inline-flex items-center bg-foreground-950 text-background-50 text-sm font-medium pl-4 pr-5 py-2.5 rounded-full opacity-0 translate-x-2 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto whitespace-nowrap">
        Chat on WhatsApp
      </span>
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white transition-transform duration-300 group-hover:scale-105">
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-50 animate-ping"></span>
        <i className="ri-whatsapp-line text-3xl relative z-10"></i>
      </span>
    </a>
  );
}