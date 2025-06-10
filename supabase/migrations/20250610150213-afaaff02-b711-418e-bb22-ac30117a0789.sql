
-- Create provider_tax_information table to store tax data for providers
CREATE TABLE public.provider_tax_information (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  provider_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name TEXT,
  tax_id_number TEXT,
  business_address TEXT,
  business_phone TEXT,
  tax_year INTEGER NOT NULL,
  total_earnings DECIMAL(10,2) DEFAULT 0,
  taxable_income DECIMAL(10,2) DEFAULT 0,
  estimated_tax DECIMAL(10,2) DEFAULT 0,
  total_transactions INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(provider_id, tax_year)
);

-- Create transactions table for compliance reporting
CREATE TABLE public.transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  provider_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  customer_name TEXT,
  transaction_date DATE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  service_type TEXT,
  payment_method TEXT DEFAULT 'cash',
  status TEXT DEFAULT 'completed' CHECK (status IN ('completed', 'pending', 'cancelled')),
  description TEXT,
  receipt_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create quarterly_summaries table for quarterly breakdown
CREATE TABLE public.quarterly_summaries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  provider_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  quarter INTEGER NOT NULL CHECK (quarter IN (1, 2, 3, 4)),
  total_earnings DECIMAL(10,2) DEFAULT 0,
  total_transactions INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(provider_id, year, quarter)
);

-- Enable Row Level Security
ALTER TABLE public.provider_tax_information ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quarterly_summaries ENABLE ROW LEVEL SECURITY;

-- RLS Policies for provider_tax_information
CREATE POLICY "Providers can view their own tax information"
ON public.provider_tax_information FOR SELECT
USING (auth.uid() = provider_id);

CREATE POLICY "Providers can insert their own tax information"
ON public.provider_tax_information FOR INSERT
WITH CHECK (auth.uid() = provider_id);

CREATE POLICY "Providers can update their own tax information"
ON public.provider_tax_information FOR UPDATE
USING (auth.uid() = provider_id);

-- RLS Policies for transactions
CREATE POLICY "Providers can view their own transactions"
ON public.transactions FOR SELECT
USING (auth.uid() = provider_id);

CREATE POLICY "Providers can insert their own transactions"
ON public.transactions FOR INSERT
WITH CHECK (auth.uid() = provider_id);

CREATE POLICY "Providers can update their own transactions"
ON public.transactions FOR UPDATE
USING (auth.uid() = provider_id);

CREATE POLICY "Providers can delete their own transactions"
ON public.transactions FOR DELETE
USING (auth.uid() = provider_id);

-- RLS Policies for quarterly_summaries
CREATE POLICY "Providers can view their own quarterly summaries"
ON public.quarterly_summaries FOR SELECT
USING (auth.uid() = provider_id);

CREATE POLICY "Providers can insert their own quarterly summaries"
ON public.quarterly_summaries FOR INSERT
WITH CHECK (auth.uid() = provider_id);

CREATE POLICY "Providers can update their own quarterly summaries"
ON public.quarterly_summaries FOR UPDATE
USING (auth.uid() = provider_id);

-- Create indexes for better performance
CREATE INDEX idx_provider_tax_info_provider_year ON public.provider_tax_information(provider_id, tax_year);
CREATE INDEX idx_transactions_provider_date ON public.transactions(provider_id, transaction_date);
CREATE INDEX idx_quarterly_summaries_provider_year ON public.quarterly_summaries(provider_id, year, quarter);

-- Create function to automatically update quarterly summaries when transactions change
CREATE OR REPLACE FUNCTION public.update_quarterly_summaries()
RETURNS TRIGGER AS $$
DECLARE
  quarter_num INTEGER;
  year_num INTEGER;
BEGIN
  -- Extract quarter and year from transaction date
  year_num := EXTRACT(YEAR FROM COALESCE(NEW.transaction_date, OLD.transaction_date));
  quarter_num := EXTRACT(QUARTER FROM COALESCE(NEW.transaction_date, OLD.transaction_date));
  
  -- Update or insert quarterly summary
  INSERT INTO public.quarterly_summaries (provider_id, year, quarter, total_earnings, total_transactions)
  SELECT 
    COALESCE(NEW.provider_id, OLD.provider_id),
    year_num,
    quarter_num,
    COALESCE(SUM(amount), 0),
    COUNT(*)
  FROM public.transactions 
  WHERE provider_id = COALESCE(NEW.provider_id, OLD.provider_id)
    AND EXTRACT(YEAR FROM transaction_date) = year_num
    AND EXTRACT(QUARTER FROM transaction_date) = quarter_num
    AND status = 'completed'
  GROUP BY provider_id
  ON CONFLICT (provider_id, year, quarter) 
  DO UPDATE SET 
    total_earnings = EXCLUDED.total_earnings,
    total_transactions = EXCLUDED.total_transactions,
    updated_at = now();
    
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers to update summaries
CREATE TRIGGER update_quarterly_summaries_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.transactions
  FOR EACH ROW EXECUTE FUNCTION public.update_quarterly_summaries();

-- Create function to update provider tax information totals
CREATE OR REPLACE FUNCTION public.update_provider_tax_totals()
RETURNS TRIGGER AS $$
DECLARE
  year_num INTEGER;
BEGIN
  year_num := EXTRACT(YEAR FROM COALESCE(NEW.transaction_date, OLD.transaction_date));
  
  -- Update provider tax information totals
  INSERT INTO public.provider_tax_information (provider_id, tax_year, total_earnings, total_transactions)
  SELECT 
    COALESCE(NEW.provider_id, OLD.provider_id),
    year_num,
    COALESCE(SUM(amount), 0),
    COUNT(*)
  FROM public.transactions 
  WHERE provider_id = COALESCE(NEW.provider_id, OLD.provider_id)
    AND EXTRACT(YEAR FROM transaction_date) = year_num
    AND status = 'completed'
  GROUP BY provider_id
  ON CONFLICT (provider_id, tax_year) 
  DO UPDATE SET 
    total_earnings = EXCLUDED.total_earnings,
    total_transactions = EXCLUDED.total_transactions,
    taxable_income = EXCLUDED.total_earnings * 0.85, -- Assuming 85% is taxable
    estimated_tax = (EXCLUDED.total_earnings * 0.85) * 0.15, -- 15% tax rate
    updated_at = now();
    
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to update tax totals
CREATE TRIGGER update_provider_tax_totals_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.transactions
  FOR EACH ROW EXECUTE FUNCTION public.update_provider_tax_totals();
