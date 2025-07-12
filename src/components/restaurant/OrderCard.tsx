import React from 'react';
import { Clock, MapPin, Phone, Eye, AlertTriangle, Truck, Store } from 'lucide-react';
import { Order, OrderStatus } from '../../types/restaurant';

interface OrderCardProps {
  order: Order;
  onStatusChange: (orderId: string, status: OrderStatus) => void;
  onViewDetails: (order: Order) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onStatusChange, onViewDetails }) => {
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
      case 'preparing': return 'bg-yellow-100 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'ready': return 'bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'completed': return 'bg-gray-100 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800';
      default: return 'bg-gray-100 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800';
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return '🟠';
      case 'preparing': return '🟡';
      case 'ready': return '🟢';
      case 'completed': return '✅';
      default: return '⚪';
    }
  };

  const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'preparing': return 'En préparation';
      case 'ready': return 'Prête';
      case 'completed': return 'Terminée';
      default: return status;
    }
  };

  const getNextStatus = (currentStatus: OrderStatus): OrderStatus | null => {
    switch (currentStatus) {
      case 'pending': return 'preparing';
      case 'preparing': return 'ready';
      case 'ready': return 'completed';
      default: return null;
    }
  };

  const getNextStatusLabel = (currentStatus: OrderStatus): string => {
    const nextStatus = getNextStatus(currentStatus);
    if (!nextStatus) return '';
    
    switch (nextStatus) {
      case 'preparing': return 'Commencer';
      case 'ready': return 'Marquer prête';
      case 'completed': return 'Finaliser';
      default: return '';
    }
  };

  const isUrgent = () => {
    const now = new Date();
    const orderTime = new Date(order.createdAt);
    const elapsedMinutes = (now.getTime() - orderTime.getTime()) / (1000 * 60);
    return elapsedMinutes > order.estimatedTime;
  };

  const getElapsedTime = () => {
    const now = new Date();
    const orderTime = new Date(order.createdAt);
    const elapsedMinutes = Math.floor((now.getTime() - orderTime.getTime()) / (1000 * 60));
    return elapsedMinutes;
  };

  const urgent = isUrgent();
  const elapsedTime = getElapsedTime();

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl border-2 transition-all duration-200 hover:shadow-lg active:scale-95 ${getStatusColor(order.status)} ${urgent ? 'ring-2 ring-red-500' : ''} touch-manipulation`}>
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-base sm:text-lg">{getStatusIcon(order.status)}</span>
            <h3 className="text-gray-900 dark:text-white font-bold text-base sm:text-lg">#{order.id}</h3>
            {urgent && (
              <AlertTriangle className="h-5 w-5 text-red-500 animate-pulse" />
            )}
          </div>
          <div className="flex items-center space-x-2">
            {order.type === 'delivery' ? (
              <Truck className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
            ) : (
              <Store className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
            )}
            <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
              {order.type === 'delivery' ? 'Livraison' : 'À emporter'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className={`px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${
            order.status === 'pending' ? 'bg-orange-500 text-white' :
            order.status === 'preparing' ? 'bg-yellow-500 text-white' :
            order.status === 'ready' ? 'bg-green-500 text-white' :
            'bg-gray-500 text-white'
          }`}>
            {getStatusLabel(order.status)}
          </span>
          
          <div className="text-right">
            <div className={`text-xs sm:text-sm font-medium ${urgent ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'}`}>
              {elapsedTime}min écoulées
            </div>
            <div className="text-xs sm:text-xs text-gray-500 dark:text-gray-500">
              Estimé: {order.estimatedTime}min
            </div>
          </div>
        </div>
      </div>

      {/* Customer Info */}
      <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-gray-900 dark:text-white font-semibold text-sm sm:text-base truncate">{order.customerName}</h4>
          <span className="text-gray-900 dark:text-white font-bold text-base sm:text-lg flex-shrink-0 ml-2">
            {order.finalTotal.toFixed(2)}€
          </span>
        </div>
        
        <div className="space-y-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4" />
            <span className="truncate">{order.customerPhone}</span>
          </div>
          {order.address && (
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span className="truncate text-xs">{order.address}</span>
            </div>
          )}
        </div>
      </div>

      {/* Items */}
      <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="space-y-2">
          {order.items.slice(0, 2).map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-base sm:text-lg">{item.emoji}</span>
                <span className="text-gray-900 dark:text-white font-medium text-sm sm:text-base truncate">{item.name}</span>
                <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">x{item.quantity}</span>
              </div>
              <span className="text-gray-900 dark:text-white font-medium text-sm sm:text-base flex-shrink-0">
                {item.price.toFixed(2)}€
              </span>
            </div>
          ))}
          {order.items.length > 2 && (
            <div className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
              +{order.items.length - 2} autre(s) article(s)
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="p-3 sm:p-4">
        <div className="flex space-x-1.5 sm:space-x-2">
          <button
            onClick={() => onViewDetails(order)}
            className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 active:bg-gray-300 dark:active:bg-gray-500 text-gray-700 dark:text-white py-2 px-2 sm:px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-1 sm:space-x-2 touch-manipulation text-xs sm:text-sm"
          >
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">Détails</span>
          </button>
          
          {getNextStatus(order.status) && (
            <button
              onClick={() => {
                const nextStatus = getNextStatus(order.status);
                if (nextStatus) {
                  onStatusChange(order.id, nextStatus);
                }
              }}
              className={`flex-1 py-2 px-2 sm:px-4 rounded-lg font-medium transition-colors touch-manipulation text-xs sm:text-sm ${
                order.status === 'pending' ? 'bg-orange-500 hover:bg-orange-600 text-white' :
                order.status === 'preparing' ? 'bg-green-500 hover:bg-green-600 text-white' :
                order.status === 'ready' ? 'bg-blue-500 hover:bg-blue-600 text-white' :
                'bg-gray-500 hover:bg-gray-600 text-white'
              }`}
            >
              <span className="hidden sm:inline">{getNextStatusLabel(order.status)}</span>
              <span className="sm:hidden">
                {order.status === 'pending' ? '▶️' : 
                 order.status === 'preparing' ? '✅' : 
                 order.status === 'ready' ? '🏁' : ''}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;