import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import Button from "../../components/Button";

export default function StartCourse() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4
      bg-gradient-to-br from-[#5f9cff] via-[#7aa8ff] to-[#a18cd1]
      relative overflow-hidden"
    >
      {/* Soft background glow */}
      <div className="absolute w-72 h-72 bg-white/20 rounded-full blur-3xl top-[-60px] left-[-60px]"></div>
      <div className="absolute w-72 h-72 bg-[#a18cd1]/30 rounded-full blur-3xl bottom-[-60px] right-[-60px]"></div>

      <Card className="w-full max-w-md text-center backdrop-blur-xl">
        
        {/* Title */}
        <h1 className="text-3xl font-semibold mb-2
        text-[#0f172a]
        font-[Lexend,OpenDyslexic,sans-serif] tracking-wide">
          🎯 Start Learning
        </h1>

        <p className="text-[#475569] mb-6
        font-[Lexend,OpenDyslexic,sans-serif]">
          Choose your first step and begin your journey 🚀
        </p>

        {/* Course Option */}
        <div className="space-y-4">
          <div
            className="p-5 rounded-2xl bg-gradient-to-r
            from-[#eef2ff]/90 to-[#f5f3ff]/90
            border border-[#c7d2fe]/80 shadow-md
            transition-all duration-300 ease-out
            hover:shadow-xl hover:scale-[1.02]"
          >
            <h2 className="text-xl font-medium mb-2
            text-[#1e293b]
            font-[Lexend,OpenDyslexic,sans-serif]">
              🔤 Alphabet Learning
            </h2>

            <p className="text-sm text-[#64748b] mb-4
            leading-relaxed tracking-wide
            font-[Lexend,OpenDyslexic,sans-serif]">
              Learn letters with fun activities and practice ✏️
            </p>

            <Button
              onClick={() => navigate("/alphabet")}
              className="w-full"
            >
              Start Alphabet 🚀
            </Button>
          </div>
        </div>

      </Card>
    </div>
  );
}