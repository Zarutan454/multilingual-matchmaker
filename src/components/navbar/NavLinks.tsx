import { FC, useCallback } from "react";
import { Home, Search, Crown, CreditCard, User, LogOut, Newspaper } from "lucide-react";
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

  const handleLogout = useCallback(async () => {
    try {
      await signOut();
      navigate('/');
      toast.success(t("logoutSuccess"));
      onItemClick?.();
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(t("logoutError"));
    }
  }, [signOut, navigate, t, onItemClick]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href) {
      navigate(href);
      onItemClick?.();
    }
  }, [navigate, onItemClick]);

  return (
    <div className={`flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-8 ${className}`}>
      <a 
        href="/" 
        className="text-white hover:text-[#c69963] transition-colors flex items-center gap-2"
        onClick={handleNavClick}
      >
        <Home size={18} />
        Startseite
      </a>
      <a 
        href="/listings" 
        className="text-white hover:text-[#c69963] transition-colors flex items-center gap-2"
        onClick={handleNavClick}
      >
        <Search size={18} />
        Anzeigen
      </a>
      <a 
        href="/vips" 
        className="text-white hover:text-[#c69963] transition-colors flex items-center gap-2"
        onClick={handleNavClick}
      >
        <Crown size={18} />
        VIP's
      </a>
      <a 
        href="/membership" 
        className="text-white hover:text-[#c69963] transition-colors flex items-center gap-2"
        onClick={handleNavClick}
      >
        <CreditCard size={18} />
        Mitgliedschaft
      </a>
      <a 
        href="/news" 
        className="text-white hover:text-[#c69963] transition-colors flex items-center gap-2"
        onClick={handleNavClick}
      >
        <Newspaper size={18} />
        News
      </a>
      {user ? (
        <>
          <a 
            href="/dashboard" 
            className="text-white hover:text-[#c69963] transition-colors flex items-center gap-2"
            onClick={handleNavClick}
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
          onClick={handleNavClick}
        >
          {t("register")}
        </a>
      )}
    </div>
  );
};