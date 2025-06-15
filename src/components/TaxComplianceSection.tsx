
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { FileText, Calculator, Shield, CheckCircle } from "lucide-react";

const TaxComplianceSection = () => {
  const features = [
    {
      icon: FileText,
      title: "Suivi automatique des revenus",
      description: "Tous vos gains sont automatiquement enregistrés et organisés"
    },
    {
      icon: Calculator,
      title: "Calculs de taxes simplifiés",
      description: "Nous calculons vos obligations fiscales en temps réel"
    },
    {
      icon: Shield,
      title: "Conformité CRA garantie",
      description: "Respect total des exigences de l'Agence du revenu du Canada"
    },
    {
      icon: CheckCircle,
      title: "Rapports prêts pour la déclaration",
      description: "Documents fiscaux générés automatiquement à la fin de l'année"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Gestion fiscale automatisée pour les travailleurs autonomes
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            HOUSIE simplifie la comptabilité et la conformité fiscale pour que vous puissiez 
            vous concentrer sur votre business
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="bg-card border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Prêt à simplifier vos finances ?
            </h3>
            <p className="text-muted-foreground mb-6 text-lg">
              Rejoignez des milliers de travailleurs autonomes qui font confiance à HOUSIE 
              pour leur gestion fiscale
            </p>
            <Button size="lg" className="text-lg px-8 py-6">
              Commencer gratuitement
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Aucune carte de crédit requise • Configuration en 5 minutes
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TaxComplianceSection;
