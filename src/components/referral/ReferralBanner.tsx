import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

export const ReferralBanner = () => {
  const { user } = useAuth();
  
  const referralLink = `${window.location.origin}?ref=${user?.id}`;
  
  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      toast.success("Referral-Link wurde in die Zwischenablage kopiert!");
    } catch (err) {
      toast.error("Fehler beim Kopieren des Links");
    }
  };

  if (!user) return null;

  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Empfehlen Sie uns weiter!
            </h3>
            <p className="text-white/90">
              Verdienen Sie bis zu 15% Provision für jeden geworbenen Premium-Nutzer
            </p>
          </div>
          <Button
            variant="secondary"
            className="whitespace-nowrap"
            onClick={copyReferralLink}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Link kopieren
          </Button>
        </div>
      </div>
    </div>
  );
};