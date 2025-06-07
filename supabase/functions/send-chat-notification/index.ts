
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.10';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ChatNotificationRequest {
  recipientId: string;
  senderName: string;
  messagePreview: string;
  conversationId: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { recipientId, senderName, messagePreview, conversationId }: ChatNotificationRequest = await req.json();

    // Get recipient email
    const { data: recipient } = await supabase
      .from('profiles')
      .select('email, full_name')
      .eq('id', recipientId)
      .single();

    if (!recipient) {
      throw new Error('Recipient not found');
    }

    const chatUrl = `${Deno.env.get('SUPABASE_URL')?.replace('.supabase.co', '')}/chat/${conversationId}`;

    const emailResponse = await resend.emails.send({
      from: "Housie <notifications@resend.dev>",
      to: [recipient.email],
      subject: `New message from ${senderName} on Housie`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">New Message on Housie</h1>
          </div>
          
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #333; margin-bottom: 20px;">Hi ${recipient.full_name},</h2>
            
            <p style="color: #666; font-size: 16px; line-height: 1.5;">
              You have received a new message from <strong>${senderName}</strong>:
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; margin: 20px 0;">
              <p style="color: #333; font-style: italic; margin: 0;">"${messagePreview}"</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${chatUrl}" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                Reply on Housie
              </a>
            </div>
            
            <p style="color: #999; font-size: 14px; text-align: center;">
              This message was sent via the Housie platform. 
              <a href="${chatUrl}" style="color: #667eea;">Log in to view the full conversation</a>.
            </p>
          </div>
        </div>
      `,
    });

    console.log("Chat notification email sent:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error("Error sending chat notification:", error);
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
