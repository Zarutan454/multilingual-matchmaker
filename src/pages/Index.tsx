import { HeroSection } from "../components/home/HeroSection";
import { FeaturedProfiles } from "../components/home/FeaturedProfiles";
import { InfoSection } from "../components/home/InfoSection";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/home/Footer";
import { Helmet } from "react-helmet";

export default function Index() {
  return (
    <>
      <Helmet>
        <title>Lovable - Premium Begleitservice & VIP Escort</title>
        <meta name="description" content="Exklusiver Premium Begleitservice und VIP Escort Service. Diskrete und hochwertige Begleitung für jeden Anlass." />
        <meta name="keywords" content="Premium Begleitservice, VIP Escort, Escort Service, Begleitung" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content="Lovable - Premium Begleitservice & VIP Escort" />
        <meta property="og:description" content="Exklusiver Premium Begleitservice und VIP Escort Service. Diskrete und hochwertige Begleitung für jeden Anlass." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content="/og-image.png" />
        
        {/* Schema.org markup für LocalBusiness */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Lovable Premium Begleitservice",
            "description": "Exklusiver Premium Begleitservice und VIP Escort Service",
            "url": window.location.href,
            "image": "/og-image.png",
            "priceRange": "€€€",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "DE"
            }
          })}
        </script>

        {/* Weitere wichtige Meta-Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#1A1F2C" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-black">
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
                backgroundColor: '#9b87f5',
                opacity: Math.random() * 0.5 + 0.2,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 5}s`,
              }}
            />
          ))}
        </div>
        <div className="relative z-10">
          <Navbar />
          <HeroSection />
          <FeaturedProfiles />
          <InfoSection />
          <Footer />
        </div>
      </div>
    </>
  );
}