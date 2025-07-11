import React, { useState } from 'react';
import FoodCard from '../utils/FoodCard';
import ProductConfigurator from '../utils/ProductConfigurator';

const BurgerSection = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);

  const burgerProducts = [
    {
      id: 1,
      name: 'Cheeseburger',
      description: 'Pain brioche, steak, fromage, salade, tomate, oignon',
      calories: 450,
      price: 9,
      icon: '🍔',
      type: 'burger',
      backgroundImage:'https://www.forceetsaveur.com/wp-content/uploads/2019/07/033_FR11785-1.jpg'
    },
    {
      id: 2,
      name: 'Double Cheese',
      description: 'Pain brioche, double steak, double fromage, salade',
      calories: 650,
      price: 12,
      icon: '🍔',
      type: 'burger',
      backgroundImage:'https://cms.burgerking.be/uploads/medium_DOUBLE_CHEESEBURGER_FV_min_8e0f30ff59.png'
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
        <h2 className="text-gray-900 dark:text-white text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Burgers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {burgerProducts.map((food) => (
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

export default BurgerSection;