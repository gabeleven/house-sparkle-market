
import { Button } from "@/components/ui/button";
import { MapPin, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Hero = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleFindCleaner = () => {
    if (user) {
      navigate('/browse-cleaners');
    } else {
      // Show options: browse without account or sign up
      navigate('/browse-cleaners');
    }
  };

  const handleJoinAsCleaner = () => {
    navigate('/auth?type=cleaner');
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-purple-50 to-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
            Trouvez le{" "}
            <span className="bg-gradient-to-r from-purple-600 to-green-700 bg-clip-text text-transparent">
              nettoyeur parfait
            </span>{" "}
            pour votre maison
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connectez-vous avec des professionnels du nettoyage qualifiés à Montréal. 
            Service rapide, fiable et à des prix compétitifs.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
              onClick={handleFindCleaner}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Trouver un nettoyeur
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-green-600 text-green-700 hover:bg-green-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
              onClick={handleJoinAsCleaner}
            >
              <MapPin className="w-5 h-5 mr-2" />
              Rejoindre comme nettoyeur
            </Button>
          </div>

          {/* Location Badge */}
          <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-md">
            <MapPin className="w-4 h-4 text-purple-600 mr-2" />
            <span className="text-sm text-gray-700">
              Disponible à <span className="font-semibold">Montréal</span> et ses environs
            </span>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Professionnels vérifiés</h3>
              <p className="text-gray-600">Tous nos nettoyeurs sont vérifiés et assurés</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Service local</h3>
              <p className="text-gray-600">Trouvez des nettoyeurs près de chez vous</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Communication sécurisée</h3>
              <p className="text-gray-600">Messagerie intégrée et contacts masqués</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
