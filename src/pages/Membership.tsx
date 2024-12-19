import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { SubscriptionPlans } from "../components/subscription/SubscriptionPlans";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/contexts/LanguageContext";
import { ThemeProvider } from "next-themes";
import { useTheme } from "next-themes";

export default function Membership() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  useEffect(() => {
    console.log("Membership page viewed");
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Helmet>
        <title>{t("premiumMembership")} | Lovable</title>
        <meta name="description" content={t("choosePlan")} />
        <meta property="og:title" content={t("premiumMembership")} />
        <meta property="og:description" content={t("choosePlan")} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={t("premiumMembership")} />
        <meta name="twitter:description" content={t("choosePlan")} />
      </Helmet>

      <div className={`min-h-screen transition-colors ${
        theme === 'dark' 
          ? 'bg-black text-white' 
          : 'bg-white text-black'
      }`}>
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-5xl font-bold">
              PREMIUM <span className="bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent">
                {t("premiumMembership").toUpperCase()}
              </span>
            </h1>
            <p className={`max-w-2xl mx-auto ${
              theme === 'dark' 
                ? 'text-gray-300' 
                : 'text-gray-600'
            }`}>
              {t("choosePlan")}
            </p>
          </div>
          <SubscriptionPlans />
        </div>
      </div>
    </ThemeProvider>
  );
}