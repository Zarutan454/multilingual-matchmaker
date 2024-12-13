import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { ProfileForm } from "../components/profile/ProfileForm";
import { ProfileHeader } from "../components/profile/ProfileHeader";
import { toast } from "sonner";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  if (!user) {
    toast.error(t("pleaseLoginFirst"));
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <ProfileHeader />
        <ProfileForm />
      </div>
    </div>
  );
};

export default Profile;