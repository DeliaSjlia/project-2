import { useLoginForm } from "../hooks/useLoginForm.js";
import { registrationDialogId } from "../vars.js";

export default function LoginForm() {
  const {
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
  } = useLoginForm();

  async function handleSubmit(event) {
    const successful = await submit(event);

    if (!successful) return;

    const dialog = document.getElementById(registrationDialogId);

    if (dialog?.open) {
      dialog.close();
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

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading
          ? "Bitte warten..."
          : mode === "signin"
            ? "Anmelden"
            : "Konto erstellen"}
      </button>

      <button type="button" className="btn-text" onClick={toggleMode}>
        {mode === "signin"
          ? "Noch kein Konto? Konto erstellen"
          : "Bereits registriert? Anmelden"}
      </button>
    </form>
  );
}
