export default function AnswerSettings({ ignoreAccents, onChange, disabled, targetLanguage = "es" }) {
  return (
    <p>
      <label>
        <input
          type="checkbox"
          checked={ignoreAccents}
          onChange={(event) => onChange(event.target.checked)}
          disabled={disabled}
        />
        {targetLanguage === "it"
          ? "Akzente ignorieren (z. B. caffe statt caffè)"
          : "Akzente ignorieren (z. B. dias statt días; ñ bleibt erforderlich)"}
      </label>
    </p>
  );
}
