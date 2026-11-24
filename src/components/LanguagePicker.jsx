import { useId } from "react";
import { languages } from "../data/languages";
import styles from "./LanguagePicker.module.css";

export default function LanguagePicker({ value, onChange }) {
  const id = useId();

  return (
    <fieldset className={styles.picker}>
      <legend>Lernsprache auswählen</legend>
      <div className={styles.grid}>
        {languages.map((language) => (
          <label key={language.code} className={styles.tile} data-selected={value === language.code}>
            <input
              className={styles.radio}
              type="radio"
              name={id}
              value={language.code}
              checked={value === language.code}
              onChange={() => onChange(language.code)}
            />
            <span className={styles.content}>
              <span className={styles.flag} aria-hidden="true">{language.flag}</span>
              <span>{language.label}</span>
            </span>
            <span className={styles.status} aria-hidden="true">
              {value === language.code ? "Ausgewählt" : "Auswählen"}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
