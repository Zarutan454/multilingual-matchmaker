import { useParams } from "react-router-dom";
import { ProviderInfo } from "../components/provider/ProviderInfo";
import { ProviderServices } from "../components/provider/ProviderServices";
import { ProviderAvailability } from "../components/provider/ProviderAvailability";
import { ProviderGallery } from "../components/provider/ProviderGallery";
import { ProviderRatings } from "../components/provider/ProviderRatings";
import { Button } from "@/components/ui/button";
import { Calendar, Mail, Phone, Loader2 } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export default function ProviderProfile() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();

  const { data: provider, isLoading } = useQuery({
    queryKey: ['provider', id],
    queryFn: async () => {
      if (!id) throw new Error('No ID provided');
      
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          id,
          full_name,
          avatar_url,
          location,
          occupation,
          bio,
          availability_status,
          services,
          stats
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <p className="text-lg text-gray-600">{t("profileNotFound")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="container mx-auto py-8 px-4 space-y-8">
        <ProviderInfo provider={provider} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ProviderGallery providerId={id} />
            <ProviderRatings providerId={id} />
          </div>

          <div className="space-y-8">
            <ProviderServices services={provider.services || []} providerId={id} />
            <ProviderAvailability providerId={id} />
            
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
              <h2 className="text-xl font-semibold">{t("contact")}</h2>
              <div className="space-y-4">
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {t("requestCall")}
                </Button>
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {t("sendMessage")}
                </Button>
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {t("bookAppointment")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}