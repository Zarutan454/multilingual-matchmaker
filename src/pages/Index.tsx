import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import { AgeVerification } from "../components/AgeVerification";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Globe, PartyPopper, Plane } from "lucide-react";

const Index = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isAgeVerified, setIsAgeVerified] = useState(false);

  if (!isAgeVerified) {
    return <AgeVerification onVerified={() => setIsAgeVerified(true)} />;
  }

  const services = [
    {
      icon: <PartyPopper className="w-8 h-8 text-secondary" />,
      title: "Party Begleitung",
      description: "Stilvolle Begleitung für alle gesellschaftlichen Anlässe"
    },
    {
      icon: <CalendarDays className="w-8 h-8 text-secondary" />,
      title: "Dinner Dates",
      description: "Gehobene Dinner-Begleitung in exklusiver Atmosphäre"
    },
    {
      icon: <Plane className="w-8 h-8 text-secondary" />,
      title: "Reisebegleitung",
      description: "Diskrete Begleitung für Ihre Geschäfts- oder Urlaubsreisen"
    },
    {
      icon: <Globe className="w-8 h-8 text-secondary" />,
      title: "Weitere Services",
      description: "Entdecken Sie unser vollständiges Serviceangebot"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Split Background Images */}
      <div className="absolute inset-0 flex">
        <div 
          className="w-1/2 bg-cover bg-center transform hover:scale-105 transition-transform duration-700"
          style={{
            backgroundImage: 'url(/lovable-uploads/4e0eb2bc-57e3-423b-965a-a78b03a25b27.png)',
            filter: 'brightness(0.6) contrast(1.2)'
          }}
        />
        <div 
          className="w-1/2 bg-cover bg-center transform hover:scale-105 transition-transform duration-700"
          style={{
            backgroundImage: 'url(/lovable-uploads/c603b566-6bd8-4894-8f88-e8421e30bbb4.png)',
            filter: 'brightness(0.6) contrast(1.2)'
          }}
        />
      </div>
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 backdrop-blur-sm" />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Exklusive Begleitservice
          </h1>
          <p className="text-xl text-neutral-300 mb-12 max-w-2xl mx-auto animate-fade-in">
            Diskrete und stilvolle Begleitung für jeden Anlass. 
            Erleben Sie unvergessliche Momente mit unseren ausgewählten Begleitpersonen.
          </p>
          <div className="flex gap-4 justify-center animate-fade-in">
            <Button 
              onClick={() => navigate("/register")}
              className="bg-secondary hover:bg-secondary/80 text-white px-8 py-6 text-lg"
            >
              Jetzt Registrieren
            </Button>
            <Button 
              onClick={() => navigate("/login")}
              variant="outline"
              className="border-secondary text-secondary hover:bg-secondary/10 px-8 py-6 text-lg"
            >
              Anmelden
            </Button>
          </div>
        </div>

        {/* Services Section */}
        <div className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Unsere Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="bg-black/50 border-neutral-800 backdrop-blur-md hover:bg-black/60 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-neutral-400">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;