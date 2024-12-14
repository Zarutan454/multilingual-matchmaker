import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import { AgeVerification } from "../components/AgeVerification";
import { ChevronDown, MapPin, Clock, Star } from "lucide-react";
import { SubscriptionPlans } from "@/components/subscription/SubscriptionPlans";

const featuredProfiles = [
  {
    id: 1,
    name: "Sophie",
    image: "/lovable-uploads/da17ddfa-149e-442c-bd33-ea6287b02581.png",
    category: "VIP Begleitung",
    location: "München"
  },
  {
    id: 2,
    name: "Emma",
    image: "/lovable-uploads/fe01f460-75ee-475d-8e6c-efb6244e2622.png",
    category: "Premium Escort",
    location: "Berlin"
  },
  {
    id: 3,
    name: "Julia",
    image: "/lovable-uploads/5a72d1e4-e990-4665-8f3a-c72bef742a3c.png",
    category: "Dinner Date",
    location: "Hamburg"
  },
  {
    id: 4,
    name: "Laura",
    image: "/lovable-uploads/0fee5c22-13f5-4317-835d-751e10816c40.png",
    category: "Event Begleitung",
    location: "Frankfurt"
  },
  {
    id: 5,
    name: "Marie",
    image: "/lovable-uploads/3f84bf9b-9940-48fd-b090-c8c4ff825b87.png",
    category: "Reisebegleitung",
    location: "Köln"
  }
];

const Index = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isAgeVerified, setIsAgeVerified] = useState(false);

  if (!isAgeVerified) {
    return <AgeVerification onVerified={() => setIsAgeVerified(true)} />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[80vh] flex items-center justify-center bg-gradient-to-r from-black to-gray-900">
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
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

      {/* Featured Profiles */}
      <section id="featured" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            UNSERE PREMIUM BEGLEITUNG
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {featuredProfiles.map((profile) => (
              <div 
                key={profile.id}
                className="group relative overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-105"
                onClick={() => navigate(`/provider/${profile.id}`)}
              >
                <div className="aspect-[3/4] relative">
                  <img 
                    src={profile.image} 
                    alt={profile.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{profile.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <MapPin className="w-4 h-4" />
                      {profile.location}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-secondary/90 px-3 py-1 rounded-full text-sm">
                      FEATURED
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Plans */}
      <SubscriptionPlans />

      {/* Info Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">ÜBER UNSEREN SERVICE</h2>
          <div className="max-w-4xl mx-auto text-gray-300 leading-relaxed">
            <p className="mb-8">
              Wir bieten Ihnen einen exklusiven Begleitservice der Extraklasse. 
              Unsere sorgfältig ausgewählten Begleiterinnen vereinen Stil, Charme und Intelligenz 
              und sind die perfekte Wahl für jeden gehobenen Anlass.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="flex flex-col items-center">
                <Clock className="w-12 h-12 text-secondary mb-4" />
                <h3 className="text-xl font-semibold mb-2">24/7 Verfügbar</h3>
                <p className="text-sm text-gray-400">Flexible Buchungen rund um die Uhr</p>
              </div>
              <div className="flex flex-col items-center">
                <Star className="w-12 h-12 text-secondary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Premium Service</h3>
                <p className="text-sm text-gray-400">Höchste Qualitätsstandards</p>
              </div>
              <div className="flex flex-col items-center">
                <MapPin className="w-12 h-12 text-secondary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Deutschlandweit</h3>
                <p className="text-sm text-gray-400">In allen großen Städten verfügbar</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Information</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about" className="hover:text-secondary">Über uns</a></li>
                <li><a href="/services" className="hover:text-secondary">Services</a></li>
                <li><a href="/booking" className="hover:text-secondary">Buchung</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Städte</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-secondary">Berlin</a></li>
                <li><a href="#" className="hover:text-secondary">München</a></li>
                <li><a href="#" className="hover:text-secondary">Hamburg</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Rechtliches</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/privacy" className="hover:text-secondary">Datenschutz</a></li>
                <li><a href="/terms" className="hover:text-secondary">AGB</a></li>
                <li><a href="/imprint" className="hover:text-secondary">Impressum</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@example.com</li>
                <li>Tel: +49 123 456789</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Premium Escort Service. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
