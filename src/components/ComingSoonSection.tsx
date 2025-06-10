
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, PawPrint, Wrench } from "lucide-react";

const ComingSoonSection = () => {
  const upcomingServices = [
    {
      icon: Leaf,
      name: "Entretien de pelouse"
    },
    {
      icon: PawPrint,
      name: "Garde d'animaux"
    },
    {
      icon: Wrench,
      name: "Réparations"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Plus de services bientôt disponibles !
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {upcomingServices.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="border-0 shadow-md bg-card/50">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-muted-foreground font-medium">
                    {service.name}
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

export default ComingSoonSection;
