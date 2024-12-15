import { useLanguage } from "../../contexts/LanguageContext";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/home/Footer";

const Terms = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-white">{t("termsAndConditions")}</h1>
          
          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">{t("preamble")}</h2>
              <p>
                Willkommen auf Popp*in. Diese Plattform bietet die Möglichkeit, Dienstleistungen im Bereich Begleitservice anzubieten und zu buchen. 
                Durch die Nutzung dieser Seite erklären Sie sich mit den folgenden Allgemeinen Geschäftsbedingungen (AGB) einverstanden.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">§1 {t("scopeAndContractingParties")}</h2>
              <p>
                Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge, die zwischen Ihnen als Nutzer und der Betreiberin 
                der Plattform Popp*in abgeschlossen werden. Vertragspartner ist die Popp*in GmbH.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">§2 {t("operatorServices")}</h2>
              <p>
                Popp*in stellt eine Plattform zur Verfügung, auf der Dienstleister ihre Begleitservices anbieten können. 
                Die Betreiberin stellt lediglich die technische Infrastruktur bereit und ist nicht für die Ausführung der Dienstleistungen verantwortlich.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">§3 {t("registrationAndUsage")}</h2>
              <p>
                Die Nutzung der Plattform setzt eine Anmeldung voraus. Sie sind verpflichtet, bei der Anmeldung wahrheitsgemäße Angaben zu machen 
                und die Anmeldung nur im Einklang mit den Gesetzen Ihres Landes zu nutzen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">§4 {t("providerResponsibility")}</h2>
              <p>
                Die Dienstleister sind verantwortlich für die Legalität ihrer angebotenen Dienstleistungen in ihrem Land. 
                Dies schließt unter anderem die ordnungsgemäße Anmeldung als Gewerbetreibende und die Bezahlung von Steuern ein.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;