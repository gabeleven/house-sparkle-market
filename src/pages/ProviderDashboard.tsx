
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, FileText, TrendingUp, DollarSign, Calendar, Users, Plus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTaxData } from '@/hooks/useTaxData';
import { Skeleton } from '@/components/ui/skeleton';

const ProviderDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { taxSummary, quarterlyData, recentTransactions, loading, addSampleData } = useTaxData();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
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
          
          {/* Sample data button for demo */}
          {taxSummary && taxSummary.totalEarnings === 0 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-blue-800 mb-2">
                Aucune donnée trouvée. Voulez-vous ajouter des données d'exemple pour voir le tableau de bord en action ?
              </p>
              <Button onClick={addSampleData} size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter des données d'exemple
              </Button>
            </div>
          )}
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenus Totaux</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {taxSummary?.totalEarnings.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' }) || '0 $'}
              </div>
              <p className="text-xs text-muted-foreground">Année en cours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transactions</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{taxSummary?.transactions || 0}</div>
              <p className="text-xs text-muted-foreground">Année en cours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Impôt Estimé</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {taxSummary?.estimatedTax.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' }) || '0 $'}
              </div>
              <p className="text-xs text-muted-foreground">Basé sur 15% d'impôt</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Moyenne Mensuelle</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {((taxSummary?.totalEarnings || 0) / 12).toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}
              </div>
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
              {quarterlyData.length > 0 ? (
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
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Aucune donnée trimestrielle disponible
                </div>
              )}
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
            {recentTransactions.length > 0 ? (
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
                  {recentTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
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
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Aucune transaction récente
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default ProviderDashboard;
