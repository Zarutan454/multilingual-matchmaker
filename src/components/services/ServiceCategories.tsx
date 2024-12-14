import { useState } from 'react';
import { PartyPopper, CalendarDays, Plane, Theater, UserRound, MessageSquare, Home, Bath, ShoppingCart, Gift, Lock, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export const ServiceCategories = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const { t } = useLanguage();

  const services = [
    {
      title: t("socialCompanionship"),
      items: [
        {
          icon: <PartyPopper className="w-6 h-6 text-secondary" />,
          name: t("eventsAndParties"),
          description: t("eventsAndPartiesDesc")
        },
        {
          icon: <CalendarDays className="w-6 h-6 text-secondary" />,
          name: t("dinnerDates"),
          description: t("dinnerDatesDesc")
        },
        {
          icon: <Plane className="w-6 h-6 text-secondary" />,
          name: t("travelCompanion"),
          description: t("travelCompanionDesc")
        },
        {
          icon: <Theater className="w-6 h-6 text-secondary" />,
          name: t("culture"),
          description: t("cultureDesc")
        }
      ]
    },
    {
      title: t("privateCompanionship"),
      items: [
        {
          icon: <UserRound className="w-6 h-6 text-secondary" />,
          name: t("personalTime"),
          description: t("personalTimeDesc")
        },
        {
          icon: <MessageSquare className="w-6 h-6 text-secondary" />,
          name: t("conversation"),
          description: t("conversationDesc")
        },
        {
          icon: <Home className="w-6 h-6 text-secondary" />,
          name: t("privateMeetings"),
          description: t("privateMeetingsDesc")
        }
      ]
    },
    {
      title: t("wellnessAndLeisure"),
      items: [
        {
          icon: <Bath className="w-6 h-6 text-secondary" />,
          name: t("wellness"),
          description: t("wellnessDesc")
        },
        {
          icon: <ShoppingCart className="w-6 h-6 text-secondary" />,
          name: t("shoppingAndActivities"),
          description: t("shoppingAndActivitiesDesc")
        }
      ]
    },
    {
      title: t("exclusiveExperiences"),
      items: [
        {
          icon: <Gift className="w-6 h-6 text-secondary" />,
          name: t("specialWishes"),
          description: t("specialWishesDesc")
        },
        {
          icon: <Lock className="w-6 h-6 text-secondary" />,
          name: t("premiumArrangements"),
          description: t("premiumArrangementsDesc")
        }
      ]
    }
  ];

  const toggleCategory = (title: string) => {
    setExpandedCategory(expandedCategory === title ? null : title);
  };

  return (
    <div className="py-12 bg-black/40 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          {t("ourServices")}
        </h2>
        <div className="space-y-4 max-w-4xl mx-auto">
          {services.map((category) => (
            <Card key={category.title} className="bg-black/50 border-neutral-800 backdrop-blur-md hover:bg-black/60 transition-colors">
              <CardContent className="p-4">
                <Button
                  variant="ghost"
                  className="w-full flex justify-between items-center text-white hover:text-secondary"
                  onClick={() => toggleCategory(category.title)}
                >
                  <span className="text-xl font-semibold">{category.title}</span>
                  {expandedCategory === category.title ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </Button>
                
                {expandedCategory === category.title && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
                    {category.items.map((service, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-black/30 hover:bg-black/40 transition-colors">
                        <div className="mt-1">{service.icon}</div>
                        <div>
                          <h4 className="text-white font-semibold mb-1">
                            {service.name}
                          </h4>
                          <p className="text-neutral-400 text-sm">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};