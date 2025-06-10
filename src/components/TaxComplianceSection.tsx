
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Calculator, TrendingUp, FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const TaxComplianceSection = () => {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: Shield,
      title: "Conformité ARC Automatique",
      description: "Suivi et déclaration fiscale automatiques pour respecter les nouvelles exigences légales 2025 du Canada"
    },
    {
      icon: Calculator,
      title: "Économies Comptables",
      description: "Économisez 500 $ à 2 000 $ et plus annuellement par rapport à l'embauche de comptables"
    },
    {
      icon: TrendingUp,
      title: "Croissance des Affaires",
      description: "Accédez à des milliers de clients potentiels dans votre région"
    },
    {
      icon: FileText,
      title: "Protection Juridique",
      description: "Évitez les pénalités et vérifications grâce à notre conformité ARC intégrée"
    }
  ];

  return (
    <section className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Alert Banner */}
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 mb-12">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-destructive text-destructive-foreground mb-3">
                🚨 Nouvelles Lois Fiscales 2025 - Conformité Obligatoire
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Chaque entreprise de ménage au Canada doit maintenant suivre ses revenus
              </h2>
              <p className="text-muted-foreground">
                Nouvelles exigences légales : suivi des revenus pour 30+ transactions OU 2 800 $ et plus annuellement
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            La seule plateforme conçue pour les nouvelles lois fiscales du Canada
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nous rendons la conformité fiscale automatique, non optionnelle. 
            Développez votre entreprise tout en respectant parfaitement les exigences de l'ARC.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="space-y-4">
            <Link to="/prestataires">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3">
                Découvrir HOUSIE Pro
              </Button>
            </Link>
            <Link to="/comment-ca-marche">
              <Button variant="outline" size="lg" className="ml-4 px-8 py-3">
                Comment ça fonctionne
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaxComplianceSection;
