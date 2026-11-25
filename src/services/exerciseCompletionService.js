import { collection, doc, onSnapshot, runTransaction, serverTimestamp, Timestamp } from "firebase/firestore";
import { auth, db } from "../firebase.js";
import { getCompletionData } from "../utils/exerciseCompletion.js";

export async function saveExerciseCompletion(userId, summary) {
  if (!userId || auth.currentUser?.uid !== userId) {
    throw new Error("Bitte melde dich zum Speichern mit demselben Konto an.");
  }
  const data = getCompletionData(summary);
  const reference = doc(db, "users", userId, "exerciseCompletions", summary.completionId);

  await runTransaction(db, async (transaction) => {
    const existing = await transaction.get(reference);
    if (existing.exists()) return;
    transaction.set(reference, {
      ...data,
      completedAt: Timestamp.fromDate(new Date(data.completedAt)),
      savedAt: serverTimestamp(),
    });
  });
}

export function subscribeToExerciseCompletions(userId, onChange, onError) {
  const reference = collection(db, "users", userId, "exerciseCompletions");
  return onSnapshot(reference, { includeMetadataChanges: true }, (snapshot) => {
    const completions = snapshot.docs
      .filter((entry) => !entry.metadata.hasPendingWrites)
      .map((entry) => ({ id: entry.id, ...entry.data() }))
      .filter((entry) => typeof entry.completedAt?.toDate === "function")
      .map((entry) => ({ ...entry, completedAt: entry.completedAt.toDate() }));
    onChange({ completions, fromCache: snapshot.metadata.fromCache });
  }, onError);
}
