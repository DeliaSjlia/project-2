export const mockItalianFindMissingWordExercise = [
  { id: "it-m-001", groupId: "it-beginner-greetings", before: "Come", after: "?", hint: "Wie geht es dir?", acceptedAnswers: ["stai"] },
  { id: "it-m-002", groupId: "it-beginner-greetings", before: "Molte", after: "!", hint: "Vielen Dank!", acceptedAnswers: ["grazie"] },
  { id: "it-m-003", groupId: "it-beginner-food", before: "Vorrei", after: ".", hint: "Ich möchte Wasser.", acceptedAnswers: ["acqua"] },
  { id: "it-m-004", groupId: "it-beginner-food", before: "Un", after: ", per favore.", hint: "Einen Kaffee, bitte.", acceptedAnswers: ["caffè"] },
  { id: "it-m-005", groupId: "it-medium-travel", before: "Dov’è la", after: "?", hint: "Wo ist der Bahnhof?", acceptedAnswers: ["stazione"] },
  { id: "it-m-006", groupId: "it-medium-travel", before: "Compro un", after: ".", hint: "Ich kaufe eine Fahrkarte.", acceptedAnswers: ["biglietto"] },
  { id: "it-m-007", groupId: "it-medium-routine", before: "Mi", after: " alle sette.", hint: "Ich stehe um sieben auf.", acceptedAnswers: ["alzo"] },
  { id: "it-m-008", groupId: "it-medium-routine", before: "Dopo il lavoro mi", after: ".", hint: "Nach der Arbeit ruhe ich mich aus.", acceptedAnswers: ["riposo"] },
  { id: "it-m-009", groupId: "it-hard-opinions", before: "Non credo che", after: " facile.", hint: "Ich glaube nicht, dass es einfach ist.", acceptedAnswers: ["sia"] },
  { id: "it-m-010", groupId: "it-hard-opinions", before: "È importante che", after: ".", hint: "Es ist wichtig, dass wir zuhören.", acceptedAnswers: ["ascoltiamo"] },
  { id: "it-m-011", groupId: "it-hard-hypotheticals", before: "Se", after: " tempo, viaggerei di più.", hint: "Wenn ich Zeit hätte, würde ich mehr reisen.", acceptedAnswers: ["avessi"] },
  { id: "it-m-012", groupId: "it-hard-hypotheticals", before: "Spero che domani non", after: ".", hint: "Ich hoffe, dass es morgen nicht regnet.", acceptedAnswers: ["piova"] },
].map((item) => ({ ...item, sourceLanguage: "de", targetLanguage: "it" }));
