import { Star, Heart, UserPlus } from "lucide-react";

export const InfoSection = () => {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-16 text-white">
          WARUM POPP<span className="text-secondary">*</span>IN?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="bg-black/40 p-8 rounded-lg backdrop-blur-sm border border-gray-800 transform hover:scale-105 transition-transform duration-300">
            <Star className="w-12 h-12 text-secondary mx-auto mb-6" />
            <h3 className="text-xl font-semibold mb-4 text-white">Premium Service</h3>
            <p className="text-gray-300">
              Handverlesene Begleiter:innen mit Stil, Charme und Niveau für jeden Anlass
            </p>
          </div>

          <div className="bg-black/40 p-8 rounded-lg backdrop-blur-sm border border-gray-800 transform hover:scale-105 transition-transform duration-300">
            <Heart className="w-12 h-12 text-secondary mx-auto mb-6" />
            <h3 className="text-xl font-semibold mb-4 text-white">Diskret & Sicher</h3>
            <p className="text-gray-300">
              Höchste Sicherheitsstandards und absolute Diskretion für Ihre Privatsphäre
            </p>
          </div>

          <div className="bg-black/40 p-8 rounded-lg backdrop-blur-sm border border-gray-800 transform hover:scale-105 transition-transform duration-300">
            <UserPlus className="w-12 h-12 text-secondary mx-auto mb-6" />
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