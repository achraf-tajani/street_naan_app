import React from 'react';
import { useState } from 'react';
import { X, Plus, Minus, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import CheckoutModal from '../utils/CheckoutModal';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { state, removeItem, updateQuantity, clearCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const formatItemDescription = (item: any) => {
    const parts = [];
    
    if (item.size) parts.push(`Taille: ${item.size}`);
    if (item.meat) parts.push(`Viande: ${item.meat}`);
    if (item.cheese) parts.push(`Fromage: ${item.cheese}`);
    if (item.sauce) parts.push(`Sauce: ${item.sauce}`);
    if (item.fries && item.fries !== 'none') parts.push(`Frites: ${item.fries}`);
    if (item.drink) parts.push(`Boisson: ${item.drink}`);
    if (item.supplements && item.supplements.length > 0) {
      parts.push(`Suppléments: ${item.supplements.join(', ')}`);
    }
    if (item.removedItems && item.removedItems.length > 0) {
      parts.push(`Sans: ${item.removedItems.join(', ')}`);
    }
    
    return parts.join(' • ');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div 
        className="fixed right-0 top-0 h-full w-full sm:max-w-md bg-white dark:bg-gray-800 shadow-xl transition-all duration-300 transform translate-x-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <div className="flex items-center space-x-3">
              <ShoppingCart className="h-6 w-6 text-green-500" />
              <h2 className="text-gray-900 dark:text-white text-lg sm:text-xl font-bold">Panier</h2>
              {state.totalItems > 0 && (
                <span className="bg-green-500 text-white text-sm px-2 py-1 rounded-full">
                  {state.totalItems}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {state.items.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 mt-8 px-4">
                <ShoppingCart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">Votre panier est vide</p>
                <p className="text-sm">Ajoutez des articles pour commencer</p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl sm:text-2xl flex-shrink-0">{item.emoji}</span>
                        <div>
                          <h3 className="text-gray-900 dark:text-white font-semibold text-sm sm:text-base">{item.name}</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm line-clamp-2">
                            {formatItemDescription(item)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-400 hover:text-red-300 transition-colors p-1 touch-manipulation flex-shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 active:bg-gray-400 dark:active:bg-gray-400 text-gray-700 dark:text-white p-1.5 rounded transition-colors touch-manipulation"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="text-gray-900 dark:text-white font-semibold w-8 text-center text-sm sm:text-base">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 active:bg-gray-400 dark:active:bg-gray-400 text-gray-700 dark:text-white p-1.5 rounded transition-colors touch-manipulation"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="text-gray-900 dark:text-white font-bold text-sm sm:text-base">
                        {item.total.toFixed(2)}€
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-700 p-4 sm:p-6 space-y-4 flex-shrink-0 bg-white dark:bg-gray-800">
              <div className="flex items-center justify-between text-gray-900 dark:text-white">
                <span className="text-base sm:text-lg font-semibold">Total:</span>
                <span className="text-xl sm:text-2xl font-bold text-green-400">
                  {state.totalPrice.toFixed(2)}€
                </span>
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white py-3 sm:py-4 rounded-lg font-semibold transition-colors touch-manipulation text-sm sm:text-base"
                >
                  Commander ({state.totalPrice.toFixed(2)}€)
                </button>
                
                <button
                  onClick={clearCart}
                  className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white py-2 sm:py-3 rounded-lg font-medium transition-colors touch-manipulation text-sm sm:text-base"
                >
                  Vider le panier
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
      />
    </div>
  );
};

export default CartSidebar;