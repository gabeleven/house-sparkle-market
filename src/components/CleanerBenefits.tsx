
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Shield, Clock, Star, Award } from "lucide-react";

const CleanerBenefits = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Assurance complète",
      description: "Tous nos professionnels sont assurés et vérifiés"
    },
    {
      icon: Clock,
      title: "Réservation flexible",
      description: "Planifiez selon votre horaire, même à la dernière minute"
    },
    {
      icon: Star,
      title: "Qualité garantie",
      description: "Service de qualité supérieure ou nous revenons gratuitement"
    },
    {
      icon: Award,
      title: "Professionnels certifiés",
      description: "Équipe formée aux meilleures pratiques de nettoyage"
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Pourquoi choisir nos professionnels ?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Des services de qualité supérieure avec la tranquillité d'esprit que vous méritez
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <Card key={index} className="border-0 shadow-lg bg-card/70 backdrop-blur-sm hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Badge className="bg-primary/10 text-primary px-6 py-2 text-lg">
            Plus de 1000+ services complétés avec succès
          </Badge>
        </div>
      </div>
    </section>
  );
};

export default CleanerBenefits;
