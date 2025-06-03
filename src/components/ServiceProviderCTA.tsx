
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, Shield, DollarSign, Users, Award } from "lucide-react";

const ServiceProviderCTA = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: "Increase Your Income",
      description: "Earn more with flexible scheduling and premium listing features"
    },
    {
      icon: Users,
      title: "Build Your Client Base",
      description: "Access thousands of potential customers in your area"
    },
    {
      icon: Star,
      title: "Build Your Reputation",
      description: "Professional profile with reviews and ratings system"
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "Verified platform with secure payments and insurance options"
    }
  ];

  const subscriptionFeatures = [
    "Professional profile showcase with photo gallery",
    "Priority placement in search results",
    "Advanced booking management dashboard",
    "Customer communication tools",
    "Performance analytics and insights",
    "Instant payment processing",
    "Review management system",
    "Marketing tools and promotions"
  ];

  return (
    <section id="for-providers" className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-lg mb-4">
            For Service Providers
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Grow Your Cleaning Business
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Join hundreds of successful cleaning professionals who have transformed 
            their business with HOUSIE's powerful platform.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Benefits Grid */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">
              Why Service Providers Choose HOUSIE
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-blue-100">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Subscription Features Card */}
          <Card className="bg-white shadow-2xl border-0">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Professional Subscription
                </h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-blue-600">$29</span>
                  <span className="text-gray-500 ml-2">/month</span>
                </div>
                <p className="text-gray-600 mt-2">Everything you need to succeed</p>
              </div>

              <ul className="space-y-3 mb-8">
                {subscriptionFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Award className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-4 h-auto font-semibold">
                Start Your 30-Day Free Trial
              </Button>
              
              <p className="text-center text-sm text-gray-500 mt-4">
                No setup fees • Cancel anytime • Full support included
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Success Stories */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-8">
            Success Stories from Our Providers
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah M.", increase: "150%", quote: "HOUSIE helped me triple my client base in just 3 months!" },
              { name: "Mike R.", increase: "200%", quote: "The professional profile really makes a difference. More bookings than ever!" },
              { name: "Lisa K.", increase: "180%", quote: "Love the automated scheduling and payment system. It saves me hours!" }
            ].map((story, index) => (
              <Card key={index} className="bg-white/10 border-white/20 backdrop-blur">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-200 mb-2">+{story.increase}</div>
                  <div className="text-white font-semibold mb-3">{story.name}</div>
                  <p className="text-blue-100 text-sm">"{story.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceProviderCTA;
