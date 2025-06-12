
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
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
  const queryClient = useQueryClient();
  const currentYear = new Date().getFullYear();

  // Get tax info for current year
  const { data: taxInfo, isLoading: taxInfoLoading } = useQuery({
    queryKey: ['tax-info', providerId, currentYear],
    queryFn: async () => {
      if (!providerId) return null;

      const { data, error } = await supabase
        .from('provider_tax_info')
        .select('*')
        .eq('provider_id', providerId)
        .eq('tax_year', currentYear)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching tax info:', error);
        throw error;
      }

      return data as ProviderTaxInfo | null;
    },
    enabled: !!providerId,
  });

  // Get income tracking for current year
  const { data: incomeTracking, isLoading: incomeLoading } = useQuery({
    queryKey: ['income-tracking', providerId, currentYear],
    queryFn: async () => {
      if (!providerId) return [];

      const { data, error } = await supabase
        .from('income_tracking')
        .select('*')
        .eq('provider_id', providerId)
        .eq('tax_year', currentYear)
        .order('quarter');

      if (error) {
        console.error('Error fetching income tracking:', error);
        throw error;
      }

      return data as IncomeTracking[];
    },
    enabled: !!providerId,
  });

  // Get expenses for current year
  const { data: expenses, isLoading: expensesLoading } = useQuery({
    queryKey: ['expenses', providerId, currentYear],
    queryFn: async () => {
      if (!providerId) return [];

      const { data, error } = await supabase
        .from('expense_tracking')
        .select('*')
        .eq('provider_id', providerId)
        .gte('expense_date', `${currentYear}-01-01`)
        .lte('expense_date', `${currentYear}-12-31`)
        .order('expense_date', { ascending: false });

      if (error) {
        console.error('Error fetching expenses:', error);
        throw error;
      }

      return data as ExpenseTracking[];
    },
    enabled: !!providerId,
  });

  // Get tax thresholds
  const { data: taxThresholds } = useQuery({
    queryKey: ['tax-thresholds', providerId, currentYear],
    queryFn: async () => {
      if (!providerId) return null;

      const { data, error } = await supabase
        .from('provider_tax_thresholds')
        .select('*')
        .eq('provider_id', providerId)
        .eq('tax_year', currentYear)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching tax thresholds:', error);
        throw error;
      }

      return data as ProviderTaxThresholds | null;
    },
    enabled: !!providerId,
  });

  // Get tax documents
  const { data: taxDocuments } = useQuery({
    queryKey: ['tax-documents', providerId, currentYear],
    queryFn: async () => {
      if (!providerId) return [];

      const { data, error } = await supabase
        .from('tax_documents')
        .select('*')
        .eq('provider_id', providerId)
        .eq('tax_year', currentYear)
        .order('generated_at', { ascending: false });

      if (error) {
        console.error('Error fetching tax documents:', error);
        throw error;
      }

      return data as TaxDocument[];
    },
    enabled: !!providerId,
  });

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

  // Create or update tax info
  const updateTaxInfo = useMutation({
    mutationFn: async (data: CreateTaxInfoData) => {
      if (!providerId) throw new Error('No provider ID provided');

      const { data: result, error } = await supabase
        .from('provider_tax_info')
        .upsert({
          provider_id: providerId,
          ...data,
        })
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tax-info'] });
      toast({
        title: "Tax information updated",
        description: "Your tax information has been saved successfully.",
      });
    },
    onError: (error) => {
      console.error('Error updating tax info:', error);
      toast({
        title: "Error",
        description: "Failed to update tax information. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Add expense
  const addExpense = useMutation({
    mutationFn: async (data: CreateExpenseData) => {
      if (!providerId) throw new Error('No provider ID provided');

      const { data: result, error } = await supabase
        .from('expense_tracking')
        .insert({
          provider_id: providerId,
          ...data,
        })
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      toast({
        title: "Expense added",
        description: "Your expense has been recorded successfully.",
      });
    },
    onError: (error) => {
      console.error('Error adding expense:', error);
      toast({
        title: "Error",
        description: "Failed to add expense. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Update expense
  const updateExpense = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CreateExpenseData> }) => {
      const { data: result, error } = await supabase
        .from('expense_tracking')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      toast({
        title: "Expense updated",
        description: "Your expense has been updated successfully.",
      });
    },
    onError: (error) => {
      console.error('Error updating expense:', error);
      toast({
        title: "Error",
        description: "Failed to update expense. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Delete expense
  const deleteExpense = useMutation({
    mutationFn: async (expenseId: string) => {
      const { error } = await supabase
        .from('expense_tracking')
        .delete()
        .eq('id', expenseId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      toast({
        title: "Expense deleted",
        description: "The expense has been removed successfully.",
      });
    },
    onError: (error) => {
      console.error('Error deleting expense:', error);
      toast({
        title: "Error",
        description: "Failed to delete expense. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Generate tax document
  const generateTaxDocument = useMutation({
    mutationFn: async ({ 
      documentType, 
      quarter 
    }: { 
      documentType: TaxDocument['document_type']; 
      quarter?: number 
    }) => {
      if (!providerId) throw new Error('No provider ID provided');

      // This would typically call an edge function to generate the document
      const documentData = {
        providerId,
        taxYear: currentYear,
        quarter,
        documentType,
        taxSummary,
        incomeTracking,
        expenses,
      };

      const { data: result, error } = await supabase
        .from('tax_documents')
        .insert({
          provider_id: providerId,
          document_type: documentType,
          tax_year: currentYear,
          quarter,
          document_data: documentData,
        })
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tax-documents'] });
      toast({
        title: "Document generated",
        description: "Your tax document has been generated successfully.",
      });
    },
    onError: (error) => {
      console.error('Error generating document:', error);
      toast({
        title: "Error",
        description: "Failed to generate tax document. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    // Data
    taxInfo,
    incomeTracking: incomeTracking || [],
    expenses: expenses || [],
    taxThresholds,
    taxDocuments: taxDocuments || [],
    taxSummary,
    
    // Loading states
    isLoading: taxInfoLoading || incomeLoading || expensesLoading,
    
    // Mutations
    updateTaxInfo,
    addExpense,
    updateExpense,
    deleteExpense,
    generateTaxDocument,
  };
};
