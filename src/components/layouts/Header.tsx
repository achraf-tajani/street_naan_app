import React from 'react';
import { Utensils, ShoppingCart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import ThemeToggle from '../ThemeToggle';

interface HeaderProps {
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const { state } = useCart();

  return (
    <header className="bg-white dark:bg-black text-gray-900 dark:text-white px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between shadow-sm dark:shadow-gray-800 transition-colors duration-200 sticky top-0 z-40">
      <div className="flex items-center space-x-4 sm:space-x-8">
        <div className="flex items-center space-x-2">
          <span className="text-lg sm:text-xl permanent-marker-regular font-bold">Naaaan <span className=' text-green-400'>Street</span></span>
          <Utensils className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <button
          onClick={onCartClick}
          className="relative bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 p-2.5 sm:p-3 rounded-lg transition-colors touch-manipulation"
        >
          <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
          {state.totalItems > 0 && (
            <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center">
              {state.totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;