import { HeroSection } from "../components/home/HeroSection";
import { FeaturedProfiles } from "../components/home/FeaturedProfiles";
import { InfoSection } from "../components/home/InfoSection";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/home/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-black">
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              backgroundColor: '#9b87f5',
              opacity: Math.random() * 0.5 + 0.2,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 5}s`,
            }}
          />
        ))}
      </div>
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <FeaturedProfiles />
        <InfoSection />
        <Footer />
      </div>
    </div>
  );
}