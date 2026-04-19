import { useSearchParams, useNavigate } from "react-router-dom";
import { ALPHABET_SUBMODULES } from "../../../utils/constants";
import { useSpeech } from "../../../hooks/useSpeech";

export default function Learning() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { speak } = useSpeech();

  const subIndex = parseInt(params.get("sub")) || 0;
  const letters = ALPHABET_SUBMODULES[subIndex].letters;

  return (
    <div className="min-h-screen p-6
    bg-gradient-to-br from-[#5f9cff] via-[#7aa8ff] to-[#a18cd1]
    relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute w-80 h-80 bg-white/20 rounded-full blur-3xl top-[-80px] left-[-80px]"></div>
      <div className="absolute w-80 h-80 bg-[#a18cd1]/30 rounded-full blur-3xl bottom-[-80px] right-[-80px]"></div>

      <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-lg
      p-6 rounded-3xl shadow-xl border border-[#dbeafe]/80
      transition-all duration-300">

        <h1 className="text-3xl font-semibold mb-6 text-center text-[#0f172a]
        tracking-wide drop-shadow-sm
        font-[Lexend,OpenDyslexic,sans-serif]">
          📘 Learning {ALPHABET_SUBMODULES[subIndex].title}
        </h1>

        {/* LETTER LIST */}
        <div className="space-y-4">
          {letters.map((letter, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-[#f8fafc]/90 border border-[#e0e7ff]/80
              shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between
              gap-3 transition-all duration-300
              hover:shadow-md hover:scale-[1.01]"
            >
              <h2 className="text-xl font-medium text-[#1e293b]
              tracking-wide
              font-[Lexend,OpenDyslexic,sans-serif]">
                {letter} / {letter.toLowerCase()}
              </h2>

              <button
                onClick={() => speak(letter)}
                className="px-4 py-2 rounded-xl
                bg-gradient-to-r from-[#5f9cff] via-[#7aa8ff] to-[#a18cd1]
                text-white shadow-md
                hover:shadow-lg hover:brightness-110 hover:scale-[1.02]
                transition-all duration-200
                font-[Lexend,OpenDyslexic,sans-serif]"
              >
                🔊 Pronounce
              </button>
            </div>
          ))}
        </div>

        {/* 🔥 TEST OPTIONS */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(`/typing?sub=${subIndex}`)}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl
            bg-gradient-to-r from-[#5f9cff] via-[#7aa8ff] to-[#a18cd1]
            text-white shadow-md
            hover:shadow-lg hover:brightness-110 hover:scale-[1.02]
            transition-all duration-200
            font-[Lexend,OpenDyslexic,sans-serif]"
          >
            ✍️ Typing Test
          </button>

          <button
            onClick={() => navigate(`/speech?sub=${subIndex}`)}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl
            bg-white/90 border border-[#c7d2fe]
            text-[#4f46e5]
            hover:bg-[#eef2ff] hover:scale-[1.02]
            transition-all duration-200
            font-[Lexend,OpenDyslexic,sans-serif]"
          >
            🎤 Speech Test
          </button>
        </div>

      </div>
    </div>
  );
}