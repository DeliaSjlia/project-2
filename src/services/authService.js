import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase.js";
import { toAuthUser } from "../models/authUser.js";

export function subscribeToAuth(onUserChanged) {
  return onAuthStateChanged(auth, (firebaseUser) => {
    onUserChanged(toAuthUser(firebaseUser));
  });
}

export async function signIn(email, password) {
  const credentials = await signInWithEmailAndPassword(auth, email, password);
  return toAuthUser(credentials.user);
}

export async function register(email, password, displayName) {
  const credentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  await updateProfile(credentials.user, {
    displayName: displayName.trim(),
  });

  return toAuthUser(credentials.user);
}

export function logOut() {
  return signOut(auth);
}
