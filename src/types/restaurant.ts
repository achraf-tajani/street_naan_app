export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'completed';

export interface OrderItem {
  id: string;
  name: string;
  emoji: string;
  quantity: number;
  price: number;
  configuration: {
    size?: string;
    meat?: string;
    cheese?: string;
    sauce?: string;
    fries?: string;
    drink?: string;
    supplements?: string[];
    vegetables?: string[];
    removedItems?: string[];
  };
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  type: 'delivery' | 'pickup';
  status: OrderStatus;
  createdAt: Date;
  estimatedTime: number;
  address?: string;
  instructions?: string;
  items: OrderItem[];
  total: number;
  deliveryFee: number;
  serviceFee: number;
  finalTotal: number;
  statusHistory?: {
    status: OrderStatus;
    timestamp: Date;
  }[];
}