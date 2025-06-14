
import { Card, CardContent } from "@/components/ui/card";

const TestimonialsSection = () => {
  const testimonials = [
    { 
      name: "Sarah M. - Cleaning Pro", 
      benefit: "Saved $1,800/year", 
      quote: "The 6% fee vs 20% elsewhere paid for my Pro subscription 10x over. Plus the tax automation saved me 8 hours a month!" 
    },
    { 
      name: "Mike R. - Landscaper", 
      benefit: "Zero Tax Stress", 
      quote: "CRA compliance went from my biggest headache to completely automated. I just focus on growing my business now." 
    },
    { 
      name: "Lisa K. - Home Services", 
      benefit: "30% Revenue Growth", 
      quote: "The market insights helped me optimize my pricing. I'm earning 30% more while working the same hours." 
    }
  ];

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-foreground mb-8">
        Real Results from Real Canadian Entrepreneurs
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((story, index) => (
          <Card key={index} className="bg-card/60 border-card backdrop-blur">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-2">{story.benefit}</div>
              <div className="text-foreground font-semibold mb-3">{story.name}</div>
              <p className="text-muted-foreground text-sm">"{story.quote}"</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
