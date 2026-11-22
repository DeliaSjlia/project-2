import { useState } from "react";

function normalizeAnswer(value) {
  return value
    .normalize("NFC")
    .toLocaleLowerCase("es")
    .trim()
    .replace(/\s+/g, " ");
}

export default function FindMissingWordExercise({ exercises = [], onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [results, setResults] = useState([]);
  const [feedback, setFeedback] = useState(null);

  const currentExercise = exercises[currentIndex];
  const isComplete = currentIndex >= exercises.length;
  const score = results.filter((result) => result.correct).length;

  function handleCheck(event) {
    event.preventDefault();

    if (!answer.trim() || feedback !== null || !currentExercise) {
      return;
    }

    const correct = currentExercise.acceptedAnswers.some(
      (acceptedAnswer) =>
        normalizeAnswer(acceptedAnswer) === normalizeAnswer(answer),
    );

    setResults((previous) => [
      ...previous,
      {
        exerciseId: currentExercise.id,
        answer: answer.trim(),
        correct,
      },
    ]);

    setFeedback({
      correct,
      solution: currentExercise.acceptedAnswers[0],
    });
  }

  function handleNext() {
    setCurrentIndex((previous) => previous + 1);
    setAnswer("");
    setFeedback(null);
  }

  function handleRestart() {
    setCurrentIndex(0);
    setAnswer("");
    setResults([]);
    setFeedback(null);
  }

  return (
    <section aria-label="Lückentextübung">
      <button type="button" onClick={onClose}>
        ← Zurück
      </button>

      <h2>Lückentext</h2>

      {exercises.length === 0 ? (
        <p>Es sind noch keine Übungen vorhanden.</p>
      ) : isComplete ? (
        <>
          <h3>Übung abgeschlossen!</h3>

          <p>
            Du hast {score} von {exercises.length} Aufgaben richtig gelöst.
          </p>

          <button type="button" onClick={handleRestart}>
            Noch einmal üben
          </button>
        </>
      ) : (
        <>
          <p>
            Aufgabe {currentIndex + 1} von {exercises.length}
          </p>

          <progress value={results.length} max={exercises.length}>
            {results.length} von {exercises.length} beantwortet
          </progress>

          <h3>Ergänze das fehlende Wort:</h3>

          <p id="missing-word-hint">Bedeutung: {currentExercise.hint}</p>

          <form onSubmit={handleCheck}>
            <label htmlFor="missing-word-answer">Fehlendes Wort</label>

            <p lang="es">
              {currentExercise.before}{" "}
              <input
                id="missing-word-answer"
                name="missingWord"
                type="text"
                lang="es"
                aria-describedby="missing-word-hint"
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                readOnly={feedback !== null}
                autoComplete="off"
                spellCheck={false}
                required
              />
              {currentExercise.after}
            </p>

            <button
              type="submit"
              disabled={!answer.trim() || feedback !== null}
            >
              Prüfen
            </button>
          </form>

          <div role="status">
            {feedback !== null && (
              <>
                <p>{feedback.correct ? "Richtig! ✓" : "Noch nicht richtig."}</p>

                <p lang="es">
                  {currentExercise.before} <strong>{feedback.solution}</strong>
                  {currentExercise.after}
                </p>
              </>
            )}
          </div>

          {feedback !== null && (
            <button type="button" onClick={handleNext}>
              {currentIndex === exercises.length - 1
                ? "Ergebnis anzeigen"
                : "Weiter"}
            </button>
          )}
        </>
      )}
    </section>
  );
}
