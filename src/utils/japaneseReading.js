export function containsKanji(text) {
  return /[\p{Script=Han}々]/u.test(text);
}

export function defaultHiraganaHelp(difficulty) {
  return difficulty === "beginner";
}

export function getMissingWordReading(item) {
  if (item.hiraganaBefore === undefined || item.hiraganaAfter === undefined) return null;
  // Never use the complete solution reading while the answer is still missing.
  return `${item.hiraganaBefore}＿＿＿${item.hiraganaAfter}`;
}
