import WrittenExercise from "./exercises/WrittenExercise";
import ExerciseSelection from "./exercises/ExerciseSelection";
import { mockLearningGroups } from "../data/mockLearningGroups";

function renderPrompt({ item, input, inputId }) {
  return (
    <>
      <h3>Übersetze ins Spanische:</h3>
      <p lang="de">{item.prompt}</p>
      <label htmlFor={inputId}>Deine Übersetzung</label>
      {input}
    </>
  );
}

export default function TranslationExercise({ exercises = [], groups = mockLearningGroups, onClose, onRoundComplete }) {
  return (
    <ExerciseSelection title="Übersetzung" items={exercises} groups={groups} onClose={onClose}>
      {(selectedItems, backToSelection) => (
        <WrittenExercise
          title="Übersetzung"
          exerciseType="translation"
          exercises={selectedItems}
          onClose={backToSelection}
          onRoundComplete={onRoundComplete}
          renderPrompt={renderPrompt}
        />
      )}
    </ExerciseSelection>
  );
}
