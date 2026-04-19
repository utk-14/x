import { useNavigate } from "react-router-dom";
import { ALPHABET_SUBMODULES } from "../../../utils/constants";

export default function AlphabetModule() {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/learning?sub=${id}`);
  };

  const handleFinalTest = () => {
    navigate("/final-test");
  };

  return (
    <div className="p-6 min-h-screen
    bg-gradient-to-br from-[#5f9cff] via-[#7aa8ff] to-[#a18cd1]
    relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute w-80 h-80 bg-white/20 rounded-full blur-3xl top-[-80px] left-[-80px]"></div>
      <div className="absolute w-80 h-80 bg-[#a18cd1]/30 rounded-full blur-3xl bottom-[-80px] right-[-80px]"></div>

      <h1 className="text-3xl font-semibold mb-8 text-white text-center tracking-wide
      drop-shadow-md
      font-[Lexend,OpenDyslexic,sans-serif]">
        🔤 Alphabet Modules
      </h1>

      {/* 🔥 FINAL TEST BUTTON */}
      <div className="mb-8 p-6 bg-white/90 backdrop-blur-lg rounded-2xl text-center
      shadow-lg border border-[#c7d2fe]/80
      transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
        
        <h2 className="text-xl font-medium mb-2 tracking-wide text-[#1e293b]
        font-[Lexend,OpenDyslexic,sans-serif]">
          🎯 Ready for Final Test?
        </h2>

        <p className="mb-4 text-sm text-[#475569] tracking-wide leading-relaxed
        font-[Lexend,OpenDyslexic,sans-serif]">
          This test is based on your mistakes
        </p>

        <button
          className="bg-gradient-to-r from-[#5f9cff] via-[#7aa8ff] to-[#a18cd1]
          text-white px-5 py-2 rounded-xl shadow-md
          hover:shadow-lg hover:brightness-110 hover:scale-[1.02]
          transition-all duration-200
          font-[Lexend,OpenDyslexic,sans-serif]"
          onClick={handleFinalTest}
        >
          Take Final Test 🚀
        </button>
      </div>

      {/* MODULE LIST */}
      <div className="space-y-5">
        {ALPHABET_SUBMODULES.map((mod) => (
          <div
            key={mod.id}
            className="p-5 rounded-2xl bg-white/90 backdrop-blur-lg
            shadow-md border border-[#dbeafe]/80
            transition-all duration-300 ease-out
            hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01]"
          >
            <h2 className="text-lg font-medium tracking-wide text-[#1e293b]
            font-[Lexend,OpenDyslexic,sans-serif]">
              📘 {mod.title}
            </h2>

            <button
              className="mt-3 bg-gradient-to-r from-[#5f9cff] via-[#7aa8ff] to-[#a18cd1]
              text-white px-4 py-2 rounded-lg shadow
              hover:shadow-md hover:brightness-110 hover:scale-[1.02]
              transition-all duration-200
              font-[Lexend,OpenDyslexic,sans-serif]"
              onClick={() => handleClick(mod.id)}
            >
              Start Learning 🚀
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}