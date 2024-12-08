import { useState } from "react";
import { AgeVerification } from "../components/AgeVerification";
import { GenderSelection } from "../components/GenderSelection";
import { useLanguage } from "../contexts/LanguageContext";

const Index = () => {
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const { t } = useLanguage();

  if (!isAgeVerified) {
    return <AgeVerification onVerified={() => setIsAgeVerified(true)} />;
  }

  return <GenderSelection />;
};

export default Index;