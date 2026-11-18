import { useState } from "react";

export default function VocabularyExercise({ words = [], onClose }) {
  const [answers, setAnswers] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentIndex = answers.length;
  const currentWord = words[currentIndex];
  const isComplete = currentIndex >= words.length;
  const knownCount = answers.filter((answer) => answer.known).length;

  function handleAnswer(known) {
    if (!currentWord || !isFlipped) return;

    setAnswers((previous) => [...previous, { wordId: currentWord.id, known }]);
    setIsFlipped(false);
  }

  function handleRestart() {
    setAnswers([]);
    setIsFlipped(false);
  }

  return (
    <section aria-label="Vokabelübung">
      <button type="button" onClick={onClose}>
        ← Zurück
      </button>

      <h2>Vokabeln üben</h2>

      {words.length === 0 ? (
        <p>Es sind noch keine Vokabeln vorhanden.</p>
      ) : isComplete ? (
        <>
          <h3>Übung abgeschlossen!</h3>

          <p>
            Du hast {knownCount} von {words.length} Vokabeln gewusst.
          </p>

          <button type="button" onClick={handleRestart}>
            Noch einmal üben
          </button>
        </>
      ) : (
        <>
          <p>
            Karte {currentIndex + 1} von {words.length}
          </p>

          <progress value={currentIndex} max={words.length}>
            {currentIndex} von {words.length} beantwortet
          </progress>

          <p>
            {isFlipped
              ? "Übersetzung"
              : "Tippe auf die Karte, um die Übersetzung zu sehen."}
          </p>

          <button
            type="button"
            onClick={() => setIsFlipped((previous) => !previous)}
            aria-label={
              isFlipped ? "Deutsches Wort anzeigen" : "Übersetzung anzeigen"
            }
          >
            <span
              lang={
                isFlipped
                  ? currentWord.targetLanguage
                  : currentWord.sourceLanguage
              }
            >
              {isFlipped ? currentWord.targetText : currentWord.sourceText}
            </span>
          </button>

          {isFlipped && (
            <div>
              <button type="button" onClick={() => handleAnswer(false)}>
                Nicht gewusst
              </button>

              <button type="button" onClick={() => handleAnswer(true)}>
                Gewusst ✓
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
