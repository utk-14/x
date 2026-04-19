import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ALPHABET_SUBMODULES } from "../../../utils/constants";
import { testApi } from "../../../api/testApi";

export default function TypingTest() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const subIndex = parseInt(params.get("sub")) || 0;
  const letters = ALPHABET_SUBMODULES[subIndex].letters;

  const [answers, setAnswers] = useState({});

  const handleChange = (letter, value) => {
    setAnswers({ ...answers, [letter]: value });
  };

  const handleSubmit = async () => {
    for (let letter of letters) {
      const actual = answers[letter] || "";

      const res = await testApi.submitTypingTest({
        expected: letter,
        actual: actual,
      });

      if (!res.correct) {
        localStorage.setItem("feedback", JSON.stringify(res));
        navigate("/feedback");
        return;
      }
    }

    alert("All correct!");
    navigate("/learning?sub=" + subIndex);
  };

  return (
    <div className="page-backdrop min-h-full flex-1 px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto max-w-3xl rounded-[36px] border border-white/60 bg-white/95 p-7 shadow-2xl backdrop-blur-xl dark:border-slate-600/50 dark:bg-slate-900/90">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-500 dark:text-indigo-300">
              Alphabet practice
            </p>
            <h1 className="mt-2 font-dyslexic text-4xl font-bold leading-tight tracking-tight text-slate-800 md:text-5xl dark:text-slate-50">
              Typing test
            </h1>
          </div>

          <div className="w-full rounded-3xl border border-indigo-100 bg-indigo-50/90 p-4 shadow-sm dark:border-slate-600 dark:bg-slate-800/80 md:w-auto">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Goal</p>
            <p className="mt-2 font-dyslexic text-base text-slate-900 dark:text-slate-100">
              Type each letter slowly and clearly.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {letters.map((letter, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-[28px] border border-sky-100 bg-gradient-to-br from-white to-indigo-50/80 p-5 shadow-lg transition duration-300 hover:-translate-y-1 dark:border-slate-600 dark:from-slate-800 dark:to-slate-800/80"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-sky-200/50 blur-2xl dark:bg-indigo-500/20" />
              <div className="absolute -bottom-6 -left-6 h-20 w-20 rounded-full bg-fuchsia-200/40 blur-2xl dark:bg-fuchsia-500/10" />

              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-indigo-100 text-3xl font-bold text-indigo-700 shadow-sm dark:bg-indigo-900/60 dark:text-indigo-200">
                  {letter}
                </span>
                <span className="rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-900 dark:bg-slate-700 dark:text-slate-200">
                  Letter {i + 1}
                </span>
              </div>

              <label className="mb-3 block font-dyslexic text-lg font-semibold tracking-wide text-slate-800 dark:text-slate-100">
                Type this letter
              </label>

              <input
                type="text"
                value={answers[letter] || ""}
                onChange={(e) => handleChange(letter, e.target.value)}
                className="w-full rounded-3xl border border-indigo-100 bg-white px-4 py-4 font-dyslexic text-lg font-semibold text-slate-900 outline-none transition duration-200 focus:border-violet-400 focus:ring-4 focus:ring-indigo-100 placeholder:text-slate-400 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-50 dark:focus:ring-indigo-900/50"
                placeholder="Type here..."
                aria-label={`Type the letter ${letter}`}
              />
            </div>
          ))}
        </div>

        <div className="mt-8 grid items-center gap-4 sm:grid-cols-[1fr_250px]">
          <div className="rounded-[28px] border border-indigo-100 bg-indigo-50/80 p-5 shadow-sm dark:border-slate-600 dark:bg-slate-800/70">
            <h2 className="mb-2 font-dyslexic text-lg font-semibold text-slate-800 dark:text-slate-100">
              Friendly tips
            </h2>
            <ul className="list-inside list-disc space-y-2 font-dyslexic text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <li>Look at the letter before you type.</li>
              <li>One letter in each box.</li>
              <li>Take a breath if it feels tricky.</li>
            </ul>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400 px-6 py-4 font-dyslexic text-lg font-semibold text-white shadow-lg shadow-sky-500/25 transition duration-200 hover:scale-[1.02] hover:brightness-105"
            onClick={handleSubmit}
          >
            Submit answers
          </button>
        </div>
      </div>
    </div>
  );
}
