export const lowercase = [..."abcdefghijklmnopqrstuvwxyz"];
export const uppercase = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

// Exclude symmetric letters: A, H, I, M, O, T, U, V, W, X, Y
const excludedLetters = ["a", "h", "i", "m", "o", "t", "u", "v", "w", "x", "y", "A", "H", "I", "M", "O", "T", "U", "V", "W", "X", "Y"];

export const allLetters = [...lowercase, ...uppercase].filter(letter => !excludedLetters.includes(letter));

const priorityLetters = [
  "b",
  "d",
  "p",
  "q",
  "n",
  "B",
  "D",
  "P",
  "Q",
  "N"
];

const orientationHints = {
  b: "b has a belly on the right.",
  d: "d has a belly on the left.",
  p: "p goes down.",
  q: "q has a tail.",
  n: "n stands up straight.",
  B: "B has two bumps on the right.",
  D: "D has a straight left stem.",
  P: "P has a loop on top.",
  Q: "Q is like O with a small tail.",
  N: "N has diagonal strokes."
};

export function getRandomLetter() {
  if (Math.random() < 0.55) {
    const index = Math.floor(Math.random() * priorityLetters.length);
    return priorityLetters[index];
  }

  const index = Math.floor(Math.random() * allLetters.length);
  return allLetters[index];
}

export function getOrientationHint(letter) {
  return orientationHints[letter] || "Watch the shape and orientation carefully.";
}

export function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}
