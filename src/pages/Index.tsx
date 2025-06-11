
import Hero from "@/components/Hero";
import CleanerBenefits from "@/components/CleanerBenefits";
import TestimonialSection from "@/components/TestimonialSection";
import TaxComplianceSection from "@/components/TaxComplianceSection";
import ComingSoonSection from "@/components/ComingSoonSection";
import ServiceProviderCTA from "@/components/ServiceProviderCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <CleanerBenefits />
      <TestimonialSection />
      <TaxComplianceSection />
      <ComingSoonSection />
      <ServiceProviderCTA />
    </div>
  );
};

export default Index;
