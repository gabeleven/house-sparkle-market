
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { IntensityThemeProvider } from '@/contexts/IntensityThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ChatbotProvider } from '@/contexts/ChatbotContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingChatButton from '@/components/support/FloatingChatButton';

// Pages
import Index from '@/pages/Index';
import BrowseCleaners from '@/pages/BrowseCleaners';
import Profile from '@/pages/Profile';
import PublicProfile from '@/pages/PublicProfile';
import MyProfile from '@/pages/MyProfile';
import Chat from '@/pages/Chat';
import HowItWorksPage from '@/pages/HowItWorksPage';
import ServiceProvidersPage from '@/pages/ServiceProvidersPage';
import Support from '@/pages/Support';
import ProviderDashboard from '@/pages/ProviderDashboard';
import AnalyticsDashboard from '@/pages/AnalyticsDashboard';
import GrowthDashboard from '@/pages/GrowthDashboard';
import CalendarDashboard from '@/pages/CalendarDashboard';
import TaxCompliancePage from '@/pages/TaxCompliancePage';
import Settings from '@/pages/Settings';
import Bookings from '@/pages/Bookings';
import CleanerReviews from '@/pages/CleanerReviews';
import NotFound from '@/pages/NotFound';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <IntensityThemeProvider>
          <LanguageProvider>
            <ChatbotProvider>
              <Router>
                <div className="min-h-screen bg-background text-foreground">
                  <Header />
                  <main>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/browse-cleaners" element={<BrowseCleaners />} />
                      <Route path="/profile/:id" element={<Profile />} />
                      <Route path="/public-profile/:id" element={<PublicProfile />} />
                      <Route path="/my-profile" element={<MyProfile />} />
                      <Route path="/auth" element={<Index />} />
                      <Route path="/chat" element={<Chat />} />
                      <Route path="/comment-ca-marche" element={<HowItWorksPage />} />
                      <Route path="/prestataires" element={<ServiceProvidersPage />} />
                      <Route path="/support" element={<Support />} />
                      <Route path="/provider-dashboard" element={<ProviderDashboard />} />
                      <Route path="/analytics" element={<AnalyticsDashboard />} />
                      <Route path="/growth" element={<GrowthDashboard />} />
                      <Route path="/calendar" element={<CalendarDashboard />} />
                      <Route path="/tax-compliance" element={<TaxCompliancePage />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/bookings" element={<Bookings />} />
                      <Route path="/reviews/:cleanerId" element={<CleanerReviews />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                  <FloatingChatButton />
                  <Toaster />
                </div>
              </Router>
            </ChatbotProvider>
          </LanguageProvider>
        </IntensityThemeProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
