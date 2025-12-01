import React from 'react';

interface CartItemProps {
  name: string;
  quantity: number;
  price: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  name,
  quantity,
  price,
  onIncrement,
  onDecrement,
}) => {
  const displayName = name.replace('Soft ', '');

  return (
    <div className="flex justify-between items-center py-3 border-b">
      <div>
        <p className="font-medium">{displayName}</p>
        <p className="text-sm text-gray-600">× {quantity}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onDecrement}
          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition"
        >
          −
        </button>
        <span className="w-12 text-center font-medium">{quantity}</span>
        <button
          onClick={onIncrement}
          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition"
        >
          +
        </button>
        <span className="ml-4 font-semibold">${(price * quantity).toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CartItem;