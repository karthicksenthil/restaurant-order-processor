export interface MenuItem {
  id: string;
  name: string;
  price: number;
  type: 'burger' | 'drink';
  size?: 'small' | 'large';
}

export interface OrderItem {
  menuId: string;
  name: string;
  price: number;
  quantity: number;
  size?: 'small' | 'large';
}

export interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  gst: number;
  total: number;
  timestamp: string;
}