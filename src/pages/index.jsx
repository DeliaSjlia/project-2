import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DashboardSection from "../components/DashboardSection";
import RegistrationModal from "../components/RegistrationModal";

export default function HomePage() {
  const [showRegistration, setShowRegistration] = useState(false);

  return (
    <>
      <Header
        onRegister={() => setShowRegistration(true)}
      />
      <main>
        <DashboardSection
        onRegister={() => setShowRegistration(true)}
        />
      </main>
      <Footer />

      {showRegistration && (
        <RegistrationModal onClose={() => setShowRegistration(false)} />
      )}
    </>
  );
}
