export default function JapaneseReadingSettings({ checked, onChange }) {
  return (
    <p>
      <label>
        <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
        Lesung in Hiragana anzeigen
      </label>
    </p>
  );
}
