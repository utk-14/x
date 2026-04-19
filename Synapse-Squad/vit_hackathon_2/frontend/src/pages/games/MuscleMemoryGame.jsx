import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

const GAME_URL = "http://localhost:5176";

export default function MuscleMemoryGame() {
  const navigate = useNavigate();

  return (
    <div className="page-backdrop min-h-screen px-4 py-10 sm:px-6 md:px-10 xl:px-16">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <div className="rounded-[2rem] border border-slate-200/90 bg-white/95 p-8 shadow-xl shadow-indigo-100/50 backdrop-blur-xl dark:border-slate-600/50 dark:bg-slate-900/85">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="mb-4 font-dyslexic text-4xl font-semibold tracking-wide text-slate-900 dark:text-slate-50">
                Muscle Memory
              </h1>
              <p className="max-w-xl font-dyslexic text-base text-slate-600 dark:text-slate-300">
                Start the Muscle app on port 5176 if the frame is empty.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button onClick={() => navigate("/start")} className="w-full max-w-xs sm:w-auto">
                Back to start
              </Button>
              <Button
                variant="secondary"
                onClick={() => window.open(GAME_URL, "_blank")}
                className="w-full max-w-xs sm:w-auto"
              >
                Open Muscle in new tab
              </Button>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-slate-200/90 bg-slate-100 shadow-inner dark:border-slate-700 dark:bg-slate-950">
            <iframe
              src={GAME_URL}
              title="Muscle Memory Game"
              className="h-[56vh] w-full border-0"
            />
          </div>

          <div className="mt-6 rounded-3xl border border-slate-200/80 bg-slate-50/90 p-4 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300">
            <p className="font-dyslexic text-sm">
              Start Muscle app: <code className="rounded bg-slate-100 px-1 py-0.5 dark:bg-slate-800">cd /home/sanvi/Music/B/Muscle_memory && npm run dev -- --port 5176</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
