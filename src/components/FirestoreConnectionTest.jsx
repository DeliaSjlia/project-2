import { useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import { saveAndReadConnectionTest } from "../services/firestoreConnectionService.js";

function errorMessage(error) {
  if (error.code === "permission-denied") {
    return "Zugriff verweigert. Bitte prüfe, ob die Firestore-Regeln für den Verbindungstest veröffentlicht sind.";
  }
  if (error.code === "unavailable") {
    return "Firestore ist gerade nicht erreichbar. Bitte prüfe die Internetverbindung und versuche es erneut.";
  }
  return error.message || "Der Verbindungstest konnte nicht abgeschlossen werden.";
}

export default function FirestoreConnectionTest() {
  const { user, isLoading } = useAuth();
  const [status, setStatus] = useState(null);
  const pending = useRef(false);
  const visibleStatus = status?.userId === user?.uid ? status : null;
  const saving = status?.phase === "saving";

  async function handleSave() {
    if (!user || pending.current) return;
    pending.current = true;
    const userId = user.uid;
    setStatus({ userId, phase: "saving" });

    try {
      const result = await saveAndReadConnectionTest(userId);
      setStatus({ userId, phase: result.verified ? "success" : "read-error", ...result });
    } catch (error) {
      setStatus({ userId, phase: "error", message: errorMessage(error) });
    } finally {
      pending.current = false;
    }
  }

  return (
    <section aria-label="Firestore-Verbindungstest">
      <h2>Firestore-Verbindung testen</h2>
      <p>Der Button speichert ein Testdokument und liest es vom Server zurück.</p>
      {isLoading ? <p>Anmeldung wird geprüft …</p> : !user && <p>Bitte melde dich zuerst an.</p>}
      <button type="button" disabled={isLoading || !user || saving} onClick={handleSave}>
        {saving ? "Warte auf Firestore …" : "Testdokument speichern"}
      </button>
      <div role="status">
        {visibleStatus?.phase === "success" && (
          <>
            <p>Erfolgreich in Firestore gespeichert und vom Server zurückgelesen.</p>
            <p>Serverzeit: {visibleStatus.writtenAt}</p>
          </>
        )}
        {visibleStatus?.phase === "read-error" && (
          <p>Das Dokument wurde gespeichert, aber das Zurücklesen konnte nicht bestätigt werden ({visibleStatus.errorCode}).</p>
        )}
        {visibleStatus?.path && <p>Dokument: <code>{visibleStatus.path}</code></p>}
      </div>
      {visibleStatus?.phase === "error" && <p role="alert">{visibleStatus.message}</p>}
    </section>
  );
}
