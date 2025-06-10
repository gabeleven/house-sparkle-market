
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface TaxSummary {
  totalEarnings: number;
  taxableIncome: number;
  estimatedTax: number;
  transactions: number;
}

interface QuarterlyData {
  quarter: string;
  earnings: number;
  transactions: number;
}

interface Transaction {
  id: string;
  date: string;
  client: string;
  amount: number;
  status: string;
}

export const useTaxData = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [taxSummary, setTaxSummary] = useState<TaxSummary | null>(null);
  const [quarterlyData, setQuarterlyData] = useState<QuarterlyData[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchTaxData();
    }
  }, [user]);

  const fetchTaxData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Fetch provider tax information for current year
      const currentYear = new Date().getFullYear();
      const { data: taxInfo, error: taxError } = await supabase
        .from('provider_tax_information')
        .select('*')
        .eq('provider_id', user.id)
        .eq('tax_year', currentYear)
        .maybeSingle();

      if (taxError) {
        console.error('Error fetching tax info:', taxError);
      }

      // Fetch quarterly summaries
      const { data: quarters, error: quarterError } = await supabase
        .from('quarterly_summaries')
        .select('*')
        .eq('provider_id', user.id)
        .eq('year', currentYear)
        .order('quarter');

      if (quarterError) {
        console.error('Error fetching quarterly data:', quarterError);
      }

      // Fetch recent transactions
      const { data: transactions, error: transError } = await supabase
        .from('transactions')
        .select('*')
        .eq('provider_id', user.id)
        .order('transaction_date', { ascending: false })
        .limit(5);

      if (transError) {
        console.error('Error fetching transactions:', transError);
      }

      // Set tax summary
      if (taxInfo) {
        setTaxSummary({
          totalEarnings: Number(taxInfo.total_earnings) || 0,
          taxableIncome: Number(taxInfo.taxable_income) || 0,
          estimatedTax: Number(taxInfo.estimated_tax) || 0,
          transactions: taxInfo.total_transactions || 0
        });
      } else {
        setTaxSummary({
          totalEarnings: 0,
          taxableIncome: 0,
          estimatedTax: 0,
          transactions: 0
        });
      }

      // Set quarterly data
      const formattedQuarters = quarters?.map(q => ({
        quarter: `Q${q.quarter} ${q.year}`,
        earnings: Number(q.total_earnings) || 0,
        transactions: q.total_transactions || 0
      })) || [];
      setQuarterlyData(formattedQuarters);

      // Set recent transactions
      const formattedTransactions = transactions?.map(t => ({
        id: t.id,
        date: t.transaction_date,
        client: t.customer_name || 'Client anonyme',
        amount: Number(t.amount),
        status: t.status === 'completed' ? 'Payé' : 'En attente'
      })) || [];
      setRecentTransactions(formattedTransactions);

    } catch (error) {
      console.error('Error fetching tax data:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données fiscales",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addSampleData = async () => {
    if (!user) return;

    try {
      // Add sample transactions for demonstration
      const sampleTransactions = [
        {
          provider_id: user.id,
          customer_name: 'Marie L.',
          transaction_date: '2024-12-08',
          amount: 120,
          service_type: 'Ménage résidentiel',
          status: 'completed'
        },
        {
          provider_id: user.id,
          customer_name: 'Jean D.',
          transaction_date: '2024-12-07',
          amount: 95,
          service_type: 'Nettoyage bureaux',
          status: 'completed'
        },
        {
          provider_id: user.id,
          customer_name: 'Sophie M.',
          transaction_date: '2024-12-06',
          amount: 150,
          service_type: 'Grand ménage',
          status: 'pending'
        }
      ];

      const { error } = await supabase
        .from('transactions')
        .insert(sampleTransactions);

      if (error) {
        console.error('Error adding sample data:', error);
        return;
      }

      toast({
        title: "Données d'exemple ajoutées",
        description: "Quelques transactions d'exemple ont été ajoutées pour démonstration"
      });

      // Refresh data
      fetchTaxData();
    } catch (error) {
      console.error('Error adding sample data:', error);
    }
  };

  return {
    taxSummary,
    quarterlyData,
    recentTransactions,
    loading,
    addSampleData,
    refetch: fetchTaxData
  };
};
