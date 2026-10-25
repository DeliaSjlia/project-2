import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import beeLogo from "../assets/images/bee.svg";
import { auth } from "../firebase.js";
import { registrationDialogId } from "../vars";

export default function Header() {
  const [user, setUser] = useState(null);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return unsubscribe;
}, []);

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  }

  return (
    <header>
      <a href="/" className="logo" aria-label="VocaBee Startseite">
        <img src={beeLogo} alt="" width="22" height="22" />
        <span>VocaBee</span>
      </a>

      <nav aria-label="Hauptnavigation">
        <a href="#">Sprachen</a>
        <a href="#">Kurse</a>
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Modus wechseln"
          aria-pressed={theme === "dark"}
        >
          <span aria-hidden="true">{theme === "light" ? "🌙" : "☀️"}</span>
        </button>

        {user ? (
  <>
    <span className="user-info">
      <span aria-hidden="true">👤 </span>
      <span>{user.displayName || user.email}</span>
    </span>

    <button
      type="button"
      className="btn-primary"
      onClick={() => signOut(auth)}
    >
      Abmelden
    </button>
  </>
) : (
  <button
    type="button"
    commandFor={registrationDialogId}
    command="show-modal"
    className="btn-primary"
  >
    Anmelden
  </button>
)}
      </nav>
    </header>
  );
}
