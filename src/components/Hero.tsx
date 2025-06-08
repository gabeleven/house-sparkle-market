
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
    <section className="relative bg-gradient-to-br from-purple-50 to-green-50 dark:from-purple-950/20 dark:to-green-950/20 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Des services de{' '}
                <span className="bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-transparent">
                  ménage
                </span>{' '}
                exceptionnels
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Trouvez des professionnels de ménage vérifiés près de chez vous. 
                Réservez en ligne, payez en toute sécurité, et profitez d'un service impeccable.
              </p>
            </div>

            {/* Search Bar */}
            <div className="bg-card p-2 rounded-full shadow-lg border border-border max-w-md">
              <div className="flex items-center">
                <div className="flex items-center flex-1 px-4">
                  <MapPin className="w-5 h-5 text-muted-foreground mr-3" />
                  <Input
                    type="text"
                    placeholder="Entrez votre ville ou code postal"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="border-0 focus:ring-0 text-base bg-transparent"
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
            <div className="flex items-center space-x-8 text-sm text-muted-foreground">
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

          {/* Right Content - Circular Logo */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-800/30 dark:to-pink-800/30 flex items-center justify-center shadow-2xl">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-purple-300 to-pink-300 dark:from-purple-700/50 dark:to-pink-700/50 flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/7e996b12-8e81-4588-9463-feb35fd38aec.png" 
                    alt="Housie - Professional Cleaning Services" 
                    className="w-48 h-48 object-contain"
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                <div className="bg-card px-6 py-3 rounded-full shadow-lg border border-border">
                  <span className="text-2xl font-bold text-foreground">HOUSIE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
