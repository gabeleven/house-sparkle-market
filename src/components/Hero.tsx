
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Search, MessageCircle, Sparkles, Shield, Users } from 'lucide-react';
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
    <section className="relative gradient-pop-hero py-20 overflow-hidden">
      {/* Ben-Day Dot Pattern Background */}
      <div className="absolute inset-0 dots-pattern-lg opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 z-10">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                The Trusted Marketplace for{' '}
                <span className="relative">
                  <span className="bg-gradient-to-r from-pop-orange to-pop-blue bg-clip-text text-transparent">
                    Home Services
                  </span>
                  {/* Pop art style underline */}
                  <div className="absolute -bottom-2 left-0 w-full h-2 bg-pop-orange opacity-80 transform -skew-x-12"></div>
                </span>
              </h1>
              <p className="text-xl text-foreground/80 leading-relaxed font-medium">
                We connect you with verified, CRA-compliant professionals for cleaning, lawn care, and more.
              </p>
            </div>

            {/* Enhanced Search Bar with Pop Art Style */}
            <div className="card-pop-art p-4 max-w-md border-pop-orange shadow-xl">
              <div className="flex items-center">
                <div className="flex items-center flex-1 px-4">
                  <MapPin className="w-5 h-5 text-pop-blue mr-3" />
                  <Input
                    type="text"
                    placeholder="Entrez votre ville ou code postal"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="border-0 focus:ring-0 text-base bg-transparent placeholder:text-foreground/60"
                  />
                </div>
                <Button 
                  onClick={handleSearch}
                  className="btn-pop-orange h-12 px-6"
                >
                  <Search className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Pop Art Trust Indicators */}
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center space-x-2 bg-pop-orange/10 px-4 py-2 rounded-full border border-pop-orange/30">
                <Shield className="w-4 h-4 text-pop-orange" />
                <span className="text-foreground font-medium">Conformité ARC garantie</span>
              </div>
              <div className="flex items-center space-x-2 bg-pop-blue/10 px-4 py-2 rounded-full border border-pop-blue/30">
                <Users className="w-4 h-4 text-pop-blue" />
                <span className="text-foreground font-medium">Professionnels vérifiés</span>
              </div>
              <div className="flex items-center space-x-2 bg-pop-orange/10 px-4 py-2 rounded-full border border-pop-orange/30">
                <Sparkles className="w-4 h-4 text-pop-orange" />
                <span className="text-foreground font-medium">Paiement sécurisé</span>
              </div>
            </div>
          </div>

          {/* Right Content - Enhanced Pop Art Mascot */}
          <div className="flex justify-center lg:justify-end relative">
            <div className="relative">
              {/* Pop Art Background with Ben-Day Dots */}
              <div className="w-96 h-96 rounded-3xl bg-gradient-to-br from-pop-blue/20 to-pop-orange/20 flex items-center justify-center shadow-2xl border-4 border-pop-orange dots-pattern-md animate-dots-float">
                <div className="w-80 h-80 rounded-2xl bg-gradient-to-br from-pop-blue/30 to-pop-orange/30 flex items-center justify-center border-2 border-pop-blue">
                  <img 
                    src="https://raw.githubusercontent.com/rbnblndlrd/HOUSIE-MARKETPLACE/main/c4cf843e-9145-4187-be8f-e172ea9d4986.jpg" 
                    alt="HOUSIE Assistant - Votre experte en conformité fiscale" 
                    className="w-72 h-72 object-cover rounded-xl cursor-pointer hover:scale-105 transition-transform shadow-lg"
                    onClick={handleMascotClick}
                  />
                </div>
              </div>
              
              {/* Pop Art Style Speech Bubble */}
              <div className="absolute -top-4 -left-8 notification-pop rounded-lg p-4 max-w-xs cursor-pointer hover:shadow-xl transition-shadow animate-pop-bounce" onClick={handleMascotClick}>
                <div className="flex items-start space-x-2">
                  <MessageCircle className="w-5 h-5 text-pop-orange mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-foreground font-bold">
                      Bonjour ! Je suis votre assistante HOUSIE.
                    </p>
                    <p className="text-xs text-foreground/70 mt-1">
                      Prête à vous aider avec la conformité ARC 2025 !
                    </p>
                  </div>
                </div>
                {/* Comic book style speech bubble tail */}
                <div className="absolute bottom-0 left-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-pop-orange transform translate-y-full"></div>
              </div>

              {/* Enhanced Action Button */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                <Button 
                  onClick={handleSearch}
                  className="btn-pop-blue text-pop-dark font-bold px-8 py-4 text-lg shadow-xl hover:shadow-2xl"
                >
                  Commencer
                </Button>
              </div>

              {/* Floating Pop Art Elements */}
              <div className="absolute top-10 right-10 w-8 h-8 bg-pop-orange rounded-full animate-bounce opacity-60"></div>
              <div className="absolute bottom-20 right-4 w-6 h-6 bg-pop-blue rounded-full animate-pulse opacity-70"></div>
              <div className="absolute top-1/2 left-4 w-4 h-4 bg-pop-orange rounded-full animate-ping opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
