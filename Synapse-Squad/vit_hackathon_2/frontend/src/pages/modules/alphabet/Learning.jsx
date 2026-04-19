import { useSearchParams, useNavigate } from "react-router-dom";
import { ALPHABET_SUBMODULES } from "../../../utils/constants";
import { useSpeech } from "../../../hooks/useSpeech";

const btnGrad =
  "font-dyslexic rounded-2xl bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400 px-6 py-3 text-white shadow-md transition duration-200 hover:scale-[1.02] hover:brightness-105";

const btnOutline =
  "font-dyslexic rounded-2xl border-2 border-indigo-200 bg-white/95 px-6 py-3 text-indigo-700 shadow-sm transition duration-200 hover:scale-[1.02] hover:bg-indigo-50 dark:border-slate-500 dark:bg-slate-800/90 dark:text-indigo-200 dark:hover:bg-slate-700";

export default function Learning() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { speak } = useSpeech();

  const subIndex = parseInt(params.get("sub")) || 0;
  const letters = ALPHABET_SUBMODULES[subIndex].letters;

  return (
    <div className="page-backdrop min-h-full flex-1 px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/50 bg-white/90 p-6 shadow-xl backdrop-blur-md transition dark:border-slate-600/60 dark:bg-slate-900/85">
        <h1 className="mb-6 text-center font-dyslexic text-3xl font-semibold tracking-wide text-slate-900 drop-shadow-sm dark:text-slate-50">
          Learning · {ALPHABET_SUBMODULES[subIndex].title}
        </h1>

        <div className="space-y-4">
          {letters.map((letter, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 rounded-2xl border border-sky-100/90 bg-slate-50/90 p-5 shadow-sm transition hover:shadow-md dark:border-slate-600 dark:bg-slate-800/60 sm:flex-row sm:items-center sm:justify-between"
            >
              <h2 className="font-dyslexic text-xl font-medium tracking-wide text-slate-800 dark:text-slate-100">
                {letter} / {letter.toLowerCase()}
              </h2>

              <button
                type="button"
                onClick={() => speak(letter)}
                className={`shrink-0 px-4 py-2 ${btnGrad}`}
              >
                Hear sound
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate(`/typing?sub=${subIndex}`)}
            className={`w-full sm:w-auto ${btnGrad}`}
          >
            Typing test
          </button>

          <button
            type="button"
            onClick={() => navigate(`/speech?sub=${subIndex}`)}
            className={`w-full sm:w-auto ${btnOutline}`}
          >
            Speech test
          </button>
        </div>
      </div>
    </div>
  );
}
