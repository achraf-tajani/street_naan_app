import React from 'react';
import { Plus } from 'lucide-react';

interface DrinkCardProps {
  id: number;
  name: string;
  description: string;
  calories: number;
  price: number;
  image: string;
  backgroundImage: string;
  onClick?: () => void;
}

const DrinkCard: React.FC<DrinkCardProps> = ({ 
  name, 
  description, 
  calories, 
  price, 
  image, 
  backgroundImage,
  onClick 
}) => {
  return (
    <div 
      className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
      onClick={onClick}
    >
      {/* Background Image */}
      <div 
        className="h-48 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        
        {/* Emoji Badge */}
        <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl shadow-lg">
          {image}
        </div>
        
        {/* Add Button */}
        <button 
          className="absolute top-4 right-4 bg-green-500 hover:bg-green-600 text-white p-2.5 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110 opacity-90 hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
        >
          <Plus className="h-5 w-5" />
        </button>

        {/* Price Badge */}
        <div className="absolute bottom-4 right-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
          <span className="text-gray-900 dark:text-white text-lg font-bold">{price}€</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h3 className="text-gray-900 dark:text-white text-xl font-bold mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
          {name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
          {description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              {calories} Kcal
            </span>
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide font-semibold">
            Boisson
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrinkCard;