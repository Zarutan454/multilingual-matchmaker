import { PartyPopper, CalendarDays, Plane, Theater, UserRound, MessageSquare, Home, Bath, ShoppingCart, Gift, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    title: "Gesellschaftliche Begleitung",
    items: [
      {
        icon: <PartyPopper className="w-8 h-8 text-secondary" />,
        name: "Events & Partys",
        description: "Professionelle Begleitung für Firmenevents, Partys und Hochzeiten"
      },
      {
        icon: <CalendarDays className="w-8 h-8 text-secondary" />,
        name: "Dinner Dates",
        description: "Stilvolle Begleitung für Restaurant- oder private Dinner"
      },
      {
        icon: <Plane className="w-8 h-8 text-secondary" />,
        name: "Reisebegleitung",
        description: "Diskrete Begleitung für Geschäfts- oder Urlaubsreisen"
      },
      {
        icon: <Theater className="w-8 h-8 text-secondary" />,
        name: "Kultur",
        description: "Begleitung zu Theater, Oper oder Konzerten"
      }
    ]
  },
  {
    title: "Private Begleitung",
    items: [
      {
        icon: <UserRound className="w-8 h-8 text-secondary" />,
        name: "Persönliche Zeit",
        description: "Individuelle Begleitung nach Ihren Wünschen"
      },
      {
        icon: <MessageSquare className="w-8 h-8 text-secondary" />,
        name: "Unterhaltung",
        description: "Anregende Gespräche und beste Unterhaltung"
      },
      {
        icon: <Home className="w-8 h-8 text-secondary" />,
        name: "Private Treffen",
        description: "Diskrete Begleitung in Hotels oder privaten Räumlichkeiten"
      }
    ]
  },
  {
    title: "Wellness & Freizeit",
    items: [
      {
        icon: <Bath className="w-8 h-8 text-secondary" />,
        name: "Wellness",
        description: "Entspannende Spa- und Wellnessbesuche"
      },
      {
        icon: <ShoppingCart className="w-8 h-8 text-secondary" />,
        name: "Shopping & Aktivitäten",
        description: "Gemeinsame Freizeitgestaltung und Shopping-Begleitung"
      }
    ]
  },
  {
    title: "Exklusive Erlebnisse",
    items: [
      {
        icon: <Gift className="w-8 h-8 text-secondary" />,
        name: "Spezielle Wünsche",
        description: "Personalisierte Erlebnisse und Rollenspiele"
      },
      {
        icon: <Lock className="w-8 h-8 text-secondary" />,
        name: "Premium Arrangements",
        description: "Exklusive Mehrtagebuchungen und Auslandsreisen"
      }
    ]
  }
];

export const ServiceCategories = () => {
  return (
    <div className="py-20 bg-black/40 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-12 tracking-tight">
          Unsere Services
        </h2>
        <div className="space-y-16">
          {services.map((category, idx) => (
            <div key={idx} className="space-y-8">
              <h3 className="text-3xl font-semibold text-white text-center mb-8">
                {category.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {category.items.map((service, index) => (
                  <Card key={index} className="bg-black/50 border-neutral-800 backdrop-blur-md hover:bg-black/60 transition-colors">
                    <CardContent className="p-6 text-center">
                      <div className="mb-4 flex justify-center">
                        {service.icon}
                      </div>
                      <h4 className="text-xl font-semibold text-white mb-3">
                        {service.name}
                      </h4>
                      <p className="text-neutral-400 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};