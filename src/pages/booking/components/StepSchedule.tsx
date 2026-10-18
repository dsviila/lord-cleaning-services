import { useMemo, useState } from "react";
import { timeSlots } from "@/mocks/booking";
import type { BookingState } from "@/hooks/useBooking";

type Props = {
  state: BookingState;
  update: <K extends keyof BookingState>(k: K, v: BookingState[K]) => void;
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function toIso(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function StepSchedule({ state, update }: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [view, setView] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const grid = useMemo(() => {
    const first = new Date(view.getFullYear(), view.getMonth(), 1);
    const startWeekday = first.getDay();
    const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    const cells: { date: Date | null; iso?: string }[] = [];
    for (let i = 0; i < startWeekday; i++) cells.push({ date: null });
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(view.getFullYear(), view.getMonth(), d);
      cells.push({ date, iso: toIso(date) });
    }
    while (cells.length % 7 !== 0) cells.push({ date: null });
    return cells;
  }, [view]);

  const monthLabel = view.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-heading text-foreground-950 text-3xl md:text-4xl font-medium mb-2">
          When works for you?
        </h2>
        <p className="text-foreground-700 text-sm md:text-base">
          Pick a date and arrival window. You can reschedule for free up to 12 hours before.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
        <div className="lg:col-span-3 bg-background-50 border border-background-200/70 rounded-2xl p-5 md:p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-heading text-foreground-950 text-lg font-medium">{monthLabel}</h3>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-background-300 text-foreground-700 hover:bg-background-100"
                aria-label="Previous month"
              >
                <i className="ri-arrow-left-s-line"></i>
              </button>
              <button
                type="button"
                onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-background-300 text-foreground-700 hover:bg-background-100"
                aria-label="Next month"
              >
                <i className="ri-arrow-right-s-line"></i>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {WEEKDAYS.map((d) => (
              <div key={d} className="text-center text-xs text-foreground-500 py-1">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {grid.map((c, i) => {
              if (!c.date) return <div key={i} className="aspect-square" />;
              const isPast = c.date < today;
              const isSelected = state.date === c.iso;
              const isToday = c.iso === toIso(today);
              return (
                <button
                  type="button"
                  key={i}
                  disabled={isPast}
                  onClick={() => c.iso && update("date", c.iso)}
                  className={`aspect-square rounded-lg text-sm font-medium transition-colors flex items-center justify-center ${
                    isSelected
                      ? "bg-primary-500 text-background-50"
                      : isPast
                        ? "text-foreground-300 cursor-not-allowed"
                        : isToday
                          ? "border border-primary-400 text-foreground-900 hover:bg-primary-50"
                          : "text-foreground-800 hover:bg-background-100"
                  }`}
                >
                  {c.date.getDate()}
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-2">
          <p className="text-xs uppercase tracking-widest text-foreground-700 mb-3">Arrival window</p>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((t) => {
              const active = state.time === t;
              const disabled = !state.date;
              return (
                <button
                  type="button"
                  key={t}
                  disabled={disabled}
                  onClick={() => update("time", t)}
                  className={`py-3 rounded-xl text-sm font-medium border-2 transition-colors ${
                    active
                      ? "border-foreground-950 bg-foreground-950 text-background-50"
                      : disabled
                        ? "border-background-200 bg-background-50 text-foreground-300 cursor-not-allowed"
                        : "border-background-200 bg-background-50 text-foreground-800 hover:border-foreground-400"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
          {!state.date && (
            <p className="text-xs text-foreground-600 mt-3">Pick a date first to see times.</p>
          )}
        </div>
      </div>
    </div>
  );
}