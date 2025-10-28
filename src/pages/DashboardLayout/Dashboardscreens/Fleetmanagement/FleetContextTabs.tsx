import React from 'react';

const tabs = ['Order Management', 'Batch Management', 'Delivery Slots'];

const FleetContextTabs = ({ activeTab, setActiveTab }:any) => {
    return (
        <div className="flex items-center space-x-4 mb-6">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-base font-semibold border-b-2 pb-1 transition-colors ${
                        activeTab === tab
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-blue-500'
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default FleetContextTabs;