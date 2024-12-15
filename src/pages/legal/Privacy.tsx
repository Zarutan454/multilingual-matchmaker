import { useLanguage } from "../../contexts/LanguageContext";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/home/Footer";

const Privacy = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-white">{t("privacyPolicy")}</h1>
          
          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">{t("preamble")}</h2>
              <p>
                Der Schutz Ihrer persönlichen Daten ist uns wichtig. Diese Datenschutzrichtlinie erklärt, 
                wie wir Ihre Daten erheben, verwenden und schützen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">§1 {t("dataController")}</h2>
              <p>
                Verantwortlich für die Datenverarbeitung auf dieser Website ist die Popp*in GmbH.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">§2 {t("dataCollection")}</h2>
              <p>
                Wir erheben personenbezogene Daten, wenn Sie sich auf unserer Plattform anmelden, 
                Dienstleistungen buchen oder über die Plattform kommunizieren. Dies umfasst insbesondere 
                Name, E-Mail-Adresse, Zahlungsinformationen und Standortdaten.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">§3 {t("dataUsage")}</h2>
              <p>
                Ihre Daten werden ausschließlich zur Bereitstellung unserer Dienstleistungen, 
                zur Kommunikation und zur Altersverifikation genutzt.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">§4 {t("dataSharing")}</h2>
              <p>
                Wir geben Ihre personenbezogenen Daten nur weiter, wenn dies erforderlich ist, 
                um unsere Dienstleistungen zu erbringen, z. B. an Zahlungsdienstleister oder 
                Altersverifizierungsdienste.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;