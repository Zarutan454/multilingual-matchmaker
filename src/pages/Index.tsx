import { HeroSection } from "../components/home/HeroSection";
import { FeaturedProfiles } from "../components/home/FeaturedProfiles";
import { InfoSection } from "../components/home/InfoSection";
import { Navbar } from "../components/Navbar";

export default function Index() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <FeaturedProfiles />
      <InfoSection />
    </div>
  );
}