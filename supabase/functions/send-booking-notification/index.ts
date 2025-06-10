
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingNotificationRequest {
  cleanerId: string;
  customerName: string;
  serviceType: string;
  serviceDate: string;
  serviceTime: string;
  customerAddress: string;
  customerPhone: string;
  additionalNotes?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      cleanerId,
      customerName,
      serviceType,
      serviceDate,
      serviceTime,
      customerAddress,
      customerPhone,
      additionalNotes
    }: BookingNotificationRequest = await req.json();

    // For now, we'll just log the booking notification
    // In a real implementation, you would integrate with a service like Resend
    console.log('Booking notification would be sent:', {
      to: `cleaner-${cleanerId}@example.com`, // This would be fetched from the cleaner's profile
      from: 'booking@housie.ca',
      subject: `New Booking Request from ${customerName} - ${serviceType}`,
      content: {
        customerName,
        serviceType,
        serviceDate,
        serviceTime,
        customerAddress,
        customerPhone,
        additionalNotes
      }
    });

    // Return success for now
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Booking notification logged successfully' 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-booking-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
