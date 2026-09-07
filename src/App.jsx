import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Storefront from './components/Storefront';
import CostCalculator from './components/CostCalculator';
import RoomDesigner from './components/RoomDesigner/RoomDesigner';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import CollectionPage from './components/CollectionPage';

import { CartProvider } from './contexts/CartContext';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Storefront />} />
          <Route path="/calculate-cost" element={<CostCalculator />} />
          <Route path="/room-designer" element={<RoomDesigner />} />
          <Route path="/collection/:slug" element={<CollectionPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}
