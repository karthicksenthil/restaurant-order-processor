import { useState, useEffect } from 'react';
import axios from 'axios';
import MenuItemCard from './components/MenuItemCard';
import CartItem from './components/CartItem';
import CartSummary from './components/CartSummary';
import OrderHistoryItem from './components/OrderHistoryItem';
import ReceiptModal from './components/ReceiptModal';
import Tabs from './components/Tabs';
import type { MenuItem, CartItemType, Order } from './types';



function App() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<'order' | 'history'>('order');
  const [showReceipt, setShowReceipt] = useState<Order | null>(null);

  useEffect(() => {
    fetchMenu();
    fetchOrders();
  }, []);

  const fetchMenu = async () => {
    const res = await axios.get('http://localhost:5000/menu');
    setMenu(res.data);
  };

  const fetchOrders = async () => {
    const res = await axios.get('http://localhost:5000/orders');
    setOrders(res.data);
  };

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = async () => {
    if (cart.length === 0) return alert('Cart is empty!');

    const res = await axios.post('http://localhost:5000/orders', cart);
    setShowReceipt(res.data);
    setCart([]);
    fetchOrders();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-yellow-600 text-white p-6 shadow-lg">
        <h1 className="text-4xl font-bold text-center">Restaurant Order Processor</h1>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <Tabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          orderCount={orders.length}
        />

        {activeTab === 'order' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Menu</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {menu.map(item => (
                  <MenuItemCard key={item.id} item={item} onAdd={addToCart} />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
              <h2 className="text-2xl font-bold mb-4">Your Order</h2>
              {cart.map(item => (
                <CartItem
                  key={item.id}
                  name={item.name}
                  quantity={item.quantity}
                  price={item.price}
                  onIncrement={() => updateQuantity(item.id, 1)}
                  onDecrement={() => updateQuantity(item.id, -1)}
                />
              ))}
              <CartSummary
                subtotal={subtotal}
                onPlaceOrder={placeOrder}
                isEmpty={cart.length === 0}
              />
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Order History</h2>
            {orders.length === 0 ? (
              <p className="text-center text-gray-500 py-12">No orders yet</p>
            ) : (
              <div className="space-y-6">
                {orders.slice().reverse().map(order => (
                  <OrderHistoryItem key={order.id} order={order} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {showReceipt && <ReceiptModal order={showReceipt} onClose={() => setShowReceipt(null)} />}
    </div>
  );
}

export default App;