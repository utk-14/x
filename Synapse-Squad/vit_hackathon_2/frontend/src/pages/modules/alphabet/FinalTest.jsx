import { useEffect, useState } from "react";
import { finalTestApi } from "../../../api/finalTestApi";
import { useNavigate } from "react-router-dom";

export default function FinalTest() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const fetchedQuestions = await finalTestApi.getFinalTest();
        if (!cancelled) {
          setQuestions(fetchedQuestions);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to load final test questions:", error);
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleChange = (index, value) => {
    const updated = [...answers];
    updated[index] = {
      expected: questions[index],
      actual: value,
    };
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    try {
      // Filter out empty answers
      const validAnswers = answers.filter(answer => answer && answer.actual);

      const result = await finalTestApi.submitFinalTest(validAnswers);
      localStorage.setItem("finalResult", JSON.stringify(result));
      navigate("/report");
    } catch (error) {
      console.error("Failed to submit final test:", error);
      // Still navigate to report even if submission fails
      navigate("/report");
    }
  };

  if (loading) {
    return (
      <div className="page-backdrop flex min-h-full flex-1 items-center justify-center p-6">
        <p className="font-dyslexic text-lg text-slate-600 dark:text-slate-300">
          Loading final test questions...
        </p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="page-backdrop flex min-h-full flex-1 items-center justify-center p-6">
        <p className="font-dyslexic text-lg text-slate-600 dark:text-slate-300">
          No questions available. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="page-backdrop min-h-full flex-1 px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto max-w-2xl rounded-3xl border border-white/50 bg-white/90 p-6 shadow-xl backdrop-blur-md transition dark:border-slate-600/60 dark:bg-slate-900/85">
        <h1 className="mb-6 text-center font-dyslexic text-3xl font-semibold tracking-wide text-slate-900 drop-shadow-sm dark:text-slate-50">
          Final Test - 10 Questions
        </h1>

        <p className="mb-6 text-center font-dyslexic text-sm leading-relaxed tracking-wide text-slate-600 dark:text-slate-300">
          Type the letters exactly as shown (case sensitive). Complete all 10 questions to generate your report.
        </p>

        <div className="space-y-5">
          {questions.map((q, i) => (
            <div
              key={i}
              className="rounded-2xl border border-sky-100/90 bg-slate-50/90 p-5 shadow-sm transition hover:shadow-md dark:border-slate-600 dark:bg-slate-800/60"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-dyslexic tracking-wide text-slate-600 dark:text-slate-300">
                  Question {i + 1}:
                </p>
                <span className="text-xs font-dyslexic text-slate-500 dark:text-slate-400">
                  {answers[i]?.actual ? "✓" : ""}
                </span>
              </div>

              <div className="mb-3 flex items-center gap-3">
                <p className="font-dyslexic text-lg font-medium tracking-wide text-slate-800 dark:text-slate-100">
                  Type this letter:
                </p>
                <span className="rounded-lg border-2 border-indigo-200 bg-indigo-50 px-3 py-1 font-dyslexic text-xl font-bold text-indigo-800 dark:border-indigo-700 dark:bg-indigo-950 dark:text-indigo-200">
                  {q}
                </span>
              </div>

              <input
                className="w-full rounded-xl border border-indigo-100 bg-white/95 px-4 py-3 font-dyslexic text-[16px] leading-relaxed tracking-wide text-slate-900 transition duration-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-50"
                placeholder="Type the letter here..."
                value={answers[i]?.actual || ""}
                onChange={(e) => handleChange(i, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            className="flex-1 rounded-2xl bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400 py-3 font-dyslexic text-lg text-white shadow-md transition duration-200 hover:scale-[1.02] hover:brightness-105 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSubmit}
            disabled={answers.filter(a => a?.actual).length < 10}
          >
            Submit Final Test ({answers.filter(a => a?.actual).length}/10)
          </button>
        </div>
      </div>
    </div>
  );
}
