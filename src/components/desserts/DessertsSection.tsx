import React from 'react';
import DessertCard from './DessertCard';
import { useCart } from '../../contexts/CartContext';

const DessertsSection = () => {
  const { addItem } = useCart();

  const dessertProducts = [
    {
      id: 1,
      name: 'Tiramisu',
      description: 'Dessert italien au café et mascarpone',
      calories: 320,
      price: 5.5,
      image: '🍰',
      backgroundImage: 'https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 2,
      name: 'Cheesecake',
      description: 'Gâteau au fromage avec coulis de fruits',
      calories: 380,
      price: 6,
      image: '🍰',
      backgroundImage: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 3,
      name: 'Brownie',
      description: 'Brownie au chocolat avec glace vanille',
      calories: 450,
      price: 4.5,
      image: '🍫',
      backgroundImage: 'https://images.pexels.com/photos/2373520/pexels-photo-2373520.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 4,
      name: 'Kulfi',
      description: 'Glace traditionnelle indienne à la pistache',
      calories: 200,
      price: 4,
      image: '🍨',
      backgroundImage: 'https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 5,
      name: 'Gulab Jamun',
      description: 'Boulettes sucrées dans sirop parfumé',
      calories: 150,
      price: 3.5,
      image: '🍯',
      backgroundImage: 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 6,
      name: 'Muffin Chocolat',
      description: 'Muffin moelleux aux pépites de chocolat',
      calories: 280,
      price: 3,
      image: '🧁',
      backgroundImage: 'https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const handleAddToCart = (dessert: any) => {
    const cartItem = {
      id: `dessert-${dessert.id}-${Date.now()}`,
      name: dessert.name,
      emoji: dessert.image,
      type: 'dessert',
      basePrice: dessert.price,
      meat: '',
      supplements: [],
      drink: '',
      quantity: 1,
      total: dessert.price
    };
    
    addItem(cartItem);
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-gray-900 dark:text-white text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Desserts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {dessertProducts.map((dessert) => (
          <DessertCard 
            key={dessert.id} 
            {...dessert} 
            onClick={() => handleAddToCart(dessert)}
          />
        ))}
      </div>
    </div>
  );
};

export default DessertsSection;