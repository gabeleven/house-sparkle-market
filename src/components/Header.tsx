
import { Button } from "@/components/ui/button";
import { MapPin, User } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">HOUSIE</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">
              Comment ça marche
            </a>
            <a href="#for-providers" className="text-gray-600 hover:text-blue-600 transition-colors">
              Pour les prestataires
            </a>
            <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">
              À propos
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="text-gray-600">
              <User className="w-4 h-4 mr-2" />
              Se connecter
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Nous rejoindre
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
