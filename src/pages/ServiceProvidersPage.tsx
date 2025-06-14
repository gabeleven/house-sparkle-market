
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Shield, DollarSign, Users, Award, CheckCircle, Crown, FileText, BarChart3, TrendingUp, Calculator, Briefcase, Brain, Scan } from "lucide-react";
import Footer from "@/components/Footer";
import { getTierInfo } from "@/types/subscription";
import { useLanguage } from "@/contexts/LanguageContext";

const ServiceProvidersPage = () => {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: FileText,
      titleKey: 'providers.benefit1.title',
      descKey: 'providers.benefit1.desc'
    },
    {
      icon: Calculator,
      titleKey: 'providers.benefit2.title',
      descKey: 'providers.benefit2.desc'
    },
    {
      icon: Users,
      titleKey: 'providers.benefit3.title',
      descKey: 'providers.benefit3.desc'
    },
    {
      icon: Shield,
      titleKey: 'providers.benefit4.title',
      descKey: 'providers.benefit4.desc'
    }
  ];

  const freeFeatures = getTierInfo('FREE').features;
  const starterFeatures = getTierInfo('STARTER').features;
  const professionalFeatures = getTierInfo('PRO').features;
  const premiumFeatures = getTierInfo('PREMIUM').features;

  return (
    <div className="min-h-screen">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge className="bg-red-100 text-red-800 px-4 py-2 text-lg mb-4">
              {t('providers.badge')}
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              The Financial Platform for Canadian Self-Employment
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
              From CRA compliance to AI-powered business intelligence. Choose the level of financial sophistication that matches your entrepreneurial ambitions.
            </p>
            <div className="bg-black/10 backdrop-blur rounded-lg p-6 max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold text-foreground mb-4">Why choose HOUSIE?</h3>
              <div className="grid md:grid-cols-2 gap-4 text-muted-foreground text-left">
                <div>• Lowest marketplace fees (6% vs industry 15-30%)</div>
                <div>• Automated CRA compliance & tax tracking</div>
                <div>• AI-powered business intelligence</div>
                <div>• Canadian-specific financial tools</div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
              Built for Canadian Entrepreneurs
            </h2>
            <div className="grid lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {t(benefit.titleKey)}
                    </h3>
                    <p className="text-muted-foreground">
                      {t(benefit.descKey)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pricing Plans Section */}
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

          {/* Success Stories */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Real Results from Real Canadian Entrepreneurs
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Sarah M. - Cleaning Pro", benefit: "Saved $1,800/year", quote: "The 6% fee vs 20% elsewhere paid for my Pro subscription 10x over. Plus the tax automation saved me 8 hours a month!" },
                { name: "Mike R. - Landscaper", benefit: "Zero Tax Stress", quote: "CRA compliance went from my biggest headache to completely automated. I just focus on growing my business now." },
                { name: "Lisa K. - Home Services", benefit: "30% Revenue Growth", quote: "The market insights helped me optimize my pricing. I'm earning 30% more while working the same hours." }
              ].map((story, index) => (
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

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-card/40 backdrop-blur rounded-lg p-8 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ready to Transform Your Self-Employment Journey?
              </h2>
              <p className="text-muted-foreground mb-6 text-lg">
                Join thousands of Canadian entrepreneurs who've discovered the power of 
                intelligent financial automation. Start free, upgrade when ready.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-4">
                Start Your Free Journey Today
              </Button>
              <p className="text-muted-foreground mt-4 text-sm">
                ✅ No setup fees • ✅ No long-term contracts • ✅ Cancel anytime • ✅ CRA compliant from day one
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ServiceProvidersPage;
