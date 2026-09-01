import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Navbar, Footer } from './components/Layout';
import Home from './pages/Home';

// Lazy load secondary route pages for bundle optimization
const WindowsPage = lazy(() => import('./pages/WindowsPage'));
const AndroidPage = lazy(() => import('./pages/AndroidPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const SupportPage = lazy(() => import('./pages/SupportPage'));
const CloudBackupPage = lazy(() => import('./pages/CloudBackupPage'));
const PaymentCallbackPage = lazy(() => import('./pages/PaymentCallbackPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const OnboardingPage = lazy(() => import('./pages/OnboardingPage').then(m => ({ default: m.OnboardingPage })));

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col bg-surface selection:bg-secondary-container selection:text-on-secondary-container">
      <Navbar />
      <div className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/windows" element={<WindowsPage />} />
            <Route path="/android" element={<AndroidPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/cloud-backup" element={<CloudBackupPage />} />
            <Route path="/payment/callback" element={<PaymentCallbackPage />} />
            <Route path="/terms" element={<TermsPage />} />
            {/* Fallback for other links */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

