import { useNavigate } from "react-router-dom";

export const GenderSelection = () => {
  const navigate = useNavigate();

  const handleSelection = (gender: 'female' | 'male') => {
    // Hier können wir später die Geschlechterauswahl speichern
    navigate('/home');
  };

  return (
    <div className="fixed inset-0 flex">
      {/* Linke Seite - Frau */}
      <div 
        className="w-1/2 relative cursor-pointer group"
        onClick={() => handleSelection('female')}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage: 'url("/lovable-uploads/2a2315eb-05c4-4c59-becf-4fe72a935b04.png")',
            filter: 'brightness(0.6)'
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center transform transition-transform duration-300 group-hover:scale-110">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Ich bin eine Frau
            </h2>
            <div className="w-32 h-1 bg-secondary mx-auto transform origin-left transition-transform duration-300 group-hover:scale-x-150" />
          </div>
        </div>
      </div>

      {/* Rechte Seite - Mann */}
      <div 
        className="w-1/2 relative cursor-pointer group"
        onClick={() => handleSelection('male')}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage: 'url("/lovable-uploads/c1824903-ff6e-47ec-8efc-6391ba0eaa80.png")',
            filter: 'brightness(0.6)'
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center transform transition-transform duration-300 group-hover:scale-110">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Ich bin ein Mann
            </h2>
            <div className="w-32 h-1 bg-secondary mx-auto transform origin-left transition-transform duration-300 group-hover:scale-x-150" />
          </div>
        </div>
      </div>
    </div>
  );
};