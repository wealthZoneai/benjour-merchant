import React from 'react';

const tabs = [
    { name: 'Book Slot', active: true, isPrimary: true },
    { name: 'Available(2)', active: false },
    { name: 'On Delivery(1)', active: false },
    { name: 'Offline(1)', active: false },
];

const FleetStatusTabs = ({ activeTab, setActiveTab }) => {
    return (
        <div className="flex items-center space-x-2 border-b border-gray-300 pb-2 mb-6">
            {tabs.map((tab, index) => (
                <button
                    key={index}
                    onClick={() => setActiveTab(tab.name)}
                    className={`px-4 py-2 text-sm font-semibold transition-colors rounded-lg 
                        ${tab.isPrimary && tab.active
                            ? 'bg-[#00B2FF] text-white shadow-md'
                            : tab.isPrimary
                                ? 'text-blue-600 border border-blue-600 bg-white hover:bg-blue-50'
                                : tab.active 
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'text-gray-700 bg-gray-200 hover:bg-gray-300'
                        }`}
                >
                    {tab.name}
                </button>
            ))}
        </div>
    );
};

export default FleetStatusTabs;