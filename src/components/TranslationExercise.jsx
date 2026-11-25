import WrittenExercise from "./exercises/WrittenExercise";
import ExerciseSelection from "./exercises/ExerciseSelection";
import { mockLearningGroups } from "../data/mockLearningGroups";
import { getLanguage } from "../data/languages";

function renderPrompt({ item, input, inputId, targetLanguage }) {
  return (
    <>
      <h3>{getLanguage(targetLanguage).translationInstruction}</h3>
      <p lang="de">{item.prompt}</p>
      <label htmlFor={inputId}>Deine Übersetzung</label>
      {input}
    </>
  );
}

export default function TranslationExercise({ exercises = [], groups = mockLearningGroups, targetLanguage = "es", onClose, onRoundComplete }) {
  return (
    <ExerciseSelection title="Übersetzung" items={exercises} groups={groups} targetLanguage={targetLanguage} onClose={onClose}>
      {(selectedItems, backToSelection, settings) => (
        <WrittenExercise
          title="Übersetzung"
          exerciseType="translation"
          targetLanguage={targetLanguage}
          showHiragana={settings.showHiragana}
          exercises={selectedItems}
          onClose={backToSelection}
          onRoundComplete={onRoundComplete}
          renderPrompt={renderPrompt}
        />
      )}
    </ExerciseSelection>
  );
}
