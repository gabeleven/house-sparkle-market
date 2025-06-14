
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Award, BarChart3, Brain } from "lucide-react";
import { getTierInfo } from "@/types/subscription";

const PricingPlansSection = () => {
  const freeFeatures = getTierInfo('FREE').features;
  const starterFeatures = getTierInfo('STARTER').features;
  const professionalFeatures = getTierInfo('PRO').features;
  const premiumFeatures = getTierInfo('PREMIUM').features;

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
        Financial Tools That Grow With Your Business
      </h2>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        From basic CRA compliance to advanced AI business intelligence - choose your level of financial sophistication
      </p>
      
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Free Plan */}
        <Card className="bg-card/80 backdrop-blur shadow-2xl border-0">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <Badge className="bg-blue-100 text-blue-800 mb-3">🏛️ CRA Ready</Badge>
              <h3 className="text-xl font-bold text-foreground mb-2">Free</h3>
              <div className="flex items-baseline justify-center mb-2">
                <span className="text-3xl font-bold text-blue-600">$0</span>
                <span className="text-muted-foreground ml-2">/month</span>
              </div>
              <p className="text-muted-foreground text-sm">Legal compliance foundation</p>
            </div>

            <ul className="space-y-2 mb-6">
              {freeFeatures.map((feature, index) => (
                <li key={index} className="flex items-start text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Button className="w-full bg-blue-600 hover:bg-blue-700 font-semibold">
              Start Free
            </Button>
          </CardContent>
        </Card>

        {/* Starter Plan */}
        <Card className="bg-card/80 backdrop-blur shadow-2xl border-0">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <Badge className="bg-green-100 text-green-800 mb-3">📊 Tax Basics</Badge>
              <h3 className="text-xl font-bold text-foreground mb-2">Starter</h3>
              <div className="flex items-baseline justify-center mb-2">
                <span className="text-3xl font-bold text-green-600">$8</span>
                <span className="text-muted-foreground ml-2">/month</span>
              </div>
              <p className="text-muted-foreground text-sm">Tax automation & tracking</p>
            </div>

            <ul className="space-y-2 mb-6">
              {starterFeatures.map((feature, index) => (
                <li key={index} className="flex items-start text-sm">
                  <Award className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className={`text-foreground ${feature.includes('PLUS') ? 'font-semibold text-green-600' : ''}`}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <Button className="w-full bg-green-600 hover:bg-green-700 font-semibold">
              Upgrade to Starter
            </Button>
          </CardContent>
        </Card>

        {/* Professional Plan */}
        <Card className="bg-card/80 backdrop-blur shadow-2xl border-0 ring-2 ring-purple-500 scale-105">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <Badge className="bg-purple-100 text-purple-800 mb-3">🚀 Most Popular</Badge>
              <h3 className="text-xl font-bold text-foreground mb-2">Pro</h3>
              <div className="flex items-baseline justify-center mb-2">
                <span className="text-3xl font-bold text-purple-600">$15</span>
                <span className="text-muted-foreground ml-2">/month</span>
              </div>
              <p className="text-muted-foreground text-sm">Business intelligence & insights</p>
            </div>

            <ul className="space-y-2 mb-6">
              {professionalFeatures.map((feature, index) => (
                <li key={index} className="flex items-start text-sm">
                  <BarChart3 className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className={`text-foreground ${feature.includes('PLUS') ? 'font-semibold text-purple-600' : ''}`}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <Button className="w-full bg-purple-600 hover:bg-purple-700 font-semibold">
              Get Pro Access
            </Button>
          </CardContent>
        </Card>

        {/* Premium Plan */}
        <Card className="bg-card/80 backdrop-blur shadow-2xl border-0">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <Badge className="bg-yellow-100 text-yellow-800 mb-3">🤖 AI Suite</Badge>
              <h3 className="text-xl font-bold text-foreground mb-2">Premium</h3>
              <div className="flex items-baseline justify-center mb-2">
                <span className="text-3xl font-bold text-yellow-600">$25</span>
                <span className="text-muted-foreground ml-2">/month</span>
              </div>
              <p className="text-muted-foreground text-sm">Advanced AI business tools</p>
            </div>

            <ul className="space-y-2 mb-6">
              {premiumFeatures.map((feature, index) => (
                <li key={index} className="flex items-start text-sm">
                  <Brain className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className={`text-foreground ${feature.includes('PLUS') ? 'font-semibold text-yellow-600' : ''}`}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <Button className="w-full bg-yellow-600 hover:bg-yellow-700 font-semibold">
              Get AI Suite
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PricingPlansSection;
