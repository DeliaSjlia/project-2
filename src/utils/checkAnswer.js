function normalizeAnswer(value, ignoreAccents) {
  let normalized = value.normalize("NFC").toLocaleLowerCase("es");

  if (ignoreAccents) {
    // Ignore vowel accents/diacritics, but preserve Spanish ñ.
    normalized = normalized
      .replace(/[áàâäãå]/g, "a")
      .replace(/[éèêë]/g, "e")
      .replace(/[íìîï]/g, "i")
      .replace(/[óòôöõ]/g, "o")
      .replace(/[úùûü]/g, "u");
  }

  return normalized
    .replace(/[¿?¡!.,;:]/g, "")
    .trim()
    .replace(/\s+/g, " ");
}

export function checkAnswer(answer, acceptedAnswers, { ignoreAccents = true } = {}) {
  const normalized = normalizeAnswer(answer, ignoreAccents);
  return Boolean(normalized) && acceptedAnswers.some(
    (accepted) => normalizeAnswer(accepted, ignoreAccents) === normalized,
  );
}
