import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { ServiceManager } from "@/components/provider/ServiceManager";
import { PricingManager } from "@/components/provider/PricingManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProviderDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  
  if (!user) return null;

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {t("providerDashboard")}
          </h1>
          <p className="text-gray-400">
            {t("manageYourServices")}
          </p>
        </div>

        <Tabs defaultValue="services" className="space-y-4">
          <TabsList className="bg-gray-900">
            <TabsTrigger value="services">{t("services")}</TabsTrigger>
            <TabsTrigger value="pricing">{t("pricing")}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="services" className="space-y-4">
            <ServiceManager />
          </TabsContent>
          
          <TabsContent value="pricing" className="space-y-4">
            <PricingManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}