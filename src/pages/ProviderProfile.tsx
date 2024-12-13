import { useParams } from "react-router-dom";
import { ProviderInfo } from "../components/provider/ProviderInfo";
import { ProviderServices } from "../components/provider/ProviderServices";
import { ProviderAvailability } from "../components/provider/ProviderAvailability";
import { ProviderGallery } from "../components/provider/ProviderGallery";
import { ProviderRatings } from "../components/provider/ProviderRatings";
import { Button } from "@/components/ui/button";
import { Calendar, Mail, Phone } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function ProviderProfile() {
  const { id } = useParams();
  const { t } = useLanguage();
  
  // Beispieldaten - später durch echte Daten ersetzen
  const mockProvider = {
    id: id,
    full_name: "Sophia Müller",
    occupation: "VIP Begleitservice",
    location: "München, Deutschland",
    bio: "Elegante und stilvolle Begleitung für gehobene Anlässe. Ich biete diskrete Begleitung mit Niveau und Charme.",
    availability_status: "available",
    services: [
      "Dinner Dates",
      "Kulturelle Veranstaltungen",
      "Geschäftsreisen",
      "Private Treffen",
      "Wellness & Spa"
    ],
    stats: {
      age: "28",
      height: "173cm",
      languages: ["Deutsch", "Englisch", "Französisch"],
      location: "München"
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="container mx-auto py-8 px-4 space-y-8">
        {/* Hero Section mit Profilinfo */}
        <ProviderInfo provider={mockProvider} />

        {/* Hauptbereich mit Grid-Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Linke Spalte */}
          <div className="lg:col-span-2 space-y-8">
            <ProviderGallery providerId={id!} />
            <ProviderRatings providerId={id!} />
          </div>

          {/* Rechte Spalte */}
          <div className="space-y-8">
            <ProviderServices services={mockProvider.services} providerId={id!} />
            <ProviderAvailability providerId={id!} />
            
            {/* Kontaktbereich */}
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