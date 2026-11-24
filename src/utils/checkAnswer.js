function normalizeAnswer(value, ignoreAccents, targetLanguage) {
  let normalized = value.normalize(targetLanguage === "ja" ? "NFKC" : "NFC")
    .toLocaleLowerCase(targetLanguage);

  if (ignoreAccents && targetLanguage !== "ja") {
    // Ignore vowel accents/diacritics, but preserve Spanish ñ.
    normalized = normalized
      .replace(/[áàâäãå]/g, "a")
      .replace(/[éèêë]/g, "e")
      .replace(/[íìîï]/g, "i")
      .replace(/[óòôöõ]/g, "o")
      .replace(/[úùûü]/g, "u");
  }

  normalized = normalized
    .replace(/[¿?¡!.,;:。、！？]/g, "")
    .trim()
    .replace(/\s+/g, " ");

  // Japanese and its Romaji readings do not require a fixed word-spacing style.
  return targetLanguage === "ja" ? normalized.replace(/\s/g, "") : normalized;
}

export function checkAnswer(answer, acceptedAnswers, { ignoreAccents = true, targetLanguage = "es" } = {}) {
  const normalized = normalizeAnswer(answer, ignoreAccents, targetLanguage);
  return Boolean(normalized) && acceptedAnswers.some(
    (accepted) => normalizeAnswer(accepted, ignoreAccents, targetLanguage) === normalized,
  );
}

export function checkExerciseAnswer(answer, exercise, options = {}) {
  const targetLanguage = options.targetLanguage ?? exercise.targetLanguage ?? "es";
  const acceptedAnswers = targetLanguage === "ja"
    ? [...exercise.acceptedAnswers, ...(exercise.acceptedRomaji ?? [])]
    : exercise.acceptedAnswers;
  return checkAnswer(answer, acceptedAnswers, { ...options, targetLanguage });
}
