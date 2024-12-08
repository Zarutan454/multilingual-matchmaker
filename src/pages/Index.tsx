import { useState } from "react";
import { AgeVerification } from "../components/AgeVerification";
import { Navbar } from "../components/Navbar";
import { useLanguage } from "../contexts/LanguageContext";

const Index = () => {
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const { t } = useLanguage();

  if (!isAgeVerified) {
    return <AgeVerification onVerified={() => setIsAgeVerified(true)} />;
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">
          {t("welcome")}
        </h1>
        {/* Weitere Inhalte werden in den nächsten Iterationen hinzugefügt */}
      </main>
    </div>
  );
};

export default Index;