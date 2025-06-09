
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Shield, DollarSign, Users, Award, CheckCircle, Crown, FileText, BarChart3, TrendingUp, Calculator, Briefcase } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SubscriptionTier, getTierInfo } from "@/types/subscription";
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

  const freeFeatures = getTierInfo(SubscriptionTier.FREE).features;
  const starterFeatures = getTierInfo(SubscriptionTier.STARTER).features;
  const professionalFeatures = getTierInfo(SubscriptionTier.PROFESSIONAL).features;
  const premiumFeatures = getTierInfo(SubscriptionTier.PREMIUM).features;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-green-800 to-yellow-700">
      <Header />
      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge className="bg-red-100 text-red-800 px-4 py-2 text-lg mb-4">
              {t('providers.badge')}
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              {t('providers.title')}
            </h1>
            <p className="text-xl text-green-100 max-w-4xl mx-auto mb-8">
              {t('providers.subtitle')}
            </p>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold text-white mb-4">What the new laws require:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-green-100 text-left">
                <div>• {t('providers.requirement1')}</div>
                <div>• {t('providers.requirement2')}</div>
                <div>• {t('providers.requirement3')}</div>
                <div>• {t('providers.requirement4')}</div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              {t('providers.whyTitle')}
            </h2>
            <div className="grid lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {t(benefit.titleKey)}
                    </h3>
                    <p className="text-green-100">
                      {t(benefit.descKey)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pricing Plans Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              Tax compliance that grows with your business
            </h2>
            <p className="text-center text-green-100 mb-12 max-w-2xl mx-auto">
              From legal compliance to market domination - choose the level of tax sophistication that matches your business goals
            </p>
            
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Free Plan */}
              <Card className="bg-white shadow-2xl border-0">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <Badge className="bg-blue-100 text-blue-800 mb-3">🏛️ {t('plan.free.name')}</Badge>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Free</h3>
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="text-3xl font-bold text-blue-600">$0</span>
                      <span className="text-gray-500 ml-2">/{t('month')}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{t('plan.free.tagline')}</p>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {freeFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 font-semibold">
                    {t('plan.free.cta')}
                  </Button>
                </CardContent>
              </Card>

              {/* Starter Plan */}
              <Card className="bg-white shadow-2xl border-0">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <Badge className="bg-green-100 text-green-800 mb-3">📊 {t('plan.starter.name')}</Badge>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Starter</h3>
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="text-3xl font-bold text-green-600">$12</span>
                      <span className="text-gray-500 ml-2">/{t('month')}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{t('plan.starter.savings')}</p>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {starterFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <Award className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className={`text-gray-700 ${feature.includes('PLUS') ? 'font-semibold text-green-600' : ''}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button className="w-full bg-green-600 hover:bg-green-700 font-semibold">
                    {t('plan.starter.cta')}
                  </Button>
                </CardContent>
              </Card>

              {/* Professional Plan */}
              <Card className="bg-white shadow-2xl border-0 ring-2 ring-purple-500 scale-105">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <Badge className="bg-purple-100 text-purple-800 mb-3">{t('plan.professional.popular')}</Badge>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Professional</h3>
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="text-3xl font-bold text-purple-600">$25</span>
                      <span className="text-gray-500 ml-2">/{t('month')}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{t('plan.professional.savings')}</p>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {professionalFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <Briefcase className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className={`text-gray-700 ${feature.includes('PLUS') ? 'font-semibold text-purple-600' : ''}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button className="w-full bg-purple-600 hover:bg-purple-700 font-semibold">
                    {t('plan.professional.cta')}
                  </Button>
                </CardContent>
              </Card>

              {/* Premium Plan */}
              <Card className="bg-white shadow-2xl border-0">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <Badge className="bg-yellow-100 text-yellow-800 mb-3">👑 {t('plan.premium.name')}</Badge>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Premium</h3>
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="text-3xl font-bold text-yellow-600">$39</span>
                      <span className="text-gray-500 ml-2">/{t('month')}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{t('plan.premium.tagline')}</p>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {premiumFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <Crown className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className={`text-gray-700 ${feature.includes('PLUS') ? 'font-semibold text-yellow-600' : ''}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button className="w-full bg-yellow-600 hover:bg-yellow-700 font-semibold">
                    {t('plan.premium.cta')}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Success Stories with Tax Focus */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-8">
              How tax compliance became competitive advantage
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Sarah M.", benefit: "Saved $1,200", quote: "HOUSIE's tax tracking saved me more than my accountant charged. Plus I got 3x more clients!" },
                { name: "Mike R.", benefit: "Zero Tax Stress", quote: "CRA compliance is automatic now. I just focus on cleaning - HOUSIE handles the paperwork." },
                { name: "Lisa K.", benefit: "Business Growth", quote: "The market insights helped me raise my prices 30%. Tax compliance became profit optimization!" }
              ].map((story, index) => (
                <Card key={index} className="bg-white/10 border-white/20 backdrop-blur">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-green-200 mb-2">{story.benefit}</div>
                    <div className="text-white font-semibold mb-3">{story.name}</div>
                    <p className="text-green-100 text-sm">"{story.quote}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-white/5 backdrop-blur rounded-lg p-8 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4">
                Don't just comply with the law - use it as your competitive advantage
              </h2>
              <p className="text-green-100 mb-6 text-lg">
                While your competitors scramble to meet basic tax requirements, 
                you'll be using advanced tax intelligence to dominate your market.
              </p>
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4">
                Start Your Tax-Compliant Business Today
              </Button>
              <p className="text-green-200 mt-4 text-sm">
                ✅ Free tier keeps you CRA compliant • ✅ No setup fees • ✅ Cancel anytime
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
