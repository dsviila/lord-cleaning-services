type Props = {
  current: number;
  steps: { label: string }[];
  onJump?: (i: number) => void;
};

export default function StepIndicator({ current, steps, onJump }: Props) {
  return (
    <ol className="flex flex-wrap items-center gap-2 md:gap-3">
      {steps.map((s, i) => {
        const isActive = i === current;
        const isDone = i < current;
        return (
          <li key={s.label} className="flex items-center gap-2 md:gap-3">
            <button
              type="button"
              disabled={!isDone && !isActive}
              onClick={() => onJump?.(i)}
              className={`flex items-center gap-2 rounded-full pl-1.5 pr-3 py-1.5 text-xs md:text-sm font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? "bg-foreground-950 text-background-50"
                  : isDone
                    ? "bg-primary-100 text-primary-800 hover:bg-primary-200"
                    : "bg-background-100 text-foreground-500"
              }`}
            >
              <span
                className={`w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-full text-[10px] md:text-xs ${
                  isActive
                    ? "bg-background-50 text-foreground-950"
                    : isDone
                      ? "bg-primary-500 text-background-50"
                      : "bg-background-200 text-foreground-600"
                }`}
              >
                {isDone ? <i className="ri-check-line" /> : i + 1}
              </span>
              {s.label}
            </button>
            {i < steps.length - 1 && (
              <span className="hidden md:block w-6 h-px bg-foreground-300/60"></span>
            )}
          </li>
        );
      })}
    </ol>
  );
}