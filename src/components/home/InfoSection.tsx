import { Clock, Star, MapPin } from "lucide-react";

export const InfoSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12 text-white">ÜBER UNSEREN SERVICE</h2>
        <div className="max-w-4xl mx-auto text-gray-300 leading-relaxed">
          <p className="mb-8">
            Wir bieten Ihnen einen exklusiven Begleitservice der Extraklasse. 
            Unsere sorgfältig ausgewählten Begleiterinnen vereinen Stil, Charme und Intelligenz 
            und sind die perfekte Wahl für jeden gehobenen Anlass.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center">
              <Clock className="w-12 h-12 text-secondary mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Verfügbar</h3>
              <p className="text-sm text-gray-400">Flexible Buchungen rund um die Uhr</p>
            </div>
            <div className="flex flex-col items-center">
              <Star className="w-12 h-12 text-secondary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Premium Service</h3>
              <p className="text-sm text-gray-400">Höchste Qualitätsstandards</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="w-12 h-12 text-secondary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Deutschlandweit</h3>
              <p className="text-sm text-gray-400">In allen großen Städten verfügbar</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};