
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { 
  ProviderTaxInfo, 
  IncomeTracking, 
  ExpenseTracking, 
  TaxDocument, 
  ProviderTaxThresholds,
  CreateTaxInfoData,
  CreateExpenseData,
  TaxSummary
} from '@/types/tax';

export const useTaxCompliance = (providerId?: string) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const currentYear = new Date().getFullYear();

  // Mock data states
  const [taxInfo, setTaxInfo] = useState<ProviderTaxInfo | null>(null);
  const [incomeTracking, setIncomeTracking] = useState<IncomeTracking[]>([]);
  const [expenses, setExpenses] = useState<ExpenseTracking[]>([]);
  const [taxThresholds, setTaxThresholds] = useState<ProviderTaxThresholds | null>(null);
  const [taxDocuments, setTaxDocuments] = useState<TaxDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading mock data
    const loadMockData = async () => {
      if (!providerId) {
        setIsLoading(false);
        return;
      }

      // Mock tax info
      setTaxInfo({
        id: '1',
        provider_id: providerId,
        sin_encrypted: null,
        gst_hst_number: '123456789 RT 0001',
        qst_number: '1234567890 TQ 0001',
        business_number: '123456789 RC 0001',
        cra_reporting_consent: true,
        tax_year: currentYear,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

      // Mock income tracking
      setIncomeTracking([
        {
          id: '1',
          provider_id: providerId,
          tax_year: currentYear,
          quarter: 1,
          gross_earnings: 12000,
          platform_fees: 1800,
          net_earnings: 10200,
          gst_hst_collected: 1560,
          qst_collected: 1197,
          tax_withheld: 1530,
          total_transactions: 45,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '2',
          provider_id: providerId,
          tax_year: currentYear,
          quarter: 2,
          gross_earnings: 15000,
          platform_fees: 2250,
          net_earnings: 12750,
          gst_hst_collected: 1950,
          qst_collected: 1496,
          tax_withheld: 1912,
          total_transactions: 52,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]);

      // Mock expenses
      setExpenses([
        {
          id: '1',
          provider_id: providerId,
          expense_date: '2024-03-15',
          category: 'supplies',
          description: 'Produits de nettoyage',
          amount: 150,
          receipt_url: null,
          tax_deductible: true,
          gst_hst_amount: 19.5,
          qst_amount: 14.96,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '2',
          provider_id: providerId,
          expense_date: '2024-04-20',
          category: 'gas',
          description: 'Essence pour déplacements',
          amount: 85,
          receipt_url: null,
          tax_deductible: true,
          gst_hst_amount: 11.05,
          qst_amount: 8.48,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]);

      // Mock tax thresholds
      setTaxThresholds({
        id: '1',
        provider_id: providerId,
        tax_year: currentYear,
        total_annual_income: 27000,
        total_transactions: 97,
        meets_income_threshold: true,
        meets_transaction_threshold: true,
        requires_cra_reporting: true,
        last_calculated_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

      // Mock tax documents
      setTaxDocuments([
        {
          id: '1',
          provider_id: providerId,
          document_type: 't4a',
          tax_year: currentYear,
          quarter: null,
          document_url: null,
          document_data: null,
          generated_at: new Date().toISOString(),
          cra_submitted_at: null,
          cra_confirmation_number: null,
          created_at: new Date().toISOString()
        }
      ]);

      setIsLoading(false);
    };

    loadMockData();
  }, [providerId, currentYear]);

  // Calculate tax summary
  const taxSummary: TaxSummary | null = (() => {
    if (!incomeTracking || !expenses || !taxThresholds) return null;

    const totalEarnings = incomeTracking.reduce((sum, quarter) => sum + Number(quarter.gross_earnings), 0);
    const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
    const netIncome = totalEarnings - totalExpenses;
    const estimatedTax = netIncome * 0.15; // 15% estimated tax rate
    const gstHstOwed = incomeTracking.reduce((sum, quarter) => sum + Number(quarter.gst_hst_collected), 0);
    const qstOwed = incomeTracking.reduce((sum, quarter) => sum + Number(quarter.qst_collected), 0);

    return {
      totalEarnings,
      totalExpenses,
      netIncome,
      estimatedTax: Math.max(0, estimatedTax),
      gstHstOwed,
      qstOwed,
      totalTransactions: taxThresholds.total_transactions,
      requiresCraReporting: taxThresholds.requires_cra_reporting,
    };
  })();

  // Mock mutations
  const updateTaxInfo = {
    mutate: async (data: CreateTaxInfoData) => {
      console.log('Updating tax info:', data);
      toast({
        title: "Tax information updated",
        description: "Your tax information has been saved successfully.",
      });
    },
    isPending: false
  };

  const addExpense = {
    mutate: async (data: CreateExpenseData) => {
      console.log('Adding expense:', data);
      const newExpense: ExpenseTracking = {
        id: Date.now().toString(),
        provider_id: providerId || '',
        expense_date: data.expense_date,
        category: data.category,
        description: data.description,
        amount: data.amount,
        receipt_url: data.receipt_url || null,
        tax_deductible: data.tax_deductible || true,
        gst_hst_amount: data.gst_hst_amount || 0,
        qst_amount: data.qst_amount || 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      setExpenses(prev => [...prev, newExpense]);
      toast({
        title: "Expense added",
        description: "Your expense has been recorded successfully.",
      });
    },
    isPending: false
  };

  const updateExpense = {
    mutate: async ({ id, data }: { id: string; data: Partial<CreateExpenseData> }) => {
      console.log('Updating expense:', id, data);
      setExpenses(prev => prev.map(expense => 
        expense.id === id ? { ...expense, ...data, updated_at: new Date().toISOString() } : expense
      ));
      toast({
        title: "Expense updated",
        description: "Your expense has been updated successfully.",
      });
    },
    isPending: false
  };

  const deleteExpense = {
    mutate: async (expenseId: string) => {
      console.log('Deleting expense:', expenseId);
      setExpenses(prev => prev.filter(expense => expense.id !== expenseId));
      toast({
        title: "Expense deleted",
        description: "The expense has been removed successfully.",
      });
    },
    isPending: false
  };

  const generateTaxDocument = {
    mutate: async ({ 
      documentType, 
      quarter 
    }: { 
      documentType: TaxDocument['document_type']; 
      quarter?: number 
    }) => {
      console.log('Generating tax document:', documentType, quarter);
      const newDocument: TaxDocument = {
        id: Date.now().toString(),
        provider_id: providerId || '',
        document_type: documentType,
        tax_year: currentYear,
        quarter,
        document_url: null,
        document_data: {
          providerId,
          taxYear: currentYear,
          quarter,
          documentType,
          taxSummary,
          incomeTracking,
          expenses,
        },
        generated_at: new Date().toISOString(),
        cra_submitted_at: null,
        cra_confirmation_number: null,
        created_at: new Date().toISOString()
      };
      setTaxDocuments(prev => [...prev, newDocument]);
      toast({
        title: "Document generated",
        description: "Your tax document has been generated successfully.",
      });
    },
    isPending: false
  };

  return {
    // Data
    taxInfo,
    incomeTracking: incomeTracking || [],
    expenses: expenses || [],
    taxThresholds,
    taxDocuments: taxDocuments || [],
    taxSummary,
    
    // Loading states
    isLoading,
    
    // Mutations
    updateTaxInfo,
    addExpense,
    updateExpense,
    deleteExpense,
    generateTaxDocument,
  };
};
