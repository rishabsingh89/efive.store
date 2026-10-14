import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Storefront from './components/Storefront';
import CostCalculator from './components/CostCalculator';
import RoomDesigner from './components/RoomDesigner/RoomDesigner';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import CollectionPage from './components/CollectionPage';

import { CartProvider } from './contexts/CartContext';
import { HelmetProvider } from 'react-helmet-async';
import WhatsAppModal from './components/WhatsAppModal';
import ScrollToTop from './components/ScrollToTop';

// New Pages
import CollectionsMain from './components/pages/CollectionsMain';
import ServicesMain from './components/pages/ServicesMain';
import ServicePage from './components/pages/ServicePage';
import HelpMain from './components/pages/HelpMain';
import HelpPage from './components/pages/HelpPage';
import AboutMain from './components/pages/AboutMain';
import AboutPage from './components/pages/AboutPage';
import ContactPage from './components/pages/ContactPage';

export default function App() {
  return (
    <HelmetProvider>
      <CartProvider>
        <WhatsAppModal />
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Storefront />} />
            <Route path="/calculate-cost" element={<CostCalculator />} />
            <Route path="/room-designer" element={<RoomDesigner />} />
            
            {/* SEO Pages */}
            <Route path="/collections" element={<CollectionsMain />} />
            <Route path="/collections/:slug" element={<CollectionPage />} />
            <Route path="/services" element={<ServicesMain />} />
            <Route path="/services/:slug" element={<ServicePage />} />
            <Route path="/help" element={<HelpMain />} />
            <Route path="/help/:slug" element={<HelpPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Direct redirects to Homepage for /admin and /about */}
            <Route path="/admin" element={<Navigate to="/" replace />} />
            <Route path="/admin/*" element={<Navigate to="/" replace />} />
            <Route path="/about" element={<Navigate to="/" replace />} />
            <Route path="/about/*" element={<Navigate to="/" replace />} />

            {/* Admin Portal (Private & Non-indexed) */}
            <Route path="/efive-admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
            </Route>
            <Route path="/admin-portal" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </HelmetProvider>
  );
}
