import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AccuracyMeter from "../components/AccuracyMeter.jsx";
import DrawingCanvas, {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
} from "../components/DrawingCanvas.jsx";
import GameControls from "../components/GameControls.jsx";
import LetterCard from "../components/LetterCard.jsx";
import { calculateAccuracy, clearAccuracyCache } from "../utils/accuracy.js";
import { recordLetterResult } from "../utils/localProgress.js";
import { pickRandomLetters } from "../utils/randomLetters.js";
import {
  listenOnce,
  verifySpokenLetter,
} from "../utils/speechRecognition.js";
import { speak, tracePrompt, pronounceLetterSuccess } from "../utils/speech.js";

const THRESHOLD = 70;
const PAUSE_AFTER_SPEECH_MS = 650;

function getOrCreateUserId() {
  const key = "mm_user_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

export default function DrawingGamePage() {
  const userId = useMemo(() => getOrCreateUserId(), []);
  const canvasRef = useRef(null);
  const [letters, setLetters] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  /** Set only after Done is pressed; null means “not graded yet” for this letter. */
  const [gradedScore, setGradedScore] = useState(null);
  const [resetSignal, setResetSignal] = useState(0);
  const [busy, setBusy] = useState(false);
  const [finished, setFinished] = useState(false);
  const [speechBusy, setSpeechBusy] = useState(false);

  const successLock = useRef(false);
  const traceStepRef = useRef(-1);
  const lastPointsRef = useRef([]);

  useEffect(() => {
    successLock.current = false;
  }, [stepIndex, finished]);

  const currentLetter = letters[stepIndex];
  const total = letters.length;
  const isLastLetter = total > 0 && stepIndex >= total - 1;

  const bootstrapRound = useCallback(() => {
    setLoading(true);
    setFinished(false);
    setStepIndex(0);
    setGradedScore(null);
    successLock.current = false;
    traceStepRef.current = -1;
    lastPointsRef.current = [];
    clearAccuracyCache();
    const { letters: next, sessionId: sid } = pickRandomLetters(10);
    setLetters(next);
    setSessionId(sid);
    setLoading(false);
  }, []);

  useEffect(() => {
    bootstrapRound();
  }, [bootstrapRound]);

  useEffect(() => {
    if (!currentLetter || loading || finished || busy) return;
    if (traceStepRef.current === stepIndex) return;
    traceStepRef.current = stepIndex;
    tracePrompt(currentLetter);
  }, [currentLetter, stepIndex, loading, finished, busy]);

  const onStrokesUpdate = useCallback((flat) => {
    lastPointsRef.current = flat;
  }, []);

  const handleClear = useCallback(() => {
    if (busy) return;
    successLock.current = false;
    setGradedScore(null);
    setResetSignal((s) => s + 1);
    lastPointsRef.current = [];
    clearAccuracyCache();
  }, [busy]);

  const handleListenTrace = useCallback(() => {
    if (currentLetter) void tracePrompt(currentLetter);
  }, [currentLetter]);

  const handleSayLetter = useCallback(async () => {
    if (!currentLetter || speechBusy) return;
    setSpeechBusy(true);
    const heard = await listenOnce({ maxMs: 6000 });
    setSpeechBusy(false);
    if (!heard) {
      void speak("I did not catch that. Try again.");
      return;
    }
    const result = verifySpokenLetter(currentLetter, heard);
    if (result.match) {
      void speak("Yes, that matches this letter.");
    } else {
      void speak("Keep practicing this letter on the canvas.");
    }
  }, [currentLetter, speechBusy]);

  const handleNewGame = useCallback(() => {
    bootstrapRound();
  }, [bootstrapRound]);

  const handleDone = useCallback(async () => {
    if (busy || finished || !currentLetter || successLock.current) return;

    const flat =
      canvasRef.current?.captureAllPoints?.() ?? lastPointsRef.current;
    const score = calculateAccuracy(
      currentLetter,
      flat,
      CANVAS_WIDTH,
      CANVAS_HEIGHT
    );

    successLock.current = true;
    setBusy(true);
    setGradedScore(score);

    try {
      await speak(`Your tracing match is ${score} percent.`);

      if (score >= THRESHOLD) {
        await new Promise((r) => setTimeout(r, 300));
        await pronounceLetterSuccess(currentLetter);
        recordLetterResult({
          userId,
          letter: currentLetter,
          accuracy: score,
          completed: true,
          sessionId,
        });
        await new Promise((r) => setTimeout(r, PAUSE_AFTER_SPEECH_MS));

        setGradedScore(null);
        lastPointsRef.current = [];
        setResetSignal((s) => s + 1);

        if (isLastLetter) {
          setFinished(true);
          await speak("You finished all ten letters. Wonderful work!");
        } else {
          setStepIndex((i) => i + 1);
        }
      } else {
        await speak("Try again. Trace more closely on the dashed letter.");
        setGradedScore(null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      successLock.current = false;
      setBusy(false);
    }
  }, [
    busy,
    currentLetter,
    finished,
    isLastLetter,
    sessionId,
    userId,
  ]);

  return (
    <div className="min-h-full min-h-[100dvh] bg-gradient-to-br from-pink-100 via-white to-sky-100 flex flex-col">
      {/* <header className="pt-8 pb-4 px-4 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
          Trace ten letters
        </h1>
        <p className="mt-3 text-slate-600 text-lg leading-relaxed">
          Use one or more strokes (lift your finger or mouse between parts of
          the letter). When the whole letter is drawn, tap{" "}
          <span className="font-bold text-emerald-700">Done</span>. Your match
          score appears first, then the letter is spoken. After that, the next
          letter is shown if your score is{" "}
          <span className="text-emerald-600 font-bold">{THRESHOLD}%</span> or
          higher. Progress stays on this device only.
        </p>
      </header> */}

      <main className="flex-1 flex flex-col items-center px-4 pb-12 gap-8">
        {loading && (
          <p className="text-slate-500 text-lg font-semibold">Loading…</p>
        )}

        {!loading && finished && (
          <div className="rounded-3xl bg-white/90 px-8 py-10 shadow-soft border border-white text-center max-w-md">
            <p className="text-2xl font-extrabold text-slate-800 mb-2">
              Round complete
            </p>
            <p className="text-slate-600 text-lg mb-6">
              You traced all ten letters. Take a short break, then play again.
            </p>
            <button
              type="button"
              onClick={handleNewGame}
              className="rounded-2xl bg-gradient-to-r from-pink-400 to-sky-400 text-white font-extrabold text-lg px-10 py-4 shadow-soft hover:brightness-105"
            >
              New game
            </button>
          </div>
        )}

        {!loading && !finished && currentLetter && (
          <>
            <AccuracyMeter
              value={gradedScore}
              pending={gradedScore === null}
            />
            <div className="flex flex-col xl:flex-row items-center justify-center gap-10 w-full max-w-6xl">
              <LetterCard
                letter={currentLetter}
                step={stepIndex}
                total={total}
              />
              <div className="flex flex-col items-center gap-2">
                <DrawingCanvas
                  ref={canvasRef}
                  letter={currentLetter}
                  disabled={busy}
                  onStrokesUpdate={onStrokesUpdate}
                  resetSignal={resetSignal}
                />
                {/* <p className="text-center text-slate-500 text-sm font-medium max-w-[420px]">
                  Multiple strokes are OK — lift between strokes to trace
                  different parts of the letter.
                </p> */}
              </div>
            </div>
            <GameControls
              onClear={handleClear}
              onDone={handleDone}
              onListenTrace={handleListenTrace}
              onCheckSpeech={handleSayLetter}
              speechBusy={speechBusy}
              disabled={busy}
              showSpeech
            />
            {busy && (
              <p className="text-slate-500 font-semibold text-center animate-pulse">
                Please wait…
              </p>
            )}
          </>
        )}
      </main>

      {/* <footer className="pb-6 text-center text-slate-400 text-sm px-4">
        Scores show only after <span className="font-semibold text-slate-500">Done</span>. The next letter appears only after your score is read and the letter is pronounced (when you pass).
      </footer> */}
    </div>
  );
}
