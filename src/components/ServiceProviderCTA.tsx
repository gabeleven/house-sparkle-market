
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ArrowRight, DollarSign, Users } from "lucide-react";

const ServiceProviderCTA = () => {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-gradient-to-r from-primary to-blue-600 text-white border-0 shadow-2xl overflow-hidden">
          <CardContent className="p-12 relative">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full transform translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full transform -translate-x-24 translate-y-24"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Rejoignez notre réseau de professionnels
                </h2>
                <p className="text-xl opacity-90 max-w-3xl mx-auto">
                  Développez votre entreprise avec HOUSIE. Accédez à de nouveaux clients, 
                  gérez vos réservations facilement et augmentez vos revenus.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Plus de clients</h3>
                    <p className="opacity-90">Accédez à une base de clients en croissance</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Revenus stables</h3>
                    <p className="opacity-90">Paiements sécurisés et réguliers</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="text-lg px-8 py-6 bg-white text-primary hover:bg-gray-100"
                >
                  Devenir prestataire
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <p className="mt-4 text-sm opacity-75">
                  Inscription gratuite • Commissions transparentes • Support dédié
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ServiceProviderCTA;
