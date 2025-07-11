import React, { useState } from 'react';
import FoodCard from '../utils/FoodCard';
import ProductConfigurator from '../utils/ProductConfigurator';

const HotDogSection = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);

  const hotdogProducts = [
    {
      id: 1,
      name: 'Hot Dog Classique',
      description: 'Saucisse dans pain brioché avec condiments',
      calories: 350,
      price: 6,
      icon: '🌭',
      type: 'hotdog',
      backgroundImage:'https://potatorolls.com/wp-content/uploads/2020/10/Basic-Hot-Dogs-960x640.jpg'
    },
    {
      id: 2,
      name: 'Hot Dog Cheese',
      description: 'Saucisse, fromage fondu, oignons frits',
      calories: 420,
      price: 7.5,
      icon: '🌭',
      type: 'hotdog',
      backgroundImage:'https://www.belbrandsfoodservice.com/wp-content/uploads/2018/05/recipe-desktop-merkts-cheesy-hot-dawg.jpg'
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
        <h2 className="text-gray-900 dark:text-white text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Hot Dogs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {hotdogProducts.map((food) => (
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

export default HotDogSection;