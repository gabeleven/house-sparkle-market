
import React from 'react';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Calendar, Filter, ArrowLeft, DollarSign, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Reports = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/provider-dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-6 h-6 text-green-600" />
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Reports & Documents</h1>
              </div>
              <p className="text-muted-foreground">Generate and download business reports</p>
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

        {/* Tax & Compliance Reports */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <span className="truncate">Compliance Status Reports</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 border rounded-lg gap-4">
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium truncate">T4A Tax Slip 2024</h4>
                  <p className="text-sm text-muted-foreground truncate">Official CRA document</p>
                  <Badge variant="outline" className="mt-2">Ready</Badge>
                </div>
                <Button variant="outline" size="sm" className="flex-shrink-0">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 border rounded-lg gap-4">
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium truncate">Annual Tax Summary</h4>
                  <p className="text-sm text-muted-foreground truncate">Income & expense breakdown</p>
                  <Badge variant="outline" className="mt-2">Ready</Badge>
                </div>
                <Button variant="outline" size="sm" className="flex-shrink-0">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 border rounded-lg gap-4">
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium truncate">Q4 2024 Summary</h4>
                  <p className="text-sm text-muted-foreground truncate">Quarterly earnings report</p>
                  <Badge variant="outline" className="mt-2">Ready</Badge>
                </div>
                <Button variant="outline" size="sm" className="flex-shrink-0">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business Reports */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              <span className="truncate">Business Performance Reports</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 border rounded-lg gap-4">
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium truncate">Monthly Revenue Report</h4>
                  <p className="text-sm text-muted-foreground truncate">November 2024</p>
                  <Badge variant="secondary" className="mt-2">Excel</Badge>
                </div>
                <Button variant="outline" size="sm" className="flex-shrink-0">
                  <Download className="w-4 h-4 mr-2" />
                  Generate
                </Button>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 border rounded-lg gap-4">
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium truncate">Customer Analytics</h4>
                  <p className="text-sm text-muted-foreground truncate">Satisfaction & retention</p>
                  <Badge variant="secondary" className="mt-2">PDF</Badge>
                </div>
                <Button variant="outline" size="sm" className="flex-shrink-0">
                  <Download className="w-4 h-4 mr-2" />
                  Generate
                </Button>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 border rounded-lg gap-4">
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium truncate">Service Performance</h4>
                  <p className="text-sm text-muted-foreground truncate">Booking trends analysis</p>
                  <Badge variant="secondary" className="mt-2">PDF</Badge>
                </div>
                <Button variant="outline" size="sm" className="flex-shrink-0">
                  <Download className="w-4 h-4 mr-2" />
                  Generate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Custom Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Custom Report Builder</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Build custom reports with your specific metrics and date ranges. 
                Available with Pro and Premium subscriptions.
              </p>
              <Button variant="outline">
                Request Custom Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Reports;
