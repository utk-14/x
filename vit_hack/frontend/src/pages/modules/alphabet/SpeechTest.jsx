import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import { ALPHABET_SUBMODULES } from "../../../utils/constants";
import { useSpeech } from "../../../hooks/useSpeech";
import { testApi } from "../../../api/testApi";
import { useAppContext } from "../../../context/AppContext";

export default function SpeechTest() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { addMistake } = useAppContext();

  const subIndex = parseInt(params.get("sub")) || 0;
  const letters = ALPHABET_SUBMODULES[subIndex]?.letters || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [error, setError] = useState(null);
  const [recognizedText, setRecognizedText] = useState("");

  const { listen, speak, isListening } = useSpeech();

  const currentLetter = letters[currentIndex];

  useEffect(() => {
    if (currentLetter && !showFeedback) {
      speak(currentLetter);
    }
  }, [currentLetter]);

  const handleSpeak = async () => {
    setError(null);
    setLoading(true);
    setRecognizedText("");

    try {
      speak(currentLetter);
      await new Promise((res) => setTimeout(res, 500));
      const spokenText = await listen();

      if (!spokenText) {
        setError("No speech detected");
        setLoading(false);
        return;
      }

      setRecognizedText(spokenText);
      await handleSubmit(spokenText);

    } catch (err) {
      setError("Mic error. Allow permission & try again.");
      setLoading(false);
    }
  };

  const handleSubmit = async (spokenText) => {
    try {
      const res = await testApi.submitTypingTest({
        expected: currentLetter,
        actual: spokenText,
      });

      if (!res.correct) {
        addMistake({
          expected: currentLetter,
          actual: spokenText,
          message: res.message,
        });
      }

      const feedbackData = {
        isCorrect: res.correct,
        expected: currentLetter,
        actual: spokenText,
        explanation:
          res.message ||
          `You said "${spokenText}", expected "${currentLetter}"`,
        practice: res.practice || [],
      };

      setFeedback(feedbackData);
      setShowFeedback(true);

      speak(
        `You said ${spokenText}. Expected ${currentLetter}. ${feedbackData.explanation}`
      );

    } catch (err) {
      setError("API error");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < letters.length) {
      setCurrentIndex(currentIndex + 1);
      setShowFeedback(false);
      setFeedback(null);
      setRecognizedText("");
    } else {
      navigate("/alphabet");
    }
  };

  const handleRetry = () => {
    setShowFeedback(false);
    setFeedback(null);
    setRecognizedText("");
  };

  // 🟡 FEEDBACK SCREEN
  if (showFeedback && feedback) {
    return (
      <main className="min-h-screen p-6 flex items-center justify-center
      bg-gradient-to-br from-[#5f9cff] via-[#7aa8ff] to-[#a18cd1]
      relative overflow-hidden">

        <div className="absolute w-80 h-80 bg-white/20 rounded-full blur-3xl top-[-80px] left-[-80px]"></div>
        <div className="absolute w-80 h-80 bg-[#a18cd1]/30 rounded-full blur-3xl bottom-[-80px] right-[-80px]"></div>

        <Card title="🧠 Feedback">
          <div className="space-y-4 text-center
          font-[Lexend,OpenDyslexic,sans-serif] tracking-wide">

            <p className="text-xl text-red-500">
              ❌ You said: <b>{feedback.actual}</b>
            </p>

            <p className="text-xl text-green-600">
              ✅ Expected: <b>{feedback.expected}</b>
            </p>

            <p className="text-[#475569] leading-relaxed">
              {feedback.explanation}
            </p>

            {feedback.practice.length > 0 && (
              <div className="space-y-1">
                <p className="font-medium">✏️ Practice:</p>
                {feedback.practice.map((p, i) => (
                  <p key={i} className="bg-[#eef2ff]/60 px-3 py-1 rounded-lg">
                    • {p}
                  </p>
                ))}
              </div>
            )}

            <div className="flex gap-3 justify-center mt-4">
              {!feedback.isCorrect && (
                <Button onClick={handleRetry}>🔁 Retry</Button>
              )}
              <Button onClick={handleNext}>Next ➡️</Button>
            </div>
          </div>
        </Card>
      </main>
    );
  }

  // 🔵 MAIN SCREEN
  return (
    <main className="min-h-screen p-6 flex items-center justify-center
    bg-gradient-to-br from-[#5f9cff] via-[#7aa8ff] to-[#a18cd1]
    relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute w-80 h-80 bg-white/20 rounded-full blur-3xl top-[-80px] left-[-80px]"></div>
      <div className="absolute w-80 h-80 bg-[#a18cd1]/30 rounded-full blur-3xl bottom-[-80px] right-[-80px]"></div>

      <Card title="🎤 Speech Test">
        <div className="text-center
        font-[Lexend,OpenDyslexic,sans-serif] tracking-wide">

          <h1 className="text-7xl mb-6 text-[#1e293b]
          drop-shadow-md transition-all duration-300">
            {currentLetter}
          </h1>

          {error && (
            <p className="text-red-500 mb-3 animate-pulse">{error}</p>
          )}

          <Button onClick={handleSpeak} disabled={loading || isListening}>
            {isListening
              ? "🎤 Listening..."
              : loading
              ? "Processing..."
              : "🎤 Speak"}
          </Button>

          {recognizedText && (
            <p className="mt-4 text-lg text-[#475569]">
              Detected: <b>{recognizedText}</b>
            </p>
          )}

        </div>
      </Card>
    </main>
  );
}