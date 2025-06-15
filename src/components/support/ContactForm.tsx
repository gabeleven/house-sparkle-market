import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface ContactFormData {
  subject: string;
  category: string;
  priority: string;
  message: string;
  attachments?: File[];
}

export const ContactForm: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    subject: '',
    category: '',
    priority: 'medium',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    });
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
            <p className="text-muted-foreground mb-4">
              Thanks for reaching out. We've received your message and will respond within 24 hours.
            </p>
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <p className="text-sm">
                <strong>What happens next?</strong><br />
                Our support team will review your message and send a detailed response to <strong>{user?.email}</strong>
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  subject: '',
                  category: '',
                  priority: 'medium',
                  message: ''
                });
              }}
            >
              Send Another Message
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            <CardTitle>Contact Support</CardTitle>
          </div>
          <p className="text-muted-foreground">
            Send us a detailed message and we'll get back to you within 24 hours.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Info Display */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-medium mb-2">Your Contact Information</h3>
              <p className="text-sm text-muted-foreground">
                <strong>Email:</strong> {user?.email}<br />
                <strong>Name:</strong> {user?.user_metadata?.full_name || 'Not provided'}
              </p>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Brief description of your issue"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="booking">Booking & Scheduling</SelectItem>
                  <SelectItem value="payment">Payment & Billing</SelectItem>
                  <SelectItem value="account">Account Issues</SelectItem>
                  <SelectItem value="service">Service Quality</SelectItem>
                  <SelectItem value="technical">Technical Problems</SelectItem>
                  <SelectItem value="safety">Safety & Security</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - General question</SelectItem>
                  <SelectItem value="medium">Medium - Need help soon</SelectItem>
                  <SelectItem value="high">High - Urgent issue</SelectItem>
                  <SelectItem value="critical">Critical - Service emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Please provide as much detail as possible about your issue, including any error messages, steps you've tried, and relevant booking information."
                className="min-h-[120px]"
                required
              />
            </div>

            {/* Helpful Tips */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">💡 Tips for faster resolution:</h4>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Include relevant booking IDs or cleaner names</li>
                <li>• Describe what you expected vs. what happened</li>
                <li>• Mention any error messages you saw</li>
                <li>• Include screenshots if helpful (attach after submitting)</li>
              </ul>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting || !formData.subject || !formData.category || !formData.message}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </form>

          {/* Contact Info */}
          <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
            <p>
              You can also email us directly at{' '}
              <a href="mailto:support@housie.ca" className="text-primary hover:underline">
                support@housie.ca
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
