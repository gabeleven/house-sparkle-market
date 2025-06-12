
import React from 'react';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, FileText, Calculator, Shield, Download, BarChart3, DollarSign, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const TaxCompliancePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Tax Compliance & CRA Reporting
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
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

        {/* Provider Dashboard Preview */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
            <CardTitle className="text-xl lg:text-2xl">Tableau de Bord Prestataire</CardTitle>
            <p className="text-muted-foreground mt-2">
              Accédez à tous vos documents fiscaux et suivez vos revenus en temps réel
            </p>
          </CardHeader>
          <CardContent>
            {/* Mini Dashboard Preview */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground truncate">Revenus Totaux</span>
                    <DollarSign className="h-4 w-4 text-green-600 flex-shrink-0" />
                  </div>
                  <div className="text-xl lg:text-2xl font-bold text-foreground">28 750 $</div>
                  <p className="text-xs text-green-600 truncate">+12% vs année précédente</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground truncate">Transactions</span>
                    <TrendingUp className="h-4 w-4 text-blue-600 flex-shrink-0" />
                  </div>
                  <div className="text-xl lg:text-2xl font-bold text-foreground">127</div>
                  <p className="text-xs text-blue-600 truncate">Ce trimestre</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground truncate">Impôt Estimé</span>
                    <FileText className="h-4 w-4 text-purple-600 flex-shrink-0" />
                  </div>
                  <div className="text-xl lg:text-2xl font-bold text-foreground">4 033 $</div>
                  <p className="text-xs text-purple-600 truncate">Basé sur 15% d'impôt</p>
                </div>
              </div>

              {/* Mock Table */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="font-semibold whitespace-nowrap">Trimestre</TableHead>
                        <TableHead className="text-right font-semibold whitespace-nowrap">Revenus</TableHead>
                        <TableHead className="text-right font-semibold whitespace-nowrap">Transactions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium whitespace-nowrap">Q1 2024</TableCell>
                        <TableCell className="text-right font-medium whitespace-nowrap">6 500 $</TableCell>
                        <TableCell className="text-right">28</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium whitespace-nowrap">Q2 2024</TableCell>
                        <TableCell className="text-right font-medium whitespace-nowrap">7 200 $</TableCell>
                        <TableCell className="text-right">31</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium whitespace-nowrap">Q3 2024</TableCell>
                        <TableCell className="text-right font-medium whitespace-nowrap">8 150 $</TableCell>
                        <TableCell className="text-right">35</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Download Buttons */}
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="outline" size="sm" className="bg-white">
                  <Download className="w-4 h-4 mr-2" />
                  <span className="truncate">Résumé Fiscal 2024</span>
                </Button>
                <Button variant="outline" size="sm" className="bg-white">
                  <Download className="w-4 h-4 mr-2" />
                  <span className="truncate">Feuillet T4A</span>
                </Button>
                <Button variant="outline" size="sm" className="bg-white">
                  <Download className="w-4 h-4 mr-2" />
                  <span className="truncate">Détail Transactions</span>
                </Button>
              </div>
            </div>

            <div className="text-center">
              <Link to="/provider-dashboard">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Accéder au Tableau de Bord Complet
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Benefits for Service Providers */}
        <div className="mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8 text-foreground">
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
              <h3 className="text-lg lg:text-xl font-semibold mb-4 text-foreground">
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
          <h3 className="text-lg lg:text-xl font-semibold mb-4 text-foreground">
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
