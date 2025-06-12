
import * as webllm from "@mlc-ai/web-llm";

class WebLLMService {
  private engine: webllm.MLCEngine | null = null;
  private isInitialized = false;
  private isInitializing = false;

  async initialize() {
    if (this.isInitialized || this.isInitializing) {
      return;
    }

    this.isInitializing = true;
    
    try {
      // Check WebGPU support
      if (!navigator.gpu) {
        console.warn('WebGPU not supported, falling back to CPU');
      }

      // Initialize WebLLM engine with a small model suitable for chatbot
      this.engine = await webllm.CreateMLCEngine("Llama-3.1-8B-Instruct-q4f32_1", {
        initProgressCallback: (report) => {
          console.log("WebLLM loading progress:", report);
        },
      });

      this.isInitialized = true;
      console.log("WebLLM initialized successfully");
    } catch (error) {
      console.error("Failed to initialize WebLLM:", error);
      this.isInitialized = false;
    } finally {
      this.isInitializing = false;
    }
  }

  async generateResponse(userMessage: string): Promise<string> {
    if (!this.isInitialized || !this.engine) {
      await this.initialize();
      if (!this.isInitialized || !this.engine) {
        return this.getFallbackResponse(userMessage);
      }
    }

    try {
      const systemPrompt = `You are HOUSIE Assistant, an AI helper for a Canadian cleaning service platform. You help users with:
- Booking cleaning services
- Pricing information ($25-45/hour typical range)
- Service types (regular, deep, move-in/out, commercial)
- Quebec coverage and local cleaners
- Tax compliance features for cleaning businesses
- Platform navigation

Be helpful, friendly, and provide specific information about cleaning services in Quebec, Canada. Keep responses concise but informative.`;

      const response = await this.engine.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: 200,
      });

      return response.choices[0]?.message?.content || this.getFallbackResponse(userMessage);
    } catch (error) {
      console.error("WebLLM generation error:", error);
      return this.getFallbackResponse(userMessage);
    }
  }

  private getFallbackResponse(userInput: string): string {
    const input = userInput.toLowerCase();
    
    if (input.includes('booking') || input.includes('réservation')) {
      return "I can help you with bookings! Go to 'Find a Service' to browse cleaners in Quebec. You can filter by location, services, and availability. Most cleaners respond within 2 hours.";
    }
    
    if (input.includes('price') || input.includes('cost') || input.includes('prix') || input.includes('coût')) {
      return "Cleaning prices in Quebec typically range from $25-45 per hour, depending on the service type and location. Deep cleaning costs more than regular cleaning. You'll see exact pricing when selecting a cleaner.";
    }
    
    if (input.includes('service') || input.includes('clean') || input.includes('nettoyage')) {
      return "HOUSIE offers regular cleaning, deep cleaning, move-in/out cleaning, and commercial services across Quebec. Each cleaner specifies their specialties and service areas.";
    }
    
    if (input.includes('tax') || input.includes('fiscal') || input.includes('business')) {
      return "HOUSIE provides automatic tax compliance for Quebec cleaning businesses. We track income, generate tax documents, and ensure CRA reporting compliance. Perfect for professional cleaners!";
    }
    
    if (input.includes('quebec') || input.includes('québec') || input.includes('montreal') || input.includes('location')) {
      return "HOUSIE serves all of Quebec! We have cleaners in Montreal, Quebec City, Gatineau, and smaller communities. Use our map to find cleaners in your specific area.";
    }
    
    return "I'm here to help with HOUSIE! Ask me about booking cleaners, pricing, services available in Quebec, or our tax compliance features for cleaning businesses. How can I assist you today?";
  }

  isReady(): boolean {
    return this.isInitialized;
  }
}

export const webLLMService = new WebLLMService();
