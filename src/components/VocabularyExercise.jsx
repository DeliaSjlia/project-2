import { useState } from "react";
import useExerciseRound from "../hooks/useExerciseRound";
import ExerciseFrame from "./exercises/ExerciseFrame";
import ExerciseSelection from "./exercises/ExerciseSelection";
import { mockLearningGroups } from "../data/mockLearningGroups";

function VocabularyCard({ word, onAnswer }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <>
      <p>{isFlipped ? "Übersetzung" : "Tippe auf die Karte, um die Übersetzung zu sehen."}</p>
      <button type="button" onClick={() => setIsFlipped((previous) => !previous)}>
        <span lang={isFlipped ? word.targetLanguage : word.sourceLanguage}>
          {isFlipped ? word.targetText : word.sourceText}
        </span>
      </button>
      {isFlipped && (
        <div>
          <button type="button" onClick={() => onAnswer(false)}>Nicht gewusst</button>
          <button type="button" onClick={() => onAnswer(true)}>Gewusst ✓</button>
        </div>
      )}
    </>
  );
}

function VocabularyRound({ words, onClose, onRoundComplete }) {
  const round = useExerciseRound(words, { exerciseType: "vocabulary", onRoundComplete });

  return (
    <ExerciseFrame title="Vokabeln üben" round={round} onClose={onClose} vocabulary>
      {round.currentItem && (
        <VocabularyCard
          key={`${round.roundNumber}:${round.currentIndex}`}
          word={round.currentItem}
          onAnswer={round.answerAndNext}
        />
      )}
    </ExerciseFrame>
  );
}

export default function VocabularyExercise({ words = [], groups = mockLearningGroups, onClose, onRoundComplete }) {
  return (
    <ExerciseSelection title="Vokabeln üben" items={words} groups={groups} onClose={onClose}>
      {(selectedItems, backToSelection) => (
        <VocabularyRound words={selectedItems} onClose={backToSelection} onRoundComplete={onRoundComplete} />
      )}
    </ExerciseSelection>
  );
}
