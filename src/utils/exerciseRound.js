export function createRound(items, roundNumber = 1, mode = "all") {
  return { items, currentIndex: 0, results: [], roundNumber, mode };
}

export function getMistakes(state) {
  const incorrectIds = new Set(
    state.results.filter((result) => !result.correct).map((result) => result.exerciseId),
  );
  return state.items.filter((item) => incorrectIds.has(item.id));
}

export function exerciseRoundReducer(state, action) {
  const currentItem = state.items[state.currentIndex];

  switch (action.type) {
    case "answer":
    case "answerAndNext": {
      if (!currentItem || state.results[state.currentIndex]) return state;
      const result = {
        exerciseId: currentItem.id,
        correct: action.correct,
        answer: action.answer ?? null,
        ...(currentItem.groupId ? { groupId: currentItem.groupId } : {}),
        ...(action.checking ? { checking: action.checking } : {}),
      };
      return {
        ...state,
        results: [...state.results, result],
        currentIndex: state.currentIndex + (action.type === "answerAndNext" ? 1 : 0),
      };
    }
    case "next":
      if (!currentItem || !state.results[state.currentIndex]) return state;
      return { ...state, currentIndex: state.currentIndex + 1 };
    case "restart":
      return createRound(action.items, state.roundNumber + 1);
    case "repeatMistakes": {
      const complete = state.items.length > 0 && state.currentIndex >= state.items.length;
      const mistakes = getMistakes(state);
      if (!complete || mistakes.length === 0) return state;
      return createRound(mistakes, state.roundNumber + 1, "mistakes");
    }
    default:
      return state;
  }
}
