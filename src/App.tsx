import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar, Footer } from './components/Layout';
import Home from './pages/Home';
import WindowsPage from './pages/WindowsPage';
import AndroidPage from './pages/AndroidPage';
import SignupPage from './pages/SignupPage';
import CheckoutPage from './pages/CheckoutPage';
import SupportPage from './pages/SupportPage';
import CloudBackupPage from './pages/CloudBackupPage';

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col bg-surface selection:bg-secondary-container selection:text-on-secondary-container">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/windows" element={<WindowsPage />} />
          <Route path="/android" element={<AndroidPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/cloud-backup" element={<CloudBackupPage />} />
          {/* Fallback for other links */}
          <Route path="*" element={<Home />} />
        </Routes>
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
