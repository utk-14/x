import { useNavigate } from "react-router-dom";
import { ALPHABET_SUBMODULES } from "../../../utils/constants";
import Button from "../../../components/Button";

const btnPrimary =
  "font-dyslexic rounded-xl bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400 px-4 py-2.5 text-white shadow-md transition duration-200 hover:scale-[1.02] hover:brightness-105";

export default function AlphabetModule() {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/learning?sub=${id}`);
  };

  const handleFinalTest = () => {
    navigate("/final-test");
  };

  return (
    <div className="page-backdrop min-h-full flex-1 px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-center font-dyslexic text-3xl font-semibold tracking-wide text-white drop-shadow-md">
          Alphabet modules
        </h1>

        <div className="mb-8 rounded-2xl border border-white/40 bg-white/90 p-6 text-center shadow-lg backdrop-blur-md transition hover:shadow-xl dark:bg-slate-900/85 dark:border-slate-600/60">
          <h2 className="mb-2 font-dyslexic text-xl font-medium tracking-wide text-slate-800 dark:text-slate-100">
            Ready for the final test?
          </h2>

          <p className="mb-4 font-dyslexic text-sm leading-relaxed tracking-wide text-slate-600 dark:text-slate-300">
            Questions focus on what you have practiced.
          </p>

          <Button onClick={handleFinalTest} className="px-6">
            Take final test
          </Button>
        </div>

        <div className="space-y-5">
          {ALPHABET_SUBMODULES.map((mod) => (
            <div
              key={mod.id}
              className="rounded-2xl border border-white/50 bg-white/90 p-5 shadow-md backdrop-blur-md transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl dark:border-slate-600/60 dark:bg-slate-900/85"
            >
              <h2 className="font-dyslexic text-lg font-medium tracking-wide text-slate-800 dark:text-slate-100">
                {mod.title}
              </h2>

              <button
                type="button"
                className={`mt-3 ${btnPrimary}`}
                onClick={() => handleClick(mod.id)}
              >
                Start this module
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
