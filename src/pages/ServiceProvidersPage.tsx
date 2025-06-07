
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, Shield, DollarSign, Users, Award, MessageCircle, Eye, Calendar, BarChart3, Crown } from "lucide-react";
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
          {/* Benefits Section - Now at the top */}
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
                      <span className="text-4xl font-bold text-purple-600">$12</span>
                      <span className="text-gray-500 ml-2">/mois</span>
                    </div>
                    <p className="text-gray-600 mt-2">Parfait pour commencer</p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start">
                      <Star className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Profil de base</span>
                    </li>
                    <li className="flex items-start">
                      <Award className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">2 catégories de services</span>
                    </li>
                    <li className="flex items-start">
                      <MessageCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Transfert des demandes clients</span>
                    </li>
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
                      <span className="text-4xl font-bold text-purple-600">$18</span>
                      <span className="text-gray-500 ml-2">/mois</span>
                    </div>
                    <p className="text-gray-600 mt-2">Pour les professionnels actifs</p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start">
                      <Award className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Services illimités</span>
                    </li>
                    <li className="flex items-start">
                      <TrendingUp className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Placement prioritaire dans les recherches</span>
                    </li>
                    <li className="flex items-start">
                      <Calendar className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Calendrier de réservation</span>
                    </li>
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
                      <span className="text-4xl font-bold text-yellow-600">$28</span>
                      <span className="text-gray-500 ml-2">/mois</span>
                    </div>
                    <p className="text-gray-600 mt-2">Maximum de visibilité</p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start">
                      <Crown className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Annonces en vedette</span>
                    </li>
                    <li className="flex items-start">
                      <BarChart3 className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Tableau de bord analytique</span>
                    </li>
                    <li className="flex items-start">
                      <Star className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Image de marque personnalisée</span>
                    </li>
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
