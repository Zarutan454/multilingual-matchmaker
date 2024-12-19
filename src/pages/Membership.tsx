import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { SubscriptionPlans } from "../components/subscription/SubscriptionPlans";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Membership() {
  const { t } = useLanguage();

  useEffect(() => {
    // Log page view for analytics
    console.log("Membership page viewed");
  }, []);

  return (
    <>
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

      <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-black dark:from-black dark:to-[#1A1F2C]">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-5xl font-bold text-white">
              PREMIUM <span className="bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent">
                {t("premiumMembership").toUpperCase()}
              </span>
            </h1>
            <p className="text-neutral-400 dark:text-neutral-300 max-w-2xl mx-auto">
              {t("choosePlan")}
            </p>
          </div>
          <SubscriptionPlans />
        </div>
      </div>
    </>
  );
}