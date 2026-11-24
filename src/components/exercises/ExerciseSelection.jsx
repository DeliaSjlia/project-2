import { useState } from "react";
import { learningDifficulties } from "../../data/learningDifficulties";
import { getAvailableGroups, getSelectedGroupItems } from "../../utils/learningGroups";
import { getLanguage } from "../../data/languages";
import { defaultHiraganaHelp } from "../../utils/japaneseReading";
import JapaneseReadingSettings from "./JapaneseReadingSettings";

export default function ExerciseSelection({ title, items, groups, targetLanguage = "es", onClose, children }) {
  const [difficulty, setDifficulty] = useState(null);
  const [selectedGroupIds, setSelectedGroupIds] = useState([]);
  const [session, setSession] = useState(null);
  const [showHiragana, setShowHiragana] = useState(false);
  const language = getLanguage(targetLanguage);
  const availableGroups = getAvailableGroups(items, groups, targetLanguage);
  const difficultyGroups = availableGroups.filter((group) => group.difficulty === difficulty);
  const difficultyLabel = learningDifficulties.find((entry) => entry.id === difficulty)?.label;
  const selectedItems = getSelectedGroupItems(items, groups, difficulty, selectedGroupIds, targetLanguage);

  function chooseDifficulty(id) {
    setDifficulty(id);
    setSelectedGroupIds([]);
    setShowHiragana(targetLanguage === "ja" && defaultHiraganaHelp(id));
  }

  function toggleGroup(id) {
    setSelectedGroupIds((previous) => previous.includes(id)
      ? previous.filter((groupId) => groupId !== id)
      : [...previous, id]);
  }

  function backToDifficulties() {
    setDifficulty(null);
    setSelectedGroupIds([]);
  }

  if (session !== null) {
    return children(session.items, () => setSession(null), session.settings);
  }

  return (
    <section aria-label={`${title} auswählen`}>
      <button type="button" onClick={difficulty === null ? onClose : backToDifficulties}>
        ← Zurück
      </button>
      <h2>{title} · {language.label}</h2>
      {difficulty === null ? (
        <>
          <h3>Wähle eine Schwierigkeit</h3>
          {learningDifficulties.map((entry) => {
            const count = availableGroups.filter((group) => group.difficulty === entry.id).length;
            return (
              <div key={entry.id}>
                <button type="button" disabled={count === 0} onClick={() => chooseDifficulty(entry.id)}>
                  {entry.label} ({count} Gruppen)
                </button>
              </div>
            );
          })}
          {availableGroups.length === 0 && <p>Es sind noch keine Lerngruppen mit Übungen vorhanden.</p>}
        </>
      ) : (
        <>
          <h3>{difficultyLabel}: Wähle deine Themengruppen</h3>
          <p>Du übst alle Inhalte der ausgewählten Gruppen.</p>
          {targetLanguage === "ja" && (
            <JapaneseReadingSettings checked={showHiragana} onChange={setShowHiragana} />
          )}
          <button type="button" onClick={() => setSelectedGroupIds(difficultyGroups.map((group) => group.id))}>
            Alle Gruppen auswählen
          </button>
          <button type="button" onClick={() => setSelectedGroupIds([])}>Auswahl aufheben</button>
          <fieldset>
            <legend>Themengruppen</legend>
            {difficultyGroups.map((group) => (
              <div key={group.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedGroupIds.includes(group.id)}
                    onChange={() => toggleGroup(group.id)}
                  />
                  {group.title} ({group.itemCount} Übungen)
                </label>
              </div>
            ))}
          </fieldset>
          <p>{selectedItems.length} Übungen ausgewählt</p>
          <button
            type="button"
            disabled={selectedItems.length === 0}
            onClick={() => setSession({ items: selectedItems, settings: { showHiragana } })}
          >
            Übung starten
          </button>
        </>
      )}
    </section>
  );
}
