
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, Plus } from 'lucide-react';
import { useTaxData } from '@/hooks/useTaxData';
import { useToast } from '@/hooks/use-toast';

export const SampleDataGenerator = () => {
  const { addSampleData } = useTaxData();
  const { toast } = useToast();

  const handleAddSampleData = () => {
    addSampleData();
    toast({
      title: "Sample Data Added",
      description: "Sample transactions and analytics data have been added for testing purposes.",
    });
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5 text-blue-600" />
          Sample Data Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Generate sample data for testing analytics filters</p>
            <p className="text-xs text-gray-500">This will add sample transactions, bookings, and performance data</p>
          </div>
          <Button onClick={handleAddSampleData} className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <Plus className="w-4 h-4 mr-2" />
            Add Sample Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
