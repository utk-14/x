export default function AccuracyMeter({ value, pending }) {
  const waiting = pending || value === null || value === undefined;
  const v = waiting
    ? 0
    : Math.max(0, Math.min(100, Number(value) || 0));

  let bar = "bg-slate-200";
  // let label = "Finish tracing the whole letter (you can lift your finger between strokes), then tap Done.";
  let label = "";
  if (!waiting) {
    if (v < 50) {
      bar = "bg-rose-400";
      label = "Try to follow the dashed outline next time.";
    } else if (v < 70) {
      bar = "bg-amber-300";
      label = "Close — keep practicing this letter.";
    } else {
      bar = "bg-emerald-400";
      label = "Great match!";
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto px-2">
      <div className="flex items-center justify-between gap-4 mb-2">
        <span className="text-slate-600 text-lg font-bold">Match</span>
        <span className="text-slate-800 text-3xl font-extrabold tabular-nums">
          {waiting ? "—" : `${v}%`}
        </span>
      </div>
      <div
        className="h-6 w-full rounded-full bg-white/80 shadow-inner border border-white overflow-hidden"
        role="meter"
        aria-valuenow={waiting ? undefined : v}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`h-full rounded-full transition-all duration-300 ease-out ${bar}`}
          style={{ width: waiting ? "0%" : `${v}%` }}
        />
      </div>
      {label ? (
        <p className="mt-2 text-center text-slate-600 text-base font-medium">
          {label}
        </p>
      ) : null}
    </div>
  );
}
