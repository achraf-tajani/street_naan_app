import React from 'react';
import { useState } from 'react';
import { CartProvider } from './contexts/CartContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import CartSidebar from './components/CartSidebar';
import CategorySidebar from './components/CategorySidebar';
import NaanSection from './components/NaanSection';
import BurgerSection from './components/BurgerSection';
import TacosSection from './components/TacosSection';
import HotDogSection from './components/HotDogSection';
import BoissonsSection from './components/BoissonsSection';
import DessertsSection from './components/DessertsSection';
import SaucesSection from './components/SaucesSection';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import OfflineIndicator from './components/OfflineIndicator';

function App() {
  const [activeCategory, setActiveCategory] = useState('naan');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const renderActiveSection = () => {
    switch (activeCategory) {
      case 'naan':
        return <NaanSection />;
      case 'burgers':
        return <BurgerSection />;
      case 'tacos':
        return <TacosSection />;
      case 'hotdog':
        return <HotDogSection />;
      case 'boissons':
        return <BoissonsSection />;
      case 'desserts':
        return <DessertsSection />;
      case 'sauces':
        return <SaucesSection />;
      default:
        return <NaanSection />;
    }
  };

  return (
    <ThemeProvider>
      <CartProvider>
        <div className="h-screen bg-gray-100 dark:bg-gray-900 flex flex-col transition-colors duration-200 overflow-hidden">
          <Header onCartClick={() => setIsCartOpen(true)} />
          
          <div className="flex flex-1 overflow-hidden">
            <CategorySidebar 
              activeCategory={activeCategory} 
              onCategoryChange={setActiveCategory} 
            />
            <div className="flex-1 overflow-y-auto">
              {renderActiveSection()}
            </div>
          </div>
          
          <CartSidebar 
            isOpen={isCartOpen} 
            onClose={() => setIsCartOpen(false)} 
          />
          
          <PWAInstallPrompt />
          <OfflineIndicator />
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;