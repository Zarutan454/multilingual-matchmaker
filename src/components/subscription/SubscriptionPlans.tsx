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
  const regularPlans = plans.filter(([id]) => id !== 'vip');
  const vipPlan = plans.find(([id]) => id === 'vip');

  const handleSubscribe = (planId: string) => {
    toast.info("Zahlungssystem wird in Kürze implementiert");
    console.log("Subscribe to plan:", planId);
  };

  return (
    <div className="py-8">
      {/* Regular Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 max-w-5xl mx-auto">
        {regularPlans.map(([id, plan]) => (
          <Card 
            key={id} 
            className="relative p-6 backdrop-blur-lg border transition-all duration-300 hover:scale-105 bg-gradient-to-b from-gray-900/80 to-black/80 border-gray-800"
          >
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2 text-white">
                {plan.name}
              </h3>
              <div className="text-3xl font-bold mb-2 text-white">
                {plan.price.monthly}€
                <span className="text-sm font-normal text-gray-400">/Monat</span>
              </div>
              <div className="text-sm text-gray-400">
                oder {plan.price.yearly}€/Jahr
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {Object.entries(plan.features).map(([feature, value]) => (
                <div key={feature} className="flex items-center gap-2">
                  <div className="flex-shrink-0 rounded-full p-1 bg-secondary/20">
                    <Check className="h-3 w-3 text-secondary" />
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
              className="w-full bg-secondary hover:bg-secondary/90"
              onClick={() => handleSubscribe(id)}
            >
              {t('bookNow')}
            </Button>

            {plan.trial_days > 0 && (
              <p className="text-xs text-center mt-3 text-gray-400">
                {plan.trial_days} Tage kostenlos testen
              </p>
            )}
          </Card>
        ))}
      </div>

      {/* VIP Plan */}
      {vipPlan && (
        <div className="max-w-md mx-auto">
          <Card 
            className="relative p-6 backdrop-blur-lg border transition-all duration-300 hover:scale-105 bg-gradient-to-b from-[#2A1B3D]/80 to-[#1A1B3D]/80 border-accent"
          >
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="inline-flex items-center gap-1 bg-accent px-4 py-1 rounded-full text-sm font-medium text-white shadow-lg">
                <Sparkles className="w-4 h-4" />
                {t('recommended')}
              </span>
            </div>
            
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2 text-accent">
                {vipPlan[1].name}
              </h3>
              <div className="text-3xl font-bold mb-2 text-white">
                {vipPlan[1].price.monthly}€
                <span className="text-sm font-normal text-gray-400">/Monat</span>
              </div>
              <div className="text-sm text-gray-400">
                oder {vipPlan[1].price.yearly}€/Jahr
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {Object.entries(vipPlan[1].features).map(([feature, value]) => (
                <div key={feature} className="flex items-center gap-2">
                  <div className="flex-shrink-0 rounded-full p-1 bg-accent/20">
                    <Check className="h-3 w-3 text-accent" />
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
              className="w-full bg-accent hover:bg-accent/90"
              onClick={() => handleSubscribe(vipPlan[0])}
            >
              {t('bookNow')}
            </Button>

            {vipPlan[1].trial_days > 0 && (
              <p className="text-xs text-center mt-3 text-gray-400">
                {vipPlan[1].trial_days} Tage kostenlos testen
              </p>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};