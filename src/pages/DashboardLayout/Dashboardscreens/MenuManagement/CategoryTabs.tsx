// src/components/CategoryTabs.js
import React from 'react';

const CategoryTabs = ({ activeTab, setActiveTab }) => {
    // Determine unique categories from mock data (or a fixed list in a real app)
    const allCategories = [
  'All',
  'Burger',
  'Pizza',
  'Beverages',
  'Salads',
  'Sandwiches',
  'Snacks',
  'Desserts',
  'Wraps',
  'Ice Creams',
  'Fries',
  'Soups',
  'Breakfast',
  'Main Course',
  'Combos',
  'Chinese',
  'Indian',
  'Italian',
];

    // In a real app, you would dynamically count items for the badge. Using mock counts for visual
    const mockCounts = {
  'All': 18,
  'Burger': 1,
  'Pizza': 1,
  'Beverages': 4,
  'Salads': 2,
  'Sandwiches': 1,
  'Snacks': 2,
  'Desserts': 3,
  'Wraps': 1,
  'Ice Creams': 2,
  'Fries': 3,
  'Soups': 1,
  'Breakfast': 2,
  'Main Course': 4,
  'Combos': 2,
  'Chinese': 3,
  'Indian': 5,
  'Italian': 2,
};


    return (
        <div className="flex space-x-2 overflow-x-auto pb-2 -mb-2  no-scrollbar">
            {allCategories.map((category) => {
                const isActive = activeTab === category;
                const count = mockCounts[category] || 0;
                
                return (
                    <button
                        key={category}
                        onClick={() => setActiveTab(category)}
                        className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 
                            ${isActive
                                ? 'bg-blue-500 text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {category} ({count})
                    </button>
                );
            })}
        </div>
    );
};

export default CategoryTabs;