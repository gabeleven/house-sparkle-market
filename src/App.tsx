import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ChatbotProvider } from '@/contexts/ChatbotContext';
import { IntensityThemeProvider } from "./contexts/IntensityThemeContext"
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProfilePage } from './pages/ProfilePage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { SupportPage } from './pages/SupportPage';
import { CleanersPage } from './pages/CleanersPage';
import { ChatPage } from './components/chat/ChatPage';
import { TaxOverviewPage } from './pages/TaxOverviewPage';
import { TaxTransactionsPage } from './pages/TaxTransactionsPage';
import { TaxAnalyticsPage } from './pages/TaxAnalyticsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { BookingsPage } from './pages/BookingsPage';
import { TabbedChatbot } from '@/components/support/TabbedChatbot';
import { FloatingChatButton } from '@/components/support/FloatingChatButton';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <IntensityThemeProvider>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <LanguageProvider>
            <ChatbotProvider>
              <Toaster />
              <BrowserRouter>
                <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
                  <Header />
                  <main className="relative z-10">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/services" element={<ServicesPage />} />
                      <Route path="/profile/:id" element={<ProfilePage />} />
                      <Route path="/how-it-works" element={<HowItWorksPage />} />
                      <Route path="/support" element={<SupportPage />} />
                      <Route path="/cleaners" element={<CleanersPage />} />
                      <Route path="/messages" element={<ChatPage />} />
                      <Route path="/tax-overview" element={<TaxOverviewPage />} />
                      <Route path="/tax-transactions" element={<TaxTransactionsPage />} />
                      <Route path="/tax-analytics" element={<TaxAnalyticsPage />} />
                      <Route path="/bookings" element={<BookingsPage />} />
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </main>
                  <Footer />
                  
                  {/* Floating Chat Components */}
                  <FloatingChatButton />
                  <TabbedChatbot />
                </div>
              </BrowserRouter>
            </ChatbotProvider>
          </LanguageProvider>
        </ThemeProvider>
      </IntensityThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
