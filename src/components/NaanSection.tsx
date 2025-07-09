import React, { useState } from 'react';
import FoodCard from './FoodCard';
import ProductConfigurator from './ProductConfigurator';

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
      <div className="flex-1 p-6">
        <h2 className="text-gray-900 dark:text-white text-2xl font-bold mb-6">Naan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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