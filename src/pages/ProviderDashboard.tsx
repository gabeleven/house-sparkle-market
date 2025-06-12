
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, FileText, TrendingUp, DollarSign, Calendar, Users, Plus, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useProviderProfile } from '@/hooks/useProviderProfile';
import { useTaxCompliance } from '@/hooks/useTaxCompliance';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ProviderDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { provider } = useProviderProfile();
  const { 
    taxSummary, 
    incomeTracking, 
    taxThresholds, 
    taxDocuments,
    isLoading: taxLoading,
    generateTaxDocument 
  } = useTaxCompliance(provider?.id);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  if (authLoading || taxLoading) {
    return (
      <div className="min-h-screen bg-background">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            <Skeleton className="h-8 w-64" />
            <div className="grid md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
            <Skeleton className="h-64" />
          </div>
        </main>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleGenerateDocument = (type: 't4a' | 'quarterly_summary' | 'annual_summary') => {
    generateTaxDocument.mutate({ documentType: type });
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Provider Tax Dashboard
          </h1>
          <p className="text-muted-foreground">
            Comprehensive tax compliance and reporting for CRA Bill C-47 requirements
          </p>
        </div>

        {/* CRA Compliance Alert */}
        {taxThresholds?.requires_cra_reporting && (
          <Alert className="mb-6 border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              You meet CRA reporting requirements (${taxThresholds.total_annual_income.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })} income or {taxThresholds.total_transactions} transactions). 
              Tax compliance documentation is mandatory.
            </AlertDescription>
          </Alert>
        )}

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {taxSummary?.totalEarnings.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' }) || '$0'}
              </div>
              <p className="text-xs text-muted-foreground">Current tax year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Business Expenses</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {taxSummary?.totalExpenses.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' }) || '$0'}
              </div>
              <p className="text-xs text-muted-foreground">Tax deductible</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {taxSummary?.netIncome.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' }) || '$0'}
              </div>
              <p className="text-xs text-muted-foreground">After expenses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Estimated Tax</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {taxSummary?.estimatedTax.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' }) || '$0'}
              </div>
              <p className="text-xs text-muted-foreground">15% rate estimate</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Quarterly Income */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Quarterly Income Breakdown</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {incomeTracking.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Quarter</TableHead>
                      <TableHead className="text-right">Gross</TableHead>
                      <TableHead className="text-right">Net</TableHead>
                      <TableHead className="text-right">Transactions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {incomeTracking.map((quarter) => (
                      <TableRow key={`${quarter.tax_year}-${quarter.quarter}`}>
                        <TableCell className="font-medium">Q{quarter.quarter} {quarter.tax_year}</TableCell>
                        <TableCell className="text-right font-medium">
                          {Number(quarter.gross_earnings).toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })}
                        </TableCell>
                        <TableCell className="text-right">
                          {Number(quarter.net_earnings).toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })}
                        </TableCell>
                        <TableCell className="text-right">{quarter.total_transactions}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No quarterly data available for current tax year
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tax Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Tax Documents & Compliance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">T4A Tax Slip</h4>
                  <p className="text-sm text-muted-foreground">Official CRA tax document</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleGenerateDocument('t4a')}
                  disabled={generateTaxDocument.isPending}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Generate
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Annual Tax Summary</h4>
                  <p className="text-sm text-muted-foreground">Complete income and expense report</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleGenerateDocument('annual_summary')}
                  disabled={generateTaxDocument.isPending}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Generate
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Quarterly Summary</h4>
                  <p className="text-sm text-muted-foreground">Q4 2024 earnings breakdown</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleGenerateDocument('quarterly_summary')}
                  disabled={generateTaxDocument.isPending}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Generate
                </Button>
              </div>

              {taxDocuments.length > 0 && (
                <div className="mt-4">
                  <h5 className="font-medium mb-2">Recent Documents</h5>
                  <div className="space-y-2">
                    {taxDocuments.slice(0, 3).map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                        <span>{doc.document_type.toUpperCase()} - {doc.tax_year}</span>
                        <span className="text-muted-foreground">
                          {new Date(doc.generated_at).toLocaleDateString('en-CA')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* CRA Compliance Status */}
        <Card>
          <CardHeader>
            <CardTitle>CRA Bill C-47 Compliance Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold mb-2">
                  {taxThresholds?.total_annual_income.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' }) || '$0'}
                </div>
                <p className="text-sm text-muted-foreground">Annual Income</p>
                <p className="text-xs mt-1">
                  Threshold: $2,800 {taxThresholds?.meets_income_threshold ? '✅' : '❌'}
                </p>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold mb-2">
                  {taxThresholds?.total_transactions || 0}
                </div>
                <p className="text-sm text-muted-foreground">Total Transactions</p>
                <p className="text-xs mt-1">
                  Threshold: 30 services {taxThresholds?.meets_transaction_threshold ? '✅' : '❌'}
                </p>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <div className={`text-2xl font-bold mb-2 ${
                  taxThresholds?.requires_cra_reporting ? 'text-orange-600' : 'text-green-600'
                }`}>
                  {taxThresholds?.requires_cra_reporting ? 'Required' : 'Not Required'}
                </div>
                <p className="text-sm text-muted-foreground">CRA Reporting</p>
                <p className="text-xs mt-1">
                  Last updated: {taxThresholds?.last_calculated_at ? 
                    new Date(taxThresholds.last_calculated_at).toLocaleDateString('en-CA') : 'Never'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default ProviderDashboard;
