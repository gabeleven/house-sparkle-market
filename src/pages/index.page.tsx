
import Hero from "../components/Hero";
import CleanerBenefits from "../components/CleanerBenefits";
import TestimonialSection from "../components/TestimonialSection";
import TaxComplianceSection from "../components/TaxComplianceSection";
import ComingSoonSection from "../components/ComingSoonSection";
import ServiceProviderCTA from "../components/ServiceProviderCTA";

export { Page };

function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-orange-200 to-yellow-300">
      <Hero />
      <CleanerBenefits />
      <TestimonialSection />
      <TaxComplianceSection />
      <ComingSoonSection />
      <ServiceProviderCTA />
    </div>
  );
}
