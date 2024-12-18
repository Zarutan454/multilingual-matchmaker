import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { ServiceManager } from "@/components/provider/ServiceManager";
import { PricingManager } from "@/components/provider/PricingManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function ProviderDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkUserType = async () => {
      if (!user) {
        navigate('/login');
        return;
      }

      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        if (profile?.user_type !== 'provider') {
          toast.error(t("onlyProvidersAllowed"));
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error checking user type:', error);
        toast.error(t("errorCheckingUserType"));
      }
    };

    checkUserType();
  }, [user, navigate, t]);

  if (!user) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <main className="container mx-auto px-4 py-8 mt-20">
          <p className="text-white">{t("pleaseLogin")}</p>
        </main>
      </div>
    );
  }

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
            <Card className="bg-black/50 backdrop-blur-md border-[#9b87f5]/30 shadow-[0_0_15px_rgba(155,135,245,0.3)] p-6">
              <ServiceManager />
            </Card>
          </TabsContent>
          
          <TabsContent value="pricing" className="space-y-4">
            <Card className="bg-black/50 backdrop-blur-md border-[#9b87f5]/30 shadow-[0_0_15px_rgba(155,135,245,0.3)] p-6">
              <PricingManager />
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}