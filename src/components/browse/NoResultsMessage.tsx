
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';

interface NoResultsMessageProps {
  hasLocation: boolean;
  onRequestLocation: () => void;
}

export const NoResultsMessage: React.FC<NoResultsMessageProps> = ({
  hasLocation,
  onRequestLocation,
}) => {
  return (
    <Card>
      <CardContent className="p-6 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No service providers found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search terms or expand your search to other cities in Quebec.
          </p>
          {!hasLocation && (
            <Button
              onClick={onRequestLocation}
              variant="outline"
              className="text-primary border-primary hover:bg-primary/10"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Enable Location for Better Results
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
