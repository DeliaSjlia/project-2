import { useState } from "react";
import { auth } from "../firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [name, setName] = useState("");
  const [mode, setMode] = useState("signin"); // "signin" or "signup"
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setInfo("");

    if (mode === "signup") {
      // Signup mode: validate extra fields
      if (!name.trim()) {
        setError("Bitte gib einen Namen ein.");
        return;
      }
      if (password !== passwordRepeat) {
        setError("Die Passwörter stimmen nicht überein.");
        return;
      }

      setLoading(true);
      try {
        const userCred = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        await updateProfile(userCred.user, { displayName: name.trim() });
        console.log("User created:", userCred.user);
      } catch (err) {
        console.error(err);
        setError(err.message || "Fehler bei der Registrierung.");
      } finally {
        setLoading(false);
      }
      return;
    }

    // mode === "signin"
    setLoading(true);
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log("Signed in:", userCred.user);
    } catch (err) {
       console.error(err);

      setError(
        "Anmeldung fehlgeschlagen. Bitte überprüfe deine E-Mail und dein Passwort.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{mode === "signin" ? "Anmelden" : "Konto erstellen"}</h2>

      <label>
        E-Mail
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label>
        Passwort
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      {mode === "signup" && (
        <>
          <label>
            Passwort wiederholen
            <input
              type="password"
              required
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
            />
          </label>

          <label>
            Wie sollen wir dich nennen?
            <input
              type="text"
              placeholder="Dein Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </>
      )}

      {info && <p style={{ color: "blue" }}>{info}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading
          ? "Bitte warten..."
          : mode === "signin"
            ? "Anmelden"
            : "Konto erstellen"}
      </button>

      <button
        type="button"
        className="btn-text"
        onClick={() => {
          setMode(mode === "signin" ? "signup" : "signin");
          setError("");
          setInfo("");
        }}
      >
        {mode === "signin"
          ? "Noch kein Konto? Konto erstellen"
          : "Bereits registriert? Anmelden"}
      </button>
    </form>
  );
}
