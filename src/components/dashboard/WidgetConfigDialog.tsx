
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { WidgetType, WidgetConfig } from '@/types/widgets';

interface WidgetConfigDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: Partial<WidgetConfig>) => void;
  widget?: WidgetConfig;
}

export const WidgetConfigDialog = ({ 
  isOpen, 
  onClose, 
  onSave, 
  widget 
}: WidgetConfigDialogProps) => {
  const [title, setTitle] = useState(widget?.title || '');
  const [type, setType] = useState<WidgetType>(widget?.type || 'earnings-summary');

  const widgetTypes = [
    { value: 'mileage-tracker', label: 'Mileage Tracking' },
    { value: 'expense-categories', label: 'Expense Categories' },
    { value: 'tax-comparison', label: 'Tax Comparison' },
    { value: 'parky-tickets', label: 'Parky Parking Analysis' },
    { value: 'custom-expenses', label: 'Custom Expense Tracking' },
    { value: 'revenue-by-service', label: 'Revenue by Service' },
    { value: 'earnings-summary', label: 'Earnings Summary' }
  ] as const;

  const handleSave = () => {
    onSave({
      title,
      type,
      settings: widget?.settings || {}
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configure Widget</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="widget-title">Widget Title</Label>
            <Input
              id="widget-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter widget title"
            />
          </div>
          
          <div>
            <Label htmlFor="widget-type">Widget Type</Label>
            <Select value={type} onValueChange={(value) => setType(value as WidgetType)}>
              <SelectTrigger>
                <SelectValue placeholder="Select widget type" />
              </SelectTrigger>
              <SelectContent>
                {widgetTypes.map((wType) => (
                  <SelectItem key={wType.value} value={wType.value}>
                    {wType.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Widget</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
