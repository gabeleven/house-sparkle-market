
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, TrendingUp, Users, Shield } from "lucide-react";

const CleanerBenefits = () => {
  const benefits = [
    {
      icon: Calculator,
      title: "Taxes gérées pour vous, automatiquement",
      description: "Concentrez-vous sur le ménage, pas sur la paperasse. Nous gérons le suivi et les déclarations pour vous maintenir conforme à l'ARC sans stress."
    },
    {
      icon: TrendingUp,
      title: "Gardez plus de ce que vous gagnez",
      description: "Nos outils vous aident à suivre les dépenses et maximiser les déductions, remettant plus d'argent dans votre poche."
    },
    {
      icon: Users,
      title: "Trouvez plus de clients, instantanément",
      description: "Accédez à un flux constant de clients locaux cherchant des professionnels vérifiés comme vous."
    },
    {
      icon: Shield,
      title: "Travaillez avec confiance et tranquillité d'esprit",
      description: "Avec les options d'assurance intégrées et des clients vérifiés, vous pouvez vous concentrer sur votre travail en sachant que vous êtes protégé."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Pourquoi choisir HOUSIE ?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Nous sommes plus qu'une plateforme - nous sommes votre partenaire pour faire croître votre entreprise de ménage en toute simplicité.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-card">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-4">
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
      </div>
    </section>
  );
};

export default CleanerBenefits;
