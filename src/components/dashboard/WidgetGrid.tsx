
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { WidgetConfig, WidgetType } from '@/types/widgets';
import { WidgetConfigDialog } from './WidgetConfigDialog';
import { MileageTrackerWidget } from './widgets/MileageTrackerWidget';
import { ParkyTicketsWidget } from './widgets/ParkyTicketsWidget';
import { ExpenseCategoriesWidget } from './widgets/ExpenseCategoriesWidget';
import { TaxComparisonWidget } from './widgets/TaxComparisonWidget';
import { CitySelector } from './CitySelector';
import { useCitySelection } from '@/hooks/useCitySelection';
import { useRealDataSources } from '@/hooks/useRealDataSources';

export const WidgetGrid = () => {
  const { selectedCity } = useCitySelection();
  const { businessData } = useRealDataSources(selectedCity);
  
  const [widgets, setWidgets] = useState<WidgetConfig[]>([
    {
      id: '1',
      type: 'mileage-tracker',
      title: 'Mileage Tracking',
      position: 0,
      settings: {},
      isVisible: true
    },
    {
      id: '2',
      type: 'parky-tickets',
      title: 'Parky Parking Analysis',
      position: 1,
      settings: {},
      isVisible: true
    },
    {
      id: '3',
      type: 'expense-categories',
      title: 'Expense Categories',
      position: 2,
      settings: {},
      isVisible: true
    },
    {
      id: '4',
      type: 'tax-comparison',
      title: 'Tax Comparison',
      position: 3,
      settings: {},
      isVisible: true
    }
  ]);

  const [configDialog, setConfigDialog] = useState<{
    isOpen: boolean;
    widget?: WidgetConfig;
  }>({ isOpen: false });

  const renderWidget = (widget: WidgetConfig) => {
    const onConfigure = () => setConfigDialog({ isOpen: true, widget });
    
    // Pass city-specific data to widgets
    const widgetProps = {
      key: widget.id,
      onConfigure,
      selectedCity,
      businessData
    };

    switch (widget.type) {
      case 'mileage-tracker':
        return <MileageTrackerWidget {...widgetProps} />;
      case 'parky-tickets':
        return <ParkyTicketsWidget {...widgetProps} />;
      case 'expense-categories':
        return <ExpenseCategoriesWidget {...widgetProps} />;
      case 'tax-comparison':
        return <TaxComparisonWidget {...widgetProps} />;
      default:
        return null;
    }
  };

  const handleSaveWidget = (config: Partial<WidgetConfig>) => {
    if (configDialog.widget) {
      // Update existing widget
      setWidgets(prev => prev.map(w => 
        w.id === configDialog.widget!.id 
          ? { ...w, ...config }
          : w
      ));
    } else {
      // Add new widget
      const newWidget: WidgetConfig = {
        id: Date.now().toString(),
        type: config.type || 'earnings-summary',
        title: config.title || 'New Widget',
        position: widgets.length,
        settings: config.settings || {},
        isVisible: true
      };
      setWidgets(prev => [...prev, newWidget]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with City Selector and Add Widget button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Dashboard Widgets</h2>
          {businessData && (
            <p className="text-sm text-gray-600 mt-1">
              {businessData.city} • {businessData.providerCount} providers • {businessData.totalBookings} bookings
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <CitySelector />
          <Button 
            onClick={() => setConfigDialog({ isOpen: true })}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Widget
          </Button>
        </div>
      </div>

      {/* Widget Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {widgets
          .filter(w => w.isVisible)
          .sort((a, b) => a.position - b.position)
          .map(renderWidget)}
      </div>

      {/* Configuration Dialog */}
      <WidgetConfigDialog
        isOpen={configDialog.isOpen}
        onClose={() => setConfigDialog({ isOpen: false })}
        onSave={handleSaveWidget}
        widget={configDialog.widget}
      />
    </div>
  );
};
