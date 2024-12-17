import { Navbar } from "../components/Navbar";
import { SubscriptionPlans } from "../components/subscription/SubscriptionPlans";

export default function Membership() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-black">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-center mb-12 text-white">
          PREMIUM <span className="text-[#9b87f5]">MITGLIEDSCHAFT</span>
        </h1>
        <SubscriptionPlans />
      </div>
    </div>
  );
}