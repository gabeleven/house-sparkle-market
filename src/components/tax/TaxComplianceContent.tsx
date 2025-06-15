
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { CheckCircle, FileText, Calculator, Shield, BarChart3, DollarSign, TrendingUp } from 'lucide-react';

export const TaxComplianceOverview = () => (
  <Card className="mb-8">
    <CardHeader className="text-center">
      <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
        <Shield className="w-8 h-8 text-green-600" />
      </div>
      <CardTitle className="text-xl lg:text-2xl">CRA Digital Platform Operator Compliance</CardTitle>
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
);

export const TaxBenefitsSection = () => {
  const benefits = [
    {
      icon: FileText,
      title: "Automated Tax Documents",
      description: "Receive automatically generated tax documents including T4A slips and detailed transaction summaries for easy tax filing."
    },
    {
      icon: Calculator,
      title: "Annual Summaries",
      description: "Get comprehensive annual income summaries with detailed breakdowns by service type, location, and payment method."
    },
    {
      icon: Shield,
      title: "Compliance Assurance",
      description: "Rest assured that all your platform earnings are properly reported to CRA, reducing your compliance burden and audit risk."
    }
  ];

  return (
    <div className="mb-12">
      <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8 text-foreground">
        Benefits for Service Providers
      </h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => {
          const IconComponent = benefit.icon;
          return (
            <Card key={index}>
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <IconComponent className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export const TaxDashboardPreview = () => (
  <Card className="mb-8">
    <CardHeader className="text-center">
      <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
        <BarChart3 className="w-8 h-8 text-blue-600" />
      </div>
      <CardTitle className="text-xl lg:text-2xl">Provider Tax Dashboard</CardTitle>
      <p className="text-muted-foreground mt-2">
        Access all your tax documents and track your income in real-time
      </p>
    </CardHeader>
    <CardContent>
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground truncate">Total Revenue</span>
              <DollarSign className="h-4 w-4 text-green-600 flex-shrink-0" />
            </div>
            <div className="text-xl lg:text-2xl font-bold text-foreground">$28,750</div>
            <p className="text-xs text-green-600 truncate">+12% vs last year</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground truncate">Transactions</span>
              <TrendingUp className="h-4 w-4 text-blue-600 flex-shrink-0" />
            </div>
            <div className="text-xl lg:text-2xl font-bold text-foreground">127</div>
            <p className="text-xs text-blue-600 truncate">This quarter</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground truncate">Estimated Tax</span>
              <FileText className="h-4 w-4 text-purple-600 flex-shrink-0" />
            </div>
            <div className="text-xl lg:text-2xl font-bold text-foreground">$4,033</div>
            <p className="text-xs text-purple-600 truncate">Based on 15% tax rate</p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);
