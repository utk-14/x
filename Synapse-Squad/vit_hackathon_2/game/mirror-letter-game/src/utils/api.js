const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function checkAnswer(expected, actual) {
  const res = await fetch(`${API_URL}/check-answer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ expected, actual })
  });

  if (!res.ok) {
    throw new Error("Failed to validate answer");
  }

  return res.json();
}

export async function getFeedback(letter) {
  const res = await fetch(`${API_URL}/generate-feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ letter })
  });

  if (!res.ok) {
    throw new Error("Failed to load feedback");
  }

  const data = await res.json();
  return data.explanation || data;
}
