import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { subscriptionsConfig } from "@/config/subscriptions";
import { toast } from "sonner";
import { TranslationKey } from "@/config/languageTypes";

export const SubscriptionPlans = () => {
  const { t } = useLanguage();
  const plans = Object.entries(subscriptionsConfig.levels);

  const handleSubscribe = (planId: string) => {
    toast.info("Zahlungssystem wird in Kürze implementiert");
    console.log("Subscribe to plan:", planId);
  };

  return (
    <div className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map(([id, plan]) => (
          <Card 
            key={id} 
            className={`relative p-8 backdrop-blur-lg border transition-all duration-300 hover:scale-105 ${
              id === 'vip' 
                ? 'bg-gradient-to-b from-[#2A1B3D]/80 to-[#1A1B3D]/80 border-accent' 
                : 'bg-gradient-to-b from-gray-900/80 to-black/80 border-gray-800'
            }`}
          >
            {id === 'vip' && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="inline-flex items-center gap-1 bg-accent px-4 py-1 rounded-full text-sm font-medium text-white shadow-lg">
                  <Sparkles className="w-4 h-4" />
                  {t('recommended')}
                </span>
              </div>
            )}
            
            <div className="text-center mb-8">
              <h3 className={`text-2xl font-bold mb-2 ${
                id === 'vip' ? 'text-accent' : 'text-white'
              }`}>
                {plan.name}
              </h3>
              <div className="text-4xl font-bold mb-2 text-white">
                {plan.price.monthly}€
                <span className="text-base font-normal text-gray-400">/Monat</span>
              </div>
              <div className="text-sm text-gray-400">
                oder {plan.price.yearly}€/Jahr
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {Object.entries(plan.features).map(([feature, value]) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className={`flex-shrink-0 rounded-full p-1 ${
                    id === 'vip' ? 'bg-accent/20' : 'bg-secondary/20'
                  }`}>
                    <Check className={`h-4 w-4 ${
                      id === 'vip' ? 'text-accent' : 'text-secondary'
                    }`} />
                  </div>
                  <span className="text-gray-300 text-sm">
                    {typeof value === 'number' 
                      ? `${value} ${t(feature as TranslationKey)}`
                      : value === true 
                        ? t(feature as TranslationKey)
                        : value === 'unlimited' 
                          ? `Unbegrenzt ${t(feature as TranslationKey)}`
                          : value}
                  </span>
                </div>
              ))}
            </div>

            <Button 
              className={`w-full ${
                id === 'vip' 
                  ? 'bg-accent hover:bg-accent/90' 
                  : 'bg-secondary hover:bg-secondary/90'
              }`}
              onClick={() => handleSubscribe(id)}
            >
              {t('bookNow')}
            </Button>

            {plan.trial_days > 0 && (
              <p className="text-sm text-center mt-4 text-gray-400">
                {plan.trial_days} Tage kostenlos testen
              </p>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};