export default function ExerciseResults({ round, vocabulary = false }) {
  return (
    <div>
      <h3>Runde abgeschlossen!</h3>
      <p>
        Du hast {round.score} von {round.total}{" "}
        {vocabulary ? "Vokabeln gewusst." : "Aufgaben richtig gelöst."}
      </p>
      <button type="button" onClick={round.restartAll}>Alle wiederholen</button>
      {round.mistakeCount > 0 ? (
        <button type="button" onClick={round.repeatMistakes}>
          Nur Fehler wiederholen ({round.mistakeCount})
        </button>
      ) : (
        <p>{vocabulary ? "Alle Vokabeln gewusst! ✓" : "Alles richtig! ✓"}</p>
      )}
    </div>
  );
}
