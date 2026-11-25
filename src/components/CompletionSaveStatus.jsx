export default function CompletionSaveStatus({ attempts, onRetry }) {
  const failures = attempts.filter((entry) => entry.status === "error");
  const saving = attempts.some((entry) => entry.status === "saving");
  const saved = attempts.some((entry) => entry.status === "saved");
  if (!attempts.length) return null;

  return (
    <section aria-label="Speicherstatus">
      <div role="status">
        {saving && <p>Übungsabschluss wird gespeichert …</p>}
        {!saving && failures.length === 0 && saved && <p>Deine abgeschlossenen Übungen sind gespeichert.</p>}
      </div>
      {failures.length > 0 && (
        <>
          <p role="alert">{failures.length} {failures.length === 1 ? "Abschluss ist" : "Abschlüsse sind"} noch nicht gespeichert. Bitte vor dem Schließen der Seite erneut versuchen.</p>
          <ul>
            {failures.map((entry) => (
              <li key={entry.key}>
                {entry.message}{" "}
                <button type="button" onClick={() => onRetry(entry)}>Nochmals speichern</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
