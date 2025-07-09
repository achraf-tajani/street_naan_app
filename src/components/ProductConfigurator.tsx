import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface ProductConfiguratorProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    emoji: string;
    basePrice: number;
    type: string;
  };
}

const ProductConfigurator: React.FC<ProductConfiguratorProps> = ({ isOpen, onClose, product }) => {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedMeat, setSelectedMeat] = useState('');
  const [selectedSupplements, setSelectedSupplements] = useState<string[]>([]);
  const [selectedSauce, setSelectedSauce] = useState('');
  const [selectedDrink, setSelectedDrink] = useState('');
  const [removedItems, setRemovedItems] = useState<string[]>([]);
  const [selectedFries, setSelectedFries] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Generate unique ID for cart item
  const generateCartItemId = () => {
    const config = {
      product: product.name,
      type: product.type,
      size: product.type !== 'naan' ? selectedSize : undefined,
      meat: selectedMeat,
      cheese: product.type === 'naan' ? selectedSauce : undefined,
      sauce: product.type !== 'naan' ? selectedSauce : undefined,
      supplements: selectedSupplements.sort(),
      removedItems: product.type === 'burger' ? removedItems.sort() : undefined,
      fries: product.type === 'burger' ? selectedFries : undefined,
      drink: selectedDrink
    };
    return btoa(JSON.stringify(config));
  };

  // Tacos sizes (not used for naan)
  const tacosSizes = [
    { id: 'M', name: 'Medium', price: 0 },
    { id: 'L', name: 'Large', price: 2 },
    { id: 'XL', name: 'Extra Large', price: 4 }
  ];

  // Meats for tacos and naan
  const tacosMetats = [
    { id: 'chicken', name: 'Poulet', price: 0 },
    { id: 'beef', name: 'Bœuf', price: 1 },
  ];

  // Naan specific meats
  const naanMeats = [
    { id: 'chicken', name: 'Poulet', price: 0 },
    { id: 'beef', name: 'Bœuf', price: 1 }
  ];

  // Naan cheese types
  const naanCheeses = [
    { id: 'comte', name: 'Comté', price: 0 },
    { id: 'gruyere', name: 'Gruyère', price: 0.5 },
    { id: 'kiri', name: 'Kiri', price: 0.5 }
  ];

  // Naan vegetables
  const naanVegetables = [
    { id: 'tomato', name: 'Tomate', price: 0.5 },
    { id: 'salad', name: 'Salade', price: 0.5 },
    { id: 'onion', name: 'Oignon', price: 0.5 }
  ];

  // Tacos supplements
  const tacosSupplements = [
    { id: 'cheese', name: 'Fromage', price: 1 },
    { id: 'avocado', name: 'Avocat', price: 1.5 },
    { id: 'bacon', name: 'Bacon', price: 2 },
    { id: 'egg', name: 'Œuf', price: 1 },
    { id: 'mushrooms', name: 'Champignons', price: 0.5 },
    { id: 'onions', name: 'Oignons', price: 0.5 }
  ];

  // Burger specific options
  const burgerSizes = [
    { id: 'normal', name: 'Normal', price: 0 },
    { id: 'maxi', name: 'Maxi', price: 3 }
  ];

  const burgerMeats = [
    { id: 'beef', name: 'Bœuf', price: 0 },
    { id: 'chicken', name: 'Poulet', price: 0 },
    { id: 'fish', name: 'Poisson', price: 1 }
  ];

  const burgerSupplements = [
    { id: 'extra-cheese', name: 'Fromage supplémentaire', price: 1 },
    { id: 'bacon', name: 'Bacon', price: 2 },
    { id: 'avocado', name: 'Avocat', price: 1.5 },
    { id: 'mushrooms', name: 'Champignons', price: 1 },
    { id: 'pickles', name: 'Cornichons', price: 0.5 }
  ];

  const burgerRemovableItems = [
    { id: 'onion', name: 'Oignon' },
    { id: 'tomato', name: 'Tomate' }
  ];

  const fries = [
    { id: 'none', name: 'Sans frites', price: 0 },
    { id: 'normal', name: 'Frites normales', price: 2.5 },
    { id: 'large', name: 'Grandes frites', price: 3.5 },
    { id: 'sweet', name: 'Frites de patate douce', price: 4 }
  ];
  const sauces = [
    { id: 'mild', name: 'Sauce Douce', price: 0 },
    { id: 'spicy', name: 'Sauce Piquante', price: 0 },
    { id: 'garlic', name: 'Sauce Ail', price: 0 },
    { id: 'bbq', name: 'Sauce BBQ', price: 0.5 },
    { id: 'ketchup', name: 'Ketchup', price: 0 },
    { id: 'mayo', name: 'Mayonnaise', price: 0 }
  ];

  const drinks = [
    { id: 'coke', name: 'Coca-Cola', price: 2 },
    { id: 'sprite', name: 'Sprite', price: 2 },
    { id: 'water', name: 'Eau', price: 1 },
    { id: 'juice', name: 'Jus d\'orange', price: 2.5 }
  ];

  // Get current options based on product type
  const getCurrentSizes = () => {
    if (product.type === 'burger') return burgerSizes;
    if (product.type === 'naan') return []; // No sizes for naan
    return tacosSizes;
  };
  
  const getCurrentMeats = () => {
    if (product.type === 'burger') return burgerMeats;
    if (product.type === 'naan') return naanMeats;
    return tacosMetats;
  };
  
  const getCurrentSupplements = () => {
    if (product.type === 'burger') return burgerSupplements;
    if (product.type === 'naan') return naanVegetables;
    return tacosSupplements;
  };

  const toggleSupplement = (supplementId: string) => {
    setSelectedSupplements(prev => 
      prev.includes(supplementId) 
        ? prev.filter(id => id !== supplementId)
        : [...prev, supplementId]
    );
  };

  const toggleRemovedItem = (itemId: string) => {
    setRemovedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const calculateTotal = () => {
    let total = product.basePrice;
    
    // Size price
    const sizePrice = getCurrentSizes().find(s => s.id === selectedSize)?.price || 0;
    total += sizePrice;
    
    // Meat price
    const meatPrice = getCurrentMeats().find(m => m.id === selectedMeat)?.price || 0;
    total += meatPrice;
    
    // Supplements/Vegetables price
    const supplementsPrice = selectedSupplements.reduce((sum, suppId) => {
      const supplement = getCurrentSupplements().find(s => s.id === suppId);
      return sum + (supplement?.price || 0);
    }, 0);
    total += supplementsPrice;
    
    // Sauce price (or cheese price for naan)
    if (product.type === 'naan') {
      const cheesePrice = naanCheeses.find(c => c.id === selectedSauce)?.price || 0;
      total += cheesePrice;
    } else {
      const saucePrice = sauces.find(s => s.id === selectedSauce)?.price || 0;
      total += saucePrice;
    }
    
    // Drink price
    const drinkPrice = drinks.find(d => d.id === selectedDrink)?.price || 0;
    total += drinkPrice;

    // Fries price (for burgers)
    if (product.type === 'burger') {
      const friesPrice = fries.find(f => f.id === selectedFries)?.price || 0;
      total += friesPrice;
    }
    
    return total * quantity;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-colors duration-200">
        <div className="sticky top-0 bg-white dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{product.emoji}</span>
            <h2 className="text-gray-900 dark:text-white text-2xl font-bold">{product.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Size Selection - Not for Naan */}
          {product.type !== 'naan' && (
            <div>
            <h3 className="text-gray-900 dark:text-white text-lg font-semibold mb-3">
              {product.type === 'burger' ? 'Format' : 'Taille'}
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {getCurrentSizes().map((size) => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size.id)}
                  className={`p-3 rounded-lg border-2 transition-colors duration-200 ${
                    selectedSize === size.id
                      ? 'border-green-500 bg-green-500/20 text-green-400'
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 bg-white dark:bg-gray-700'
                  }`}
                >
                  <div className="font-semibold">{size.name}</div>
                  {size.price > 0 && (
                    <div className="text-sm">+{size.price}€</div>
                  )}
                </button>
              ))}
            </div>
            </div>
          )}

          {/* Meat Selection */}
          <div>
            <h3 className="text-gray-900 dark:text-white text-lg font-semibold mb-3">Viande</h3>
            <div className="grid grid-cols-2 gap-3">
              {getCurrentMeats().map((meat) => (
                <button
                  key={meat.id}
                  onClick={() => setSelectedMeat(meat.id)}
                  className={`p-3 rounded-lg border-2 transition-colors duration-200 ${
                    selectedMeat === meat.id
                      ? 'border-green-500 bg-green-500/20 text-green-400'
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 bg-white dark:bg-gray-700'
                  }`}
                >
                  <div className="font-semibold">{meat.name}</div>
                  {meat.price > 0 && (
                    <div className="text-sm">+{meat.price}€</div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Cheese Selection - Only for Naan */}
          {product.type === 'naan' && (
            <div>
              <h3 className="text-gray-900 dark:text-white text-lg font-semibold mb-3">Fromage</h3>
              <div className="grid grid-cols-3 gap-3">
                {naanCheeses.map((cheese) => (
                  <button
                    key={cheese.id}
                    onClick={() => setSelectedSauce(cheese.id)} // Using sauce state for cheese
                    className={`p-3 rounded-lg border-2 transition-colors duration-200 ${
                      selectedSauce === cheese.id
                        ? 'border-green-500 bg-green-500/20 text-green-400'
                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 bg-white dark:bg-gray-700'
                    }`}
                  >
                    <div className="font-semibold">{cheese.name}</div>
                    {cheese.price > 0 && (
                      <div className="text-sm">+{cheese.price}€</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Remove Items (Burger only) */}
          {product.type === 'burger' && (
            <div>
              <h3 className="text-gray-900 dark:text-white text-lg font-semibold mb-3">Retirer</h3>
              <div className="grid grid-cols-2 gap-3">
                {burgerRemovableItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggleRemovedItem(item.id)}
                    className={`p-3 rounded-lg border-2 transition-colors duration-200 ${
                      removedItems.includes(item.id)
                        ? 'border-red-500 bg-red-500/20 text-red-400'
                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 bg-white dark:bg-gray-700'
                    }`}
                  >
                    <div className="font-semibold">
                      {removedItems.includes(item.id) ? 'Sans ' : ''}
                      {item.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Supplements/Vegetables Selection */}
          <div>
            <h3 className="text-gray-900 dark:text-white text-lg font-semibold mb-3">
              {product.type === 'naan' ? 'Légumes' : 'Suppléments'}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {getCurrentSupplements().map((supplement) => (
                <button
                  key={supplement.id}
                  onClick={() => toggleSupplement(supplement.id)}
                  className={`p-3 rounded-lg border-2 transition-colors duration-200 ${
                    selectedSupplements.includes(supplement.id)
                      ? 'border-green-500 bg-green-500/20 text-green-400'
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 bg-white dark:bg-gray-700'
                  }`}
                >
                  <div className="font-semibold">{supplement.name}</div>
                  <div className="text-sm">+{supplement.price}€</div>
                </button>
              ))}
            </div>
          </div>

          {/* Fries Selection (Burger only) */}
          {product.type === 'burger' && (
            <div>
              <h3 className="text-gray-900 dark:text-white text-lg font-semibold mb-3">Frites</h3>
              <div className="grid grid-cols-2 gap-3">
                {fries.map((fry) => (
                  <button
                    key={fry.id}
                    onClick={() => setSelectedFries(fry.id)}
                    className={`p-3 rounded-lg border-2 transition-colors duration-200 ${
                      selectedFries === fry.id
                        ? 'border-green-500 bg-green-500/20 text-green-400'
                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 bg-white dark:bg-gray-700'
                    }`}
                  >
                    <div className="font-semibold">{fry.name}</div>
                    {fry.price > 0 && (
                      <div className="text-sm">+{fry.price}€</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sauce Selection - Not for Naan (cheese is selected above) */}
          {product.type !== 'naan' && (
            <div>
            <h3 className="text-gray-900 dark:text-white text-lg font-semibold mb-3">Sauce</h3>
            <div className="grid grid-cols-2 gap-3">
              {sauces.map((sauce) => (
                <button
                  key={sauce.id}
                  onClick={() => setSelectedSauce(sauce.id)}
                  className={`p-3 rounded-lg border-2 transition-colors duration-200 ${
                    selectedSauce === sauce.id
                      ? 'border-green-500 bg-green-500/20 text-green-400'
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 bg-white dark:bg-gray-700'
                  }`}
                >
                  <div className="font-semibold">{sauce.name}</div>
                  {sauce.price > 0 && (
                    <div className="text-sm">+{sauce.price}€</div>
                  )}
                </button>
              ))}
            </div>
            </div>
          )}

          {/* Drink Selection */}
          <div>
            <h3 className="text-gray-900 dark:text-white text-lg font-semibold mb-3">Boisson</h3>
            <div className="grid grid-cols-2 gap-3">
              {drinks.map((drink) => (
                <button
                  key={drink.id}
                  onClick={() => setSelectedDrink(drink.id)}
                  className={`p-3 rounded-lg border-2 transition-colors duration-200 ${
                    selectedDrink === drink.id
                      ? 'border-green-500 bg-green-500/20 text-green-400'
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 bg-white dark:bg-gray-700'
                  }`}
                >
                  <div className="font-semibold">{drink.name}</div>
                  <div className="text-sm">+{drink.price}€</div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="sticky bottom-0 bg-white dark:bg-gray-800 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <span className="text-gray-900 dark:text-white font-semibold">Quantité:</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-white p-2 rounded-full transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-gray-900 dark:text-white font-bold text-lg w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-white p-2 rounded-full transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="text-gray-900 dark:text-white text-2xl font-bold">
                {calculateTotal().toFixed(2)}€
              </div>
            </div>
            
            <button
              onClick={() => {
                const cartItem = {
                  id: generateCartItemId(),
                  name: product.name,
                  emoji: product.emoji,
                  type: product.type,
                  basePrice: product.basePrice,
                  meat: selectedMeat,
                  supplements: selectedSupplements,
                  drink: selectedDrink,
                  quantity,
                  total: calculateTotal()
                };

                if (product.type === 'naan') {
                  cartItem.cheese = selectedSauce;
                } else {
                  cartItem.size = selectedSize;
                  cartItem.sauce = selectedSauce;
                  if (product.type === 'burger') {
                    cartItem.removedItems = removedItems;
                    cartItem.fries = selectedFries;
                  }
                }

                addItem(cartItem);
                onClose();
              }}
              disabled={
                !selectedMeat || 
                !selectedSauce || 
                (product.type === 'burger' && !selectedFries)
              }
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductConfigurator;