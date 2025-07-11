import React from 'react';
import DrinkCard from './DrinkCard';
import { useCart } from '../../contexts/CartContext';

const BoissonsSection = () => {
  const { addItem } = useCart();

  const drinkProducts = [
    {
      id: 1,
      name: 'Coca-Cola',
      description: 'Boisson gazeuse rafraîchissante',
      calories: 140,
      price: 2,
      image: '🥤',
      backgroundImage: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 2,
      name: 'Sprite',
      description: 'Limonade gazeuse au citron-lime',
      calories: 140,
      price: 2,
      image: '🥤',
      backgroundImage: 'https://images.pexels.com/photos/1292294/pexels-photo-1292294.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 3,
      name: 'Eau Minérale',
      description: 'Eau plate ou gazeuse',
      calories: 0,
      price: 1,
      image: '💧',
      backgroundImage: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 4,
      name: 'Jus d\'Orange',
      description: 'Jus d\'orange frais pressé',
      calories: 110,
      price: 2.5,
      image: '🍊',
      backgroundImage: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 5,
      name: 'Thé Glacé',
      description: 'Thé noir glacé au citron',
      calories: 70,
      price: 2.5,
      image: '🧊',
      backgroundImage: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 6,
      name: 'Lassi Mangue',
      description: 'Boisson traditionnelle à la mangue',
      calories: 180,
      price: 3.5,
      image: '🥭',
      backgroundImage: 'https://images.pexels.com/photos/1233319/pexels-photo-1233319.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const handleAddToCart = (drink: any) => {
    const cartItem = {
      id: `drink-${drink.id}-${Date.now()}`,
      name: drink.name,
      emoji: drink.image,
      type: 'boisson',
      basePrice: drink.price,
      meat: '',
      supplements: [],
      drink: '',
      quantity: 1,
      total: drink.price
    };
    
    addItem(cartItem);
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-gray-900 dark:text-white text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Boissons</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {drinkProducts.map((drink) => (
          <DrinkCard 
            key={drink.id} 
            {...drink} 
            onClick={() => handleAddToCart(drink)}
          />
        ))}
      </div>
    </div>
  );
};

export default BoissonsSection;