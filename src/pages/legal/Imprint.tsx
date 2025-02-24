import { useLanguage } from "../../contexts/LanguageContext";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/home/Footer";

const Imprint = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-white">{t("imprint")}</h1>
          
          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">{t("companyInformation")}</h2>
              <p>Popp*in GmbH</p>
              <p>[{t("address")}]</p>
              <p>[{t("country")}]</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">{t("contact")}</h2>
              <p>{t("email")}: info@example.com</p>
              <p>{t("phone")}: [+49 XXX XXXXXXX]</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">{t("registrationDetails")}</h2>
              <p>{t("registeredAt")}: [{t("courtLocation")}]</p>
              <p>{t("registrationNumber")}: [HRB XXXXX]</p>
              <p>{t("vatId")}: [DE XXXXXXXXX]</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">{t("responsiblePerson")}</h2>
              <p>{t("managingDirector")}: [Name]</p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Imprint;