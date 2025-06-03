
import { Card, CardContent } from "@/components/ui/card";
import { Shield, MapPin, Star, Clock, Users, CheckCircle } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Verified Professionals",
      description: "All cleaners are background-checked, insured, and thoroughly vetted for your peace of mind."
    },
    {
      icon: MapPin,
      title: "Local & Nearby",
      description: "Find trusted cleaning services right in your neighborhood with our interactive city search."
    },
    {
      icon: Star,
      title: "Rated & Reviewed",
      description: "Read genuine reviews from real customers to make informed decisions about your cleaner."
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Book one-time cleanings or set up recurring services that fit your busy lifestyle."
    },
    {
      icon: Users,
      title: "Quality Guarantee",
      description: "100% satisfaction guaranteed or we'll make it right. Your trust is our priority."
    },
    {
      icon: CheckCircle,
      title: "Easy Booking",
      description: "Simple online booking process with instant confirmation and secure payment options."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose HOUSIE?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We've built the most trusted platform for connecting homeowners with 
            professional cleaning services. Here's what sets us apart.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
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
