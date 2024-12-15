import { useLanguage } from "@/contexts/LanguageContext";
import { Profile } from "@/types/profile";

interface ProfileCharacteristicsProps {
  profile: Profile;
}

export const ProfileCharacteristics = ({ profile }: ProfileCharacteristicsProps) => {
  const { t } = useLanguage();

  return (
    <>
      <div className="grid grid-cols-2 gap-4 border-t border-gray-800 pt-4">
        {profile.gender && (
          <div>
            <span className="text-gray-400">{t("gender")}: </span>
            <span className="text-white">{profile.gender}</span>
          </div>
        )}
        {profile.height && (
          <div>
            <span className="text-gray-400">{t("height")}: </span>
            <span className="text-white">{profile.height}</span>
          </div>
        )}
        {profile.body_type && (
          <div>
            <span className="text-gray-400">{t("bodyType")}: </span>
            <span className="text-white">{profile.body_type}</span>
          </div>
        )}
        {profile.bust_size && (
          <div>
            <span className="text-gray-400">{t("bustSize")}: </span>
            <span className="text-white">{profile.bust_size}</span>
          </div>
        )}
        {profile.dress_size && (
          <div>
            <span className="text-gray-400">{t("dressSize")}: </span>
            <span className="text-white">{profile.dress_size}</span>
          </div>
        )}
      </div>

      <div className="space-y-4 border-t border-gray-800 pt-4">
        <h3 className="text-lg font-semibold text-white">{t("appearance")}</h3>
        <div className="grid grid-cols-2 gap-4">
          {(profile.hair_color || profile.hair_length || profile.hair_type) && (
            <div>
              <span className="text-gray-400">{t("hair")}: </span>
              <span className="text-white">
                {[profile.hair_color, profile.hair_length, profile.hair_type]
                  .filter(Boolean)
                  .join(", ")}
              </span>
            </div>
          )}
          {profile.eye_color && (
            <div>
              <span className="text-gray-400">{t("eyeColor")}: </span>
              <span className="text-white">{profile.eye_color}</span>
            </div>
          )}
          {profile.skin_tone && (
            <div>
              <span className="text-gray-400">{t("skinTone")}: </span>
              <span className="text-white">{profile.skin_tone}</span>
            </div>
          )}
          {profile.grooming && (
            <div>
              <span className="text-gray-400">{t("grooming")}: </span>
              <span className="text-white">{profile.grooming}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};