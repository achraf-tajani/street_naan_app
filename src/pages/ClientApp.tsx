import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import CartSidebar from '../components/CartSidebar';
import CategorySidebar from '../components/CategorySidebar';
import NaanSection from '../components/NaanSection';
import BurgerSection from '../components/BurgerSection';
import TacosSection from '../components/TacosSection';
import HotDogSection from '../components/HotDogSection';
import BoissonsSection from '../components/BoissonsSection';
import DessertsSection from '../components/DessertsSection';
import SaucesSection from '../components/SaucesSection';

function ClientApp() {
  const [activeCategory, setActiveCategory] = useState('naan');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

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
    <div className="h-full flex flex-col overflow-hidden relative">
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
    </div>
  );
}

export default ClientApp;