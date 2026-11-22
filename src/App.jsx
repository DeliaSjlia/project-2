import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginDialog from "./components/LoginDialog.jsx";

import VocabularyExercise from "./components/VocabularyExercise";
import TranslationExercise from "./components/TranslationExercise";
import FindMissingWordExercise from "./components/FindMissingWordExercise";

import { mockVocabulary } from "./data/mockVocabulary";
import { mockTranslations } from "./data/mockTranslations";
import { mockFindMissingWordExercise } from "./data/mockFindMissingWordExercise";

export default function App() {
  const [activeExercise, setActiveExercise] = useState(null);

  function closeExercise() {
    setActiveExercise(null);
  }

  return (
    <>
      <Header />

      <main>
        {activeExercise === "vocabulary" ? (
          <VocabularyExercise words={mockVocabulary} onClose={closeExercise} />
        ) : activeExercise === "translation" ? (
          <TranslationExercise
            exercises={mockTranslations}
            onClose={closeExercise}
          />
        ) : activeExercise === "missingWord" ? (
          <FindMissingWordExercise
            exercises={mockFindMissingWordExercise}
            onClose={closeExercise}
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

              <div className="cards">
                <article>
                  <h3>🇪🇸 Spanisch</h3>
                  <p>Lerne die Grundlagen für deine nächste Reise.</p>
                </article>

                <article>
                  <h3>🇮🇹 Italienisch</h3>
                  <p>Von deinem ersten Ciao bis zum Gespräch im Café.</p>
                </article>

                <article>
                  <h3>🇯🇵 Japanisch</h3>
                  <p>Entdecke neue Wörter, Schriftzeichen und Kultur.</p>
                </article>
              </div>
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
