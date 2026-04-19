export default function LetterCard({ letter, step, total }) {
  const ch = letter != null ? String(letter).slice(0, 1) : "—";

  return (
    <div className="flex flex-col items-center gap-3 select-none">
      <p className="text-slate-500 font-bold text-lg tracking-wide">
        Letter {Math.min(step + 1, total)} of {total}
      </p>
      <div className="relative flex items-center justify-center rounded-[2rem] px-12 py-10 bg-white/55 shadow-soft border border-white min-w-[200px]">
        <span
          className="text-[6.75rem] leading-none font-extrabold text-pink-200/95 drop-shadow-sm"
          style={{ fontFamily: '"Nunito", system-ui, sans-serif' }}
          aria-hidden
        >
          {ch}
        </span>
      </div>
      {/* <p className="text-slate-500 text-base font-semibold max-w-xs text-center">
        Use your finger or mouse. Stay on the faint lines.
      </p> */}
    </div>
  );
}
