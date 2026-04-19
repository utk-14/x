const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Ten (or `count`) distinct random letters with random upper/lower case. */
export function pickRandomLetters(count = 10) {
  const n = Math.min(26, Math.max(1, count));
  const picked = shuffle(ALPHABET).slice(0, n);
  const letters = picked.map((c) =>
    Math.random() < 0.5 ? c : c.toLowerCase()
  );
  const sessionId = `local_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  return { letters, sessionId, count: letters.length };
}
