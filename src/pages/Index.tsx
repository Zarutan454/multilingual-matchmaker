import { useState, useEffect } from "react";
import { HeroSection } from "../components/home/HeroSection";
import { FeaturedProfiles } from "../components/home/FeaturedProfiles";
import { InfoSection } from "../components/home/InfoSection";
import { ServiceCategories } from "../components/services/ServiceCategories";
import { Footer } from "../components/home/Footer";
import { AgeVerification } from "../components/AgeVerification";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { Navbar } from "../components/Navbar";

export default function Index() {
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  const handleScroll = () => {
    if (window.scrollY > 400) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }

    setIsAtTop(window.scrollY < 100);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isAgeVerified) {
    return <AgeVerification onVerified={() => setIsAgeVerified(true)} />;
  }

  return (
    <div className="min-h-screen bg-black">
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isAtTop ? 'bg-transparent' : 'bg-black/80 backdrop-blur-sm'}`}>
        <Navbar />
      </div>
      <HeroSection />
      
      <div id="featured" className="py-20">
        <FeaturedProfiles />
      </div>
      
      <div className="py-20 bg-black/40">
        <InfoSection />
      </div>
      
      <ServiceCategories />
      
      <Footer />

      {showScrollTop && (
        <Button
          variant="secondary"
          size="icon"
          className="fixed bottom-8 right-8 rounded-full shadow-lg"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}