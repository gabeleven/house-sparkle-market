
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ChatbotProvider } from "@/contexts/ChatbotContext";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import BrowseCleaners from "./pages/BrowseCleaners";
import MyProfile from "./pages/MyProfile";
import Profile from "./pages/Profile";
import PublicProfile from "./pages/PublicProfile";
import Chat from "./pages/Chat";
import Support from "./pages/Support";
import ServiceProvidersPage from "./pages/ServiceProvidersPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import CleanerReviews from "./pages/CleanerReviews";
import Bookings from "./pages/Bookings";
import TaxCompliancePage from "./pages/TaxCompliancePage";
import ProviderDashboard from "./pages/ProviderDashboard";
import CalendarDashboard from "./pages/CalendarDashboard";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import GrowthDashboard from "./pages/GrowthDashboard";
import NotFound from "./pages/NotFound";
import AuthPage from "./components/auth/AuthPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <ChatbotProvider>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/browse-cleaners" element={<BrowseCleaners />} />
                  <Route path="/my-profile" element={<MyProfile />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/profile/:userId" element={<PublicProfile />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/prestataires" element={<ServiceProvidersPage />} />
                  <Route path="/comment-ca-marche" element={<HowItWorksPage />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/reviews/:cleanerId" element={<CleanerReviews />} />
                  <Route path="/bookings" element={<Bookings />} />
                  <Route path="/tax-compliance" element={<TaxCompliancePage />} />
                  <Route path="/provider-dashboard" element={<ProviderDashboard />} />
                  <Route path="/calendar" element={<CalendarDashboard />} />
                  <Route path="/analytics" element={<AnalyticsDashboard />} />
                  <Route path="/growth" element={<GrowthDashboard />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </AuthProvider>
        </ChatbotProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
