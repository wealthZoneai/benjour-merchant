// src/components/TopMenuItems.js
import React from 'react';

// Mock Data (Updated to include a large list for testing scroll)
const topItems = [
    { rank: 1, name: 'Chicken Burger', orders: 45, revenue: 675.00 },
    { rank: 2, name: 'Pizza Margherita', orders: 38, revenue: 570.00 },
    { rank: 3, name: 'Caesar salad', orders: 32, revenue: 416.00 },
    { rank: 4, name: 'Caesar salad', orders: 32, revenue: 416.00 },
    { rank: 5, name: 'Pizza Margherita', orders: 38, revenue: 570.00 },
    // Duplicated items to ensure scroll is needed
    { rank: 6, name: 'Chicken Burger', orders: 40, revenue: 600.00 },
    { rank: 7, name: 'Pizza Margherita', orders: 35, revenue: 550.00 },
    { rank: 8, name: 'Caesar salad', orders: 30, revenue: 400.00 },
    { rank: 9, name: 'Caesar salad', orders: 30, revenue: 400.00 },
    { rank: 10, name: 'Pizza Margherita', orders: 35, revenue: 550.00 },
    { rank: 11, name: 'Chicken Burger', orders: 40, revenue: 600.00 },
    { rank: 12, name: 'Pizza Margherita', orders: 35, revenue: 550.00 },
];

const TopMenuItems = () => {
    return (
        // The main container needs a defined height or max-height to enable inner scrolling
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col h-full">
            
            {/* Header (Fixed part) */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Top Menu Items</h3>
                <button className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                    View Menu
                </button>
            </div>
            
            <div className="space-y-3 overflow-y-auto max-h-[300px] pr-2">
                {topItems.map((item, index) => (
                    // Using index as a secondary key since rank is duplicated in the mock data
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                            {/* Rank Circle */}
                            <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">
                                {item.rank}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-800">{item.name}</p>
                                <p className="text-xs text-gray-500">{item.orders} orders</p>
                            </div>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">${item.revenue.toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopMenuItems;