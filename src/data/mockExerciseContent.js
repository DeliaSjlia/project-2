import { mockLearningGroups } from "./mockLearningGroups.js";
import { mockVocabulary } from "./mockVocabulary.js";
import { mockTranslations } from "./mockTranslations.js";
import { mockFindMissingWordExercise } from "./mockFindMissingWordExercise.js";
import { mockItalianVocabulary } from "./mockItalianVocabulary.js";
import { mockItalianTranslations } from "./mockItalianTranslations.js";
import { mockItalianFindMissingWordExercise } from "./mockItalianFindMissingWordExercise.js";
import { mockJapaneseVocabulary } from "./mockJapaneseVocabulary.js";
import { mockJapaneseTranslations } from "./mockJapaneseTranslations.js";
import { mockJapaneseFindMissingWordExercise } from "./mockJapaneseFindMissingWordExercise.js";

const contentByLanguage = {
  es: { vocabulary: mockVocabulary, translations: mockTranslations, missingWords: mockFindMissingWordExercise },
  it: { vocabulary: mockItalianVocabulary, translations: mockItalianTranslations, missingWords: mockItalianFindMissingWordExercise },
  ja: { vocabulary: mockJapaneseVocabulary, translations: mockJapaneseTranslations, missingWords: mockJapaneseFindMissingWordExercise },
};

export const mockExerciseContent = Object.fromEntries(
  Object.entries(contentByLanguage).map(([code, content]) => [
    code,
    { ...content, groups: mockLearningGroups.filter((group) => group.targetLanguage === code) },
  ]),
);
