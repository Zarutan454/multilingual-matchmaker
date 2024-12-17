import { Star, Heart, UserPlus } from "lucide-react";

export const InfoSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="text-4xl font-bold mb-16 text-white">
          WARUM <span className="text-[#9b87f5]">POPP*IN</span>?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="bg-[#1A1F2C]/80 p-8 rounded-lg backdrop-blur-md border border-[#9b87f5]/30 transform hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(155,135,245,0.2)]">
            <Star className="w-12 h-12 text-[#9b87f5] mx-auto mb-6" />
            <h3 className="text-xl font-semibold mb-4 text-white">Premium Service</h3>
            <p className="text-gray-300">
              Handverlesene Begleiter:innen mit Stil, Charme und Niveau für jeden Anlass
            </p>
          </div>

          <div className="bg-[#1A1F2C]/80 p-8 rounded-lg backdrop-blur-md border border-[#9b87f5]/30 transform hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(155,135,245,0.2)]">
            <Heart className="w-12 h-12 text-[#9b87f5] mx-auto mb-6" />
            <h3 className="text-xl font-semibold mb-4 text-white">Diskret & Sicher</h3>
            <p className="text-gray-300">
              Höchste Sicherheitsstandards und absolute Diskretion für Ihre Privatsphäre
            </p>
          </div>

          <div className="bg-[#1A1F2C]/80 p-8 rounded-lg backdrop-blur-md border border-[#9b87f5]/30 transform hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(155,135,245,0.2)]">
            <UserPlus className="w-12 h-12 text-[#9b87f5] mx-auto mb-6" />
            <h3 className="text-xl font-semibold mb-4 text-white">Einfache Buchung</h3>
            <p className="text-gray-300">
              Unkomplizierte Terminvereinbarung und flexible Buchungsoptionen
            </p>
          </div>
        </div>

        <div className="mt-16 max-w-2xl mx-auto text-gray-300 leading-relaxed">
          <p className="text-lg">
            Entdecken Sie eine Welt voller exklusiver Begleitung und unvergesslicher Momente. 
            Registrieren Sie sich noch heute und erleben Sie Premium-Service auf höchstem Niveau.
          </p>
        </div>
      </div>
    </section>
  );
};