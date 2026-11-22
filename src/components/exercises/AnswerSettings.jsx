export default function AnswerSettings({ ignoreAccents, onChange, disabled }) {
  return (
    <p>
      <label>
        <input
          type="checkbox"
          checked={ignoreAccents}
          onChange={(event) => onChange(event.target.checked)}
          disabled={disabled}
        />
        Akzente ignorieren (z. B. dias statt días; ñ bleibt erforderlich)
      </label>
    </p>
  );
}
