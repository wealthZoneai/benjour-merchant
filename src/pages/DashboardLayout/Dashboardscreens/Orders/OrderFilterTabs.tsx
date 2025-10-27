import React from 'react';

const OrderFilterTabs = ({
  activeTab,
  setActiveTab,
  allOrdersCount,
  newOrdersCount,
  preparingOrdersCount,
  readyOrdersCount,
  assignedOrdersCount,
  outOfDeliveryOrdersCount,
  Refund,
}) => {
  const tabs = [
    { name: 'All Orders', count: allOrdersCount, color: 'from-blue-400 to-blue-600' },
    { name: 'New', count: newOrdersCount, color: 'from-green-400 to-green-600' },
    { name: 'Preparing', count: preparingOrdersCount, color: 'from-yellow-400 to-yellow-500' },
    { name: 'Ready', count: readyOrdersCount, color: 'from-purple-400 to-purple-600' },
    { name: 'Assigned', count: assignedOrdersCount, color: 'from-pink-400 to-pink-600' },
    { name: 'Out Of Delivery', count: outOfDeliveryOrdersCount, color: 'from-red-400 to-red-600' },
    { name: 'Refund', count: Refund, color: 'from-gray-400 to-gray-600' },
  ];

  return (
    <div className="flex space-x-3 overflow-x-auto py-3 px-2 no-scrollbar">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.name;
        return (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center gap-2 flex-shrink-0 px-5 py-2 rounded-2xl font-semibold text-sm transition-all duration-300
              ${isActive
                ? `bg-gradient-to-r ${tab.color} text-white shadow-lg transform scale-105`
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            <span>{tab.name}</span>
            {tab.count > 0 && (
              <span
                className={`inline-flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full 
                  ${isActive ? 'bg-white text-gray-800 shadow-md' : 'bg-gray-300 text-gray-700'}`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default OrderFilterTabs;
