import { useEffect, useState } from "react";
import beeLogo from "../assets/bee.svg";

export default function Header({ onRegister }) {
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
          aria-label="Dunkelmodus"
          aria-pressed={theme === "dark"}
        >
          <span aria-hidden="true">{theme === "light" ? "🌙" : "☀️"}</span>
        </button>

        <button type="button" className="btn-text">
          Anmelden
        </button>

        <button type="button" className="btn-primary" onClick={onRegister} >
          Registrieren
        </button>
      </nav>
    </header>
  );
}