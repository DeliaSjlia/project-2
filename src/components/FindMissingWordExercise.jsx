import WrittenExercise from "./exercises/WrittenExercise";
import ExerciseSelection from "./exercises/ExerciseSelection";
import { mockLearningGroups } from "../data/mockLearningGroups";
import JapaneseReading from "./exercises/JapaneseReading";
import { getMissingWordReading } from "../utils/japaneseReading";

function renderPrompt({ item, input, inputId, hintId, targetLanguage, showHiragana }) {
  return (
    <>
      <h3>Ergänze das fehlende Wort:</h3>
      <p id={hintId}>Bedeutung: {item.hint}</p>
      <label htmlFor={inputId}>Fehlendes Wort</label>
      <p lang={targetLanguage}>{item.before}{targetLanguage === "ja" ? "" : " "}{input}{item.after}</p>
      <JapaneseReading
        text={`${item.before}＿＿＿${item.after}`}
        reading={getMissingWordReading(item)}
        visible={targetLanguage === "ja" && showHiragana}
      />
    </>
  );
}

function getSolutionText(item) {
  const space = item.targetLanguage === "ja" ? "" : " ";
  return `${item.before}${space}${item.acceptedAnswers[0]}${item.after}`;
}

export default function FindMissingWordExercise({ exercises = [], groups = mockLearningGroups, targetLanguage = "es", onClose, onRoundComplete }) {
  return (
    <ExerciseSelection title="Lückentext" items={exercises} groups={groups} targetLanguage={targetLanguage} onClose={onClose}>
      {(selectedItems, backToSelection, settings) => (
        <WrittenExercise
          title="Lückentext"
          exerciseType="missingWord"
          targetLanguage={targetLanguage}
          showHiragana={settings.showHiragana}
          exercises={selectedItems}
          onClose={backToSelection}
          onRoundComplete={onRoundComplete}
          renderPrompt={renderPrompt}
          getSolutionText={getSolutionText}
        />
      )}
    </ExerciseSelection>
  );
}
