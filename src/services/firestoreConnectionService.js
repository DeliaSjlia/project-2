import { doc, getDocFromServer, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase.js";

const testMessage = "VocaBee Firestore connection test";

export async function saveAndReadConnectionTest(userId) {
  if (!userId || auth.currentUser?.uid !== userId) {
    throw new Error("Bitte melde dich zuerst an.");
  }

  // Reuse one document per user. This never creates an exercise completion.
  const reference = doc(db, "users", userId, "connectionTests", "firestore-check");
  await setDoc(reference, {
    message: testMessage,
    writtenAt: serverTimestamp(),
  });

  // setDoc has now been acknowledged. A read error must not be reported as a failed write.
  try {
    const snapshot = await getDocFromServer(reference);
    const data = snapshot.data();
    if (!snapshot.exists() || data.message !== testMessage || !data.writtenAt) {
      return { path: reference.path, verified: false, errorCode: "readback-mismatch" };
    }
    return {
      path: reference.path,
      verified: true,
      writtenAt: data.writtenAt.toDate().toISOString(),
    };
  } catch (error) {
    return { path: reference.path, verified: false, errorCode: error.code ?? "unknown" };
  }
}
