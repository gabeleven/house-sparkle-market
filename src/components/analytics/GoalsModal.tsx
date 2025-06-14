
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Target } from 'lucide-react';

interface GoalsModalProps {
  trigger: React.ReactNode;
}

export const GoalsModal: React.FC<GoalsModalProps> = ({ trigger }) => {
  const [goals, setGoals] = useState({
    efficiency: 90,
    responseTime: 15,
    retention: 85,
    growthRate: 12
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log('Saving goals:', goals);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Set Performance Goals
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="efficiency">Efficiency Target (%)</Label>
            <Input
              id="efficiency"
              type="number"
              value={goals.efficiency}
              onChange={(e) => setGoals(prev => ({ ...prev, efficiency: Number(e.target.value) }))}
              min="0"
              max="100"
            />
          </div>
          <div>
            <Label htmlFor="responseTime">Response Time Target (minutes)</Label>
            <Input
              id="responseTime"
              type="number"
              value={goals.responseTime}
              onChange={(e) => setGoals(prev => ({ ...prev, responseTime: Number(e.target.value) }))}
              min="1"
            />
          </div>
          <div>
            <Label htmlFor="retention">Retention Target (%)</Label>
            <Input
              id="retention"
              type="number"
              value={goals.retention}
              onChange={(e) => setGoals(prev => ({ ...prev, retention: Number(e.target.value) }))}
              min="0"
              max="100"
            />
          </div>
          <div>
            <Label htmlFor="growthRate">Growth Rate Target (%)</Label>
            <Input
              id="growthRate"
              type="number"
              value={goals.growthRate}
              onChange={(e) => setGoals(prev => ({ ...prev, growthRate: Number(e.target.value) }))}
              min="0"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Goals
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
