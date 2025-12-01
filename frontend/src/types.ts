
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  type: 'burger' | 'drink';
  size?: 'small' | 'large';
}

export interface CartItemType extends MenuItem {
  quantity: number;
}

export interface OrderItemFromServer extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItemFromServer[];
  subtotal: number;
  gst: number;
  total: number;
  timestamp: string;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}