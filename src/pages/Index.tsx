
import Hero from "@/components/Hero";
import CleanerBenefits from "@/components/CleanerBenefits";
import TestimonialSection from "@/components/TestimonialSection";
import TaxComplianceSection from "@/components/TaxComplianceSection";
import ComingSoonSection from "@/components/ComingSoonSection";
import ServiceProviderCTA from "@/components/ServiceProviderCTA";
import { SEO } from "@/components/SEO";

const Index = () => {
  return (
    <>
      <SEO 
        title="HOUSIE - Professional Service Providers Across Canada"
        description="Find trusted, verified service providers across Canada. From cleaning services to home maintenance, connect with professionals in your area through HOUSIE's secure platform."
        keywords="service providers Canada, cleaning services, home maintenance, professional services, trusted providers, verified cleaners"
        url="https://housie.ca"
      />
      <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-orange-200 to-yellow-300">
        <Hero />
        <CleanerBenefits />
        <TestimonialSection />
        <TaxComplianceSection />
        <ComingSoonSection />
        <ServiceProviderCTA />
      </div>
    </>
  );
};

export default Index;
