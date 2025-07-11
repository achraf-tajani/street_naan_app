import React from 'react';
import { Plus } from 'lucide-react';

interface FoodCardProps {
  id: number;
  name: string;
  description: string;
  calories: number;
  price: number;
  icon: string;
  backgroundImage: string;
  type: string;
  onClick?: () => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ 
  name, 
  description, 
  calories, 
  price, 
  icon, 
  backgroundImage,
  type,
  onClick 
}) => {
  const getTypeColor = () => {
    switch (type) {
      case 'naan':
        return 'bg-yellow-400';
      case 'burger':
        return 'bg-red-400';
      case 'tacos':
        return 'bg-green-400';
      case 'hotdog':
        return 'bg-orange-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'naan':
        return 'Naan';
      case 'burger':
        return 'Burger';
      case 'tacos':
        return 'Tacos';
      case 'hotdog':
        return 'Hot Dog';
      default:
        return 'Plat';
    }
  };

  return (
    <div 
      className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1 active:scale-95 border border-gray-200 dark:border-gray-700 touch-manipulation"
      onClick={onClick}
    >
      {/* Background Image */}
      <div 
        className="h-40 sm:h-48 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        
        {/* Emoji Badge */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center text-xl sm:text-2xl shadow-lg">
          {icon}
        </div>
        
        {/* Add Button */}
        <button 
          className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white p-2 sm:p-2.5 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 opacity-90 hover:opacity-100 touch-manipulation"
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
        >
          <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        {/* Price Badge */}
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-lg">
          <span className="text-gray-900 dark:text-white text-base sm:text-lg font-bold">{price}€</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 sm:p-5">
        <h3 className="text-gray-900 dark:text-white text-lg sm:text-xl font-bold mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
          {name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 sm:mb-4 leading-relaxed line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 ${getTypeColor()} rounded-full`}></div>
            <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              {calories} Kcal
            </span>
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide font-semibold">
            {getTypeLabel()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;