
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { DataSourceInfo } from '@/hooks/useRealDataSources';

interface DataSourceTooltipProps {
  dataSource: DataSourceInfo;
  children: React.ReactNode;
}

export const DataSourceTooltip = ({ dataSource, children }: DataSourceTooltipProps) => {
  const getReliabilityColor = (reliability: string) => {
    switch (reliability) {
      case 'high': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getReliabilityDots = (reliability: string) => {
    const dots = ['○', '○', '○'];
    const filled = reliability === 'high' ? 3 : reliability === 'medium' ? 2 : 1;
    
    return dots.map((dot, index) => (
      <span 
        key={index} 
        className={index < filled ? getReliabilityColor(reliability) : 'text-gray-300'}
      >
        ●
      </span>
    ));
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent className="max-w-xs p-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-500" />
              <span className="font-medium">{dataSource.label}</span>
            </div>
            
            <p className="text-sm text-gray-600">
              {dataSource.description}
            </p>
            
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <span>Reliability:</span>
                <div className="flex gap-0.5">
                  {getReliabilityDots(dataSource.reliability)}
                </div>
                <span className={getReliabilityColor(dataSource.reliability)}>
                  {dataSource.reliability}
                </span>
              </div>
              
              {dataSource.lastUpdated && (
                <span className="text-gray-500">
                  Updated: {dataSource.lastUpdated.toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
