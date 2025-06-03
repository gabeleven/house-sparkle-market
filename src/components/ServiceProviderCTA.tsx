
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, Shield, DollarSign, Users, Award } from "lucide-react";

const ServiceProviderCTA = () => {
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

  const subscriptionFeatures = [
    "Vitrine de profil professionnel avec galerie photos",
    "Placement prioritaire dans les résultats de recherche",
    "Tableau de bord de gestion de réservations avancé",
    "Outils de communication client",
    "Analyses de performance et insights",
    "Traitement de paiement instantané",
    "Système de gestion des avis",
    "Outils marketing et promotions"
  ];

  return (
    <section id="for-providers" className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-lg mb-4">
            Pour les prestataires de services
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Développez votre entreprise de ménage
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Rejoignez des centaines de professionnels du ménage qui ont transformé 
            leur entreprise avec la plateforme puissante de HOUSIE.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Benefits Grid */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">
              Pourquoi les prestataires choisissent HOUSIE
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-blue-100">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Subscription Features Card */}
          <Card className="bg-white shadow-2xl border-0">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Abonnement professionnel
                </h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-blue-600">29€</span>
                  <span className="text-gray-500 ml-2">/mois</span>
                </div>
                <p className="text-gray-600 mt-2">Tout ce dont vous avez besoin pour réussir</p>
              </div>

              <ul className="space-y-3 mb-8">
                {subscriptionFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Award className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-4 h-auto font-semibold">
                Commencez votre essai gratuit de 30 jours
              </Button>
              
              <p className="text-center text-sm text-gray-500 mt-4">
                Aucun frais d'installation • Annulation à tout moment • Support complet inclus
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Success Stories */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-8">
            Témoignages de nos prestataires
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah M.", increase: "150%", quote: "HOUSIE m'a aidée à tripler ma clientèle en seulement 3 mois !" },
              { name: "Mike R.", increase: "200%", quote: "Le profil professionnel fait vraiment la différence. Plus de réservations que jamais !" },
              { name: "Lisa K.", increase: "180%", quote: "J'adore le système de planification et paiement automatisé. Ça me fait gagner des heures !" }
            ].map((story, index) => (
              <Card key={index} className="bg-white/10 border-white/20 backdrop-blur">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-200 mb-2">+{story.increase}</div>
                  <div className="text-white font-semibold mb-3">{story.name}</div>
                  <p className="text-blue-100 text-sm">"{story.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceProviderCTA;
