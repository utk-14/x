export default function FeedbackBox({ text, isCorrect }) {
  return (
    <div className={`feedback-box ${isCorrect ? "correct" : "wrong"}`}>
      <span className="feedback-emoji">{isCorrect ? "🎉" : "🤔"}</span>
      <div>
        <strong>{isCorrect ? "Nice!" : "Keep looking."}</strong>
        <p>{text}</p>
      </div>
      {isCorrect && (
        <div className="bubbles">
          <span className="bubble">🫧</span>
          <span className="bubble">🫧</span>
          <span className="bubble">🫧</span>
        </div>
      )}
    </div>
  );
}
