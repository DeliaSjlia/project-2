export default function DashboardSection({ onRegister}) {

    return (
        <>
        <h1>Sprich wie ein Einheimischer.</h1>
        <p>Spanisch, Italienisch oder Japanisch — lerne eine neue Sprache.</p>

        <button type="button" onClick={onRegister} >Jetzt loslegen →</button>
        <button type="button">Anmelden</button>
        </>
    );
  }