import React from 'react';
import type { Order } from '../types';

interface Props {
  order: Order;
  onClose: () => void;
}

const ReceiptModal: React.FC<Props> = ({ order, onClose }) => {
  const formatName = (name: string) => name.replace('Soft ', '');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Order Confirmed!</h2>
        <p className="text-center text-gray-600 mb-6">Order ID: {order.id}</p>

        <div className="border-2 border-dashed border-gray-400 p-6 rounded-lg text-center">
          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between py-1">
              <span>
                {formatName(item.name)} × {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <div className="mt-4 pt-4 border-t-2 border-gray-600 font-bold text-lg">
            <div className="flex justify-between">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-600">
              Including GST ${order.gst.toFixed(2)}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ReceiptModal;