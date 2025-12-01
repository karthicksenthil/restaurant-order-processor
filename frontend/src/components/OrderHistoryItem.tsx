import React from 'react';
import type { Order } from '../types';


interface Props {
  order: Order;
}

const OrderHistoryItem: React.FC<Props> = ({ order }) => {
  const formatName = (name: string) => name.replace('Soft ', '');

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">{order.id}</h3>
        <span className="text-gray-600">
          {new Date(order.timestamp).toLocaleString()}
        </span>
      </div>

      {order.items.map((item, i) => (
        <div key={i} className="flex justify-between py-2">
          <span>
            {formatName(item.name)} × {item.quantity}
          </span>
          <span>${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      ))}

      <div className="mt-4 pt-4 border-t-2 border-gray-300 font-bold text-lg">
        <div className="flex justify-between">
          <span>Total</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
        <div className="text-sm text-gray-600 text-right">
          Including GST ${order.gst.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryItem;