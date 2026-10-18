import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { beforeAfterPairs } from "@/mocks/beforeAfter";

const START_POSITION = 52;

export default function BeforeAfter() {
  const [active, setActive] = useState(0);
  const [position, setPosition] = useState(START_POSITION);
  const [dragging, setDragging] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  const pair = beforeAfterPairs[active];

  const updateFromClientX = useCallback((clientX: number) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  }, []);

  useEffect(() => {
    if (!dragging) return undefined;

    const handleMove = (event: PointerEvent) => {
      updateFromClientX(event.clientX);
    };
    const stop = () => setDragging(false);

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
    };
  }, [dragging, updateFromClientX]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 10 : 4;
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      setPosition((prev) => Math.max(0, prev - step));
    } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      setPosition((prev) => Math.min(100, prev + step));
    } else if (event.key === "Home") {
      event.preventDefault();
      setPosition(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setPosition(100);
    }
  };

  const roundedPosition = Math.round(position);

  return (
    <section id="results" className="bg-background-100 px-4 md:px-10 py-20 md:py-32">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 md:mb-14">
        <div>
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground-600 mb-4">
            <span className="w-6 h-px bg-foreground-400"></span>
            See the difference
          </p>
          <h2 className="font-heading text-4xl md:text-6xl font-medium text-foreground-950 leading-[1.05] max-w-3xl">
            Same room.<br />Completely different feeling.
          </h2>
        </div>
        <p className="text-foreground-700 text-base max-w-sm leading-relaxed">
          Drag the handle across the photo to reveal the before and after of a real Lord
          Cleaning visit. No filters, no staging — just the work.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-5 md:mb-6">
        <div className="inline-flex items-center gap-1 p-1 rounded-full bg-background-50 border border-background-200/80">
          {beforeAfterPairs.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActive(index);
                setPosition(START_POSITION);
              }}
              aria-pressed={active === index}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                active === index
                  ? "bg-foreground-950 text-background-50"
                  : "text-foreground-700 hover:text-foreground-950 hover:bg-background-200/60"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-100 text-accent-900 text-xs font-medium">
          <i className="ri-camera-lens-line"></i>
          Real client homes
        </span>
      </div>

      <div
        ref={frameRef}
        className="relative w-full h-[380px] md:h-[560px] lg:h-[640px] rounded-2xl overflow-hidden select-none"
        style={{ touchAction: "pan-y" }}
        onPointerDown={(event) => {
          event.preventDefault();
          updateFromClientX(event.clientX);
          setDragging(true);
        }}
      >
        <img
          src={pair.after}
          alt={`${pair.label} after a Lord Cleaning visit`}
          draggable={false}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
        />
        <img
          src={pair.before}
          alt={`${pair.label} before the cleaning`}
          draggable={false}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        />

        <span className="absolute top-4 left-4 md:top-6 md:left-6 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-background-50/90 text-foreground-900 text-xs uppercase tracking-widest backdrop-blur-sm">
          Before
        </span>
        <span className="absolute top-4 right-4 md:top-6 md:right-6 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-500 text-background-50 text-xs uppercase tracking-widest">
          After
        </span>

        <div
          className="absolute top-0 bottom-0 w-px bg-background-50/90"
          style={{ left: `${position}%` }}
        >
          <div
            role="slider"
            tabIndex={0}
            aria-label={`${pair.label} before and after comparison`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={roundedPosition}
            aria-valuetext={`${roundedPosition}% of the before photo visible`}
            aria-orientation="horizontal"
            onKeyDown={handleKeyDown}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-background-50 text-foreground-900 border border-background-300 cursor-ew-resize transition-transform outline-none focus-visible:ring-2 focus-visible:ring-primary-400 ${
              dragging ? "scale-105" : ""
            }`}
          >
            <i className="ri-arrow-left-right-line text-lg md:text-xl"></i>
          </div>
        </div>

        <span className="absolute bottom-4 left-4 md:bottom-6 md:left-6 inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-foreground-950/55 text-background-50 text-xs backdrop-blur-sm">
          <i className="ri-drag-move-2-line"></i>
          Drag the handle to compare
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5 md:mt-6">
        <div className="flex-1 min-w-0">
          <p className="text-foreground-950 text-sm font-medium">{pair.caption}</p>
          <p className="text-foreground-600 text-xs md:text-sm mt-1">
            Tip: focus the handle and use the arrow keys (hold Shift to move faster).
          </p>
        </div>
        <Link
          to="/gallery"
          className="group inline-flex items-center gap-2 bg-background-50 border border-background-300 hover:border-foreground-400 text-foreground-950 pl-5 pr-2 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors"
        >
          See the full gallery
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-500 text-background-50">
            <i className="ri-arrow-right-line transition-transform group-hover:translate-x-0.5"></i>
          </span>
        </Link>
      </div>
    </section>
  );
}