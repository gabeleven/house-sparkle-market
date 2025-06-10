
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const TestimonialSection = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ce que disent nos professionnels
          </h2>
        </div>

        <Card className="border-0 shadow-xl bg-card">
          <CardContent className="p-12">
            <div className="flex items-center justify-center mb-8">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            
            <blockquote className="text-2xl text-center text-foreground mb-8 leading-relaxed">
              "Housie a éliminé tout le stress de mes taxes. J'avais l'habitude de passer des heures sur des feuilles de calcul, maintenant tout est fait pour moi. Je peux juste me concentrer sur mes clients et faire grandir mon entreprise."
            </blockquote>
            
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">CR</span>
              </div>
              <div className="text-center">
                <p className="font-semibold text-foreground">Chloé R.</p>
                <p className="text-muted-foreground">Professionnelle de ménage à Montréal</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TestimonialSection;
