import React, { useEffect, useState } from 'react';
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
import { ReportsFilter } from '@/components/analytics/ReportsFilter';
import { DateRange } from 'react-day-picker';

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

  const [filters, setFilters] = useState<{ dateRange?: DateRange; reportType?: string }>({});

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  if (authLoading || taxLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-orange-200 to-yellow-300 animate-fade-in">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div className="space-y-6">
            <Skeleton className="h-8 w-64" />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
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

  const handleFilterChange = (newFilters: { dateRange?: DateRange; reportType?: string }) => {
    setFilters(newFilters);
    console.log('Applied filters:', newFilters);
  };

  const handleGenerateDocument = (type: 't4a' | 'quarterly_summary' | 'annual_summary') => {
    generateTaxDocument.mutate({ documentType: type });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-orange-200 to-yellow-300 animate-fade-in">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Header with styled back button */}
        <div className="mb-6 lg:mb-8">
          <Link to="/analytics">
            <Button className="mb-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full flex items-center gap-2 shadow-lg">
              <ArrowLeft className="h-4 w-4" />
              Retour aux Analytiques
            </Button>
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-start gap-3 lg:gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FileText className="w-6 h-6 text-green-600 flex-shrink-0" />
                  </div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 truncate">Tax Reports & Compliance</h1>
                </div>
                <p className="text-sm lg:text-base text-gray-600">Tax compliance dashboard and official documents</p>
                {filters.dateRange && (
                  <p className="text-xs lg:text-sm text-gray-500 mt-1">
                    Filtered: {filters.dateRange.from?.toLocaleDateString()} - {filters.dateRange.to?.toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
            
            <ReportsFilter onFilterChange={handleFilterChange} />
          </div>
        </div>

        {/* Compliance Alert */}
        {taxThresholds?.requires_cra_reporting && (
          <Alert className="mb-6 border-orange-200 bg-orange-50/80 backdrop-blur-sm dark:border-orange-900 dark:bg-orange-950">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800 dark:text-orange-200">
              <span className="font-medium">Compliance Status:</span> Reporting required 
              (${taxThresholds.total_annual_income.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })} income or {taxThresholds.total_transactions} transactions). 
              Tax documentation is mandatory.
            </AlertDescription>
          </Alert>
        )}

        {/* Tax Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs lg:text-sm font-medium truncate text-gray-800">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-600 flex-shrink-0" />
            </CardHeader>
            <CardContent className="pb-3">
              <div className="text-lg lg:text-xl xl:text-2xl font-bold truncate text-gray-900">
                {taxSummary?.totalEarnings.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' }) || '$0'}
              </div>
              <p className="text-xs text-gray-600">Current tax year</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs lg:text-sm font-medium truncate text-gray-800">Business Expenses</CardTitle>
              <FileText className="h-4 w-4 text-gray-600 flex-shrink-0" />
            </CardHeader>
            <CardContent className="pb-3">
              <div className="text-lg lg:text-xl xl:text-2xl font-bold truncate text-gray-900">
                {taxSummary?.totalExpenses.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' }) || '$0'}
              </div>
              <p className="text-xs text-gray-600">Tax deductible</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs lg:text-sm font-medium truncate text-gray-800">Net Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-600 flex-shrink-0" />
            </CardHeader>
            <CardContent className="pb-3">
              <div className="text-lg lg:text-xl xl:text-2xl font-bold truncate text-gray-900">
                {taxSummary?.netIncome.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' }) || '$0'}
              </div>
              <p className="text-xs text-gray-600">After expenses</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs lg:text-sm font-medium truncate text-gray-800">Estimated Tax</CardTitle>
              <Users className="h-4 w-4 text-gray-600 flex-shrink-0" />
            </CardHeader>
            <CardContent className="pb-3">
              <div className="text-lg lg:text-xl xl:text-2xl font-bold truncate text-gray-900">
                {taxSummary?.estimatedTax.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' }) || '$0'}
              </div>
              <p className="text-xs text-gray-600">15% rate estimate</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
          {/* Quarterly Income */}
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-gray-800">
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
                        <TableHead className="whitespace-nowrap text-muted-foreground">Quarter</TableHead>
                        <TableHead className="text-right whitespace-nowrap text-muted-foreground">Gross</TableHead>
                        <TableHead className="text-right whitespace-nowrap text-muted-foreground">Net</TableHead>
                        <TableHead className="text-right whitespace-nowrap text-muted-foreground">Transactions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {incomeTracking.map((quarter) => (
                        <TableRow key={`${quarter.tax_year}-${quarter.quarter}`}>
                          <TableCell className="font-medium whitespace-nowrap text-foreground">Q{quarter.quarter} {quarter.tax_year}</TableCell>
                          <TableCell className="text-right font-medium whitespace-nowrap text-foreground">
                            {Number(quarter.gross_earnings).toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })}
                          </TableCell>
                          <TableCell className="text-right whitespace-nowrap text-foreground">
                            {Number(quarter.net_earnings).toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })}
                          </TableCell>
                          <TableCell className="text-right text-foreground">{quarter.total_transactions}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-600">
                  No quarterly data available for current tax year
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tax Documents */}
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-gray-800">
                <FileText className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">Tax Documents & Compliance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 lg:p-4 border border-gray-200 rounded-lg bg-card">
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium truncate text-gray-800">T4A Tax Slip</h4>
                  <p className="text-sm text-gray-600 truncate">Official CRA tax document</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleGenerateDocument('t4a')}
                  disabled={generateTaxDocument.isPending}
                  className="flex-shrink-0 ml-2 lg:ml-4"
                >
                  <Download className="w-4 h-4 mr-1 lg:mr-2" />
                  <span className="hidden sm:inline">Generate</span>
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 lg:p-4 border border-gray-200 rounded-lg bg-card">
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium truncate text-gray-800">Annual Tax Summary</h4>
                  <p className="text-sm text-gray-600 truncate">Complete income and expense report</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleGenerateDocument('annual_summary')}
                  disabled={generateTaxDocument.isPending}
                  className="flex-shrink-0 ml-2 lg:ml-4"
                >
                  <Download className="w-4 h-4 mr-1 lg:mr-2" />
                  <span className="hidden sm:inline">Generate</span>
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 lg:p-4 border border-gray-200 rounded-lg bg-card">
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium truncate text-gray-800">Quarterly Summary</h4>
                  <p className="text-sm text-gray-600 truncate">Q4 2024 earnings breakdown</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleGenerateDocument('quarterly_summary')}
                  disabled={generateTaxDocument.isPending}
                  className="flex-shrink-0 ml-2 lg:ml-4"
                >
                  <Download className="w-4 h-4 mr-1 lg:mr-2" />
                  <span className="hidden sm:inline">Generate</span>
                </Button>
              </div>

              {taxDocuments.length > 0 && (
                <div className="mt-4">
                  <h5 className="font-medium mb-2 text-gray-800">Recent Documents</h5>
                  <div className="space-y-2">
                    {taxDocuments.slice(0, 3).map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between text-sm p-2 bg-muted/50 rounded border border-gray-200">
                        <span className="truncate flex-1 text-gray-800">{doc.document_type.toUpperCase()} - {doc.tax_year}</span>
                        <span className="text-gray-600 flex-shrink-0 ml-2">
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
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="truncate text-gray-800">Compliance Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              <div className="text-center p-4 border border-gray-200 rounded-lg bg-card">
                <div className="text-lg lg:text-xl xl:text-2xl font-bold mb-2 truncate text-gray-900">
                  {taxThresholds?.total_annual_income.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' }) || '$0'}
                </div>
                <p className="text-sm text-gray-600">Annual Income</p>
                <p className="text-xs mt-1 text-gray-600">
                  Threshold: $2,800 {taxThresholds?.meets_income_threshold ? '✅' : '❌'}
                </p>
              </div>
              
              <div className="text-center p-4 border border-gray-200 rounded-lg bg-card">
                <div className="text-lg lg:text-xl xl:text-2xl font-bold mb-2 text-gray-900">
                  {taxThresholds?.total_transactions || 0}
                </div>
                <p className="text-sm text-gray-600">Total Transactions</p>
                <p className="text-xs mt-1 text-gray-600">
                  Threshold: 30 services {taxThresholds?.meets_transaction_threshold ? '✅' : '❌'}
                </p>
              </div>
              
              <div className="text-center p-4 border border-gray-200 rounded-lg bg-card">
                <div className={`text-lg lg:text-xl xl:text-2xl font-bold mb-2 truncate ${
                  taxThresholds?.requires_cra_reporting ? 'text-orange-600' : 'text-green-600'
                }`}>
                  {taxThresholds?.requires_cra_reporting ? 'Required' : 'Not Required'}
                </div>
                <p className="text-sm text-gray-600">CRA Reporting</p>
                <p className="text-xs mt-1 truncate text-gray-600">
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
