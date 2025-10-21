import React, { useState } from 'react';
import { Clock, Edit, Trash2 } from 'lucide-react';

const MenuItemCard = ({ item }) => {
  const [imageError, setImageError] = useState(false);

  const isAvailable = item.status === 'Available';
  const badgeColor = isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
  const badgeText = isAvailable ? 'Available' : 'Unavailable';

  return (
    <div
      className={`bg-white rounded-xl shadow-xl flex flex-col border border-gray-100 overflow-hidden transition-shadow duration-300 ${
        !isAvailable && 'opacity-70'
      }`}
      style={{ height: '400px' }}
    >
      <div className="relative h-40 w-full flex-shrink-0">
        {!imageError ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-sm">
            Image Not Found
          </div>
        )}

        {!isAvailable && <div className="absolute inset-0 bg-gray-900 opacity-20"></div>}

        <span
          className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-lg ${badgeColor}`}
        >
          {badgeText}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-gray-800 leading-tight">{item.name}</h3>
            {item.price && (
              <span className="text-lg font-semibold text-gray-900 ml-4">
                ₹{item.price.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-sm text-gray-500 mt-1 mb-2">{item.description}</p>

          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1 text-gray-400" />
              <span>{item.prepTime} Min</span>
            </div>
            <span className="font-medium">{item.category}</span>
          </div>

          <p className="font-medium text-gray-800 mb-2">Ingredients:</p>
          <div className="flex flex-wrap gap-2 text-xs mb-4">
            {item.ingredients.slice(0, 3).map((ing, index) => (
              <span
                key={index}
                className="px-3 py-1 border border-gray-300 text-gray-600 rounded-full whitespace-nowrap"
              >
                {ing}
              </span>
            ))}
            {item.ingredients.length > 3 && (
              <span className="px-3 py-1 border border-blue-300 text-blue-600 font-semibold rounded-full whitespace-nowrap">
                +{item.ingredients.length - 3} More
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="p-3 border-t border-gray-100 flex justify-center space-x-3 flex-shrink-0">
        <button
          className={`flex items-center justify-center w-40 px-4 py-2 text-sm border rounded-lg transition-colors ${
            isAvailable
              ? 'border-gray-300 text-gray-700 hover:bg-gray-100'
              : 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'
          }`}
          disabled={!isAvailable}
          onClick={() => console.log(`Editing ${item.name}`)}
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </button>
        <button
          className={`p-2 border rounded-lg transition-colors ${
            isAvailable
              ? 'border-red-400 text-red-600 hover:bg-red-50'
              : 'border-red-200 text-red-300 cursor-not-allowed'
          }`}
          disabled={!isAvailable}
          onClick={() => console.log(`Deleting ${item.name}`)}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default MenuItemCard;
