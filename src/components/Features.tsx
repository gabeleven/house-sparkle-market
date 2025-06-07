
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star, CheckCircle } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: MapPin,
      title: "Local et à Proximité",
      description: "Trouvez des services de ménage de confiance dans votre quartier grâce à notre recherche interactive par ville."
    },
    {
      icon: Star,
      title: "Notés et Évalués",
      description: "Lisez de vrais avis de clients réels pour prendre des décisions éclairées sur votre ménager."
    },
    {
      icon: CheckCircle,
      title: "Réservation Facile",
      description: "Processus de réservation en ligne simple avec confirmation instantanée et options de paiement sécurisées."
    }
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Pourquoi choisir HOUSIE ?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nous avons construit la plateforme la plus fiable pour connecter les propriétaires 
            avec des services de ménage professionnels. Voici ce qui nous distingue.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-card">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
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

export default Features;
