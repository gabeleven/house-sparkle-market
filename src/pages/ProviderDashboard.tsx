
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, FileText, TrendingUp, DollarSign, Calendar, Users } from 'lucide-react';

const ProviderDashboard = () => {
  // Mock data for demonstration
  const mockTaxSummary = {
    totalEarnings: 28750,
    taxableIncome: 26890,
    estimatedTax: 4033.50,
    transactions: 127
  };

  const quarterlyData = [
    { quarter: 'Q1 2024', earnings: 6500, transactions: 28 },
    { quarter: 'Q2 2024', earnings: 7200, transactions: 31 },
    { quarter: 'Q3 2024', earnings: 8150, transactions: 35 },
    { quarter: 'Q4 2024', earnings: 6900, transactions: 33 }
  ];

  const recentTransactions = [
    { date: '2024-12-08', client: 'Marie L.', amount: 120, status: 'Payé' },
    { date: '2024-12-07', client: 'Jean D.', amount: 95, status: 'Payé' },
    { date: '2024-12-06', client: 'Sophie M.', amount: 150, status: 'En attente' },
    { date: '2024-12-05', client: 'Pierre R.', amount: 110, status: 'Payé' },
    { date: '2024-12-04', client: 'Claire B.', amount: 80, status: 'Payé' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Tableau de Bord Prestataire
          </h1>
          <p className="text-muted-foreground">
            Gérez vos revenus, consultez vos documents fiscaux et suivez vos performances
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenus Totaux</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockTaxSummary.totalEarnings.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}</div>
              <p className="text-xs text-muted-foreground">+12% vs année précédente</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transactions</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockTaxSummary.transactions}</div>
              <p className="text-xs text-muted-foreground">Ce trimestre</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Impôt Estimé</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockTaxSummary.estimatedTax.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}</div>
              <p className="text-xs text-muted-foreground">Basé sur 15% d'impôt</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Moyenne Mensuelle</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(mockTaxSummary.totalEarnings / 12).toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}</div>
              <p className="text-xs text-muted-foreground">Revenu mensuel moyen</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Quarterly Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Revenus par Trimestre</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Trimestre</TableHead>
                    <TableHead className="text-right">Revenus</TableHead>
                    <TableHead className="text-right">Transactions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quarterlyData.map((quarter) => (
                    <TableRow key={quarter.quarter}>
                      <TableCell className="font-medium">{quarter.quarter}</TableCell>
                      <TableCell className="text-right font-medium">
                        {quarter.earnings.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}
                      </TableCell>
                      <TableCell className="text-right">{quarter.transactions}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Tax Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Documents Fiscaux</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Résumé Fiscal 2024</h4>
                  <p className="text-sm text-muted-foreground">Rapport complet des revenus</p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Feuillet T4A</h4>
                  <p className="text-sm text-muted-foreground">Document officiel ARC</p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Détail des Transactions</h4>
                  <p className="text-sm text-muted-foreground">Liste complète des paiements</p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Transactions Récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead className="text-right">Montant</TableHead>
                  <TableHead className="text-right">Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell>{new Date(transaction.date).toLocaleDateString('fr-CA')}</TableCell>
                    <TableCell className="font-medium">{transaction.client}</TableCell>
                    <TableCell className="text-right font-medium">
                      {transaction.amount.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.status === 'Payé' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default ProviderDashboard;
