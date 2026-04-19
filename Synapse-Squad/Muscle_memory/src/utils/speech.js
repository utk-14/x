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

export function speak(text, rate = 0.92) {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    return Promise.resolve();
  }
  window.speechSynthesis.cancel();
  const msg = new SpeechSynthesisUtterance(text);
  msg.rate = rate;
  msg.pitch = 1;
  return new Promise((resolve) => {
    msg.onend = () => resolve();
    msg.onerror = () => resolve();
    window.speechSynthesis.speak(msg);
  });
}

function pronouncePhraseFor(letter) {
  const display = String(letter).slice(0, 1);
  const L = baseLetter(display);
  const name = NAMES[L] || L;
  return `Great! This is the letter ${display}. It sounds like "${name}".`;
}

export async function pronounceLetterSuccess(letter) {
  await speak(pronouncePhraseFor(letter));
}

export function tracePrompt(letter) {
  const ch = String(letter).slice(0, 1);
  return speak(`Trace the letter ${ch}`);
}
