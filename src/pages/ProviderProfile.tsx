import { useParams } from "react-router-dom";
import { ProviderInfo } from "../components/provider/ProviderInfo";
import { ProviderServices } from "../components/provider/ProviderServices";
import { ProviderAvailability } from "../components/provider/ProviderAvailability";
import { ProviderGallery } from "../components/provider/ProviderGallery";
import { ProviderRatings } from "../components/provider/ProviderRatings";

export default function ProviderProfile() {
  const { id } = useParams();
  // Example data - replace with real data later
  const mockProvider = {
    id: id,
    full_name: "John Doe",
    occupation: "Professional Massage Therapist",
    location: "Berlin",
    bio: "Experienced massage therapist with 10+ years of practice",
    availability_status: "available",
    services: ["Massage", "Physiotherapy", "Wellness"]
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <ProviderInfo provider={mockProvider} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProviderServices services={mockProvider.services} providerId={id!} />
        <ProviderAvailability providerId={id!} />
      </div>
      <ProviderRatings providerId={id!} />
      <ProviderGallery providerId={id!} />
    </div>
  );
}