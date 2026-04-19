export default function PracticeMode({ letter, onDone }) {
  const tips = {
    b: "b has a belly on the right.",
    d: "d has a belly on the left.",
    p: "p goes down.",
    q: "q has a tail.",
    B: "B has round bumps on the right.",
    D: "D has a straight stem on the left.",
    P: "P has a loop on top.",
    Q: "Q has a tail on the right.",
  };

  const hint = tips[letter] || `Match the shape of ${letter}.`;

  return (
    <section className="card practice-card">
      <h2>Practice Tip</h2>
      <div className="practice-letter">{letter}</div>
      <p>{hint}</p>
      <button className="action-button accent" onClick={onDone}>
        Back to Play
      </button>
    </section>
  );
}
