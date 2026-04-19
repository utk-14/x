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

    alert("All correct 🎉");
    navigate("/learning?sub=" + subIndex);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#4d7cff] via-[#7f7afc] to-[#b084f5] relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute w-80 h-80 bg-white/20 rounded-full blur-3xl top-[-80px] left-[-80px]"></div>
      <div className="absolute w-96 h-96 bg-[#8b5cf6]/25 rounded-full blur-3xl bottom-[-90px] right-[-70px]"></div>
      <div className="absolute inset-x-0 top-20 flex justify-center pointer-events-none">
        <div className="w-40 h-40 rounded-full bg-white/10 blur-2xl"></div>
      </div>

      <div className="max-w-3xl mx-auto bg-white/95 backdrop-blur-xl p-7 rounded-[36px] shadow-[0_30px_80px_rgba(15,23,42,0.15)] border border-white/70">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#5b6bff] font-semibold">Alphabet Adventure</p>
            <h1 className="mt-2 text-4xl md:text-5xl font-bold text-[#1e293b] leading-tight tracking-tight font-[Lexend,OpenDyslexic,sans-serif]">
              ✨ Typing Test
            </h1>
          </div>

          <div className="rounded-3xl bg-[#eef2ff] border border-[#c7d2fe] p-4 shadow-sm w-full md:w-auto">
            <p className="text-sm text-[#334155] font-medium">Goal</p>
            <p className="mt-2 text-base text-[#0f172a]">Type each letter clearly and earn a rainbow sticker! 🖍️</p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {letters.map((letter, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-[28px] border border-[#dbeafe] bg-gradient-to-br from-white to-[#eef2ff] p-5 shadow-[0_18px_50px_-30px_rgba(79,70,229,0.8)] transition duration-300 hover:-translate-y-1"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#c7d2fe]/50 blur-2xl"></div>
              <div className="absolute -left-6 bottom-6 h-20 w-20 rounded-full bg-[#a78bfa]/30 blur-2xl"></div>

              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-[#6366f1]/10 text-3xl font-bold text-[#4338ca] shadow-sm">
                  {letter}
                </span>
                <span className="rounded-full bg-[#e0e7ff] px-3 py-1 text-sm font-semibold text-[#3730a3]">Letter {i + 1}</span>
              </div>

              <label className="block mb-3 text-lg font-semibold text-[#1e293b] tracking-wide font-[Lexend,OpenDyslexic,sans-serif]">
                Type this letter
              </label>

              <input
                type="text"
                value={answers[letter] || ""}
                onChange={(e) => handleChange(letter, e.target.value)}
                className="w-full rounded-3xl border border-[#c7d2fe] bg-white px-4 py-4 text-lg font-semibold text-[#0f172a] outline-none transition duration-200 focus:border-[#7c3aed] focus:ring-4 focus:ring-[#c7d2fe]/60 placeholder:text-[#94a3b8] font-[Lexend,OpenDyslexic,sans-serif]"
                placeholder="Type here..."
                aria-label={`Type the letter ${letter}`}
              />
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-[1fr_250px] items-center">
          <div className="rounded-[28px] border border-[#dbeafe] bg-[#eef2ff] p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-[#1e293b] mb-2">Friendly Tips</h2>
            <ul className="space-y-2 text-sm text-[#334155] list-disc list-inside leading-relaxed">
              <li>Take your time and look carefully at the letter.</li>
              <li>Type one letter per box with big, clear strokes.</li>
              <li>If a letter feels tricky, breathe and try again.</li>
            </ul>
          </div>

          <button
            className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-[#5f9cff] via-[#7aa8ff] to-[#a18cd1] px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-[#5f9cff]/30 transition duration-200 hover:brightness-110 hover:scale-[1.02] font-[Lexend,OpenDyslexic,sans-serif]"
            onClick={handleSubmit}
          >
            Submit 🚀
          </button>
        </div>
      </div>
    </div>
  );
}
