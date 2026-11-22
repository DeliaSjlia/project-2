import { useState } from "react";
import { register, signIn } from "../services/authService.js";

export function getAuthErrorMessage(error) {
  switch (error.code) {
    case "auth/invalid-credential":
      return "E-Mail-Adresse oder Passwort ist falsch.";
    case "auth/invalid-email":
      return "Bitte gib eine gültige E-Mail-Adresse ein.";
    case "auth/user-disabled":
      return "Dieses Konto wurde deaktiviert.";
    case "auth/too-many-requests":
      return "Zu viele Versuche. Bitte versuche es später erneut.";
    case "auth/network-request-failed":
      return "Netzwerkfehler. Bitte versuche es erneut.";
    default:
      return "Authentifizierung fehlgeschlagen.";
  }
}

export function useLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [name, setName] = useState("");
  const [mode, setMode] = useState("signin");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setError("");

    if (mode === "signup") {
      if (!name.trim()) {
        setError("Bitte gib einen Namen ein.");
        return false;
      }

      if (password !== passwordRepeat) {
        setError("Die Passwörter stimmen nicht überein.");
        return false;
      }
    }

    setLoading(true);

    try {
      if (mode === "signup") {
        await register(email, password, name);
      } else {
        await signIn(email, password);
      }

      return true;
    } catch (authError) {
      setError(getAuthErrorMessage(authError));
      return false;
    } finally {
      setLoading(false);
    }
  }

  function toggleMode() {
    setMode((current) => (current === "signin" ? "signup" : "signin"));
    setError("");
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    passwordRepeat,
    setPasswordRepeat,
    name,
    setName,
    mode,
    error,
    loading,
    submit,
    toggleMode,
  };
}
