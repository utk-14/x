/**
 * Browser Speech-to-Text (Web Speech API). Optional “Say the letter”.
 */

const NAMES = {
  A: "ay",
  B: "bee",
  C: "see",
  D: "dee",
  E: "ee",
  F: "eff",
  G: "jee",
  H: "aych",
  I: "eye",
  J: "jay",
  K: "kay",
  L: "ell",
  M: "em",
  N: "en",
  O: "oh",
  P: "pee",
  Q: "cue",
  R: "ar",
  S: "ess",
  T: "tee",
  U: "you",
  V: "vee",
  W: "double-you",
  X: "ex",
  Y: "why",
  Z: "zee",
};

function baseLetter(ch) {
  return String(ch || "A").slice(0, 1).toUpperCase();
}

export function isSpeechRecognitionAvailable() {
  return (
    typeof window !== "undefined" &&
    (window.SpeechRecognition || window.webkitSpeechRecognition)
  );
}

/**
 * @returns {Promise<string|null>} transcript or null
 */
export function listenOnce({ lang = "en-US", maxMs = 8000 } = {}) {
  return new Promise((resolve) => {
    const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Ctor) {
      resolve(null);
      return;
    }
    const rec = new Ctor();
    rec.lang = lang;
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    const timer = window.setTimeout(() => {
      try {
        rec.stop();
      } catch {
        /* */
      }
      resolve(null);
    }, maxMs);
    rec.onresult = (ev) => {
      window.clearTimeout(timer);
      const t = ev.results[0]?.[0]?.transcript?.trim() || "";
      resolve(t || null);
    };
    rec.onerror = () => {
      window.clearTimeout(timer);
      resolve(null);
    };
    rec.onend = () => {
      window.clearTimeout(timer);
    };
    try {
      rec.start();
    } catch {
      window.clearTimeout(timer);
      resolve(null);
    }
  });
}

/** Match transcript to expected letter (local, no server). */
export function verifySpokenLetter(expectedLetter, transcript) {
  if (!transcript) {
    return { match: false, reason: "no speech heard" };
  }
  const exp = baseLetter(expectedLetter);
  const t = String(transcript).toLowerCase().trim();
  const name = NAMES[exp] || "";
  const words = t.split(/\s+/);
  const ok =
    t.includes(exp.toLowerCase()) ||
    (name && t.includes(name.split("-")[0])) ||
    words.some((w) => w.startsWith(exp.toLowerCase()));
  return { match: ok, expected: exp, heard: transcript };
}
