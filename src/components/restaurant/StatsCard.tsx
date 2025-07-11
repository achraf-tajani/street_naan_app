import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: 'orange' | 'yellow' | 'green' | 'gray' | 'blue';
  urgent?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, color, urgent }) => {
  const getColorClasses = () => {
    const baseClasses = urgent 
      ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    
    const iconColor = urgent ? 'text-red-500' : {
      orange: 'text-orange-500',
      yellow: 'text-yellow-500',
      green: 'text-green-500',
      gray: 'text-gray-500',
      blue: 'text-blue-500'
    }[color];

    return { baseClasses, iconColor };
  };

  const { baseClasses, iconColor } = getColorClasses();

  return (
    <div className={`${baseClasses} rounded-lg border p-3 sm:p-4 transition-all duration-200 hover:shadow-md ${urgent ? 'animate-pulse' : ''}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-xs sm:text-sm font-medium ${urgent ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'}`}>
            {title}
          </p>
          <p className={`text-xl sm:text-2xl font-bold ${urgent ? 'text-red-700 dark:text-red-300' : 'text-gray-900 dark:text-white'}`}>
            {value}
          </p>
        </div>
        <Icon className={`h-6 w-6 sm:h-8 sm:w-8 ${iconColor}`} />
      </div>
    </div>
  );
};

export default StatsCard;