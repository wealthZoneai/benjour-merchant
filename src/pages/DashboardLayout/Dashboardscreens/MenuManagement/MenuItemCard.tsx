import React, { useState } from "react";
import { Clock, Edit, Trash2 } from "lucide-react";

const MenuItemCard = ({ item, itemCount }:any) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isAvailable = item.status === "Available";
  const badgeColor = isAvailable
    ? "bg-green-500/90 text-white"
    : "bg-red-500/90 text-white";
  const badgeText = isAvailable ? "Available" : "Unavailable";

  return (
    <div
      className={`relative bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl ${
        !isAvailable && "opacity-75"
      }`}
      style={{ height: "420px" }}
    >
      {/* Image Section */}
      <div className="relative h-44 w-full flex-shrink-0 overflow-hidden rounded-t-2xl">
        {/* Gradient placeholder while loading */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
        )}

        {/* Image */}
        {!imageError ? (
          <img
            src={item.image}
            alt={item.name}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        ) : (
          // Error placeholder
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-sm font-semibold">
            Image Not Found
          </div>
        )}

        {/* Availability Badge */}
        <span
          className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full shadow-md ${badgeColor}`}
        >
          {badgeText}
        </span>

        {/* Item Count Badge */}
        {itemCount !== undefined && (
          <span className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full bg-blue-500 text-white shadow-md">
            {itemCount} {itemCount > 1 ? "Items" : "Item"}
          </span>
        )}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
          {item.price && (
            <span className="text-lg font-semibold text-blue-600">
              ₹{item.price.toFixed(2)}
            </span>
          )}
        </div>

        <p className="text-sm text-gray-500 mt-1 mb-3">{item.description}</p>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1 text-blue-400" />
            <span>{item.prepTime} min</span>
          </div>
          <span className="text-gray-800 font-medium">{item.category}</span>
        </div>

        <div>
          <p className="font-semibold text-gray-800 mb-2">Ingredients</p>
          <div className="flex flex-wrap gap-2">
            {item.ingredients.slice(0, 3).map((ing :any, index:any) => (
              <span
                key={index}
                className="px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-700 border border-blue-200"
              >
                {ing}
              </span>
            ))}
            {item.ingredients.length > 3 && (
              <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600 font-semibold">
                +{item.ingredients.length - 3} More
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-white/60 backdrop-blur-sm">
        <button
          onClick={() => console.log(`Editing ${item.name}`)}
          disabled={!isAvailable}
          className={`flex items-center justify-center px-4 py-2 w-32 text-sm rounded-lg font-medium transition-all ${
            isAvailable
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:scale-105"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </button>

        <button
          onClick={() => console.log(`Deleting ${item.name}`)}
          disabled={!isAvailable}
          className={`flex items-center justify-center px-3 py-2 text-sm rounded-lg transition-all ${
            isAvailable
              ? "bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg hover:scale-105"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default MenuItemCard;
