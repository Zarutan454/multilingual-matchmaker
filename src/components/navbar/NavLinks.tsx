import { FC } from "react";
import { Home, Heart, Grid, MessageSquare, User, LogOut } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface NavLinksProps {
  className?: string;
  onItemClick?: () => void;
}

export const NavLinks: FC<NavLinksProps> = ({ className = "", onItemClick }) => {
  const { t } = useLanguage();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success(t("logoutSuccess"));
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(t("logoutError"));
    }
    onItemClick?.();
  };

  return (
    <div className={`flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-8 ${className}`}>
      <a 
        href="/" 
        className="text-white hover:text-[#c69963] transition-colors flex items-center gap-2"
        onClick={onItemClick}
      >
        <Home size={18} />
        {t("home")}
      </a>
      <a 
        href="/models" 
        className="text-white hover:text-[#c69963] transition-colors flex items-center gap-2"
        onClick={onItemClick}
      >
        <Heart size={18} />
        Models
      </a>
      <a 
        href="/categories" 
        className="text-white hover:text-[#c69963] transition-colors flex items-center gap-2"
        onClick={onItemClick}
      >
        <Grid size={18} />
        {t("categories")}
      </a>
      <a 
        href="/contact" 
        className="text-white hover:text-[#c69963] transition-colors flex items-center gap-2"
        onClick={onItemClick}
      >
        <MessageSquare size={18} />
        {t("contact")}
      </a>
      {user ? (
        <>
          <a 
            href="/dashboard" 
            className="text-white hover:text-[#c69963] transition-colors flex items-center gap-2"
            onClick={onItemClick}
          >
            <User size={18} />
            {t("profile")}
          </a>
          <button
            onClick={handleLogout}
            className="text-white hover:text-[#c69963] transition-colors flex items-center gap-2"
          >
            <LogOut size={18} />
            {t("logout")}
          </button>
        </>
      ) : (
        <a 
          href="/register" 
          className="text-white hover:text-[#c69963] transition-colors"
          onClick={onItemClick}
        >
          {t("register")}
        </a>
      )}
    </div>
  );
};