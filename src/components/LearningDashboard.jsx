import useLearningDashboard from "../hooks/useLearningDashboard";

export default function LearningDashboard({ userId, authLoading }) {
  const dashboard = useLearningDashboard(userId);
  return (
    <section aria-label="Lernfortschritt">
      <h2>Dein Lernfortschritt</h2>
      {authLoading || dashboard.isLoading ? (
        <p role="status">Lernfortschritt wird geladen …</p>
      ) : !userId ? (
        <p>Melde dich vor dem Üben an, damit abgeschlossene Übungen und deine Streak gespeichert werden.</p>
      ) : dashboard.error ? (
        <p role="alert">Der Lernfortschritt konnte nicht geladen werden. Bitte prüft die Firestore-Regeln und die Verbindung und ladet die Seite erneut.</p>
      ) : (
        <>
          <dl>
            <div><dt>Abgeschlossene Übungen</dt><dd>{dashboard.completedExercises}</dd></div>
            <div><dt>Streak</dt><dd>{dashboard.streak} {dashboard.streak === 1 ? "Tag" : "Tage"}</dd></div>
          </dl>
          <p>Eine abgeschlossene Übung pro Tag genügt. Tagesgrenze: Schweizer Zeit.</p>
          {dashboard.fromCache && <p role="status">Zwischengespeicherte Daten. Die Bestätigung vom Server steht noch aus.</p>}
        </>
      )}
    </section>
  );
}
