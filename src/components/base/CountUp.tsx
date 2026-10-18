import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: string;
  duration?: number;
  delay?: number;
  className?: string;
  label?: string;
  labelClassName?: string;
}

export default function CountUp({
  value,
  duration = 1600,
  delay = 0,
  className,
  label,
  labelClassName,
}: CountUpProps) {
  const match = value.match(/^([\d.,]+)(.*)$/);
  const numericStr = match ? match[1] : "";
  const suffix = match ? match[2] : value;
  const decimals = numericStr.includes(".") ? numericStr.split(".")[1].length : 0;
  const target = parseFloat(numericStr.replace(/,/g, ""));
  const isNumeric = numericStr !== "" && !Number.isNaN(target);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const [display, setDisplay] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;

            window.setTimeout(() => setVisible(true), delay);

            if (isNumeric) {
              const startTime = performance.now() + delay;
              const tick = (now: number) => {
                const elapsed = now - startTime;
                if (elapsed < 0) {
                  requestAnimationFrame(tick);
                  return;
                }
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                setDisplay(target * eased);
                if (progress < 1) {
                  requestAnimationFrame(tick);
                } else {
                  setDisplay(target);
                }
              };
              requestAnimationFrame(tick);
            }
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, delay, isNumeric]);

  const formatted = isNumeric ? display.toFixed(decimals) : value;

  return (
    <div
      ref={wrapperRef}
      className="transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(14px) scale(0.96)",
      }}
    >
      <p className={className}>
        {formatted}
        {suffix}
      </p>
      {label && <p className={labelClassName}>{label}</p>}
    </div>
  );
}