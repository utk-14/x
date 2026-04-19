import { useAppContext } from "../context/AppContext";

export default function FontControls() {
  const { fontScale, increaseFont, decreaseFont } = useAppContext();

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={decreaseFont}
        className="rounded-full border-2 border-white/50 bg-white/25 px-3 py-1.5 text-sm font-dyslexic text-white shadow-sm backdrop-blur transition hover:bg-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-label="Decrease font size"
      >
        A-
      </button>
      <span className="text-sm font-medium text-white">{fontScale}%</span>
      <button
        type="button"
        onClick={increaseFont}
        className="rounded-full border-2 border-white/50 bg-white/25 px-3 py-1.5 text-sm font-dyslexic text-white shadow-sm backdrop-blur transition hover:bg-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-label="Increase font size"
      >
        A+
      </button>
    </div>
  );
}
