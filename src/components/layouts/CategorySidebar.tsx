import React from 'react';

interface CategorySidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    { id: 'naan', emoji: '🫓', name: 'Naan' },
    { id: 'burgers', emoji: '🍔', name: 'Burgers' },
    { id: 'tacos', emoji: '🌮', name: 'Tacos' },
    { id: 'hotdog', emoji: '🌭', name: 'Hot Dog' },
    { id: 'boissons', emoji: '🥤', name: 'Boissons' },
    { id: 'desserts', emoji: '🍰', name: 'Desserts' },
    { id: 'sauces', emoji: '🥫', name: 'Sauces' },
  ];

  return (
    <div className="w-16 sm:w-20 bg-white dark:bg-gray-800 p-2 sm:p-4 flex flex-col space-y-2 sm:space-y-4 relative border-r border-gray-200 dark:border-gray-700 transition-colors duration-200 flex-shrink-0">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-xl sm:text-2xl transition-colors touch-manipulation ${
            activeCategory === category.id
              ? 'bg-green-500 hover:bg-green-600' 
              : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
          } group relative`}
          title={category.name}
        >
          {category.emoji}
          <div className="hidden sm:block absolute left-full ml-2 px-2 py-1 bg-gray-800 dark:bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
            {category.name}
          </div>
        </button>
      ))}
    </div>
  );
};

export default CategorySidebar;