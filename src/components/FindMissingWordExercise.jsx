import WrittenExercise from "./exercises/WrittenExercise";
import ExerciseSelection from "./exercises/ExerciseSelection";
import { mockLearningGroups } from "../data/mockLearningGroups";

function renderPrompt({ item, input, inputId, hintId }) {
  return (
    <>
      <h3>Ergänze das fehlende Wort:</h3>
      <p id={hintId}>Bedeutung: {item.hint}</p>
      <label htmlFor={inputId}>Fehlendes Wort</label>
      <p lang="es">{item.before}{" "}{input}{item.after}</p>
    </>
  );
}

export default function FindMissingWordExercise({ exercises = [], groups = mockLearningGroups, onClose, onRoundComplete }) {
  return (
    <ExerciseSelection title="Lückentext" items={exercises} groups={groups} onClose={onClose}>
      {(selectedItems, backToSelection) => (
        <WrittenExercise
          title="Lückentext"
          exerciseType="missingWord"
          exercises={selectedItems}
          onClose={backToSelection}
          onRoundComplete={onRoundComplete}
          renderPrompt={renderPrompt}
        />
      )}
    </ExerciseSelection>
  );
}
