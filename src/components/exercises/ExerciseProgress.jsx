export default function ExerciseProgress({ currentIndex, answeredCount, total }) {
  return (
    <>
      <p>Aufgabe {currentIndex + 1} von {total}</p>
      <progress aria-label="Beantwortete Aufgaben" value={answeredCount} max={total}>
        {answeredCount} von {total} beantwortet
      </progress>
    </>
  );
}
