
import { FileText, Calculator, Users, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ProviderBenefitsSection = () => {
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

  return (
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
  );
};

export default ProviderBenefitsSection;
