import { business } from "@/mocks/landing";

export default function AgreementHeader({ label }: { label: string }) {
  return (
    <header className="bg-background-50 border-b border-background-200/70">
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src="/images/brand/Lord-Logo-Small.webp"
            alt="Lord Cleaning logo"
            className="w-10 h-10 rounded-lg object-cover"
          />
          <span className="font-heading text-lg md:text-xl font-semibold text-foreground-950">
            {business.name}
          </span>
        </div>
        <span className="text-xs uppercase tracking-widest text-foreground-600 whitespace-nowrap">
          {label}
        </span>
      </div>
    </header>
  );
}
