export const mockJapaneseFindMissingWordExercise = [
  {
    id: "ja-m-001", groupId: "ja-beginner-greetings", before: "おはよう", after: "。", hint: "Guten Morgen (höflich).",
    acceptedAnswers: ["ございます"], acceptedRomaji: ["gozaimasu"],
  },
  {
    id: "ja-m-002", groupId: "ja-beginner-greetings", before: "私は", after: "です。", hint: "Ich bin Student / Studentin.",
    acceptedAnswers: ["学生", "がくせい"], acceptedRomaji: ["gakusei"],
    hiraganaBefore: "わたしは", hiraganaAfter: "です。", hiragana: "わたしはがくせいです。",
  },
  {
    id: "ja-m-003", groupId: "ja-beginner-food", before: "", after: "をください。", hint: "Wasser, bitte.",
    acceptedAnswers: ["水", "みず"], acceptedRomaji: ["mizu"],
    hiraganaBefore: "", hiraganaAfter: "をください。", hiragana: "みずをください。",
  },
  {
    id: "ja-m-004", groupId: "ja-beginner-food", before: "", after: "をください。", hint: "Kaffee, bitte.",
    acceptedAnswers: ["コーヒー"], acceptedRomaji: ["koohii", "kōhī"],
  },
  {
    id: "ja-m-005", groupId: "ja-medium-travel", before: "駅は", after: "ですか。", hint: "Wo ist der Bahnhof?",
    acceptedAnswers: ["どこ"], acceptedRomaji: ["doko"],
    hiraganaBefore: "えきは", hiraganaAfter: "ですか。", hiragana: "えきはどこですか。",
  },
  {
    id: "ja-m-006", groupId: "ja-medium-travel", before: "切符を", after: "。", hint: "Ich kaufe eine Fahrkarte.",
    acceptedAnswers: ["買います", "かいます"], acceptedRomaji: ["kaimasu"],
    hiraganaBefore: "きっぷを", hiraganaAfter: "。", hiragana: "きっぷをかいます。",
  },
  {
    id: "ja-m-007", groupId: "ja-medium-routine", before: "七時に", after: "。", hint: "Ich stehe um sieben auf.",
    acceptedAnswers: ["起きます", "おきます"], acceptedRomaji: ["okimasu"],
    hiraganaBefore: "しちじに", hiraganaAfter: "。", hiragana: "しちじにおきます。",
  },
  {
    id: "ja-m-008", groupId: "ja-medium-routine", before: "仕事の後で", after: "。", hint: "Nach der Arbeit ruhe ich mich aus.",
    acceptedAnswers: ["休みます", "やすみます"], acceptedRomaji: ["yasumimasu"],
    hiraganaBefore: "しごとのあとで", hiraganaAfter: "。", hiragana: "しごとのあとでやすみます。",
  },
  {
    id: "ja-m-009", groupId: "ja-hard-opinions", before: "", after: "だと思います。", hint: "Ich denke, dass es wichtig ist.",
    acceptedAnswers: ["大切", "たいせつ"], acceptedRomaji: ["taisetsu"],
    hiraganaBefore: "", hiraganaAfter: "だとおもいます。", hiragana: "たいせつだとおもいます。",
  },
  {
    id: "ja-m-010", groupId: "ja-hard-opinions", before: "意見が", after: "。", hint: "Ich habe eine andere Meinung.",
    acceptedAnswers: ["違います", "ちがいます"], acceptedRomaji: ["chigaimasu"],
    hiraganaBefore: "いけんが", hiraganaAfter: "。", hiragana: "いけんがちがいます。",
  },
  {
    id: "ja-m-011", groupId: "ja-hard-hypotheticals", before: "時間があれば、", after: "したいです。", hint: "Wenn ich Zeit habe, möchte ich reisen.",
    acceptedAnswers: ["旅行", "りょこう"], acceptedRomaji: ["ryokou", "ryokō"],
    hiraganaBefore: "じかんがあれば、", hiraganaAfter: "したいです。", hiragana: "じかんがあれば、りょこうしたいです。",
  },
  {
    id: "ja-m-012", groupId: "ja-hard-hypotheticals", before: "明日は", after: "といいです。", hint: "Es wäre schön, wenn es morgen sonnig wäre.",
    acceptedAnswers: ["晴れる", "はれる"], acceptedRomaji: ["hareru"],
    hiraganaBefore: "あしたは", hiraganaAfter: "といいです。", hiragana: "あしたははれるといいです。",
  },
].map((item) => ({ ...item, sourceLanguage: "de", targetLanguage: "ja" }));
