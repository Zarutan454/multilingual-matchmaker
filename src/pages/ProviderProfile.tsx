import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@supabase/supabase-js";
import { Navbar } from "../components/Navbar";
import { ProviderGallery } from "../components/provider/ProviderGallery";
import { ProviderInfo } from "../components/provider/ProviderInfo";
import { ProviderServices } from "../components/provider/ProviderServices";
import { ProviderAvailability } from "../components/provider/ProviderAvailability";
import { useLanguage } from "../contexts/LanguageContext";
import { Loader2 } from "lucide-react";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const ProviderProfile = () => {
  const { id } = useParams();
  const { t } = useLanguage();

  const { data: provider, isLoading } = useQuery({
    queryKey: ["provider", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <ProviderInfo provider={provider} />
          <ProviderGallery images={provider?.gallery || []} />
          <ProviderServices services={provider?.service_categories || []} />
          <ProviderAvailability availability={provider?.availability || []} />
        </div>
      </div>
    </div>
  );
};

export default ProviderProfile;