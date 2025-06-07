
import { Card, CardContent } from "@/components/ui/card";
import { Search, Calendar, Star, MapPin } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      step: "1",
      icon: MapPin,
      title: "Recherchez dans votre région",
      description: "Entrez votre ville ou code postal pour trouver des professionnels de ménage vérifiés près de chez vous."
    },
    {
      step: "2",
      icon: Search,
      title: "Parcourez et comparez",
      description: "Consultez les profils, lisez les avis, vérifiez les notes et comparez les prix de plusieurs ménagers."
    },
    {
      step: "3",
      icon: Calendar,
      title: "Réservez et planifiez",
      description: "Choisissez votre ménager préféré, sélectionnez votre date de service et réservez instantanément en ligne."
    },
    {
      step: "4",
      icon: Star,
      title: "Profitez et évaluez",
      description: "Détendez-vous pendant que votre ménager fait sa magie, puis laissez un avis pour aider les autres."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Comment fonctionne HOUSIE
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trouver des services de ménage de qualité n'a jamais été aussi facile. 
            Suivez ces étapes simples pour que votre maison soit impeccable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-primary/20 transform translate-x-4 -translate-y-1/2 z-0"></div>
                )}
                
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-card relative z-10">
                  <CardContent className="p-8 text-center">
                    {/* Step Number */}
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      {step.step}
                    </div>
                    
                    {/* Icon */}
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
