import { useState } from "react";
import useExerciseRound from "../hooks/useExerciseRound";
import ExerciseFrame from "./exercises/ExerciseFrame";
import ExerciseSelection from "./exercises/ExerciseSelection";
import { mockLearningGroups } from "../data/mockLearningGroups";
import JapaneseReading from "./exercises/JapaneseReading";

function VocabularyCard({ word, onAnswer, showHiragana }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <>
      <p>{isFlipped ? "Übersetzung" : "Tippe auf die Karte, um die Übersetzung zu sehen."}</p>
      <button type="button" onClick={() => setIsFlipped((previous) => !previous)}>
        <span lang={isFlipped ? word.targetLanguage : word.sourceLanguage}>
          {isFlipped ? word.targetText : word.sourceText}
        </span>
      </button>
      <JapaneseReading
        text={word.targetText}
        reading={word.hiragana}
        visible={isFlipped && word.targetLanguage === "ja" && showHiragana}
      />
      {isFlipped && (
        <div>
          <button type="button" onClick={() => onAnswer(false)}>Nicht gewusst</button>
          <button type="button" onClick={() => onAnswer(true)}>Gewusst ✓</button>
        </div>
      )}
    </>
  );
}

function VocabularyRound({ words, targetLanguage, showHiragana, onClose, onRoundComplete }) {
  const round = useExerciseRound(words, { exerciseType: "vocabulary", targetLanguage, onRoundComplete });

  return (
    <ExerciseFrame title="Vokabeln üben" round={round} onClose={onClose} vocabulary>
      {round.currentItem && (
        <VocabularyCard
          key={`${round.roundNumber}:${round.currentIndex}`}
          word={round.currentItem}
          onAnswer={round.answerAndNext}
          showHiragana={showHiragana}
        />
      )}
    </ExerciseFrame>
  );
}

export default function VocabularyExercise({ words = [], groups = mockLearningGroups, targetLanguage = "es", onClose, onRoundComplete }) {
  return (
    <ExerciseSelection title="Vokabeln üben" items={words} groups={groups} targetLanguage={targetLanguage} onClose={onClose}>
      {(selectedItems, backToSelection, settings) => (
        <VocabularyRound
          words={selectedItems}
          targetLanguage={targetLanguage}
          showHiragana={settings.showHiragana}
          onClose={backToSelection}
          onRoundComplete={onRoundComplete}
        />
      )}
    </ExerciseSelection>
  );
}
