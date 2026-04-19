import { useEffect, useState } from "react";
import { finalTestApi } from "../../../api/finalTestApi";
import { useNavigate } from "react-router-dom";
import { useSpeech } from "../../../hooks/useSpeech";
import { BASE_URL } from "../../../utils/constants";  
export default function FinalTest() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { speak } = useSpeech();

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const q = await finalTestApi.getFinalTest();
      setQuestions(q || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // 🔊 auto speak current question
  useEffect(() => {
    if (questions.length > 0) {
      speak(questions[currentIndex]);
    }
  }, [currentIndex, questions]);

  const currentQ = questions[currentIndex];

  const handleChange = (value) => {
    setAnswers({ ...answers, [currentQ]: value });
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSubmit = async () => {
    const formatted = questions.map((q) => ({
      expected: q,
      actual: answers[q] || "",
    }));

    const result = await finalTestApi.submitFinalTest(formatted);

    console.log("FINAL RESULT:", result);

    localStorage.setItem("finalResult", JSON.stringify(result));
    navigate("/report");
  };

  if (loading) {
    return <p className="text-center mt-10">Loading test...</p>;
  }

  if (questions.length === 0) {
    return <p className="text-center mt-10">🎉 No mistakes! You’re doing great!</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[#5f9cff] to-[#a18cd1]">

      <div className="bg-white/90 p-8 rounded-3xl shadow-xl max-w-md w-full text-center">

        <h1 className="text-2xl font-semibold mb-4 font-[Lexend,OpenDyslexic]">
          🎧 Listen & Type
        </h1>

        {/* 🔊 play button */}
        <button
          onClick={() => speak(currentQ)}
          className="mb-6 px-4 py-2 rounded-xl bg-indigo-500 text-white"
        >
          🔊 Play Sound
        </button>

        {/* input */}
        <input
          value={answers[currentQ] || ""}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full p-3 border rounded-xl text-center text-xl mb-6"
          placeholder="Type what you hear"
        />

        {/* progress */}
        <p className="mb-4 text-sm text-gray-600">
          Question {currentIndex + 1} / {questions.length}
        </p>

        {/* buttons */}
        {currentIndex + 1 < questions.length ? (
          <button
            onClick={handleNext}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#5f9cff] to-[#a18cd1] text-white"
          >
            Next ➡️
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="w-full py-3 rounded-xl bg-green-500 text-white"
          >
            Submit Test 🚀
          </button>
        )}
      </div>
    </div>
  );
}