import { Link } from "react-router-dom";

type Variant = "solid" | "outline" | "text";

type Props = {
  label?: string;
  variant?: Variant;
  className?: string;
};

const base =
  "inline-flex items-center gap-2 whitespace-nowrap font-medium transition-colors cursor-pointer";

const variants: Record<Variant, string> = {
  solid: "rounded-full bg-primary-500 hover:bg-primary-600 text-background-50 px-5 py-3 text-sm",
  outline:
    "rounded-full border border-foreground-300 hover:bg-background-100 text-foreground-800 px-5 py-2.5 text-sm",
  text: "text-sm text-primary-700 hover:text-primary-800",
};

export default function QuoteLink({
  label = "Get your free quote",
  variant = "solid",
  className = "",
}: Props) {
  return (
    <Link to="/#contact" className={`${base} ${variants[variant]} ${className}`}>
      <i className="ri-file-list-3-line"></i>
      {label}
      <i className="ri-arrow-right-line"></i>
    </Link>
  );
}