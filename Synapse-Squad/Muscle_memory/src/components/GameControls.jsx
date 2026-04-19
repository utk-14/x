import { isSpeechRecognitionAvailable } from "../utils/speechRecognition.js";

export default function GameControls({
  onClear,
  onDone,
  onListenTrace,
  onCheckSpeech,
  speechBusy,
  disabled,
  showSpeech,
}) {
  const canSpeech = showSpeech && isSpeechRecognitionAvailable();

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mt-8">
      <button
        type="button"
        onClick={onClear}
        disabled={disabled}
        className="min-h-[52px] min-w-[130px] rounded-2xl bg-white/90 text-slate-700 font-bold text-lg shadow-soft border border-white px-6 py-3 hover:bg-white disabled:opacity-45 transition"
      >
        Clear
      </button>
      <button
        type="button"
        onClick={onDone}
        disabled={disabled}
        className="min-h-[56px] min-w-[160px] rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 text-white font-extrabold text-xl shadow-soft px-8 py-3 hover:brightness-105 disabled:opacity-45 transition ring-2 ring-white/80"
      >
        Done
      </button>
      <button
        type="button"
        onClick={onListenTrace}
        disabled={disabled}
        className="min-h-[52px] min-w-[160px] rounded-2xl bg-sky-200/90 text-sky-950 font-bold text-lg shadow-soft px-6 py-3 hover:brightness-105 disabled:opacity-45 transition"
      >
        Hear prompt
      </button>
      {canSpeech && (
        <button
          type="button"
          onClick={onCheckSpeech}
          disabled={disabled || speechBusy}
          className="min-h-[52px] min-w-[180px] rounded-2xl bg-pink-200/90 text-pink-950 font-bold text-base shadow-soft px-5 py-3 hover:brightness-105 disabled:opacity-45 transition"
        >
          {speechBusy ? "Listening…" : "Say the letter"}
        </button>
      )}
    </div>
  );
}
