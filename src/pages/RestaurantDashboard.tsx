import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, CheckCircle, Package, AlertTriangle, Eye, Phone, MapPin, Truck, Store } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import OrderCard from '../components/restaurant/OrderCard';
import OrderDetailsModal from '../components/restaurant/OrderDetailsModal';
import StatsCard from '../components/restaurant/StatsCard';
import { Order, OrderStatus } from '../types/restaurant';

const RestaurantDashboard = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');
  const [playNotification] = useState(() => {
    const audio = new Audio('/notification.mp3');
    audio.volume = 0.5;
    return () => audio.play().catch(() => {});
  });

  // Simulation des commandes en temps réel
  useEffect(() => {
    const mockOrders: Order[] = [
      {
        id: 'FH001234',
        customerName: 'Marie Dubois',
        customerPhone: '06 12 34 56 78',
        customerEmail: 'marie.dubois@email.com',
        type: 'delivery',
        status: 'pending',
        createdAt: new Date(Date.now() - 5 * 60 * 1000),
        estimatedTime: 25,
        address: '15 Rue de Rivoli, 75001 Paris',
        items: [
          {
            id: '1',
            name: 'Cheese Naan',
            emoji: '🫓',
            quantity: 2,
            price: 10,
            configuration: {
              meat: 'Poulet',
              cheese: 'Comté',
              vegetables: ['Tomate', 'Salade'],
              drink: 'Coca-Cola'
            }
          },
          {
            id: '2',
            name: 'Tacos Classique',
            emoji: '🌮',
            quantity: 1,
            price: 8,
            configuration: {
              size: 'Large',
              meat: 'Bœuf',
              supplements: ['Fromage', 'Avocat'],
              sauce: 'Sauce Piquante',
              drink: 'Sprite'
            }
          }
        ],
        total: 18,
        deliveryFee: 2.5,
        serviceFee: 1,
        finalTotal: 21.5,
        instructions: 'Appartement au 3ème étage, code 1234'
      },
      {
        id: 'FH001235',
        customerName: 'Jean Martin',
        customerPhone: '06 98 76 54 32',
        customerEmail: 'jean.martin@email.com',
        type: 'pickup',
        status: 'preparing',
        createdAt: new Date(Date.now() - 15 * 60 * 1000),
        estimatedTime: 15,
        items: [
          {
            id: '3',
            name: 'Cheeseburger',
            emoji: '🍔',
            quantity: 1,
            price: 9,
            configuration: {
              size: 'Maxi',
              meat: 'Bœuf',
              supplements: ['Bacon'],
              fries: 'Grandes frites',
              sauce: 'Sauce BBQ',
              drink: 'Coca-Cola'
            }
          }
        ],
        total: 9,
        deliveryFee: 0,
        serviceFee: 1,
        finalTotal: 10,
        statusHistory: [
          { status: 'pending', timestamp: new Date(Date.now() - 15 * 60 * 1000) },
          { status: 'preparing', timestamp: new Date(Date.now() - 10 * 60 * 1000) }
        ]
      },
      {
        id: 'FH001236',
        customerName: 'Sophie Laurent',
        customerPhone: '06 11 22 33 44',
        customerEmail: 'sophie.laurent@email.com',
        type: 'delivery',
        status: 'ready',
        createdAt: new Date(Date.now() - 30 * 60 * 1000),
        estimatedTime: 25,
        address: '42 Avenue des Champs-Élysées, 75008 Paris',
        items: [
          {
            id: '4',
            name: 'Hot Dog Deluxe',
            emoji: '🌭',
            quantity: 2,
            price: 17,
            configuration: {
              meat: 'Saucisse premium',
              supplements: ['Bacon', 'Fromage'],
              sauce: 'Sauce spéciale',
              drink: 'Jus d\'orange'
            }
          }
        ],
        total: 17,
        deliveryFee: 2.5,
        serviceFee: 1,
        finalTotal: 20.5,
        statusHistory: [
          { status: 'pending', timestamp: new Date(Date.now() - 30 * 60 * 1000) },
          { status: 'preparing', timestamp: new Date(Date.now() - 20 * 60 * 1000) },
          { status: 'ready', timestamp: new Date(Date.now() - 5 * 60 * 1000) }
        ]
      },
      {
        id: 'FH001237',
        customerName: 'Pierre Durand',
        customerPhone: '06 55 44 33 22',
        customerEmail: 'pierre.durand@email.com',
        type: 'pickup',
        status: 'completed',
        createdAt: new Date(Date.now() - 60 * 60 * 1000),
        estimatedTime: 15,
        items: [
          {
            id: '5',
            name: 'Garlic Naan',
            emoji: '🫓',
            quantity: 1,
            price: 4.5,
            configuration: {
              meat: 'Poulet',
              cheese: 'Gruyère',
              vegetables: ['Oignon'],
              drink: 'Eau'
            }
          }
        ],
        total: 4.5,
        deliveryFee: 0,
        serviceFee: 1,
        finalTotal: 5.5,
        statusHistory: [
          { status: 'pending', timestamp: new Date(Date.now() - 60 * 60 * 1000) },
          { status: 'preparing', timestamp: new Date(Date.now() - 50 * 60 * 1000) },
          { status: 'ready', timestamp: new Date(Date.now() - 40 * 60 * 1000) },
          { status: 'completed', timestamp: new Date(Date.now() - 35 * 60 * 1000) }
        ]
      }
    ];

    setOrders(mockOrders);

    // Simulation de nouvelles commandes
    const interval = setInterval(() => {
      const newOrder: Order = {
        id: `FH${Date.now().toString().slice(-6)}`,
        customerName: 'Nouveau Client',
        customerPhone: '06 00 00 00 00',
        customerEmail: 'client@email.com',
        type: Math.random() > 0.5 ? 'delivery' : 'pickup',
        status: 'pending',
        createdAt: new Date(),
        estimatedTime: Math.random() > 0.5 ? 25 : 15,
        address: Math.random() > 0.5 ? '123 Rue Example, 75001 Paris' : undefined,
        items: [
          {
            id: Date.now().toString(),
            name: 'Nouvelle Commande',
            emoji: '🍽️',
            quantity: 1,
            price: 10,
            configuration: {}
          }
        ],
        total: 10,
        deliveryFee: Math.random() > 0.5 ? 2.5 : 0,
        serviceFee: 1,
        finalTotal: Math.random() > 0.5 ? 13.5 : 11
      };

      setOrders(prev => [newOrder, ...prev]);
      playNotification();
    }, 30000); // Nouvelle commande toutes les 30 secondes

    return () => clearInterval(interval);
  }, [playNotification]);

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const updatedOrder = {
          ...order,
          status: newStatus,
          statusHistory: [
            ...(order.statusHistory || []),
            { status: newStatus, timestamp: new Date() }
          ]
        };
        return updatedOrder;
      }
      return order;
    }));
  };

  const getFilteredOrders = () => {
    if (filter === 'all') return orders;
    return orders.filter(order => order.status === filter);
  };

  const getStats = () => {
    const pending = orders.filter(o => o.status === 'pending').length;
    const preparing = orders.filter(o => o.status === 'preparing').length;
    const ready = orders.filter(o => o.status === 'ready').length;
    const completed = orders.filter(o => o.status === 'completed').length;
    
    const avgTime = orders.length > 0 
      ? Math.round(orders.reduce((sum, order) => sum + order.estimatedTime, 0) / orders.length)
      : 0;

    return { pending, preparing, ready, completed, avgTime };
  };

  const stats = getStats();
  const filteredOrders = getFilteredOrders();

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 'text-orange-500';
      case 'preparing': return 'text-yellow-500';
      case 'ready': return 'text-green-500';
      case 'completed': return 'text-gray-500';
      default: return 'text-gray-500';
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

  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-green-500" />
              <h1 className="text-gray-900 dark:text-white text-lg sm:text-2xl font-bold">Dashboard Restaurant</h1>
            </div>
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>En ligne</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block text-right">
              <p className="text-gray-900 dark:text-white font-semibold text-sm sm:text-base">Naan Street</p>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">123 Rue de la Paix, 75001 Paris</p>
            </div>
            
            <button
              onClick={() => navigate('/client')}
              className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors touch-manipulation"
            >
              <span className="hidden sm:inline">Mode Client</span>
              <span className="sm:hidden">👤</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-4 sm:mb-6 flex-shrink-0">
          <StatsCard
            title="En attente"
            value={stats.pending}
            icon={Clock}
            color="orange"
            urgent={stats.pending > 5}
          />
          <StatsCard
            title="En préparation"
            value={stats.preparing}
            icon={Package}
            color="yellow"
          />
          <StatsCard
            title="Prêtes"
            value={stats.ready}
            icon={CheckCircle}
            color="green"
            urgent={stats.ready > 3}
          />
          <StatsCard
            title="Terminées"
            value={stats.completed}
            icon={Users}
            color="gray"
          />
          <StatsCard
            title="Temps moyen"
            value={`${stats.avgTime}min`}
            icon={Clock}
            color="blue"
          />
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3 sm:p-4 mb-4 sm:mb-6 flex-shrink-0">
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {[
              { key: 'all', label: 'Toutes', count: orders.length },
              { key: 'pending', label: 'En attente', count: stats.pending },
              { key: 'preparing', label: 'En préparation', count: stats.preparing },
              { key: 'ready', label: 'Prêtes', count: stats.ready },
              { key: 'completed', label: 'Terminées', count: stats.completed }
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setFilter(key as OrderStatus | 'all')}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm touch-manipulation ${
                  filter === key
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {label} ({count})
              </button>
            ))}
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 pb-6">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onStatusChange={updateOrderStatus}
              onViewDetails={(order) => {
                setSelectedOrder(order);
                setIsDetailsOpen(true);
              }}
            />
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12 flex-shrink-0">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-gray-900 dark:text-white text-lg font-semibold mb-2">
              Aucune commande
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {filter === 'all' 
                ? 'Aucune commande pour le moment'
                : `Aucune commande ${getStatusLabel(filter as OrderStatus).toLowerCase()}`
              }
            </p>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        order={selectedOrder}
        onStatusChange={updateOrderStatus}
      />
    </div>
  );
};

export default RestaurantDashboard;