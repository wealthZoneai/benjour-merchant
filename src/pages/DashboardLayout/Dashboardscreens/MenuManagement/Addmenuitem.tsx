import React, { useState, useRef } from 'react';
import { X, Image as ImageIcon, Trash2 } from 'lucide-react';

// Assuming a placeholder image for the initial state
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/200?text=Menu+Item+Image';

interface AddMenuItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddMenuItemModal: React.FC<AddMenuItemModalProps> = ({ isOpen, onClose }) => {
  // --- State Management ---
  const [itemName, setItemName] = useState('');
  const [store, setStore] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [inStock, setInStock] = useState(true); // Default to in stock
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // --- Image Handling Logic ---
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // --- Render ---
  return (
    // Modal Overlay
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-xl mx-4 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold text-gray-800">Add Menu Item</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-6">

          {/* 1. Name Input */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <label className="w-1/4 font-medium text-gray-700 mb-1 sm:mb-0">
              Name:
            </label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Enter Item Name"
              className="w-full sm:w-3/4 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* 2. Store Dropdown */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <label className="w-1/4 font-medium text-gray-700 mb-1 sm:mb-0">
              Store:
            </label>
            <select
              value={store}
              onChange={(e) => setStore(e.target.value)}
              className="w-full sm:w-3/4 p-2 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500 appearance-none pr-8"
            >
              <option value="" disabled>Select A Store</option>
              <option value="store1">Store A</option>
              <option value="store2">Store B</option>
            </select>
          </div>

          {/* 3. Description Textarea */}
          <div className="flex flex-col sm:flex-row items-start">
            <label className="w-1/4 font-medium text-gray-700 mt-2 mb-1 sm:mb-0">
              Description:
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brief description of the menu item..."
              rows={3}
              className="w-full sm:w-3/4 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>

          {/* 4. Price Input */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <label className="w-1/4 font-medium text-gray-700 mb-1 sm:mb-0">
              Price:
            </label>
            <div className="w-full sm:w-3/4 relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="w-full p-2 pl-6 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* 5. Image Upload Section (Reused from previous step) */}
          <div className="flex flex-col sm:flex-row items-start">
            <label className="w-1/4 font-medium text-gray-700 mt-1">
              Image:
            </label>
            <div className="w-full sm:w-3/4 flex flex-col items-start"> {/* Align items to start */}

              {/* Image Preview Area */}
              <div
                className="mb-3 w-[100px] h-[100px] border-2 border-dashed border-gray-300 rounded-lg overflow-hidden 
                                    flex items-center justify-center bg-gray-50 relative group" // Added group for hover effects
              >
                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview}
                      alt="Category Preview"
                      className="w-full h-full object-cover"
                    />
                    {/* Remove Image Overlay Button */}
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute inset-0 flex items-center justify-center 
                                          bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 
                                          transition-opacity duration-200"
                      aria-label="Remove image"
                    >
                      <Trash2 className="w-8 h-8" />
                    </button>
                  </>
                ) : (
                  <ImageIcon className="w-12 h-12 text-gray-400" /> // Icon when no image
                )}
              </div>

              <div className="flex  items-center mb-1"> {/* Added mb-1 for spacing */}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {/* Buttons to trigger upload/gallery */}
                {/* <button
                           type="button"
                           onClick={triggerFileUpload}
                           className="px-3 py-1 border border-gray-300 rounded-lg text-sm bg-gray-50 hover:bg-gray-100 transition"
                         >
                           Choose From Gallery
                         </button> */}
                <button
                  type="button"
                  onClick={triggerFileUpload}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm bg-gray-50 hover:bg-gray-100 transition"
                >
                  Upload Image
                </button>
              </div>

              <p className="text-xs text-gray-500">
                Image Dimension 200x200 (Recommended)
              </p>
            </div>
          </div>

          {/* 6. In Stock Toggle (Similar to Is Schedulable) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <label className="w-1/4 font-medium text-gray-700 mb-1 sm:mb-0">
              In Stock:
            </label>
            <div className="w-full sm:w-3/4">
              <button
                onClick={() => setInStock(!inStock)}
                className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${inStock ? 'bg-green-500' : 'bg-red-500'}`}
              >
                <span className="sr-only">Toggle Stock Status</span>
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${inStock ? 'translate-x-5' : 'translate-x-0'}`}
                />
              </button>
              <span className="ml-3 text-sm text-gray-600">
                {inStock ? 'Available' : 'Out of Stock'}
              </span>
            </div>
          </div>

        </div>

        {/* Footer with Save Button */}
        <div className="p-5 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMenuItemModal;