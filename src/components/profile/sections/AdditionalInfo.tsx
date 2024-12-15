import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Profile } from "@/types/profile";

interface AdditionalInfoProps {
  profile: Profile;
}

export const AdditionalInfo = ({ profile }: AdditionalInfoProps) => {
  const { t } = useLanguage();

  return (
    <Card className="bg-black/50 backdrop-blur-sm border-neutral-800">
      <CardHeader>
        <CardTitle className="text-white">{t("additionalInfo")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {profile.interests && (
          <div>
            <span className="text-gray-400">{t("interests")}: </span>
            <span className="text-white">{profile.interests}</span>
          </div>
        )}
        {profile.occupation && (
          <div>
            <span className="text-gray-400">{t("occupation")}: </span>
            <span className="text-white">{profile.occupation}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};