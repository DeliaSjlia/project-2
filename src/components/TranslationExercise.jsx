import { useState } from "react";

// Ignore capitalization, extra spaces, and sentence punctuation.
// Accents remain significant.
function normalizeAnswer(value) {
  return value
    .normalize("NFC")
    .toLocaleLowerCase("es")
    .replace(/[¿?¡!.,;:]/g, "")
    .trim()
    .replace(/\s+/g, " ");
}

export default function TranslationExercise({ exercises = [], onClose }) {
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
    <section aria-label="Übersetzungsübung">
      <button type="button" onClick={onClose}>
        ← Zurück
      </button>

      <h2>Übersetzung</h2>

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

          <h3>Übersetze ins Spanische:</h3>
          <p lang="de">{currentExercise.prompt}</p>

          <form onSubmit={handleCheck}>
            <label htmlFor="translation-answer">Deine Übersetzung</label>

            <input
              id="translation-answer"
              name="translation"
              type="text"
              lang="es"
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              readOnly={feedback !== null}
              autoComplete="off"
              spellCheck={false}
              required
            />

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

                <p>
                  Eine richtige Übersetzung:{" "}
                  <span lang="es">{feedback.solution}</span>
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
