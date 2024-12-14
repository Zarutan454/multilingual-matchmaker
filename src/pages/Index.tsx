import { useState } from "react";
import { AgeVerification } from "../components/AgeVerification";
import { SubscriptionPlans } from "@/components/subscription/SubscriptionPlans";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProfiles } from "@/components/home/FeaturedProfiles";
import { InfoSection } from "@/components/home/InfoSection";
import { Footer } from "@/components/home/Footer";
import { ReferralBanner } from "@/components/referral/ReferralBanner";

const Index = () => {
  const [isAgeVerified, setIsAgeVerified] = useState(false);

  if (!isAgeVerified) {
    return <AgeVerification onVerified={() => setIsAgeVerified(true)} />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <ReferralBanner />
      <HeroSection />
      <FeaturedProfiles />
      <SubscriptionPlans />
      <InfoSection />
      <Footer />
    </div>
  );
};

export default Index;