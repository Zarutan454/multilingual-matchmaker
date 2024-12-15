import { HeroBackground } from "./hero/HeroBackground";
import { HeroContent } from "./hero/HeroContent";
import { HeroActions } from "./hero/HeroActions";

export const HeroSection = () => {
  return (
    <div className="relative min-h-screen pt-28">
      {/* Dark background */}
      <div className="absolute inset-0 w-full h-full bg-[#1A1F2C]" />

      {/* Image container */}
      <div className="absolute inset-0 flex">
        <HeroBackground 
          side="left"
          imagePath="/lovable-uploads/d6eff054-978b-4d36-bf3d-8aa1cb81d205.png"
          altText="Male escort"
        />
        <HeroBackground 
          side="right"
          imagePath="/lovable-uploads/b5b39dd2-35f6-40ce-b15d-891a8a5482bd.png"
          altText="Female escort"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center px-4 max-w-5xl mx-auto">
          <HeroContent />
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Die führende Plattform für erstklassige Begleitservices in Deutschland
          </p>
          
          <HeroActions />
        </div>
      </div>
    </div>
  );
};