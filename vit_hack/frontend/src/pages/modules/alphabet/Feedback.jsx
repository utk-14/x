import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSpeech } from "../../../hooks/useSpeech";

export default function Feedback() {
  const navigate = useNavigate();
  const { speak } = useSpeech();

  const data = JSON.parse(localStorage.getItem("feedback"));

  if (!data) {
    return (
      <p className="text-center mt-10 text-lg text-gray-600
      font-[Lexend,OpenDyslexic,sans-serif]">
        No feedback available
      </p>
    );
  }

  useEffect(() => {
    const fullMessage = `
      You typed ${data.actual}.
      Expected was ${data.expected}.
      ${data.message}.
    `;

    speak(fullMessage);
  }, []);

  return (
    <div className="min-h-screen p-6 flex items-center justify-center
    bg-gradient-to-br from-[#5f9cff] via-[#7aa8ff] to-[#a18cd1]
    relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute w-80 h-80 bg-white/20 rounded-full blur-3xl top-[-80px] left-[-80px]"></div>
      <div className="absolute w-80 h-80 bg-[#a18cd1]/30 rounded-full blur-3xl bottom-[-80px] right-[-80px]"></div>

      <div className="w-full max-w-xl p-6 rounded-3xl
      bg-white/90 backdrop-blur-lg shadow-xl border border-[#dbeafe]/80
      transition-all duration-300">

        <h1 className="text-2xl font-semibold mb-5 text-center
        text-[#0f172a] tracking-wide
        font-[Lexend,OpenDyslexic,sans-serif]">
          🧠 Feedback
        </h1>

        <p className="mb-3 text-[#dc2626] text-lg tracking-wide
        font-[Lexend,OpenDyslexic,sans-serif]">
          ❌ You typed: <span className="font-medium">{data.actual}</span>
        </p>

        <p className="mb-3 text-[#16a34a] text-lg tracking-wide
        font-[Lexend,OpenDyslexic,sans-serif]">
          ✅ Expected: <span className="font-medium">{data.expected}</span>
        </p>

        <p className="mb-5 text-[#475569] text-base leading-relaxed tracking-wide
        font-[Lexend,OpenDyslexic,sans-serif]">
          🧠 Explanation: {data.message}
        </p>

        <h3 className="text-lg font-medium mb-2 tracking-wide
        text-[#1e293b]
        font-[Lexend,OpenDyslexic,sans-serif]">
          ✏️ Practice:
        </h3>

        <div className="mb-5 space-y-2">
          {data.practice?.map((p, i) => (
            <p
              key={i}
              className="text-[#1e293b] tracking-wide
              bg-[#eef2ff]/60 px-3 py-1 rounded-lg
              font-[Lexend,OpenDyslexic,sans-serif]"
            >
              • {p}
            </p>
          ))}
        </div>

        {/* 🔥 BUTTONS */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() =>
              speak(`
                You typed ${data.actual}.
                Expected was ${data.expected}.
                ${data.message}.
              `)
            }
            className="w-full py-2 rounded-xl
            bg-gradient-to-r from-[#5f9cff] via-[#7aa8ff] to-[#a18cd1]
            text-white shadow-md
            hover:shadow-lg hover:brightness-110 hover:scale-[1.02]
            transition-all duration-200
            font-[Lexend,OpenDyslexic,sans-serif]"
          >
            🔊 Hear Again
          </button>

          <button
            onClick={() => navigate("/typing")}
            className="w-full py-2 rounded-xl
            bg-white/90 border border-[#c7d2fe]
            text-[#4f46e5]
            hover:bg-[#eef2ff] hover:scale-[1.02]
            transition-all duration-200
            font-[Lexend,OpenDyslexic,sans-serif]"
          >
            🔁 Try Again
          </button>
        </div>

      </div>
    </div>
  );
}