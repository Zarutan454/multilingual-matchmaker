import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Profile } from "@/types/profile";

interface AdditionalInfoProps {
  profile: Profile;
}

export const AdditionalInfo = ({ profile }: AdditionalInfoProps) => {
  const { t } = useLanguage();

  return (
    <Card className="bg-black/80 backdrop-blur-md border-[#9b87f5]/30 shadow-[0_0_15px_rgba(155,135,245,0.3)]">
      <CardHeader>
        <CardTitle className="text-white font-sans">{t("additionalInfo")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {profile.interests && (
          <div>
            <span className="text-[#9b87f5]/80">{t("interests")}: </span>
            <span className="text-white">{profile.interests}</span>
          </div>
        )}
        {profile.occupation && (
          <div>
            <span className="text-[#9b87f5]/80">{t("occupation")}: </span>
            <span className="text-white">{profile.occupation}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};