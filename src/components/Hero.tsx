
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Search, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useChatbot } from '@/contexts/ChatbotContext';
import { useAuth } from '@/hooks/useAuth';
import { AuthInterceptModal } from '@/components/auth/AuthInterceptModal';

const Hero = () => {
  const [location, setLocation] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { openChatbot } = useChatbot();
  const { user } = useAuth();

  const handleSearch = () => {
    if (location.trim()) {
      if (user) {
        // User is already authenticated, go directly to browse cleaners
        navigate(`/browse-cleaners?location=${encodeURIComponent(location)}`);
      } else {
        // User needs to authenticate first
        setShowAuthModal(true);
      }
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
    <>
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Canada's Trusted Marketplace for{' '}
                  <span className="bg-gradient-to-r from-[hsl(var(--pop-orange))] via-purple-400 to-[hsl(var(--pop-blue))] bg-clip-text text-transparent">
                    Home Services
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  We connect you with verified, CRA-compliant professionals for cleaning, lawn care, and more across all Canadian provinces.
                </p>
              </div>

              {/* Search Bar */}
              <div className="pop-card bg-card/80 backdrop-blur-sm p-2 rounded-full shadow-lg border-2 border-purple-500/40 max-w-md relative">
                <div className="flex items-center relative z-10">
                  <div className="flex items-center flex-1 px-4">
                    <MapPin className="w-5 h-5 text-purple-400 mr-3" />
                    <Input
                      type="text"
                      placeholder="Enter your city or postal code"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="border-0 focus:ring-2 focus:ring-purple-400/50 text-base bg-transparent"
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
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-[hsl(var(--pop-blue))]"></div>
                  <span>CRA compliance guaranteed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[hsl(var(--pop-orange))] to-purple-500"></div>
                  <span>Verified professionals</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-[hsl(var(--pop-blue))]"></div>
                  <span>Secure payment</span>
                </div>
              </div>
            </div>

            {/* Right Content - Animated Mascot */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative mascot-container">
                {/* Background circle with gradient */}
                <div className="w-80 h-80 rounded-full bg-gradient-to-br from-[hsl(var(--pop-blue)/0.3)] via-purple-500/20 to-[hsl(var(--pop-orange)/0.3)] dark:from-[hsl(var(--pop-blue)/0.2)] dark:via-purple-600/15 dark:to-[hsl(var(--pop-orange)/0.2)] flex items-center justify-center shadow-2xl ben-day-dots animate-breathing">
                  <div className="w-64 h-64 rounded-full bg-gradient-to-br from-[hsl(var(--pop-blue)/0.4)] via-purple-400/25 to-[hsl(var(--pop-orange)/0.4)] dark:from-[hsl(var(--pop-blue)/0.3)] dark:via-purple-500/20 dark:to-[hsl(var(--pop-orange)/0.3)] flex items-center justify-center">
                    <img 
                      src="https://raw.githubusercontent.com/gabeleven/Housie_Media/main/APPLOGOPNG.png"
                      alt="HOUSIE Assistant - Your Canadian tax compliance expert" 
                      className="w-64 h-64 object-contain cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out animate-gentle-float mascot-interactive mascot-image"
                      onClick={handleMascotClick}
                      style={{
                        margin: 0,
                        padding: 0,
                        border: 0,
                        outline: 'none',
                        background: 'transparent',
                        display: 'block'
                      }}
                    />
                  </div>
                </div>
                
                {/* Welcome message from mascot */}
                <div className="absolute -top-4 -left-8 chat-pop bg-card/90 backdrop-blur-sm border-2 border-purple-400/30 rounded-lg p-4 shadow-lg max-w-xs cursor-pointer hover:shadow-xl hover:border-purple-400/50 transition-all duration-300" onClick={handleMascotClick}>
                  <div className="flex items-start space-x-2 relative z-10">
                    <MessageCircle className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-foreground font-medium">
                        Hello! I'm your HOUSIE assistant.
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Ready to help with CRA 2025 compliance across Canada!
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
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authentication Modal */}
      <AuthInterceptModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        postalCode={location}
      />
    </>
  );
};

export default Hero;
