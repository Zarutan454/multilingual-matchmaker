import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="relative h-[80vh] flex items-center justify-center bg-gradient-to-r from-black to-gray-900">
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
          PREMIUM BEGLEITSERVICE 24/7
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Exklusive Begleitung für anspruchsvolle Momente
        </p>
        <Button 
          variant="secondary"
          size="lg"
          className="bg-secondary hover:bg-secondary/90"
          onClick={() => {
            const element = document.getElementById('featured');
            element?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <ChevronDown className="mr-2" />
          Entdecken Sie mehr
        </Button>
      </div>
    </div>
  );
};