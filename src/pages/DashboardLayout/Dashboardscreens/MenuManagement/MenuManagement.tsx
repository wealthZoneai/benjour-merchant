// src/pages/MenuManagementPage.js (Final Context)
import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import MenuItemCard from './MenuItemCard'; // Corrected relative import path
import CategoryTabs from './CategoryTabs'; // Corrected relative import path

// --- Mock Data ---
const menuItems = [
  {
    id: 1,
    name: 'Classic Chicken Burger',
    description: 'Grilled Chicken Breast With Lettuce, Tomato, And Mayo',
    image: 'https://via.placeholder.com/600x400/93c5fd/ffffff?text=Chicken+Burger',
    prepTime: 15,
    category: 'Burger', // Changed to match tab filter
    status: 'Available',
    ingredients: ['Chicken Breast', 'Lettuce', 'Tomato', 'Mayo', 'Onion'],
  },
  {
    id: 2,
    name: 'Margherita Pizza',
    description: 'Fresh Mozzarella, Tomato Sauce, And Basil',
    image: 'https://via.placeholder.com/600x400/fcd34d/ffffff?text=Margherita+Pizza',
    prepTime: 20,
    category: 'Pizza', // Changed to match tab filter
    status: 'Available',
    ingredients: ['Pizza Dough', 'Tomato Sauce', 'Mozzarella', 'Basil', 'Olive Oil'],
  },
  {
    id: 3,
    name: 'Caesar Salad',
    description: 'Crisp Romaine Lettuce With Parmesan And Croutons',
    image: 'https://via.placeholder.com/600x400/cccccc/000000?text=Caesar+Salad',
    prepTime: 10,
    category: 'Salads', // Changed to match tab filter
    status: 'Unavailable',
    ingredients: ['Romaine Lettuce', 'Parmesan Cheese', 'Croutons', 'Caesar Dressing'],
  },
  {
    id: 4,
    name: 'Caesar Salad',
    description: 'Crisp Romaine Lettuce With Parmesan And Croutons',
    image: 'https://via.placeholder.com/600x400/cccccc/000000?text=Caesar+Salad',
    prepTime: 10,
    category: 'Salads', // Changed to match tab filter
    status: 'Unavailable',
    ingredients: ['Romaine Lettuce', 'Parmesan Cheese', 'Croutons', 'Caesar Dressing'],
  },
  {
    id: 5,
    name: 'Caesar Salad',
    description: 'Crisp Romaine Lettuce With Parmesan And Croutons',
    image: 'https://via.placeholder.com/600x400/cccccc/000000?text=Caesar+Salad',
    prepTime: 10,
    category: 'Salads', // Changed to match tab filter
    status: 'Unavailable',
    ingredients: ['Romaine Lettuce', 'Parmesan Cheese', 'Croutons', 'Caesar Dressing'],
  },
];

const MenuManagement = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems =
    activeCategory === 'All'
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

 return (
  <div className="h-screen bg-gray-50 overflow-hidden">
    <div className="bg-white shadow-md p-4 md:p-6 flex justify-between items-start sticky top-0 z-20">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Menu Management</h1>
        <p className="text-gray-600 mt-1">Manage Your Menu Items And Categories</p>
      </div>
      <div className="flex space-x-3">
        <div className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Search By Order items"
            className="p-2 pl-10 border rounded-lg text-sm w-64 focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
        <button className="flex items-center px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
          + Add Category
        </button>
        <button className="flex items-center px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md">
          <Plus className="w-4 h-4 mr-2" />
          Add Menu Item
        </button>
      </div>
    </div>
    <div className="flex flex-col p-3  rounded-lg shadow-md bg-gray-50 h-[calc(100vh-100px)]"> 
      <div className="bg-white rounded-lg shadow-md mb-2 border-b border-gray-200 p-4 flex-shrink-0 shadow-sm">
        <CategoryTabs activeTab={activeCategory} setActiveTab={setActiveCategory} />
      </div>

      <div className="bg-white flex-1 overflow-y-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 no-scrollbar">
        {filteredItems.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}

        {filteredItems.length === 0 && (
          <p className="text-gray-500 col-span-full text-center py-10">
            No items found in the <strong>{activeCategory}</strong> category.
          </p>
        )}
      </div>
    </div>
  </div>
);

};

export default MenuManagement;