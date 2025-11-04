import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Edit2, Trash2 } from "lucide-react";
import { AllCategory, DeleteCategory } from "../../../../services/apiHelpers";
import DeleteModal from "../../../../components/Models/DeleteModal";
import AddCategoryModal from "./AddCategoryModal";

interface Category {
  menuId: string;
  menuName: string;
  menuImage?: string;
}

interface CategoryTabsProps {
  activeTab: string;
  addedCatagory: boolean;
  setActiveTab: (tab: string) => void;
  onEditCategory?: (category: Category) => void;
  onDeleteCategory?: (id: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeTab,
  setActiveTab,
  addedCatagory,
  onEditCategory,
  onDeleteCategory,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({});
  const [selectedForEdit, setSelectedForEdit] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | null | string>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [catagoryDelete, setCatagoryDelete] = useState(false);
  const [isMenuModalOpen, setMenuModalOpen] = useState(false);
  const [isMenuModalSave, setMenuModalSave] = useState(false);

  const fallbackImage =
    "https://cdn-icons-png.flaticon.com/512/706/706164.png";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await AllCategory();
        if (Array.isArray(response.data)) {
          const allCategory = {
            menuId: "all",
            menuName: "All",
            menuImage: "https://img.icons8.com/color/96/ingredients.png",
          };
          setCategories([allCategory, ...response.data]);
        } else {
          toast.error("Invalid response format.");
        }
      } catch (error) {
        toast.error("Failed to load categories.");
      }
    };
    fetchCategories();
  }, [catagoryDelete, addedCatagory, isMenuModalSave]);

  const handleClick = (id: string) => {
    if (selectedForEdit === id) return;
    setActiveTab(id);
  };

  const handleDoubleClick = (id: string) => {
    if (id === 'all') return;
    setSelectedForEdit((prev) => (prev === id ? null : id));
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      const response = await DeleteCategory(selectedId);
      toast.success("Item deleted successfully!");
      setCatagoryDelete((prev) => !prev);
    } catch (error) {
      toast.error("Error deleting item.");
    } finally {
      setIsDeleteOpen(false);
    }
  };

  const handleOpenDelete = (id: string) => {
    setSelectedId(id);
    setIsDeleteOpen(true);
  };

  const handleCancel = () => {
    setIsDeleteOpen(false);
    setSelectedId(null);
  };

  return (
    <>
      <div className="flex space-x-5 overflow-x-auto py-2 px-2 no-scrollbar">
        {categories.length > 0 ? (
          categories.map((cat) => {
            const isActive = activeTab === cat.menuId;
            const isEditing = selectedForEdit === cat.menuId;

            return (
              <div
                key={cat.menuId}
                className="flex flex-col items-center cursor-pointer group relative"
                onClick={() => handleClick(cat.menuId)}
                onDoubleClick={() => handleDoubleClick(cat.menuId)}
              >
                {/* Category Image */}
                <div
                  className={`relative w-16 h-16 rounded-full border-2 flex items-center justify-center shadow-md overflow-hidden transition-transform duration-300 ${isActive
                    ? "border-blue-500 scale-105 bg-blue-50"
                    : "border-gray-200 hover:scale-105 hover:shadow-lg"
                    }`}
                >
                  {!imageLoaded[cat.menuId] && (
                    <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full"></div>
                  )}
                  <img
                    src={cat.menuImage || fallbackImage}
                    alt={cat.menuName}
                    onLoad={() =>
                      setImageLoaded((prev) => ({ ...prev, [cat.menuId]: true }))
                    }
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = fallbackImage;
                      setImageLoaded((prev) => ({
                        ...prev,
                        [cat.menuId]: true,
                      }));
                    }}
                    className="object-contain rounded-full relative z-10"
                  />
                </div>
                {/* Category Name */}
                <p
                  className={`text-xs mt-2 font-medium ${isActive
                    ? "text-blue-600 font-semibold"
                    : "text-gray-600 group-hover:text-gray-800"
                    }`}
                >
                  {cat.menuName}
                </p>
                {/* 🟢 Edit/Delete Icons under image (on double-click) */}
                {isEditing && (
                  <div className="flex items-center space-x-2 mt-2 transition-all duration-300 opacity-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuModalOpen(true);
                      }}
                      className="p-1.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition shadow-md"
                    >
                      <Edit2 size={14} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDelete(cat.menuId);
                      }}
                      className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition shadow-md"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}


              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-sm py-3">No categories found.</p>
        )}
      </div>
      <DeleteModal
        isOpen={isDeleteOpen}
        title="Delete Menu Item"
        message="Are you sure you want to delete this menu item permanently?"
        onCancel={handleCancel}
        onDelete={handleDelete}
      />
      <AddCategoryModal
        isOpen={isMenuModalOpen}
        onClose={() => setMenuModalOpen(false)}
        onSave={() => setMenuModalSave((prev) => !prev)}
        isEdit={true}
        editData={categories.find(cat => cat.menuId === selectedForEdit) || null}
      />
    </>
  );
};

export default CategoryTabs;
