
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="text-2xl font-bold">HOUSIE</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Connecter les propriétaires avec des professionnels de ménage de confiance. 
              Votre satisfaction est notre garantie.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                <Instagram className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Ménage de maison</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Grand ménage</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ménage déménagement</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ménage bureau</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ménage post-construction</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Entreprise</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">À propos de nous</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Comment ça marche</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pour les prestataires</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sécurité et confiance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Centre d'aide</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5" />
                <span>support@housie.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5" />
                <span>01-80-HOUSIE</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5" />
                <span>Disponible partout en France</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 HOUSIE. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Politique de confidentialité
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Conditions d'utilisation
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Politique des cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
