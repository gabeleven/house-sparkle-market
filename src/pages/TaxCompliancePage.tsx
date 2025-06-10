
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, FileText, Calculator, Shield } from 'lucide-react';

const TaxCompliancePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Tax Compliance & CRA Reporting
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Housie.ca is fully compliant with Canada Revenue Agency (CRA) requirements for Digital Platform Operators. 
            We ensure transparent reporting and provide comprehensive tax documentation for all service providers.
          </p>
        </div>

        {/* CRA Compliance Section */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">CRA Digital Platform Operator Compliance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">Our Commitment</h3>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Full compliance with CRA reporting requirements</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Automated transaction tracking and documentation</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Secure data handling and privacy protection</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Regular compliance audits and updates</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">What This Means</h3>
                <p className="text-muted-foreground mb-4">
                  As a registered Digital Platform Operator, Housie.ca reports all qualifying transactions to the CRA 
                  in accordance with federal tax regulations. This ensures transparency and helps service providers 
                  meet their tax obligations.
                </p>
                <p className="text-muted-foreground">
                  All earnings through our platform are properly documented and reported, giving you peace of mind 
                  that your business activities are fully compliant with Canadian tax law.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Benefits for Service Providers */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
            Benefits for Service Providers
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Automated Tax Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Receive automatically generated tax documents including T4A slips and detailed 
                  transaction summaries for easy tax filing.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Calculator className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Annual Summaries</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Get comprehensive annual income summaries with detailed breakdowns by service type, 
                  location, and payment method.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Compliance Assurance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Rest assured that all your platform earnings are properly reported to CRA, 
                  reducing your compliance burden and audit risk.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quebec/Canada Branding Section */}
        <Card className="bg-gradient-to-r from-blue-50 to-red-50 border-blue-200">
          <CardContent className="p-8">
            <div className="flex items-center justify-center space-x-8 mb-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">QC</span>
                </div>
                <p className="text-sm font-medium text-foreground">Quebec</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CA</span>
                </div>
                <p className="text-sm font-medium text-foreground">Canada</p>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                Proudly Serving Quebec and Canada
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Housie.ca operates in full compliance with both federal and provincial tax regulations. 
                Our platform supports bilingual service delivery and adheres to Quebec's specific 
                business requirements while maintaining federal CRA compliance standards.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <div className="text-center mt-12">
          <h3 className="text-xl font-semibold mb-4 text-foreground">
            Questions About Tax Compliance?
          </h3>
          <p className="text-muted-foreground mb-6">
            Our compliance team is here to help answer any questions about tax reporting or documentation.
          </p>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Email: compliance@housie.ca
            </p>
            <p className="text-sm text-muted-foreground">
              Phone: 1-800-HOUSIE-1 (1-800-468-7431)
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TaxCompliancePage;
