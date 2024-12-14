import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { AgeVerification } from "../components/AgeVerification";
import { SubscriptionPlans } from "@/components/subscription/SubscriptionPlans";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProfiles } from "@/components/home/FeaturedProfiles";
import { InfoSection } from "@/components/home/InfoSection";
import { Footer } from "@/components/home/Footer";
import { ReferralBanner } from "@/components/referral/ReferralBanner";

const Index = () => {
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const { user } = useAuth();

  // Prüfen ob der Benutzer ein Dienstleister ist
  const isProvider = user?.user_metadata?.role === 'provider';

  if (!isAgeVerified) {
    return <AgeVerification onVerified={() => setIsAgeVerified(true)} />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <ReferralBanner />
      <HeroSection />
      <FeaturedProfiles />
      {isProvider && <SubscriptionPlans />}
      <InfoSection />
      <Footer />
    </div>
  );
};

export default Index;