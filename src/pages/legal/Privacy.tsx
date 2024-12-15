import { useLanguage } from "../../contexts/LanguageContext";

const Privacy = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">{t("privacyPolicy")}</h1>
        
        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">{t("preamble")}</h2>
            <p>{t("privacyPreamble")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">§1 {t("dataController")}</h2>
            <p>{t("dataControllerInfo")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">§2 {t("dataCollection")}</h2>
            <p>{t("dataCollectionInfo")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">§3 {t("dataUsage")}</h2>
            <p>{t("dataUsageInfo")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">§4 {t("dataSharing")}</h2>
            <p>{t("dataSharingInfo")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">§5 {t("yourRights")}</h2>
            <p>{t("userRightsInfo")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">§6 {t("dataSecurity")}</h2>
            <p>{t("dataSecurityInfo")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">§7 {t("privacyPolicyChanges")}</h2>
            <p>{t("policyChangesInfo")}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;