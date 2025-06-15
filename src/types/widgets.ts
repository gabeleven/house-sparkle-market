
import { CanadianCity } from '@/hooks/useCitySelection';
import { CityBusinessData } from '@/hooks/useRealDataSources';

export interface WidgetConfig {
  id: string;
  type: WidgetType;
  title: string;
  position: number;
  settings: Record<string, any>;
  isVisible: boolean;
}

export type WidgetType = 
  | 'mileage-tracker'
  | 'expense-categories'
  | 'tax-comparison'
  | 'parky-tickets'
  | 'custom-expenses'
  | 'revenue-by-service'
  | 'parky-analysis'
  | 'earnings-summary';

export interface WidgetData {
  [key: string]: any;
}

export interface ParkyTicketData {
  ticketCount: number;
  totalFees: number;
  disputeSuccessRate: number;
  monthlyTrend: { month: string; tickets: number; fees: number }[];
}

export interface WidgetProps {
  onConfigure: () => void;
  selectedCity?: CanadianCity;
  businessData?: CityBusinessData | null;
}
