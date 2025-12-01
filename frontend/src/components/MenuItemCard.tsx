import React from 'react';
import type { MenuItem } from '../types';

interface Props {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
}

const MenuItemCard: React.FC<Props> = ({ item, onAdd }) => {
  const displayName = item.name

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
      <h3 className="text-xl font-semibold">{displayName}</h3>
      <p className="text-gray-600 mt-2">${item.price.toFixed(2)} (incl. GST)</p>
      <button
        onClick={() => onAdd(item)}
        className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium"
      >
        Add to Order
      </button>
    </div>
  );
};

export default MenuItemCard;