import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ClientApp from './pages/ClientApp';
import RestaurantDashboard from './pages/RestaurantDashboard';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import OfflineIndicator from './components/OfflineIndicator';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200 overflow-hidden">
          <Routes>
            {/* Interface Client */}
            <Route path="/client/*" element={
              <CartProvider>
                <ClientApp />
              </CartProvider>
            } />
            
            {/* Interface Restaurant */}
            <Route path="/restaurant" element={<RestaurantDashboard />} />
            
            {/* Redirection par défaut vers l'interface client */}
            <Route path="/" element={<Navigate to="/client" replace />} />
            
            {/* Route de fallback */}
            <Route path="*" element={<Navigate to="/client" replace />} />
          </Routes>
          
          <PWAInstallPrompt />
          <OfflineIndicator />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;