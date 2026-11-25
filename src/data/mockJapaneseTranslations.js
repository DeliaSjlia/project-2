export const mockJapaneseTranslations = [
  {
    id: "ja-t-001", groupId: "ja-beginner-greetings", prompt: "Guten Morgen (höflich).",
    acceptedAnswers: ["おはようございます"], acceptedRomaji: ["ohayou gozaimasu", "ohayō gozaimasu"],
  },
  {
    id: "ja-t-002", groupId: "ja-beginner-greetings", prompt: "Guten Tag.",
    acceptedAnswers: ["こんにちは"], acceptedRomaji: ["konnichiwa", "konnichiha"],
  },
  {
    id: "ja-t-003", groupId: "ja-beginner-food", prompt: "Wasser, bitte.",
    acceptedAnswers: ["水をください", "みずをください"], acceptedRomaji: ["mizu o kudasai", "mizu wo kudasai"],
    hiragana: "みずをください。",
  },
  {
    id: "ja-t-004", groupId: "ja-beginner-food", prompt: "Kaffee, bitte.",
    acceptedAnswers: ["コーヒーをください"], acceptedRomaji: ["koohii o kudasai", "kōhī o kudasai", "koohii wo kudasai", "kōhī wo kudasai"],
  },
  {
    id: "ja-t-005", groupId: "ja-medium-travel", prompt: "Wo ist der Bahnhof?",
    acceptedAnswers: ["駅はどこですか", "えきはどこですか"], acceptedRomaji: ["eki wa doko desu ka", "eki ha doko desu ka"],
    hiragana: "えきはどこですか。",
  },
  {
    id: "ja-t-006", groupId: "ja-medium-travel", prompt: "Ich kaufe eine Fahrkarte.",
    acceptedAnswers: ["切符を買います", "きっぷをかいます"], acceptedRomaji: ["kippu o kaimasu", "kippu wo kaimasu"],
    hiragana: "きっぷをかいます。",
  },
  {
    id: "ja-t-007", groupId: "ja-medium-routine", prompt: "Ich stehe um sieben auf.",
    acceptedAnswers: ["七時に起きます", "7時に起きます", "しちじにおきます"], acceptedRomaji: ["shichiji ni okimasu"],
    hiragana: "しちじにおきます。",
  },
  {
    id: "ja-t-008", groupId: "ja-medium-routine", prompt: "Nach der Arbeit ruhe ich mich aus.",
    acceptedAnswers: ["仕事の後で休みます", "しごとのあとでやすみます"], acceptedRomaji: ["shigoto no ato de yasumimasu"],
    hiragana: "しごとのあとでやすみます。",
  },
  {
    id: "ja-t-009", groupId: "ja-hard-opinions", prompt: "Ich denke, dass es wichtig ist.",
    acceptedAnswers: ["大切だと思います", "たいせつだとおもいます"], acceptedRomaji: ["taisetsu da to omoimasu"],
    hiragana: "たいせつだとおもいます。",
  },
  {
    id: "ja-t-010", groupId: "ja-hard-opinions", prompt: "Ich habe eine andere Meinung.",
    acceptedAnswers: ["意見が違います", "いけんがちがいます"], acceptedRomaji: ["iken ga chigaimasu"],
    hiragana: "いけんがちがいます。",
  },
  {
    id: "ja-t-011", groupId: "ja-hard-hypotheticals", prompt: "Wenn ich Zeit habe, möchte ich reisen.",
    acceptedAnswers: ["時間があれば、旅行したいです", "じかんがあれば、りょこうしたいです"], acceptedRomaji: ["jikan ga areba ryokou shitai desu", "jikan ga areba ryokō shitai desu"],
    hiragana: "じかんがあれば、りょこうしたいです。",
  },
  {
    id: "ja-t-012", groupId: "ja-hard-hypotheticals", prompt: "Es wäre schön, wenn es morgen sonnig wäre.",
    acceptedAnswers: ["明日は晴れるといいです", "あしたははれるといいです"], acceptedRomaji: ["ashita wa hareru to ii desu", "ashita ha hareru to ii desu"],
    hiragana: "あしたははれるといいです。",
  },
].map((item) => ({ ...item, sourceLanguage: "de", targetLanguage: "ja" }));
