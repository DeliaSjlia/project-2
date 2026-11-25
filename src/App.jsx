import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginDialog from "./components/LoginDialog.jsx";
import LanguagePicker from "./components/LanguagePicker";
import LearningDashboard from "./components/LearningDashboard";
import CompletionSaveStatus from "./components/CompletionSaveStatus";
import { useAuth } from "./hooks/useAuth.js";
import useCompletionSaver from "./hooks/useCompletionSaver";

import VocabularyExercise from "./components/VocabularyExercise";
import TranslationExercise from "./components/TranslationExercise";
import FindMissingWordExercise from "./components/FindMissingWordExercise";

import { mockExerciseContent } from "./data/mockExerciseContent";

export default function App() {
  const [activeExercise, setActiveExercise] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("es");
  const content = mockExerciseContent[selectedLanguage];
  const { user, isLoading: authLoading } = useAuth();
  const userId = user?.uid;
  const saving = useCompletionSaver(userId);
  const exerciseKey = `${selectedLanguage}:${userId ?? "guest"}`;

  function closeExercise() {
    setActiveExercise(null);
  }

  return (
    <>
      <Header />

      <main>
        <LearningDashboard key={userId ?? "guest"} userId={userId} authLoading={authLoading} />
        <CompletionSaveStatus attempts={saving.attempts} onRetry={saving.retry} />
        {activeExercise === "vocabulary" ? (
          <VocabularyExercise
            key={exerciseKey}
            words={content.vocabulary}
            groups={content.groups}
            targetLanguage={selectedLanguage}
            onClose={closeExercise}
            onRoundComplete={saving.onRoundComplete}
          />
        ) : activeExercise === "translation" ? (
          <TranslationExercise
            key={exerciseKey}
            exercises={content.translations}
            groups={content.groups}
            targetLanguage={selectedLanguage}
            onClose={closeExercise}
            onRoundComplete={saving.onRoundComplete}
          />
        ) : activeExercise === "missingWord" ? (
          <FindMissingWordExercise
            key={exerciseKey}
            exercises={content.missingWords}
            groups={content.groups}
            targetLanguage={selectedLanguage}
            onClose={closeExercise}
            onRoundComplete={saving.onRoundComplete}
          />
        ) : (
          <>
            <section>
              <h1>Sprich wie ein Einheimischer.</h1>
              <p>
                Spanisch, Italienisch oder Japanisch — lerne aus dem Deutschen
                in nur 15 Minuten täglich.
              </p>
            </section>

            <section>
              <h2>Welche Sprache wartet auf dich?</h2>

              <LanguagePicker value={selectedLanguage} onChange={setSelectedLanguage} />
            </section>

            <section>
              <h2>Was möchtest du heute üben?</h2>

              <div className="cards">
                <article>
                  <h3>🍯 Vokabeln</h3>
                  <p>Wiederhole bekannte Wörter und lerne neue dazu.</p>

                  <button
                    type="button"
                    onClick={() => setActiveExercise("vocabulary")}
                  >
                    Vokabeln üben
                  </button>
                </article>

                <article>
                  <h3>🌸 Übersetzung</h3>
                  <p>Übersetze kurze Sätze in deine Zielsprache.</p>

                  <button
                    type="button"
                    onClick={() => setActiveExercise("translation")}
                  >
                    Übersetzung üben
                  </button>
                </article>

                <article>
                  <h3>🌻 Lückentext</h3>
                  <p>Ergänze fehlende Wörter und übe im Kontext.</p>

                  <button
                    type="button"
                    onClick={() => setActiveExercise("missingWord")}
                  >
                    Lückentext üben
                  </button>
                </article>
              </div>
            </section>

            <section>
              <h2>Mit kleinen Schritten zum Ziel</h2>
              <p>
                Eine kurze Lektion am Morgen, ein paar neue Wörter in der
                Mittagspause: Du bestimmst, wann und wie du lernst.
              </p>
            </section>

            <section>
              <h2>Deine Reise beginnt heute.</h2>
              <p>
                Erstelle dein Konto und starte direkt mit der ersten Lektion.
              </p>
            </section>
          </>
        )}
      </main>

      <Footer />

      <LoginDialog />
    </>
  );
}
