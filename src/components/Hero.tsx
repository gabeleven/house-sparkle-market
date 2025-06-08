
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (location.trim()) {
      navigate(`/browse-cleaners?location=${encodeURIComponent(location)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-purple-50 to-green-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Des services de{' '}
                <span className="bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-transparent">
                  ménage
                </span>{' '}
                exceptionnels
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Trouvez des professionnels de ménage vérifiés près de chez vous. 
                Réservez en ligne, payez en toute sécurité, et profitez d'un service impeccable.
              </p>
            </div>

            {/* Search Bar */}
            <div className="bg-white p-2 rounded-full shadow-lg border border-gray-100 max-w-md">
              <div className="flex items-center">
                <div className="flex items-center flex-1 px-4">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                  <Input
                    type="text"
                    placeholder="Entrez votre ville ou code postal"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="border-0 focus:ring-0 text-base"
                  />
                </div>
                <Button 
                  onClick={handleSearch}
                  className="rounded-full h-12 px-6 bg-purple-600 hover:bg-purple-700"
                >
                  <Search className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Professionnels vérifiés</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Paiement sécurisé</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Satisfaction garantie</span>
              </div>
            </div>
          </div>

          {/* Right Content - Logo */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <img 
                src="/lovable-uploads/2822530e-b624-4881-8cbd-d4990783a2dc.png" 
                alt="Housie - Professional Cleaning Services" 
                className="w-full max-w-lg h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
