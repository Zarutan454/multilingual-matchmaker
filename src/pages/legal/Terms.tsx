import { useLanguage } from "../../contexts/LanguageContext";

const Terms = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">{t("termsAndConditions")}</h1>
        
        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">{t("preamble")}</h2>
            <p>
              {t("welcomeToPoppin")} {t("platformDescription")}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">§1 {t("scopeAndContractingParties")}</h2>
            <p>{t("termsScope")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">§2 {t("operatorServices")}</h2>
            <p>{t("platformServices")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">§3 {t("registrationAndUsage")}</h2>
            <p>{t("registrationRequirements")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">§4 {t("providerResponsibility")}</h2>
            <p>{t("providerObligations")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">§5 {t("disclaimerOfLiability")}</h2>
            <p>{t("liabilityDisclaimer")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">§6 {t("ageVerification")}</h2>
            <p>{t("ageRequirement")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">§7 {t("termsModification")}</h2>
            <p>{t("modificationRights")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">§8 {t("finalProvisions")}</h2>
            <p>{t("finalProvisionsContent")}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;