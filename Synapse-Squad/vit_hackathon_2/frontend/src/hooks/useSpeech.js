import { useState, useRef } from "react";

export function useSpeech() {
  const [detectedText, setDetectedText] = useState("");
  const [isListening, setIsListening] = useState(false);

  const recognitionRef = useRef(null);
  const timeoutRef = useRef(null);

  const listen = () => {
    return new Promise((resolve, reject) => {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        reject(new Error("Speech recognition not supported (use Chrome)"));
        return;
      }

      // 🔥 Prevent multiple instances
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.continuous = false;

      recognition.onstart = () => {
        console.log("🎤 Listening...");
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const text = event.results?.[0]?.[0]?.transcript;

        if (text) {
          console.log("🎤 Heard:", text);
          setDetectedText(text);
          cleanup();
          resolve(text);
        } else {
          cleanup();
          reject(new Error("No speech detected"));
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech error:", event.error);
        cleanup();
        reject(new Error(event.error));
      };

      recognition.onend = () => {
        cleanup();
      };

      // 🔥 CLEANUP FUNCTION
      const cleanup = () => {
        setIsListening(false);

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }

        recognitionRef.current = null;
      };

      // 🔥 AUTO STOP (SAFE)
      timeoutRef.current = setTimeout(() => {
        if (recognitionRef.current) {
          try {
            recognitionRef.current.stop();
          } catch {}
        }
      }, 5000);

      try {
        recognition.start();
      } catch (err) {
        cleanup();
        reject(err);
      }
    });
  };

  const speak = (text) => {
    if (!text || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.rate = 0.85;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = "en-US";

    window.speechSynthesis.speak(utterance);
  };

  const mockRecognize = (sampleText) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setDetectedText(sampleText);
        resolve(sampleText);
      }, 1000);
    });
  };

  return {
    speak,
    listen,
    detectedText,
    isListening,
    mockRecognize,
  };
}