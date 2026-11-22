import ExerciseProgress from "./ExerciseProgress";
import ExerciseResults from "./ExerciseResults";

export default function ExerciseFrame({ title, round, onClose, vocabulary = false, children }) {
  return (
    <section aria-label={title}>
      <button type="button" onClick={onClose}>← Zurück</button>
      <h2>{title}</h2>
      {round.total === 0 ? (
        <p>Es sind noch keine Übungen vorhanden.</p>
      ) : round.isComplete ? (
        <ExerciseResults round={round} vocabulary={vocabulary} />
      ) : (
        <>
          {round.mode === "mistakes" && <p>Du wiederholst die Fehler der letzten Runde.</p>}
          <ExerciseProgress
            currentIndex={round.currentIndex}
            answeredCount={round.answeredCount}
            total={round.total}
          />
          {children}
        </>
      )}
    </section>
  );
}
