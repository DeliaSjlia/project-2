import { useId, useState } from "react";
import useExerciseRound from "../../hooks/useExerciseRound";
import { checkAnswer } from "../../utils/checkAnswer";
import ExerciseFrame from "./ExerciseFrame";
import AnswerSettings from "./AnswerSettings";

function WrittenQuestion({ item, result, ignoreAccents, recordAnswer, next, isLast, renderPrompt }) {
  const [answer, setAnswer] = useState("");
  const inputId = useId();
  const hintId = useId();
  const checked = result !== null;

  function handleCheck(event) {
    event.preventDefault();
    if (!answer.trim() || checked) return;
    const correct = checkAnswer(answer, item.acceptedAnswers, { ignoreAccents });
    recordAnswer(correct, answer.trim(), { ignoreAccents });
  }

  const input = (
    <input
      id={inputId}
      name="answer"
      type="text"
      lang="es"
      aria-describedby={item.hint ? hintId : undefined}
      value={answer}
      onChange={(event) => setAnswer(event.target.value)}
      readOnly={checked}
      autoComplete="off"
      autoCapitalize="none"
      spellCheck={false}
      required
    />
  );

  return (
    <>
      <form onSubmit={handleCheck}>
        {renderPrompt({ item, input, inputId, hintId })}
        <button type="submit" disabled={!answer.trim() || checked}>Prüfen</button>
      </form>
      <div role="status">
        {checked && (
          <>
            <p>{result.correct ? "Richtig! ✓" : "Noch nicht richtig."}</p>
            <p>Richtige Schreibweise: <span lang="es">{item.acceptedAnswers[0]}</span></p>
          </>
        )}
      </div>
      {checked && (
        <button type="button" onClick={next}>
          {isLast ? "Ergebnis anzeigen" : "Weiter"}
        </button>
      )}
    </>
  );
}

export default function WrittenExercise({ exercises, title, exerciseType, onClose, onRoundComplete, renderPrompt }) {
  const round = useExerciseRound(exercises, { exerciseType, onRoundComplete });
  const [ignoreAccents, setIgnoreAccents] = useState(true);

  return (
    <ExerciseFrame title={title} round={round} onClose={onClose}>
      {round.currentItem && (
        <>
          <AnswerSettings
            ignoreAccents={ignoreAccents}
            onChange={setIgnoreAccents}
            disabled={round.currentResult !== null}
          />
          <WrittenQuestion
            key={`${round.roundNumber}:${round.currentIndex}`}
            item={round.currentItem}
            result={round.currentResult}
            ignoreAccents={ignoreAccents}
            recordAnswer={round.recordAnswer}
            next={round.next}
            isLast={round.currentIndex === round.total - 1}
            renderPrompt={renderPrompt}
          />
        </>
      )}
    </ExerciseFrame>
  );
}
