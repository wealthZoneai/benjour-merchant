// src/pages/MenuManagementPage.js
import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import MenuItemCard from './MenuItemCard';
import CategoryTabs from './CategoryTabs';
import AddCategoryModal from './AddCategoryModal';
import AddMenuItemModal from './Addmenuitem';

// --- Mock Data ---
const menuItems = [
  {
    id: 1,
    name: 'Classic Chicken Burger',
    description: 'Grilled Chicken Breast With Lettuce, Tomato, And Mayo',
    image: 'https://via.placeholder.com/600x400/93c5fd/ffffff?text=Chicken+Burger',
    prepTime: 15,
    category: 'Burger',
    status: 'Available',
    ingredients: ['Chicken Breast', 'Lettuce', 'Tomato', 'Mayo', 'Onion'],
  },
  {
    id: 2,
    name: 'Margherita Pizza',
    description: 'Fresh Mozzarella, Tomato Sauce, And Basil',
    image: 'https://via.placeholder.com/600x400/fcd34d/ffffff?text=Margherita+Pizza',
    prepTime: 20,
    category: 'Pizza',
    status: 'Available',
    ingredients: ['Pizza Dough', 'Tomato Sauce', 'Mozzarella', 'Basil', 'Olive Oil'],
  },
  {
    id: 3,
    name: 'Caesar Salad',
    description: 'Crisp Romaine Lettuce With Parmesan And Croutons',
    image: 'https://via.placeholder.com/600x400/cccccc/000000?text=Caesar+Salad',
    prepTime: 10,
    category: 'Salads',
    status: 'Unavailable',
    ingredients: ['Romaine Lettuce', 'Parmesan Cheese', 'Croutons', 'Caesar Dressing'],
  },
  {
    id: 3,
    name: 'Caesar Salad',
    description: 'Crisp Romaine Lettuce With Parmesan And Croutons',
    image: 'https://via.placeholder.com/600x400/cccccc/000000?text=Caesar+Salad',
    prepTime: 10,
    category: 'Salads',
    status: 'Unavailable',
    ingredients: ['Romaine Lettuce', 'Parmesan Cheese', 'Croutons', 'Caesar Dressing'],
  },
  {
    id: 3,
    name: 'Caesar Salad',
    description: 'Crisp Romaine Lettuce With Parmesan And Croutons',
    image: 'https://via.placeholder.com/600x400/cccccc/000000?text=Caesar+Salad',
    prepTime: 10,
    category: 'Salads',
    status: 'Unavailable',
    ingredients: ['Romaine Lettuce', 'Parmesan Cheese', 'Croutons', 'Caesar Dressing'],
  },
];

const MenuManagement = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [isMenuModalOpen, setMenuModalOpen] = useState(false);

  const filteredItems =
    activeCategory === 'All'
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center sticky top-0 z-20">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Menu Management</h1>
          <p className="text-gray-600 mt-1">Manage Your Menu Items And Categories</p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-4 md:mt-0">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search By Menu items"
              className="w-full p-2 pl-10 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {/* Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={() => setCategoryModalOpen(true)}
              className="flex items-center px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              + Add Category
            </button>
            <button
              onClick={() => setMenuModalOpen(true)}
              className="flex items-center px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Menu Item
            </button>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="flex-1 overflow-hidden flex flex-col p-3">
        {/* Category Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-4 border-b border-gray-200 p-4 flex-shrink-0">
          <CategoryTabs activeTab={activeCategory} setActiveTab={setActiveCategory} />
        </div>

        {/* Menu Items Grid */}
        <div className="flex-1 overflow-y-auto p-2 md:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}

          {filteredItems.length === 0 && (
            <p className="text-gray-500 col-span-full text-center py-10">
              No items found in the <strong>{activeCategory}</strong> category.
            </p>
          )}
        </div>
      </main>

      {/* Modals */}
      <AddCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
      />
      <AddMenuItemModal
        isOpen={isMenuModalOpen}
        onClose={() => setMenuModalOpen(false)}
      />
    </div>
  );
};

export default MenuManagement;
