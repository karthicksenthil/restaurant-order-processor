import React from 'react';

interface Props {
  activeTab: 'order' | 'history';
  onTabChange: (tab: 'order' | 'history') => void;
  orderCount: number;
}

const Tabs: React.FC<Props> = ({ activeTab, onTabChange, orderCount }) => {
  return (
    <div className="flex justify-center gap-4 mb-8">
      <button
        onClick={() => onTabChange('order')}
        className={`px-8 py-3 rounded-lg font-semibold transition ${
          activeTab === 'order'
            ? 'bg-red-600 text-white'
            : 'bg-white text-gray-700 shadow'
        }`}
      >
        Place Order
      </button>
      <button
        onClick={() => onTabChange('history')}
        className={`px-8 py-3 rounded-lg font-semibold transition ${
          activeTab === 'history'
            ? 'bg-red-600 text-white'
            : 'bg-white text-gray-700 shadow'
        }`}
      >
        Order History ({orderCount})
      </button>
    </div>
  );
};

export default Tabs;