
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Download, Calendar, Filter, ArrowLeft, DollarSign, BarChart3, TrendingUp, Users, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProviderProfile } from '@/hooks/useProviderProfile';
import { useTaxCompliance } from '@/hooks/useTaxCompliance';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Reports = () => {
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
        <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/analytics">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-6 h-6 text-green-600" />
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Tax Reports & Compliance</h1>
              </div>
              <p className="text-muted-foreground">Tax compliance dashboard and official documents</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Date Range</span>
            </Button>
          </div>
        </div>

        {/* Compliance Alert */}
        {taxThresholds?.requires_cra_reporting && (
          <Alert className="mb-6 border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <span className="font-medium">Compliance Status:</span> Reporting required 
              (${taxThresholds.total_annual_income.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })} income or {taxThresholds.total_transactions} transactions). 
              Tax documentation is mandatory.
            </AlertDescription>
          </Alert>
        )}

        {/* Tax Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium truncate">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold truncate">
                {taxSummary?.totalEarnings.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' }) || '$0'}
              </div>
              <p className="text-xs text-muted-foreground">Current tax year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium truncate">Business Expenses</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold truncate">
                {taxSummary?.totalExpenses.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' }) || '$0'}
              </div>
              <p className="text-xs text-muted-foreground">Tax deductible</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium truncate">Net Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold truncate">
                {taxSummary?.netIncome.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' }) || '$0'}
              </div>
              <p className="text-xs text-muted-foreground">After expenses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium truncate">Estimated Tax</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold truncate">
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
                <Calendar className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">Quarterly Income Breakdown</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {incomeTracking.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="whitespace-nowrap">Quarter</TableHead>
                        <TableHead className="text-right whitespace-nowrap">Gross</TableHead>
                        <TableHead className="text-right whitespace-nowrap">Net</TableHead>
                        <TableHead className="text-right whitespace-nowrap">Transactions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {incomeTracking.map((quarter) => (
                        <TableRow key={`${quarter.tax_year}-${quarter.quarter}`}>
                          <TableCell className="font-medium whitespace-nowrap">Q{quarter.quarter} {quarter.tax_year}</TableCell>
                          <TableCell className="text-right font-medium whitespace-nowrap">
                            {Number(quarter.gross_earnings).toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })}
                          </TableCell>
                          <TableCell className="text-right whitespace-nowrap">
                            {Number(quarter.net_earnings).toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })}
                          </TableCell>
                          <TableCell className="text-right">{quarter.total_transactions}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
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
                <FileText className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">Tax Documents & Compliance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium truncate">T4A Tax Slip</h4>
                  <p className="text-sm text-muted-foreground truncate">Official CRA tax document</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleGenerateDocument('t4a')}
                  disabled={generateTaxDocument.isPending}
                  className="flex-shrink-0 ml-4"
                >
                  <Download className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Generate</span>
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium truncate">Annual Tax Summary</h4>
                  <p className="text-sm text-muted-foreground truncate">Complete income and expense report</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleGenerateDocument('annual_summary')}
                  disabled={generateTaxDocument.isPending}
                  className="flex-shrink-0 ml-4"
                >
                  <Download className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Generate</span>
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium truncate">Quarterly Summary</h4>
                  <p className="text-sm text-muted-foreground truncate">Q4 2024 earnings breakdown</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleGenerateDocument('quarterly_summary')}
                  disabled={generateTaxDocument.isPending}
                  className="flex-shrink-0 ml-4"
                >
                  <Download className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Generate</span>
                </Button>
              </div>

              {taxDocuments.length > 0 && (
                <div className="mt-4">
                  <h5 className="font-medium mb-2">Recent Documents</h5>
                  <div className="space-y-2">
                    {taxDocuments.slice(0, 3).map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                        <span className="truncate flex-1">{doc.document_type.toUpperCase()} - {doc.tax_year}</span>
                        <span className="text-muted-foreground flex-shrink-0 ml-2">
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

        {/* Compliance Status */}
        <Card>
          <CardHeader>
            <CardTitle className="truncate">Compliance Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-xl lg:text-2xl font-bold mb-2 truncate">
                  {taxThresholds?.total_annual_income.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' }) || '$0'}
                </div>
                <p className="text-sm text-muted-foreground">Annual Income</p>
                <p className="text-xs mt-1">
                  Threshold: $2,800 {taxThresholds?.meets_income_threshold ? '✅' : '❌'}
                </p>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <div className="text-xl lg:text-2xl font-bold mb-2">
                  {taxThresholds?.total_transactions || 0}
                </div>
                <p className="text-sm text-muted-foreground">Total Transactions</p>
                <p className="text-xs mt-1">
                  Threshold: 30 services {taxThresholds?.meets_transaction_threshold ? '✅' : '❌'}
                </p>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <div className={`text-xl lg:text-2xl font-bold mb-2 truncate ${
                  taxThresholds?.requires_cra_reporting ? 'text-orange-600' : 'text-green-600'
                }`}>
                  {taxThresholds?.requires_cra_reporting ? 'Required' : 'Not Required'}
                </div>
                <p className="text-sm text-muted-foreground">CRA Reporting</p>
                <p className="text-xs mt-1 truncate">
                  Last updated: {taxThresholds?.last_calculated_at ? 
                    new Date(taxThresholds.last_calculated_at).toLocaleDateString('en-CA') : 'Never'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Reports;
