export const mockItalianTranslations = [
  { id: "it-t-001", groupId: "it-beginner-greetings", prompt: "Guten Morgen.", acceptedAnswers: ["Buongiorno"] },
  { id: "it-t-002", groupId: "it-beginner-greetings", prompt: "Wie geht es dir?", acceptedAnswers: ["Come stai?"] },
  { id: "it-t-003", groupId: "it-beginner-food", prompt: "Ich möchte Wasser.", acceptedAnswers: ["Vorrei acqua", "Vorrei dell’acqua", "Vorrei dell'acqua"] },
  { id: "it-t-004", groupId: "it-beginner-food", prompt: "Einen Kaffee, bitte.", acceptedAnswers: ["Un caffè, per favore"] },
  { id: "it-t-005", groupId: "it-medium-travel", prompt: "Wo ist der Bahnhof?", acceptedAnswers: ["Dov’è la stazione?", "Dov'è la stazione?", "Dove si trova la stazione?"] },
  { id: "it-t-006", groupId: "it-medium-travel", prompt: "Ich kaufe eine Fahrkarte.", acceptedAnswers: ["Compro un biglietto", "Io compro un biglietto"] },
  { id: "it-t-007", groupId: "it-medium-routine", prompt: "Ich stehe um sieben auf.", acceptedAnswers: ["Mi alzo alle sette", "Io mi alzo alle sette"] },
  { id: "it-t-008", groupId: "it-medium-routine", prompt: "Nach der Arbeit ruhe ich mich aus.", acceptedAnswers: ["Dopo il lavoro mi riposo", "Mi riposo dopo il lavoro"] },
  { id: "it-t-009", groupId: "it-hard-opinions", prompt: "Ich glaube nicht, dass es einfach ist.", acceptedAnswers: ["Non credo che sia facile", "Non penso che sia facile"] },
  { id: "it-t-010", groupId: "it-hard-opinions", prompt: "Es ist wichtig, dass wir zuhören.", acceptedAnswers: ["È importante che ascoltiamo"] },
  { id: "it-t-011", groupId: "it-hard-hypotheticals", prompt: "Wenn ich Zeit hätte, würde ich mehr reisen.", acceptedAnswers: ["Se avessi tempo, viaggerei di più"] },
  { id: "it-t-012", groupId: "it-hard-hypotheticals", prompt: "Ich hoffe, dass es morgen nicht regnet.", acceptedAnswers: ["Spero che domani non piova", "Spero che non piova domani"] },
].map((item) => ({ ...item, sourceLanguage: "de", targetLanguage: "it" }));
