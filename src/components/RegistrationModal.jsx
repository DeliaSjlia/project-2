import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function RegistrationModal({ onClose }) {
  async function handleRegistration(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registrierung erfolgreich!");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="registration-modal"
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" onClick={onClose}>
          ×
        </button>

        <form onSubmit={handleRegistration}>
          <h2>Registrieren</h2>
          <input name="email" type="email" placeholder="E-Mail" required />
          <input
            name="password"
            type="password"
            placeholder="Passwort"
            required
          />
          <button type="submit">Registrieren</button>
        </form>
      </div>
    </div>
  );
}