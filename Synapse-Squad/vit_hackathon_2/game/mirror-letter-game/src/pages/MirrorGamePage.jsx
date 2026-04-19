import { useEffect, useState, useCallback } from "react";
import GameCanvas from "../components/GameCanvas";
import FeedbackBox from "../components/FeedbackBox";
import PracticeMode from "../components/PracticeMode";
import GameReport from "../components/GameReport";
import { getOrientationHint, getRandomLetter } from "../utils/letters";
import "./MirrorGamePage.css";

export default function MirrorGamePage() {
  const [targetLetter, setTargetLetter] = useState(getRandomLetter());
  const [feedbackText, setFeedbackText] = useState("Tap the correct letter.");
  const [status, setStatus] = useState("idle");
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showPractice, setShowPractice] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [mistakes, setMistakes] = useState({});
  const [gameEnded, setGameEnded] = useState(false);

  useEffect(() => {
    setFeedbackText("Tap the correct letter.");
    setStatus("idle");
  }, [targetLetter]);

  const startNextLetter = useCallback(() => {
    setTargetLetter(getRandomLetter());
    setShowPractice(false);
    setResetKey((prev) => prev + 1);
  }, []);

  const resetCurrentLetter = useCallback(() => {
    setStatus("idle");
    setFeedbackText("Tap the correct letter.");
    setResetKey((prev) => prev + 1);
  }, []);

  const handleCorrect = useCallback(() => {
    setStatus("correct");
    setScore((prev) => prev + 10);
    setFeedbackText("Great! That was correct.");
    setTimeout(() => {
      startNextLetter();
    }, 900);
  }, [startNextLetter]);

  const handleWrong = useCallback(() => {
    setStatus("wrong");
    setAttempts((prev) => prev + 1);
    setMistakes((prev) => ({
      ...prev,
      [targetLetter]: (prev[targetLetter] || 0) + 1,
    }));
    setFeedbackText(getOrientationHint(targetLetter));
    setShowPractice(true);
  }, [targetLetter]);

  const handlePracticeDone = () => {
    setShowPractice(false);
    resetCurrentLetter();
  };

  const handleEndGame = () => {
    setGameEnded(true);
  };

  const handleRestart = () => {
    setScore(0);
    setAttempts(0);
    setMistakes({});
    setGameEnded(false);
    setTargetLetter(getRandomLetter());
    setShowPractice(false);
    setResetKey((prev) => prev + 1);
  };

  if (gameEnded) {
    return (
      <main className="game-page">
        <GameReport
          mistakes={mistakes}
          score={score}
          totalAttempts={attempts}
          onRestart={handleRestart}
        />
      </main>
    );
  }

  return (
    <main className="game-page">
      <header className="game-header">
        <div className="title-group">
          <h1 className="page-title">Mirror Letter Fix</h1>
          <p className="page-subtitle">Find the correctly turned letter.</p>
        </div>

        <div className="badge-row">
          <div className="badge score-badge">Score {score}</div>
          <div className="badge attempts-badge">Misses {attempts}</div>
        </div>
      </header>

      <section className="card letter-card">
        <div className="letter-glow">{targetLetter}</div>
        <p className="letter-goal">Correct orientation only.</p>
      </section>

      <GameCanvas
        targetLetter={targetLetter}
        onCorrect={handleCorrect}
        onWrong={handleWrong}
        resetKey={resetKey}
      />

      <FeedbackBox text={feedbackText} isCorrect={status === "correct"} />

      <div className="control-row">
        <button className="action-button" onClick={startNextLetter}>
          Next Letter
        </button>
        <button
          className="action-button secondary"
          onClick={resetCurrentLetter}
          disabled={status === "idle"}
        >
          Try Again
        </button>
        <button className="action-button danger" onClick={handleEndGame}>
          End Game
        </button>
      </div>

      {showPractice && (
        <PracticeMode letter={targetLetter} onDone={handlePracticeDone} />
      )}
    </main>
  );
}
