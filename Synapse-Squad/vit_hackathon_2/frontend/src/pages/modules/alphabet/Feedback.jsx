import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSpeech } from "../../../hooks/useSpeech";

export default function Feedback() {
  const navigate = useNavigate();
  const { speak } = useSpeech();

  const raw = localStorage.getItem("feedback");
  let data = null;
  try {
    data = raw ? JSON.parse(raw) : null;
  } catch {
    data = null;
  }

  useEffect(() => {
    if (!data) return;
    const fullMessage = `
      You typed ${data.actual}.
      Expected was ${data.expected}.
      ${data.message}.
    `;
    speak(fullMessage);
  }, [data, speak]);

  if (!data) {
    return (
      <div className="page-backdrop flex min-h-full flex-1 items-center justify-center p-6">
        <p className="font-dyslexic text-lg text-slate-600 dark:text-slate-300">
          No feedback available
        </p>
      </div>
    );
  }

  return (
    <div className="page-backdrop flex min-h-full flex-1 items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-3xl border border-white/50 bg-white/90 p-6 shadow-xl backdrop-blur-md transition dark:border-slate-600/60 dark:bg-slate-900/85">
        <h1 className="mb-5 text-center font-dyslexic text-2xl font-semibold tracking-wide text-slate-900 dark:text-slate-50">
          Feedback
        </h1>

        <p className="mb-3 font-dyslexic text-lg tracking-wide text-red-600 dark:text-red-400">
          You typed: <span className="font-medium">{data.actual}</span>
        </p>

        <p className="mb-3 font-dyslexic text-lg tracking-wide text-green-600 dark:text-green-400">
          Expected: <span className="font-medium">{data.expected}</span>
        </p>

        <p className="mb-5 font-dyslexic text-base leading-relaxed tracking-wide text-slate-600 dark:text-slate-300">
          {data.message}
        </p>

        <h3 className="mb-2 font-dyslexic text-lg font-medium tracking-wide text-slate-800 dark:text-slate-100">
          Practice
        </h3>

        <div className="mb-5 space-y-2">
          {data.practice?.map((p, i) => (
            <p
              key={i}
              className="rounded-lg bg-indigo-50/80 px-3 py-1 font-dyslexic tracking-wide text-slate-800 dark:bg-slate-800/80 dark:text-slate-100"
            >
              • {p}
            </p>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() =>
              speak(`
                You typed ${data.actual}.
                Expected was ${data.expected}.
                ${data.message}.
              `)
            }
            className="w-full rounded-xl bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400 py-2 font-dyslexic text-white shadow-md transition hover:scale-[1.02] hover:brightness-105"
          >
            Hear again
          </button>

          <button
            type="button"
            onClick={() => navigate("/typing")}
            className="w-full rounded-xl border-2 border-indigo-200 bg-white/90 py-2 font-dyslexic text-indigo-700 transition hover:scale-[1.02] hover:bg-indigo-50 dark:border-slate-500 dark:bg-slate-800 dark:text-indigo-200 dark:hover:bg-slate-700"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
