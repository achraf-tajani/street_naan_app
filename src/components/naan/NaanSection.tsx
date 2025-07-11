import React, { useState } from 'react';
import FoodCard from '../utils/FoodCard';
import ProductConfigurator from '../utils/ProductConfigurator';

const NaanSection = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);
  const naanProducts = [
    {
      id: 1,
      name: 'Cheese Naan',
      description: 'Pain naan au fromage avec garniture au choix',
      calories: 280,
      price: 5,
      icon: '🫓',
      type: 'naan',
      backgroundImage:'https://storage.googleapis.com/mon-resto-halal/restaurants/71207de1-b32f-4824-971a-15bb17396007/thumb@1024_6b002f10-775f-4f49-bac1-b9dd75bd3265.jpg',
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
        <h2 className="text-gray-900 dark:text-white text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Naaan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {naanProducts.map((food) => (
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

export default NaanSection;