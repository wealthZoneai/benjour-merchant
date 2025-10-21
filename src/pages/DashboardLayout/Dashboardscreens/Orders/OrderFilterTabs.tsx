// src/components/OrderFilterTabs.js
import React from 'react';

const OrderFilterTabs = ({
    activeTab, setActiveTab,
    allOrdersCount, newOrdersCount, preparingOrdersCount,
    readyOrdersCount, assignedOrdersCount, outOfDeliveryOrdersCount
}) => {
    const tabs = [
        { name: `All Orders(${allOrdersCount})`, status: 'All Orders' },
        { name: `New(${newOrdersCount})`, status: 'New' },
        { name: `Preparing(${preparingOrdersCount})`, status: 'Preparing' },
        { name: `Ready(${readyOrdersCount})`, status: 'Ready' },
        { name: `Assigned(${assignedOrdersCount})`, status: 'Assigned' },
        { name: `Out Of Delivery(${outOfDeliveryOrdersCount})`, status: 'Out Of Delivery' },
    ];

    return (
        <div className="flex flex-wrap gap-2 text-sm font-medium text-gray-700">
            {tabs.map((tab) => (
                <button
                    key={tab.status}
                    onClick={() => setActiveTab(tab.status)}
                    className={`px-4 py-2 rounded-lg transition-colors duration-200
                        ${activeTab === tab.status
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                >
                    {tab.name}
                </button>
            ))}
        </div>
    );
};

export default OrderFilterTabs;