import React from 'react';
import { Utensils, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const { state } = useCart();

  return (
    <header className="bg-white dark:bg-black text-gray-900 dark:text-white px-6 py-4 flex items-center justify-between shadow-sm dark:shadow-gray-800 transition-colors duration-200">
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-2">
          <Utensils className="h-8 w-8 text-green-500" />
  <span className="text-xl font-extrabold">
    <span className="text-gray-900 dark:text-white tracking-wide">Street</span>{" "}
    <span className="text-green-500 italic">Naan</span>
  </span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <button
          onClick={onCartClick}
          className="relative bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 p-3 rounded-lg transition-colors"
        >
          <ShoppingCart className="h-6 w-6" />
          {state.totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
              {state.totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;