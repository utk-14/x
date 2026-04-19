export default function GameReport({ mistakes, score, totalAttempts, onRestart }) {
  const totalMistakes = Object.values(mistakes).reduce((sum, count) => sum + count, 0);
  const correctAnswers = totalAttempts - totalMistakes;
  const wrongLetters = Object.keys(mistakes);

  return (
    <section className="card report-card">
      <div className="report-header">
        <h2>Game Report</h2>
      </div>

      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-value">{score}</div>
          <div className="stat-label">Total Score</div>
        </div>
      </div>

      {wrongLetters.length > 0 && (
        <div className="mistakes-section">
          <h3>Wrong Letters</h3>
          <div className="wrong-letters-list">
            {wrongLetters.sort().join(', ')}
          </div>
        </div>
      )}

      <div className="report-actions">
        <button className="action-button accent" onClick={onRestart}>
          Play Again
        </button>
      </div>
    </section>
  );
}