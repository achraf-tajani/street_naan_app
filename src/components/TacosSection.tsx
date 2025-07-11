import React, { useState } from 'react';
import FoodCard from './utils/FoodCard';
import ProductConfigurator from './utils/ProductConfigurator';

const TacosSection = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);

  const tacosProducts = [
    {
      id: 1,
      name: 'Tacos Classique',
      description: 'Tortilla fraîche avec garniture au choix',
      calories: 300,
      price: 8,
      icon: '🌮',
      type: 'tacos',
      backgroundImage:'https://img.cuisineaz.com/1024x576/2019/04/17/i146583-tacos-poulet-curry.jpeg',
    }
  ];

  const handleProductClick = (food: any) => {
    setSelectedProduct({
      name: food.name,
      emoji: food.image,
      basePrice: food.price,
      type: food.type
    });
    setIsConfiguratorOpen(true);
  };

  return (
    <>
      <div className="p-4 sm:p-6">
        <h2 className="text-gray-900 dark:text-white text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Tacos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {tacosProducts.map((food) => (
            <FoodCard 
              key={food.id} 
              {...food} 
              onClick={() => handleProductClick(food)}
            />
          ))}
        </div>
      </div>
      
      <ProductConfigurator
        isOpen={isConfiguratorOpen}
        onClose={() => setIsConfiguratorOpen(false)}
        product={selectedProduct}
      />
    </>
  );
};

export default TacosSection;