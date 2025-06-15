
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from 'next-themes';
import { ThemeProvider as CustomThemeProvider } from '../contexts/ThemeContext';
import { LanguageProvider } from '../contexts/LanguageContext';
import { ChatbotProvider } from '../contexts/ChatbotContext';
import { IntensityThemeProvider } from "../contexts/IntensityThemeContext";
import { AnalyticsProvider } from '../contexts/AnalyticsContext';
import { AuthProvider } from '../hooks/useAuth';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { TabbedChatbot } from '../components/support/TabbedChatbot';
import { FloatingChatButton } from '../components/support/FloatingChatButton';
import { Toaster } from '../components/ui/toaster';

export { PageShell };

function PageShell({ children, pageContext }: { children: React.ReactNode; pageContext: any }) {
  // Create QueryClient with SSR-friendly defaults
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  const isClient = typeof window !== 'undefined';

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <IntensityThemeProvider>
          <ThemeProvider 
            defaultTheme="light" 
            storageKey="vite-ui-theme"
            enableSystem={false}
            disableTransitionOnChange
          >
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
                        
                        {/* Only render interactive components on client */}
                        {isClient && (
                          <>
                            <FloatingChatButton />
                            <TabbedChatbot />
                          </>
                        )}
                      </div>
                    </AnalyticsProvider>
                  </ChatbotProvider>
                </AuthProvider>
              </LanguageProvider>
            </CustomThemeProvider>
          </ThemeProvider>
        </IntensityThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
