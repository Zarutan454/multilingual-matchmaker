import { ServiceCategories } from "../components/services/ServiceCategories";
import { AvailabilityCalendar } from "../components/services/AvailabilityCalendar";
import { PricingSection } from "../components/services/PricingSection";
import { useAuth } from "../contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();
  const isProvider = user?.user_metadata?.user_type === "provider";

  if (!isProvider) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Willkommen</h1>
        <p>Bitte melden Sie sich an, um alle Funktionen nutzen zu können.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-2xl font-bold mb-8">Dienstleister Dashboard</h1>
      
      <section>
        <h2 className="text-xl font-semibold mb-4">Ihre Dienstleistungen</h2>
        <ServiceCategories />
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Verfügbarkeit</h2>
          <AvailabilityCalendar />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Preisgestaltung</h2>
          <PricingSection />
        </section>
      </div>
    </div>
  );
};

export default Index;