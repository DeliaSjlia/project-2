import { useState } from "react";
import {
  register,
  signIn,
  getAuthErrorMessage,
} from "../services/authService.js";

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
