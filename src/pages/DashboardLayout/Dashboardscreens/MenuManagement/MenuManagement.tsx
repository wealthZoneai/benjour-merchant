import React, { useEffect, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import MenuItemCard from './MenuItemCard';
import CategoryTabs from './CategoryTabs';
import AddCategoryModal from './AddCategoryModal';
import AddMenuItemModal from './Addmenuitem';
import { AllCategory, AllCategoryItems, SearchCategoryItems } from '../../../../services/apiHelpers';
import { toast } from 'react-toastify';
// import { useLoader } from '../../../../global/LoaderContext';
import NewOrderPopup from '../../../../components/NewOrderPopup';

interface MenuItem {
  id: string;
  name: string;
  price?: number;
  image?: string;
}

interface Category {
  menuId: string;
  menuName: string;
  menuItemList?: MenuItem[];
}

const MenuManagement = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [isMenuModalOpen, setMenuModalOpen] = useState(false);
  const [isMenuModalSave, setMenuModalSave] = useState(false);
  const [isMenuCatagoryModalSave, setMenuCatagoryModalSave] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesItems, setCategoriesItems] = useState<MenuItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  // const { showLoader, hideLoader } = useLoader();

  // 🟢 Fetch all categories initially
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await AllCategory();
        if (response?.data) setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
   
  }, [isMenuCatagoryModalSave]);

  // 🟢 Fetch category items by ID
  useEffect(() => {
    const fetchCategoryItems = async () => {
      if (activeCategory === 'all') return;
      try {
        const response = await AllCategoryItems(activeCategory);
        if (response?.data) setCategoriesItems(response.data);
        if (response?.data) {
          setMenuModalSave( prev=> !prev);
        }
      } catch (error) {
        console.error("Error fetching category items:", error);
      }
    };
    fetchCategoryItems();
  }, [activeCategory,isMenuModalSave]);

  // 🔍 Handle search
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        setLoading(true);
        const response = await SearchCategoryItems(searchQuery); 
        if (response?.data) {
          setSearchResults(response.data);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error searching items:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchSearchResults, 500);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);


  const filteredItems: MenuItem[] =
    searchQuery.trim()
      ? searchResults
      : activeCategory === 'all'
        ? categories.flatMap((cat) => cat.menuItemList || [])
        : categoriesItems;

  const isSearching = searchQuery.trim().length > 0;

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
              placeholder="Search by menu items"
              className="w-full p-2 pl-10 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
        {/* 🧭 Show Category Tabs only when NOT searching */}
        {!isSearching && (
          <div className="bg-white rounded-lg shadow-md mb-4 border-b border-gray-200 p-4 flex-shrink-0">
            <CategoryTabs activeTab={activeCategory} setActiveTab={setActiveCategory} addedCatagory={isMenuCatagoryModalSave}/>
          </div>
        )}

        {/* 🧾 Menu Items Grid */}
        <div className="flex-1 overflow-y-auto p-2 md:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-center text-gray-500 col-span-full py-10">Searching...</p>
          ) : filteredItems.length > 0 ? (
            filteredItems.map((item) => <MenuItemCard key={item.id} item={item} menuisUpdate={setMenuModalSave}/>)
          ) : (
            <p className="text-gray-500 col-span-full text-center py-10">
              {isSearching ? 'No matching items found.' : 'No items in this category.'}
            </p>
          )}
        </div>
      </main>

      {/* Modals */}
      <AddCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
        onSave={() =>  setMenuCatagoryModalSave((prev) => !prev)}
      />
      <AddMenuItemModal
        isOpen={isMenuModalOpen}
        onClose={() => setMenuModalOpen(false)}
        onSave={() => setMenuModalSave(true)}
        editData={null}
      />
    </div>
  );
};

export default MenuManagement;