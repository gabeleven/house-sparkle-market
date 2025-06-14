
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DateRange } from 'react-day-picker';

interface AnalyticsFilters {
  dateRange?: DateRange;
  serviceType?: string;
  status?: string;
}

interface AnalyticsContextType {
  filters: AnalyticsFilters;
  updateFilters: (newFilters: Partial<AnalyticsFilters>) => void;
  clearFilters: () => void;
  applyDateRange: (dateRange: DateRange | undefined) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const AnalyticsProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<AnalyticsFilters>({});

  const updateFilters = (newFilters: Partial<AnalyticsFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const applyDateRange = (dateRange: DateRange | undefined) => {
    setFilters(prev => ({ ...prev, dateRange }));
  };

  return (
    <AnalyticsContext.Provider value={{ filters, updateFilters, clearFilters, applyDateRange }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};
