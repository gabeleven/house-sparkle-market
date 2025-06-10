
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface CustomerDetailsFormProps {
  customerAddress: string;
  onAddressChange: (address: string) => void;
  customerPhone: string;
  onPhoneChange: (phone: string) => void;
  additionalNotes: string;
  onNotesChange: (notes: string) => void;
}

export const CustomerDetailsForm: React.FC<CustomerDetailsFormProps> = ({
  customerAddress,
  onAddressChange,
  customerPhone,
  onPhoneChange,
  additionalNotes,
  onNotesChange
}) => {
  return (
    <>
      {/* Customer Address */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Service address *</label>
        <Input
          value={customerAddress}
          onChange={(e) => onAddressChange(e.target.value)}
          placeholder="Enter your address"
        />
      </div>

      {/* Customer Phone */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Phone number *</label>
        <Input
          value={customerPhone}
          onChange={(e) => onPhoneChange(e.target.value)}
          placeholder="Your phone number"
          type="tel"
        />
      </div>

      {/* Additional Notes */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Additional notes</label>
        <Textarea
          value={additionalNotes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Any special requests or instructions..."
          rows={3}
        />
      </div>
    </>
  );
};
