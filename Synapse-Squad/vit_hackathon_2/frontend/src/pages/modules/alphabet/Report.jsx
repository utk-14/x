import { useEffect, useState } from "react";
import { reportApi } from "../../../api/reportApi";

export default function Report() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await reportApi.getReport();
        if (!cancelled) setReport(data);
      } catch {
        if (!cancelled) setReport(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!report)
    return (
      <div className="page-backdrop flex min-h-full flex-1 items-center justify-center p-6">
        <p className="font-dyslexic text-lg text-slate-600 dark:text-slate-300">
          Loading...
        </p>
      </div>
    );

  return (
    <div className="page-backdrop min-h-full flex-1 px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto max-w-2xl rounded-3xl border border-white/50 bg-white/90 p-6 shadow-xl backdrop-blur-md transition dark:border-slate-600/60 dark:bg-slate-900/85">
        <h1 className="mb-6 text-center font-dyslexic text-3xl font-semibold tracking-wide text-slate-900 drop-shadow-sm dark:text-slate-50">
          Your progress
        </h1>

        <div className="space-y-4">
          <div className="rounded-2xl border border-sky-100/90 bg-slate-50/90 p-5 shadow-sm transition hover:shadow-md dark:border-slate-600 dark:bg-slate-800/60">
            <p className="font-dyslexic tracking-wide text-slate-600 dark:text-slate-300">
              Initial mistakes
            </p>
            <p className="text-xl font-semibold text-slate-900 dark:text-slate-50">
              {report.initial_mistakes}
            </p>
          </div>

          <div className="rounded-2xl border border-sky-100/90 bg-slate-50/90 p-5 shadow-sm transition hover:shadow-md dark:border-slate-600 dark:bg-slate-800/60">
            <p className="font-dyslexic tracking-wide text-slate-600 dark:text-slate-300">
              Accuracy before
            </p>
            <p className="text-xl font-semibold text-slate-900 dark:text-slate-50">
              {report.accuracy_before}%
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-100/90 bg-emerald-50/90 p-5 shadow-sm transition hover:shadow-md dark:border-emerald-800 dark:bg-emerald-950/40">
            <p className="font-dyslexic tracking-wide text-emerald-800 dark:text-emerald-300">
              Correct in final
            </p>
            <p className="text-xl font-semibold text-emerald-700 dark:text-emerald-400">
              {report.final_correct}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-100/90 bg-emerald-50/90 p-5 shadow-sm transition hover:shadow-md dark:border-emerald-800 dark:bg-emerald-950/40">
            <p className="font-dyslexic tracking-wide text-emerald-800 dark:text-emerald-300">
              Accuracy after
            </p>
            <p className="text-xl font-semibold text-emerald-700 dark:text-emerald-400">
              {report.accuracy_after}%
            </p>
          </div>

          <div className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-violet-50 p-5 text-center shadow-md transition hover:shadow-lg dark:border-indigo-800 dark:from-indigo-950/50 dark:to-violet-950/50">
            <p className="font-dyslexic tracking-wide text-indigo-700 dark:text-indigo-300">
              Improvement
            </p>
            <p className="text-2xl font-bold text-indigo-800 dark:text-indigo-200">
              {report.improved}
            </p>
          </div>

          <div className="rounded-2xl border border-amber-100/90 bg-amber-50/90 p-5 shadow-sm transition hover:shadow-md dark:border-amber-900 dark:bg-amber-950/40">
            <p className="font-dyslexic tracking-wide text-amber-900 dark:text-amber-200">
              Remaining errors
            </p>
            <p className="text-xl font-semibold text-amber-800 dark:text-amber-300">
              {report.remaining_errors}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
