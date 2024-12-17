import { Navbar } from "../components/Navbar";
import { SubscriptionPlans } from "../components/subscription/SubscriptionPlans";

export default function Membership() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-black">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-5xl font-bold text-white">
            PREMIUM <span className="bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent">MITGLIEDSCHAFT</span>
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Wählen Sie die perfekte Mitgliedschaft für Ihre Bedürfnisse und genießen Sie exklusive Vorteile
          </p>
        </div>
        <SubscriptionPlans />
      </div>
    </div>
  );
}