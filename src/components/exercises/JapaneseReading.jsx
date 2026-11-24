import { containsKanji } from "../../utils/japaneseReading";

export default function JapaneseReading({ text, reading, visible }) {
  if (!visible || !reading || !containsKanji(text)) return null;

  return <p>Lesung: <span lang="ja">{reading}</span></p>;
}
