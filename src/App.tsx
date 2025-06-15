
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from 'next-themes';
import { ThemeProvider as CustomThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ChatbotProvider } from '@/contexts/ChatbotContext';
import { IntensityThemeProvider } from "./contexts/IntensityThemeContext"
import { AnalyticsProvider } from '@/contexts/AnalyticsContext';
import { AuthProvider } from '@/hooks/useAuth';
import Header from './components/Header';
import Footer from './components/Footer';
import { TabbedChatbot } from '@/components/support/TabbedChatbot';
import { FloatingChatButton } from '@/components/support/FloatingChatButton';

interface AppProps {
  children: React.ReactNode;
}

function App({ children }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Disable queries during SSR for compatibility
        enabled: typeof window !== 'undefined',
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <IntensityThemeProvider>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <CustomThemeProvider>
            <LanguageProvider>
              <AuthProvider>
                <ChatbotProvider>
                  <AnalyticsProvider>
                    <Toaster />
                    <div className="min-h-screen">
                      <Header />
                      <main className="relative z-10">
                        {children}
                      </main>
                      <Footer />
                      
                      {/* Floating Chat Components */}
                      <FloatingChatButton />
                      <TabbedChatbot />
                    </div>
                  </AnalyticsProvider>
                </ChatbotProvider>
              </AuthProvider>
            </LanguageProvider>
          </CustomThemeProvider>
        </ThemeProvider>
      </IntensityThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
