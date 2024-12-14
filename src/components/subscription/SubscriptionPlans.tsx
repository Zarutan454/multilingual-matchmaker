import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { subscriptionsConfig } from "@/config/subscriptions";
import { toast } from "sonner";
import { TranslationKey } from "@/config/languageTypes";

export const SubscriptionPlans = () => {
  const { t } = useLanguage();
  const plans = Object.entries(subscriptionsConfig.levels);

  const handleSubscribe = (planId: string) => {
    // TODO: Implement payment integration
    toast.info("Zahlungssystem wird in Kürze implementiert");
    console.log("Subscribe to plan:", planId);
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('premiumMembership')}</h2>
          <p className="text-gray-600">{t('choosePlan')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map(([id, plan]) => (
            <Card key={id} className="relative p-6 hover:shadow-lg transition-shadow">
              {id === 'vip' && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    {t('recommended')}
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold mb-1">
                  {plan.price.monthly}€
                  <span className="text-base font-normal text-gray-600">/Monat</span>
                </div>
                <div className="text-sm text-gray-600">
                  oder {plan.price.yearly}€/Jahr
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {Object.entries(plan.features).map(([feature, value]) => (
                  <div key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-600">
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
                className="w-full"
                variant={id === 'vip' ? 'default' : 'outline'}
                onClick={() => handleSubscribe(id)}
              >
                {t('bookNow')}
              </Button>

              {plan.trial_days > 0 && (
                <p className="text-sm text-center mt-4 text-gray-600">
                  {plan.trial_days} Tage kostenlos testen
                </p>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};