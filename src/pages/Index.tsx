import { useState } from "react";
import { AgeVerification } from "../components/AgeVerification";
import { GenderSelection } from "../components/GenderSelection";
import { LocationDistance } from "../components/location/LocationDistance";
import { useLanguage } from "../contexts/LanguageContext";

const Index = () => {
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const { t } = useLanguage();

  // Beispiel-Koordinaten (später durch echte Daten ersetzen)
  const exampleLocation = {
    lat: 52.520008,
    lng: 13.404954
  };

  if (!isAgeVerified) {
    return <AgeVerification onVerified={() => setIsAgeVerified(true)} />;
  }

  return (
    <div>
      <GenderSelection />
      <LocationDistance 
        targetLat={exampleLocation.lat} 
        targetLng={exampleLocation.lng} 
      />
    </div>
  );
};

export default Index;