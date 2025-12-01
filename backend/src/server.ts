import express from 'express';
import cors from 'cors';
import { MenuItem, Order, OrderItem } from './types';

const app = express();
app.use(cors());
app.use(express.json());

const menu: MenuItem[] = [
  { id: 'cheeseburger', name: 'Cheeseburger', price: 15, type: 'burger' },
  { id: 'chickenburger', name: 'Chicken Burger', price: 20, type: 'burger' },
  { id: 'drink-small', name: 'Soft Drink (Small)', price: 4, type: 'drink', size: 'small' },
  { id: 'drink-large', name: 'Soft Drink (Large)', price: 5, type: 'drink', size: 'large' },
];

let orders: Order[] = [];
let orderIdCounter = 1;

// Get menu
app.get('/menu', (req, res) => {
  res.json(menu);
});

// Submit order
app.post('/orders', (req, res) => {
  const cart: OrderItem[] = req.body;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gst = Number((subtotal / 11).toFixed(2));
  const total = Number((subtotal).toFixed(2));

  const order: Order = {
    id: `ORD-${orderIdCounter++}`,
    items: cart,
    subtotal,
    gst,
    total,
    timestamp: new Date().toISOString(),
  };

  orders.push(order);
  res.json(order);
});

// Get order history
app.get('/orders', (req, res) => {
  res.json(orders);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});