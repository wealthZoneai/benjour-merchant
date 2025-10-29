import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { toast } from "react-toastify";
import { AllCategory } from "../../../../services/apiHelpers";

// ✅ Define backend response type
interface Category {
  menuId: string;
  menuName: string;
  menuImage?: string;
}

interface CategoryTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  mockCounts?: Record<string, number>;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeTab,
  setActiveTab,
  mockCounts,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({});

  // ✅ Default fallback image
  const fallbackImage =
    "https://cdn-icons-png.flaticon.com/512/706/706164.png";

  // ✅ Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await AllCategory();

        if (Array.isArray(response.data)) {
          // Add "All" category manually at the start
          const allCategory = {
            menuId: "all",
            menuName: "All",
            menuImage:
              "https://img.icons8.com/color/96/ingredients.png",
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
  }, []);

  return (
    <div className="flex space-x-5 overflow-x-auto py-1 px-2 no-scrollbar">
      {categories.length > 0 ? (
        categories.map((cat, index) => {
          const isActive = activeTab === cat.menuName;
          const count = mockCounts?.[cat.menuName] ?? 0;

          return (
            <div
              key={cat.menuId || index}
              onClick={() => setActiveTab(cat.menuName)}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div
                className={`w-16 h-16 rounded-full border-2 flex items-center justify-center shadow-md transition-transform duration-300 relative overflow-hidden ${
                  isActive
                    ? "border-blue-500 scale-105 shadow-blue-300 bg-blue-50"
                    : "border-gray-200 hover:scale-105 hover:shadow-lg"
                }`}
              >
                {!imageLoaded[cat.menuId] && (
                  <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full"></div>
                )}

                <img
                  src={cat.menuImage || fallbackImage}
                  alt={cat.menuName || "No Image"}
                  onLoad={() =>
                    setImageLoaded((prev) => ({
                      ...prev,
                      [cat.menuId]: true,
                    }))
                  }
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = fallbackImage;
                    setImageLoaded((prev) => ({
                      ...prev,
                      [cat.menuId]: true,
                    }));
                  }}
                  className="w-11 h-11 object-contain rounded-full relative z-10"
                />
              </div>

              <p
                className={`text-xs mt-2 font-medium flex items-center space-x-1 ${
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "text-gray-600 group-hover:text-gray-800"
                }`}
              >
                <span>{cat.menuName}</span>

                {/* Optional count display */}
                {/* <span className="text-[10px] text-gray-500 font-normal">
                  (<CountUp start={0} end={count} duration={1.2} />)
                </span> */}
              </p>
            </div>
          );
        })
      ) : (
        <p className="text-gray-500 text-sm py-3">No categories found.</p>
      )}
    </div>
  );
};

export default CategoryTabs;
