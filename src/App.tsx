import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { TooltipProvider } from './components/ui/tooltip';

// Pages
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProviderDashboard from './pages/ProviderDashboard';
import ProviderProfile from './pages/ProviderProfile';
import Listings from './pages/Listings';
import Vips from './pages/Vips';
import News from './pages/News';
import Membership from './pages/Membership';

// Legal Pages
import Terms from './pages/legal/Terms';
import Privacy from './pages/legal/Privacy';
import Imprint from './pages/legal/Imprint';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LanguageProvider>
          <AuthProvider>
            <TooltipProvider>
              <Toaster position="top-center" expand={true} richColors />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/provider-dashboard" element={<ProviderDashboard />} />
                <Route path="/provider/:id" element={<ProviderProfile />} />
                <Route path="/listings" element={<Listings />} />
                <Route path="/vips" element={<Vips />} />
                <Route path="/news" element={<News />} />
                <Route path="/membership" element={<Membership />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/imprint" element={<Imprint />} />
              </Routes>
            </TooltipProvider>
          </AuthProvider>
        </LanguageProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;