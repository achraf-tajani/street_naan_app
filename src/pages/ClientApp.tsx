import React, { useEffect,useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layouts/Header';
import CartSidebar from '../components/layouts/CartSidebar';
import CategorySidebar from '../components/layouts/CategorySidebar';
import NaanSection from '../components/naan/NaanSection';
import BurgerSection from '../components/burger/BurgerSection';
import TacosSection from '../components/TacosSection';
import HotDogSection from '../components/hotdog/HotDogSection';
import BoissonsSection from '../components/boissons/BoissonsSection';
import DessertsSection from '../components/desserts/DessertsSection';
import SaucesSection from '../components/sauces/SaucesSection';
import PWAInstallPrompt from '../components/PWAInstallPrompt';
import { registerServiceWorker } from '../utils/pwaUtils';

function ClientApp() {
  const [activeCategory, setActiveCategory] = useState('naan');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    registerServiceWorker(() => {
      setUpdateAvailable(true);
    });
  }, []);
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
    <div className="h-full flex flex-col overflow-hidden relative bg-gray-50 dark:bg-gray-900">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <PWAInstallPrompt />
        {updateAvailable && (
        <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-yellow-400 text-black border border-yellow-600 rounded-lg p-4 shadow-lg z-50">
          <p className="mb-2 font-semibold">Nouvelle version disponible !</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
          >
            Recharger
          </button>
          <button
            onClick={() => setUpdateAvailable(false)}
            className="ml-2 text-black underline"
          >
            Ignorer
          </button>
        </div>
      )}
      {/* Restaurant Mode Toggle */}
      <button
        onClick={() => navigate('/restaurant')}
        className="fixed bottom-4 left-4 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors z-40 shadow-lg touch-manipulation"
      >
        <span className="hidden sm:inline">Mode Restaurant</span>
        <span className="sm:hidden">🏪</span>
      </button>
      
      <div className="flex flex-1 overflow-hidden">
        <CategorySidebar 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory} 
        />
        <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
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
