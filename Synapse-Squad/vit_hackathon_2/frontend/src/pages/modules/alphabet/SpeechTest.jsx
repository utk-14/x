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
    // eslint-disable-next-line react-hooks/exhaustive-deps -- announce when letter / feedback view changes only
  }, [currentLetter, showFeedback]);

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
    } catch {
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
    } catch {
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

  if (showFeedback && feedback) {
    return (
      <main className="page-backdrop flex min-h-full flex-1 items-center justify-center p-6">
        <Card title="Feedback">
          <div className="space-y-4 text-center font-dyslexic tracking-wide">
            <p className="text-xl text-red-500">
              You said: <b>{feedback.actual}</b>
            </p>

            <p className="text-xl text-green-600">
              Expected: <b>{feedback.expected}</b>
            </p>

            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              {feedback.explanation}
            </p>

            {feedback.practice.length > 0 && (
              <div className="space-y-1">
                <p className="font-medium">Practice</p>
                {feedback.practice.map((p, i) => (
                  <p key={i} className="rounded-lg bg-indigo-50/80 px-3 py-1 dark:bg-slate-800/80">
                    • {p}
                  </p>
                ))}
              </div>
            )}

            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {!feedback.isCorrect && (
                <Button onClick={handleRetry}>Try again</Button>
              )}
              <Button onClick={handleNext}>Next</Button>
            </div>
          </div>
        </Card>
      </main>
    );
  }

  return (
    <main className="page-backdrop flex min-h-full flex-1 items-center justify-center p-6">
      <Card title="Speech test">
        <div className="text-center font-dyslexic tracking-wide">
          <h1 className="mb-6 text-7xl font-bold text-slate-800 drop-shadow-sm transition-all duration-300 dark:text-slate-100">
            {currentLetter}
          </h1>

          {error && (
            <p className="mb-3 animate-pulse text-red-500">{error}</p>
          )}

          <Button onClick={handleSpeak} disabled={loading || isListening}>
            {isListening
              ? "Listening..."
              : loading
                ? "Processing..."
                : "Speak"}
          </Button>

          {recognizedText && (
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Heard: <b>{recognizedText}</b>
            </p>
          )}
        </div>
      </Card>
    </main>
  );
}
