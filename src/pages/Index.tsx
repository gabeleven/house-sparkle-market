
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CleanerBenefits from "@/components/CleanerBenefits";
import TestimonialSection from "@/components/TestimonialSection";
import TaxComplianceSection from "@/components/TaxComplianceSection";
import ServiceProviderCTA from "@/components/ServiceProviderCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <CleanerBenefits />
      <TestimonialSection />
      <TaxComplianceSection />
      <ServiceProviderCTA />
      <Footer />
    </div>
  );
};

export default Index;
