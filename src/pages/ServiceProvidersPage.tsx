
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import PricingPlansSection from "@/components/providers/PricingPlansSection";
import ProviderBenefitsSection from "@/components/providers/ProviderBenefitsSection";
import TestimonialsSection from "@/components/providers/TestimonialsSection";

const ServiceProvidersPage = () => {
  const { t } = useLanguage();

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
          <ProviderBenefitsSection />

          {/* Pricing Plans Section */}
          <PricingPlansSection />

          {/* Success Stories */}
          <TestimonialsSection />

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
