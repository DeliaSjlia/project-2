export const mockJapaneseVocabulary = [
  { id: "ja-v-001", groupId: "ja-beginner-greetings", sourceText: "Guten Morgen (höflich)", targetText: "おはようございます" },
  { id: "ja-v-002", groupId: "ja-beginner-greetings", sourceText: "Guten Tag", targetText: "こんにちは" },
  { id: "ja-v-003", groupId: "ja-beginner-food", sourceText: "Wasser", targetText: "水", hiragana: "みず" },
  { id: "ja-v-004", groupId: "ja-beginner-food", sourceText: "Kaffee", targetText: "コーヒー" },
  { id: "ja-v-005", groupId: "ja-medium-travel", sourceText: "Bahnhof", targetText: "駅", hiragana: "えき" },
  { id: "ja-v-006", groupId: "ja-medium-travel", sourceText: "Fahrkarte", targetText: "切符", hiragana: "きっぷ" },
  { id: "ja-v-007", groupId: "ja-medium-routine", sourceText: "aufstehen", targetText: "起きる", hiragana: "おきる" },
  { id: "ja-v-008", groupId: "ja-medium-routine", sourceText: "sich ausruhen", targetText: "休む", hiragana: "やすむ" },
  { id: "ja-v-009", groupId: "ja-hard-opinions", sourceText: "wichtig", targetText: "大切", hiragana: "たいせつ" },
  { id: "ja-v-010", groupId: "ja-hard-opinions", sourceText: "Meinung", targetText: "意見", hiragana: "いけん" },
  { id: "ja-v-011", groupId: "ja-hard-hypotheticals", sourceText: "Möglichkeit", targetText: "可能性", hiragana: "かのうせい" },
  { id: "ja-v-012", groupId: "ja-hard-hypotheticals", sourceText: "Bedingung", targetText: "条件", hiragana: "じょうけん" },
].map((item) => ({ ...item, sourceLanguage: "de", targetLanguage: "ja" }));
