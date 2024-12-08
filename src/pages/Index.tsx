import { useState } from "react";
import { AgeVerification } from "../components/AgeVerification";
import { Navbar } from "../components/Navbar";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Instagram, Twitter, Facebook } from "lucide-react";

const Index = () => {
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const { t } = useLanguage();

  if (!isAgeVerified) {
    return <AgeVerification onVerified={() => setIsAgeVerified(true)} />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1649972904349-6e44c42644a7")',
            filter: 'brightness(0.5)'
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Julie Wells
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-300">
            {t("welcome")}
          </p>
          <Button 
            className="bg-[#c69963] hover:bg-[#b88952] text-white px-8 py-6 text-lg rounded-none"
          >
            Contact Now
          </Button>
        </div>

        {/* Social Media Links */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-6">
          <a href="#" className="hover:text-[#c69963] transition-colors">
            <Instagram size={24} />
          </a>
          <a href="#" className="hover:text-[#c69963] transition-colors">
            <Twitter size={24} />
          </a>
          <a href="#" className="hover:text-[#c69963] transition-colors">
            <Facebook size={24} />
          </a>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div 
                key={item} 
                className="aspect-square overflow-hidden group cursor-pointer"
              >
                <img 
                  src={`https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&h=500&fit=crop`} 
                  alt={`Gallery ${item}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Get in Touch</h2>
          <div className="max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your Email"
              className="w-full mb-4 p-4 bg-[#1a1a1a] border border-[#333] text-white focus:outline-none focus:border-[#c69963]"
            />
            <textarea 
              placeholder="Your Message"
              rows={4}
              className="w-full mb-6 p-4 bg-[#1a1a1a] border border-[#333] text-white focus:outline-none focus:border-[#c69963]"
            />
            <Button 
              className="w-full bg-[#c69963] hover:bg-[#b88952] text-white py-4 rounded-none"
            >
              Send Message
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;