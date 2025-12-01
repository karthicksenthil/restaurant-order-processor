import React from 'react';

interface Props {
  subtotal: number;
  onPlaceOrder: () => void;
  isEmpty: boolean;
}

const CartSummary: React.FC<Props> = ({ subtotal, onPlaceOrder, isEmpty }) => {
  const total = Number((subtotal).toFixed(2));
  const gst = Number((subtotal / 11).toFixed(2));

  if (isEmpty) {
    return <p className="text-gray-500 text-center py-12">Your cart is empty</p>;
  }

  return (
    <div className="mt-6 pt-6 border-t-2 border-gray-300">
      <div className="flex justify-between text-xl font-bold">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <p className="text-sm text-gray-600 text-right mt-1">
        Including GST ${gst.toFixed(2)}
      </p>
      <button
        onClick={onPlaceOrder}
        className="w-full mt-6 bg-green-600 text-white py-4 rounded-lg text-xl font-bold hover:bg-green-700 transition"
      >
        Place Order
      </button>
    </div>
  );
};

export default CartSummary;