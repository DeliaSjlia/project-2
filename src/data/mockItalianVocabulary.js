export const mockItalianVocabulary = [
  { id: "it-v-001", groupId: "it-beginner-greetings", sourceText: "Guten Morgen", targetText: "Buongiorno" },
  { id: "it-v-002", groupId: "it-beginner-greetings", sourceText: "Danke", targetText: "Grazie" },
  { id: "it-v-003", groupId: "it-beginner-food", sourceText: "das Wasser", targetText: "l’acqua" },
  { id: "it-v-004", groupId: "it-beginner-food", sourceText: "der Kaffee", targetText: "il caffè" },
  { id: "it-v-005", groupId: "it-medium-travel", sourceText: "der Bahnhof", targetText: "la stazione" },
  { id: "it-v-006", groupId: "it-medium-travel", sourceText: "die Fahrkarte", targetText: "il biglietto" },
  { id: "it-v-007", groupId: "it-medium-routine", sourceText: "aufstehen", targetText: "alzarsi" },
  { id: "it-v-008", groupId: "it-medium-routine", sourceText: "sich ausruhen", targetText: "riposarsi" },
  { id: "it-v-009", groupId: "it-hard-opinions", sourceText: "jedoch", targetText: "tuttavia" },
  { id: "it-v-010", groupId: "it-hard-opinions", sourceText: "die Meinung", targetText: "l’opinione" },
  { id: "it-v-011", groupId: "it-hard-hypotheticals", sourceText: "die Möglichkeit", targetText: "la possibilità" },
  { id: "it-v-012", groupId: "it-hard-hypotheticals", sourceText: "die Bedingung", targetText: "la condizione" },
].map((item) => ({ ...item, sourceLanguage: "de", targetLanguage: "it" }));
