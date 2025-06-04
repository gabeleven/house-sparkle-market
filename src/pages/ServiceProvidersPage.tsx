
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, Shield, DollarSign, Users, Award, MessageCircle, Eye } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ServiceProvidersPage = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: "Augmentez vos revenus",
      description: "Gagnez plus avec une planification flexible et des fonctionnalités d'annonce premium"
    },
    {
      icon: Users,
      title: "Développez votre clientèle",
      description: "Accédez à des milliers de clients potentiels dans votre région"
    },
    {
      icon: Star,
      title: "Construisez votre réputation",
      description: "Profil professionnel avec système d'avis et de notes"
    },
    {
      icon: Shield,
      title: "Confiance et sécurité",
      description: "Plateforme vérifiée avec paiements sécurisés et options d'assurance"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-green-800 to-yellow-700">
      <Header />
      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-purple-100 text-purple-800 px-4 py-2 text-lg mb-4">
              Pour les prestataires de services
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Développez votre entreprise de ménage
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Rejoignez des centaines de professionnels du ménage qui ont transformé 
              leur entreprise avec la plateforme puissante de HOUSIE.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Benefits Grid */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-8">
                Pourquoi les prestataires choisissent HOUSIE
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-green-100">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid gap-6">
              {/* Free Plan */}
              <Card className="bg-white shadow-2xl border-0">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Gratuit
                    </h3>
                    <div className="flex items-baseline justify-center">
                      <span className="text-3xl font-bold text-green-600">0€</span>
                      <span className="text-gray-500 ml-2">/mois</span>
                    </div>
                    <p className="text-gray-600 mt-2">Consultation anonyme</p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <Eye className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Voir les numéros de téléphone</span>
                    </li>
                    <li className="flex items-start">
                      <Award className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Profil de base</span>
                    </li>
                  </ul>

                  <Button className="w-full bg-gray-600 hover:bg-gray-700 font-semibold">
                    Commencer gratuitement
                  </Button>
                </CardContent>
              </Card>

              {/* Monthly Plan */}
              <Card className="bg-white shadow-2xl border-0 ring-2 ring-purple-500">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <Badge className="bg-purple-100 text-purple-800 mb-2">Populaire</Badge>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Professionnel Mensuel
                    </h3>
                    <div className="flex items-baseline justify-center">
                      <span className="text-3xl font-bold text-purple-600">9,99€</span>
                      <span className="text-gray-500 ml-2">/mois</span>
                    </div>
                    <p className="text-gray-600 mt-2">Messagerie et vérification</p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <MessageCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Système de messagerie</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Usagers vérifiés</span>
                    </li>
                    <li className="flex items-start">
                      <Award className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Réservation en ligne</span>
                    </li>
                    <li className="flex items-start">
                      <Star className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Notifications par courriel</span>
                    </li>
                  </ul>

                  <Button className="w-full bg-purple-600 hover:bg-purple-700 font-semibold">
                    Commencer l'essai gratuit
                  </Button>
                </CardContent>
              </Card>

              {/* Annual Plan */}
              <Card className="bg-white shadow-2xl border-0">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <Badge className="bg-yellow-100 text-yellow-800 mb-2">Économie</Badge>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Professionnel Annuel
                    </h3>
                    <div className="flex items-baseline justify-center">
                      <span className="text-3xl font-bold text-yellow-600">99€</span>
                      <span className="text-gray-500 ml-2">/an</span>
                    </div>
                    <p className="text-gray-600 mt-2">2 mois gratuits !</p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <Award className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Toutes les fonctionnalités pro</span>
                    </li>
                    <li className="flex items-start">
                      <TrendingUp className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Placement prioritaire</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Support prioritaire</span>
                    </li>
                  </ul>

                  <Button className="w-full bg-yellow-600 hover:bg-yellow-700 font-semibold">
                    Choisir le plan annuel
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Success Stories */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-8">
              Témoignages de nos prestataires
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Sarah M.", increase: "150%", quote: "HOUSIE m'a aidée à tripler ma clientèle en seulement 3 mois !" },
                { name: "Mike R.", increase: "200%", quote: "Le profil professionnel fait vraiment la différence. Plus de réservations que jamais !" },
                { name: "Lisa K.", increase: "180%", quote: "J'adore le système de planification et paiement automatisé. Ça me fait gagner des heures !" }
              ].map((story, index) => (
                <Card key={index} className="bg-white/10 border-white/20 backdrop-blur">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-yellow-200 mb-2">+{story.increase}</div>
                    <div className="text-white font-semibold mb-3">{story.name}</div>
                    <p className="text-green-100 text-sm">"{story.quote}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ServiceProvidersPage;
