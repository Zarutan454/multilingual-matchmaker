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
    <div className="min-h-screen bg-black py-8">
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              backgroundColor: '#FFD700',
              opacity: Math.random() * 0.5 + 0.2,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 5}s`,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 backdrop-blur-[2px]" />
      <div className="container mx-auto px-4 flex flex-col items-center justify-center relative z-10">
        <ProfileHeader />
        <ProfileForm />
      </div>
    </div>
  );
};

export default Profile;