
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Search, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useChatbot } from '@/contexts/ChatbotContext';

const Hero = () => {
  const [location, setLocation] = useState('');
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { openChatbot } = useChatbot();

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

  const handleMascotClick = () => {
    openChatbot('support');
  };

  return (
    <section className="relative bg-gradient-to-br from-purple-50 to-green-50 dark:from-purple-950/20 dark:to-green-950/20 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                The Trusted Marketplace for{' '}
                <span className="bg-gradient-to-r from-[hsl(var(--pop-orange))] to-[hsl(var(--pop-blue))] bg-clip-text text-transparent">
                  Home Services
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We connect you with verified, CRA-compliant professionals for cleaning, lawn care, and more.
              </p>
            </div>

            {/* Search Bar */}
            <div className="pop-card bg-card p-2 rounded-full shadow-lg border border-border max-w-md">
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
                  className="search-btn-pop rounded-full h-12 px-6"
                >
                  <Search className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="status-blue w-2 h-2 rounded-full"></div>
                <span>Conformité ARC garantie</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="status-orange w-2 h-2 rounded-full"></div>
                <span>Professionnels vérifiés</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="status-blue w-2 h-2 rounded-full"></div>
                <span>Paiement sécurisé</span>
              </div>
            </div>
          </div>

          {/* Right Content - Mascot */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Background circle with gradient */}
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-[hsl(var(--pop-blue)/0.3)] to-[hsl(var(--pop-orange)/0.3)] dark:from-[hsl(var(--pop-blue)/0.2)] dark:to-[hsl(var(--pop-orange)/0.2)] flex items-center justify-center shadow-2xl ben-day-dots">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-[hsl(var(--pop-blue)/0.4)] to-[hsl(var(--pop-orange)/0.4)] dark:from-[hsl(var(--pop-blue)/0.3)] dark:to-[hsl(var(--pop-orange)/0.3)] flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/07286e6b-b7fd-41bc-bcce-410276ead793.png" 
                    alt="HOUSIE Assistant - Votre experte en conformité fiscale" 
                    className="w-56 h-56 object-contain cursor-pointer hover:scale-105 transition-transform"
                    onClick={handleMascotClick}
                  />
                </div>
              </div>
              
              {/* Welcome message from mascot */}
              <div className="absolute -top-4 -left-8 chat-pop bg-card border border-border rounded-lg p-4 shadow-lg max-w-xs cursor-pointer hover:shadow-xl transition-shadow" onClick={handleMascotClick}>
                <div className="flex items-start space-x-2">
                  <MessageCircle className="w-5 h-5 text-[hsl(var(--pop-blue))] mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-foreground font-medium">
                      Bonjour ! Je suis votre assistante HOUSIE.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Prête à vous aider avec la conformité ARC 2025 !
                    </p>
                  </div>
                </div>
              </div>

              {/* Action button */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                <Button 
                  onClick={handleSearch}
                  className="pop-orange-btn font-bold px-8 py-3 rounded-full shadow-lg"
                >
                  Commencer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
