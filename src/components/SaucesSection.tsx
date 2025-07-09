import React from 'react';
import SauceCard from './SauceCard';
import { useCart } from '../contexts/CartContext';

const SaucesSection = () => {
  const { addItem } = useCart();

  const sauceProducts = [
    {
      id: 1,
      name: 'Sauce Douce',
      description: 'Sauce crémeuse et douce',
      calories: 50,
      price: 0.5,
      image: '🥫',
      backgroundImage: 'https://assets.afcdn.com/recipe/20170321/44160_w1024h768c1cx1908cy1903.jpg'
    },
    {
      id: 2,
      name: 'Sauce Piquante',
      description: 'Sauce épicée pour les amateurs de sensations',
      calories: 45,
      price: 0.5,
      image: '🌶️',
      backgroundImage: 'https://images.radio-canada.ca/q_auto,w_1200/v1/alimentation/ingredient/16x9/sauces-piquantes.jpg'
    },
    {
      id: 3,
      name: 'Sauce Ail',
      description: 'Sauce à l\'ail fraîche et parfumée',
      calories: 60,
      price: 0.5,
      image: '🧄',
      backgroundImage: 'https://assets.afcdn.com/recipe/20190306/88822_w1024h768c1cx4536cy2209cxt0cyt0cxb6000cyb4000.webp'
    },
    {
      id: 4,
      name: 'Sauce BBQ',
      description: 'Sauce barbecue fumée et sucrée',
      calories: 70,
      price: 1,
      image: '🍖',
      backgroundImage: 'https://www.kitchentreaty.com/wp-content/uploads/2013/04/bbq-sauce-recipe-1.jpg'
    },
    {
      id: 5,
      name: 'Ketchup',
      description: 'Sauce tomate classique',
      calories: 40,
      price: 0.5,
      image: '🍅',
      backgroundImage: 'https://burgerkingfrance.twic.pics/img/products/e/09/e099af94-b9cf-4732-98a5-3a798a3f35ed_?twic=v1/contain=700x700'
    },
    {
      id: 6,
      name: 'Mayonnaise',
      description: 'Mayonnaise crémeuse maison',
      calories: 90,
      price: 0.5,
      image: '🥚',
      backgroundImage: 'https://img-3.journaldesfemmes.fr/ZMBmdRTJTaPawaoegx7vZzrMQDQ=/750x500/bf4975b4743f41708f72ba1f880bf34d/ccmcms-jdf/39989373.jpg'
    }
  ];

  const handleAddToCart = (sauce: any) => {
    const cartItem = {
      id: `sauce-${sauce.id}-${Date.now()}`,
      name: sauce.name,
      emoji: sauce.image,
      type: 'sauce',
      basePrice: sauce.price,
      meat: '',
      supplements: [],
      drink: '',
      quantity: 1,
      total: sauce.price
    };
    
    addItem(cartItem);
  };

  return (
    <div className="p-6">
      <h2 className="text-gray-900 dark:text-white text-2xl font-bold mb-6">Sauces</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {sauceProducts.map((sauce) => (
          <SauceCard 
            key={sauce.id} 
            {...sauce} 
            onClick={() => handleAddToCart(sauce)}
          />
        ))}
      </div>
    </div>
  );
};

export default SaucesSection;