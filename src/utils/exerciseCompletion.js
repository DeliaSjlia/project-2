const exerciseTypes = ["vocabulary", "translation", "missingWord"];
const languageCodes = ["es", "it", "ja"];

export function getCompletionData(summary) {
  if (!/^[a-zA-Z0-9_-]{1,100}$/.test(summary.completionId ?? "")) {
    throw new Error("Der Übungsabschluss hat keine gültige ID.");
  }
  if (!exerciseTypes.includes(summary.exerciseType) || !languageCodes.includes(summary.targetLanguage)) {
    throw new Error("Unbekannter Übungstyp oder unbekannte Sprache.");
  }
  if (!["all", "mistakes"].includes(summary.mode)) {
    throw new Error("Unbekannter Übungsmodus.");
  }
  if (!Number.isSafeInteger(summary.total) || summary.total < 1 ||
      !Number.isSafeInteger(summary.score) || summary.score < 0 || summary.score > summary.total) {
    throw new Error("Der Übungsabschluss enthält ungültige Ergebnisse.");
  }
  if (typeof summary.completedAt !== "string" || !Number.isFinite(new Date(summary.completedAt).getTime())) {
    throw new Error("Der Abschlusszeitpunkt ist ungültig.");
  }

  // Dashboard records do not need the user's individual answers.
  return {
    exerciseType: summary.exerciseType,
    targetLanguage: summary.targetLanguage,
    mode: summary.mode,
    total: summary.total,
    score: summary.score,
    completedAt: summary.completedAt,
  };
}
