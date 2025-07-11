import React from 'react';
import { X, Clock, MapPin, Phone, Mail, Truck, Store, User, Package } from 'lucide-react';
import { Order, OrderStatus } from '../../types/restaurant';

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onStatusChange: (orderId: string, status: OrderStatus) => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ 
  isOpen, 
  onClose, 
  order, 
  onStatusChange 
}) => {
  if (!isOpen || !order) return null;

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 'text-orange-500 bg-orange-100 dark:bg-orange-900/20';
      case 'preparing': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'ready': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'completed': return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
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

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getElapsedTime = () => {
    const now = new Date();
    const orderTime = new Date(order.createdAt);
    const elapsedMinutes = Math.floor((now.getTime() - orderTime.getTime()) / (1000 * 60));
    return elapsedMinutes;
  };

  const renderConfiguration = (config: any) => {
    const items = [];
    
    if (config.size) items.push(`Taille: ${config.size}`);
    if (config.meat) items.push(`Viande: ${config.meat}`);
    if (config.cheese) items.push(`Fromage: ${config.cheese}`);
    if (config.sauce) items.push(`Sauce: ${config.sauce}`);
    if (config.fries) items.push(`Frites: ${config.fries}`);
    if (config.drink) items.push(`Boisson: ${config.drink}`);
    if (config.supplements && config.supplements.length > 0) {
      items.push(`Suppléments: ${config.supplements.join(', ')}`);
    }
    if (config.vegetables && config.vegetables.length > 0) {
      items.push(`Légumes: ${config.vegetables.join(', ')}`);
    }
    if (config.removedItems && config.removedItems.length > 0) {
      items.push(`Sans: ${config.removedItems.join(', ')}`);
    }
    
    return items;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between z-10">
          <div className="flex items-center space-x-4">
            <h2 className="text-gray-900 dark:text-white text-2xl font-bold">
              Commande #{order.id}
            </h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
              {getStatusLabel(order.status)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Order Info */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-gray-900 dark:text-white font-semibold mb-3 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-500" />
                  Informations de commande
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Heure de commande:</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {formatTime(new Date(order.createdAt))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Temps écoulé:</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {getElapsedTime()} minutes
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Temps estimé:</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {order.estimatedTime} minutes
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Type:</span>
                    <div className="flex items-center space-x-1">
                      {order.type === 'delivery' ? (
                        <Truck className="h-4 w-4 text-blue-500" />
                      ) : (
                        <Store className="h-4 w-4 text-green-500" />
                      )}
                      <span className="text-gray-900 dark:text-white font-medium">
                        {order.type === 'delivery' ? 'Livraison' : 'À emporter'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-gray-900 dark:text-white font-semibold mb-3 flex items-center">
                  <User className="h-5 w-5 mr-2 text-green-500" />
                  Informations client
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-900 dark:text-white font-medium">
                      {order.customerName}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <a 
                      href={`tel:${order.customerPhone}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {order.customerPhone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <a 
                      href={`mailto:${order.customerEmail}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {order.customerEmail}
                    </a>
                  </div>
                  {order.address && (
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-gray-900 dark:text-white">{order.address}</p>
                        {order.instructions && (
                          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                            <strong>Instructions:</strong> {order.instructions}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Status History */}
              {order.statusHistory && order.statusHistory.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="text-gray-900 dark:text-white font-semibold mb-3">
                    Historique des statuts
                  </h3>
                  <div className="space-y-2">
                    {order.statusHistory.map((entry, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(entry.status)}`}>
                          {getStatusLabel(entry.status)}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">
                          {formatTime(new Date(entry.timestamp))}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Items */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-gray-900 dark:text-white font-semibold mb-3 flex items-center">
                  <Package className="h-5 w-5 mr-2 text-purple-500" />
                  Articles commandés
                </h3>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl">{item.emoji}</span>
                          <span className="text-gray-900 dark:text-white font-medium">
                            {item.name}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400">
                            x{item.quantity}
                          </span>
                        </div>
                        <span className="text-gray-900 dark:text-white font-bold">
                          {item.price.toFixed(2)}€
                        </span>
                      </div>
                      
                      {item.configuration && Object.keys(item.configuration).length > 0 && (
                        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          {renderConfiguration(item.configuration).map((config, index) => (
                            <div key={index} className="flex items-center">
                              <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                              {config}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-gray-900 dark:text-white font-semibold mb-3">
                  Récapitulatif
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Sous-total:</span>
                    <span className="text-gray-900 dark:text-white">{order.total.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      {order.type === 'delivery' ? 'Livraison:' : 'Récupération:'}
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      {order.deliveryFee > 0 ? `${order.deliveryFee.toFixed(2)}€` : 'Gratuit'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Frais de service:</span>
                    <span className="text-gray-900 dark:text-white">{order.serviceFee.toFixed(2)}€</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span className="text-gray-900 dark:text-white">Total:</span>
                      <span className="text-green-600 dark:text-green-400">
                        {order.finalTotal.toFixed(2)}€
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                {order.status === 'pending' && (
                  <button
                    onClick={() => onStatusChange(order.id, 'preparing')}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    Commencer la préparation
                  </button>
                )}
                
                {order.status === 'preparing' && (
                  <button
                    onClick={() => onStatusChange(order.id, 'ready')}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    Marquer comme prête
                  </button>
                )}
                
                {order.status === 'ready' && (
                  <button
                    onClick={() => onStatusChange(order.id, 'completed')}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    Finaliser la commande
                  </button>
                )}

                <button
                  onClick={onClose}
                  className="w-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;