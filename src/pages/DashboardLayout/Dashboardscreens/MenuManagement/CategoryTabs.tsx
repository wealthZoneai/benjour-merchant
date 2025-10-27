import React from "react";
import CountUp from "react-countup";

interface CategoryTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  mockCounts?: Record<string, number>; // counts for each category
}

const categories = [
  { name: "All", count: 18, image: "https://img.icons8.com/color/96/ingredients.png" },
  { name: "Burger", count: 3, image: "https://img.icons8.com/color/96/hamburger.png" },
  { name: "Pizza", count: 5, image: "https://img.icons8.com/color/96/pizza.png" },
  { name: "Beverages", count: 8, image: "https://img.icons8.com/color/96/soda-bottle.png" },
  { name: "Salads", count: 2, image: "https://img.icons8.com/color/96/salad.png" },
  { name: "Desserts", count: 4, image: "https://img.icons8.com/color/96/ice-cream-sundae.png" },
  { name: "Wraps", count: 1, image: "https://img.icons8.com/color/96/wrap.png" },
  { name: "Fries", count: 3, image: "https://img.icons8.com/color/96/french-fries.png" },
  { name: "Chinese", count: 6, image: "https://img.icons8.com/color/96/noodles.png" },
  { name: "Indian", count: 5, image: "https://img.icons8.com/color/96/curry.png" },
  { name: "Italian", count: 4, image: "https://img.icons8.com/color/96/spaghetti.png" },
  { name: "Italian", count: 4, image: "https://img.icons8.com/color/96/spaghetti.png" },
  { name: "Italian", count: 4, image: "https://img.icons8.com/color/96/spaghetti.png" },
  { name: "Italian", count: 4, image: "https://img.icons8.com/color/96/spaghetti.png" },
  { name: "Italian", count: 4, image: "https://img.icons8.com/color/96/spaghetti.png" },
];

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeTab,
  setActiveTab,
  mockCounts,
}) => {
  return (
    <div className="flex space-x-5 overflow-x-auto py-1 px-2 no-scrollbar">
      {categories.map((cat) => {
        const isActive = activeTab === cat.name;
        const count = mockCounts?.[cat.name] ?? cat.count ?? 0; 

        return (
          <div
            key={cat.name}
            onClick={() => setActiveTab(cat.name)}
            className="flex flex-col items-center cursor-pointer group"
          >
            <div
              className={`w-16 h-16 rounded-full border-2 flex items-center justify-center shadow-md transition-transform duration-300 ${
                isActive
                  ? "border-blue-500 scale-105 shadow-blue-300 bg-blue-50"
                  : "border-gray-200 hover:scale-105 hover:shadow-lg"
              }`}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-10 h-10 object-contain"
              />
            </div>
            <p
              className={`text-xs mt-2 font-medium flex items-center space-x-1 ${
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600 group-hover:text-gray-800"
              }`}
            >
              <span>{cat.name}</span>
              {/* <span className="text-[10px] text-gray-500 font-normal">
                (
                <CountUp
                  start={0}
                  end={count}
                  duration={1.2}
                  separator=","
                />
                )
              </span> */}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryTabs;
