
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, Star } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-green-700 to-yellow-500">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
        }}
      ></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Pros du ménage,
              <span className="block text-yellow-300">près de chez vous.</span>
            </h1>
            <p className="text-xl text-green-100 mb-8 max-w-lg">
              Connectez-vous avec des professionnels du ménage de confiance dans votre région. 
              Réservez instantanément et profitez d'un foyer impeccable.
            </p>

            {/* Main CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button 
                size="lg" 
                className="bg-white text-purple-700 hover:bg-yellow-50 text-lg px-8 py-4 h-auto font-semibold"
              >
                <Search className="w-5 h-5 mr-2" />
                JE CHERCHE
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-purple-700 text-lg px-8 py-4 h-auto font-semibold"
              >
                <Star className="w-5 h-5 mr-2" />
                JE PROPOSE
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="flex justify-center lg:justify-start space-x-8 text-green-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-sm">Ménagers Vérifiés</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">2000+</div>
                <div className="text-sm">Clients Satisfaits</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">4.9★</div>
                <div className="text-sm">Note Moyenne</div>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Search Preview */}
          <div className="lg:pl-8">
            <Card className="bg-white/95 backdrop-blur shadow-2xl border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Commencez votre recherche
                </h3>
                
                {/* Location Input */}
                <div className="relative mb-4">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Entrez votre ville ou code postal"
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg"
                  />
                </div>

                {/* Service Type */}
                <select className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg mb-6">
                  <option>Sélectionnez un service</option>
                  <option>Ménage régulier</option>
                  <option>Ménage récurrent</option>
                  <option>Ménage commercial</option>
                  <option>Ménage touristique</option>
                </select>

                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-4 h-auto font-semibold">
                  <Search className="w-5 h-5 mr-2" />
                  Trouver des ménagers
                </Button>

                <p className="text-center text-sm text-gray-500 mt-4">
                  Recherche gratuite • Aucun frais cachés pour les clients
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
