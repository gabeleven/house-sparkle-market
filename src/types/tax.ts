
export interface ProviderTaxInfo {
  id: string;
  provider_id: string;
  sin_encrypted?: string | null;
  gst_hst_number?: string | null;
  qst_number?: string | null;
  business_number?: string | null;
  cra_reporting_consent: boolean;
  tax_year: number;
  created_at: string;
  updated_at: string;
}

export interface IncomeTracking {
  id: string;
  provider_id: string;
  tax_year: number;
  quarter: number;
  gross_earnings: number;
  platform_fees: number;
  net_earnings: number;
  gst_hst_collected: number;
  qst_collected: number;
  tax_withheld: number;
  total_transactions: number;
  created_at: string;
  updated_at: string;
}

export interface ExpenseTracking {
  id: string;
  provider_id: string;
  expense_date: string;
  category: 'supplies' | 'gas' | 'vehicle_maintenance' | 'insurance' | 'equipment' | 'professional_fees' | 'advertising' | 'training' | 'other';
  description: string;
  amount: number;
  receipt_url?: string | null;
  tax_deductible: boolean;
  gst_hst_amount: number;
  qst_amount: number;
  created_at: string;
  updated_at: string;
}

export interface TaxDocument {
  id: string;
  provider_id: string;
  document_type: 't4a' | 'quarterly_summary' | 'annual_summary' | 'expense_report' | 'cra_filing';
  tax_year: number;
  quarter?: number | null;
  document_url?: string | null;
  document_data?: any | null;
  generated_at: string;
  cra_submitted_at?: string | null;
  cra_confirmation_number?: string | null;
  created_at: string;
}

export interface ProviderTaxThresholds {
  id: string;
  provider_id: string;
  tax_year: number;
  total_annual_income: number;
  total_transactions: number;
  meets_income_threshold: boolean;
  meets_transaction_threshold: boolean;
  requires_cra_reporting: boolean;
  last_calculated_at: string;
  created_at: string;
  updated_at: string;
}

export interface CreateTaxInfoData {
  sin_encrypted?: string;
  gst_hst_number?: string;
  qst_number?: string;
  business_number?: string;
  cra_reporting_consent?: boolean;
  tax_year: number;
}

export interface CreateExpenseData {
  expense_date: string;
  category: ExpenseTracking['category'];
  description: string;
  amount: number;
  receipt_url?: string;
  tax_deductible?: boolean;
  gst_hst_amount?: number;
  qst_amount?: number;
}

export interface TaxSummary {
  totalEarnings: number;
  totalExpenses: number;
  netIncome: number;
  estimatedTax: number;
  gstHstOwed: number;
  qstOwed: number;
  totalTransactions: number;
  requiresCraReporting: boolean;
}
