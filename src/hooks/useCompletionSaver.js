import { useCallback, useRef, useState } from "react";
import { saveExerciseCompletion } from "../services/exerciseCompletionService.js";
import { getCompletionData } from "../utils/exerciseCompletion.js";

function saveErrorMessage(error) {
  if (error.code === "permission-denied") {
    return "Keine Speicherberechtigung. Bitte veröffentlicht die aktualisierten Firestore-Regeln.";
  }
  if (error.code === "unavailable") {
    return "Firestore ist nicht erreichbar. Bitte versuche es mit Internetverbindung erneut.";
  }
  return error.message || "Der Übungsabschluss konnte nicht gespeichert werden.";
}

export default function useCompletionSaver(userId) {
  const [attempts, setAttempts] = useState([]);
  const inFlight = useRef(new Set());

  const persist = useCallback(async (ownerId, summary) => {
    const key = `${ownerId}:${summary.completionId}`;
    if (inFlight.current.has(key)) return;
    inFlight.current.add(key);
    const update = (status, message = "") => setAttempts((previous) => [
      ...previous.filter((entry) => entry.key !== key),
      { key, userId: ownerId, summary, status, message },
    ]);
    update("saving");
    try {
      await saveExerciseCompletion(ownerId, summary);
      update("saved");
    } catch (error) {
      update("error", saveErrorMessage(error));
    } finally {
      inFlight.current.delete(key);
    }
  }, []);

  const onRoundComplete = useCallback((summary) => {
    // Guest practice is allowed, but is not silently assigned to a later login.
    if (!userId) return;
    const data = { ...getCompletionData(summary), completionId: summary.completionId };
    void persist(userId, data);
  }, [userId, persist]);

  return {
    attempts: attempts.filter((entry) => entry.userId === userId),
    onRoundComplete,
    retry: (entry) => {
      if (entry.userId === userId) void persist(userId, entry.summary);
    },
  };
}
