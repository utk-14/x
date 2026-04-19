import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import Button from "../../components/Button";

export default function StartCourse() {
  const navigate = useNavigate();

  return (
    <div className="page-backdrop min-h-screen px-4 py-10 sm:px-6 md:px-10 xl:px-16">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <div className="rounded-[2rem] border border-slate-200/90 bg-white/95 p-8 shadow-xl shadow-slate-200/60 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/90 dark:shadow-slate-900/60">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="font-dyslexic text-4xl font-semibold tracking-wide text-slate-900 dark:text-slate-50">
                Start learning
              </h1>
              <p className="mt-3 max-w-3xl font-dyslexic text-base text-slate-600 dark:text-slate-300">
                Pick a game below.
              </p>
            </div>
            <Button onClick={() => navigate("/alphabet")} className="w-full max-w-xs lg:w-auto">
              Open alphabet module
            </Button>
          </div>
        </div>

        <section className="rounded-[2rem] border border-slate-200/90 bg-slate-50/90 p-6 shadow-lg shadow-slate-200/50 dark:border-slate-700/70 dark:bg-slate-950/80 dark:shadow-slate-900/40">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-dyslexic text-3xl font-semibold tracking-wide text-slate-900 dark:text-slate-50">
                Games
              </h2>
              <p className="mt-3 max-w-2xl font-dyslexic text-sm text-slate-600 dark:text-slate-300">
                Tap a card to open the game.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-[1.75rem] border border-sky-200/90 bg-gradient-to-br from-sky-50/95 to-cyan-100/90 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-600 dark:from-slate-800/85 dark:to-slate-700/70">
              <h3 className="mb-3 font-dyslexic text-xl font-semibold text-slate-800 dark:text-slate-100">
                Mirror Game
              </h3>
              <p className="mb-4 font-dyslexic text-sm text-slate-600 dark:text-slate-300">
                Mirror letters.
              </p>
              <Button onClick={() => navigate("/mirror-game")} className="w-full">
                Open Mirror Game
              </Button>
            </div>

            <div className="rounded-[1.75rem] border border-fuchsia-200/90 bg-gradient-to-br from-fuchsia-50/95 to-violet-100/90 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-600 dark:from-slate-800/85 dark:to-slate-700/70">
              <h3 className="mb-3 font-dyslexic text-xl font-semibold text-slate-800 dark:text-slate-100">
                Muscle Memory
              </h3>
              <p className="mb-4 font-dyslexic text-sm text-slate-600 dark:text-slate-300">
                Speed and recall practice.
              </p>
              <Button onClick={() => navigate("/muscle-memory")} className="w-full">
                Open Muscle Memory
              </Button>
            </div>

            <div className="rounded-[1.75rem] border border-amber-200/90 bg-gradient-to-br from-amber-50/95 to-orange-100/90 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-600 dark:from-slate-800/85 dark:to-slate-700/70">
              <h3 className="mb-3 font-dyslexic text-xl font-semibold text-slate-800 dark:text-slate-100">
                Balloon Game
              </h3>
              <p className="mb-4 font-dyslexic text-sm text-slate-600 dark:text-slate-300">
                Pop the right balloon.
              </p>
              <Button onClick={() => navigate("/balloon-game")} className="w-full">
                Open Balloon Game
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
