import { useEffect, useReducer, useRef } from "react";
import { createRound, exerciseRoundReducer, getMistakes } from "../utils/exerciseRound";

export default function useExerciseRound(items, { exerciseType, targetLanguage = "es", onRoundComplete } = {}) {
  const [state, dispatch] = useReducer(exerciseRoundReducer, items, createRound);
  const notifiedRound = useRef(null);
  const total = state.items.length;
  const isComplete = total > 0 && state.currentIndex >= total;
  const score = state.results.filter((result) => result.correct).length;

  useEffect(() => {
    if (!isComplete || !onRoundComplete || notifiedRound.current === state.roundNumber) return;
    notifiedRound.current = state.roundNumber;
    onRoundComplete({
      exerciseType,
      targetLanguage,
      roundNumber: state.roundNumber,
      mode: state.mode,
      total,
      score,
      results: state.results,
    });
  }, [isComplete, onRoundComplete, exerciseType, targetLanguage, state.roundNumber, state.mode, state.results, total, score]);

  return {
    currentItem: state.items[state.currentIndex],
    currentResult: state.results[state.currentIndex] ?? null,
    currentIndex: state.currentIndex,
    answeredCount: state.results.length,
    total,
    score,
    isComplete,
    mode: state.mode,
    mistakeCount: getMistakes(state).length,
    roundNumber: state.roundNumber,
    recordAnswer: (correct, answer, checking) => dispatch({ type: "answer", correct, answer, checking }),
    answerAndNext: (correct) => dispatch({ type: "answerAndNext", correct }),
    next: () => dispatch({ type: "next" }),
    restartAll: () => dispatch({ type: "restart", items }),
    repeatMistakes: () => dispatch({ type: "repeatMistakes" }),
  };
}
