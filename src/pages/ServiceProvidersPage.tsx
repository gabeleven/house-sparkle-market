
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, Shield, DollarSign, Users, Award, MessageCircle, Eye, Calendar, BarChart3, Crown, Mail, Bell, MapPin, Image, Palette } from "lucide-react";
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

  const starterFeatures = [
    "Profil de base",
    "2 catégories de services",
    "Transfert des demandes clients",
    "Messagerie intégrée",
    "Gestion des rendez-vous de base",
    "Support par email"
  ];

  const professionalFeatures = [
    "Tout de Starter PLUS:",
    "Jusqu'à 5 catégories de services",
    "Favoris pour clients récurrents",
    "Intégration calendrier avancée",
    "Rapports de revenus (pour taxes)",
    "Positionnement sur carte interactive",
    "Placement prioritaire dans les recherches",
    "Calendrier de réservation automatisé",
    "Notifications en temps réel",
    "Support prioritaire"
  ];

  const premiumFeatures = [
    "Tout de Professional PLUS:",
    "Services illimités",
    "Tableau de bord analytique avancé",
    "Annonces en vedette",
    "Image de marque personnalisée",
    "Bannières d'entreprise personnalisées",
    "Galerie de photos avant/après",
    "Métriques de performance détaillées",
    "Outils marketing intégrés",
    "Support 24/7 dédié"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-green-800 to-yellow-700">
      <Header />
      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Benefits Section */}
          <div className="mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 text-center">
              Pourquoi les prestataires choisissent HOUSIE
            </h1>
            <div className="grid lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-green-100">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pricing Plans Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              Plans d'abonnement
            </h2>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Starter Plan */}
              <Card className="bg-white shadow-2xl border-0">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Starter
                    </h3>
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-purple-600">12€</span>
                      <span className="text-gray-500 ml-2">/mois</span>
                    </div>
                    <p className="text-gray-600 mt-2">Parfait pour commencer</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {starterFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Star className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-4 h-auto font-semibold">
                    Choisir Starter
                  </Button>
                </CardContent>
              </Card>

              {/* Professional Plan */}
              <Card className="bg-white shadow-2xl border-0 ring-2 ring-purple-500 scale-105">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <Badge className="bg-purple-100 text-purple-800 mb-4">Populaire</Badge>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Professional
                    </h3>
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-purple-600">18€</span>
                      <span className="text-gray-500 ml-2">/mois</span>
                    </div>
                    <p className="text-gray-600 mt-2">Pour les professionnels actifs</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {professionalFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Award className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className={`text-gray-700 text-sm ${feature.includes('PLUS') ? 'font-semibold text-purple-600' : ''}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-4 h-auto font-semibold">
                    Choisir Professional
                  </Button>
                </CardContent>
              </Card>

              {/* Premium Plan */}
              <Card className="bg-white shadow-2xl border-0">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <Badge className="bg-yellow-100 text-yellow-800 mb-4">Premium</Badge>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Premium
                    </h3>
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-yellow-600">28€</span>
                      <span className="text-gray-500 ml-2">/mois</span>
                    </div>
                    <p className="text-gray-600 mt-2">Maximum de visibilité</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {premiumFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Crown className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className={`text-gray-700 text-sm ${feature.includes('PLUS') ? 'font-semibold text-yellow-600' : ''}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-lg py-4 h-auto font-semibold">
                    Choisir Premium
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
