import React, { useState, useRef, useEffect } from 'react';
import { X, Image as ImageIcon, Trash2 } from 'lucide-react';
import { AddCategoryItem, AllCategory, UpdateCategoryItem } from '../../../../services/apiHelpers';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/200?text=Menu+Item+Image';

interface AddMenuItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  editData?: any;
}

const AddMenuItemModal: React.FC<AddMenuItemModalProps> = ({ isOpen, onClose, onSave, editData }) => {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [price, setPrice] = useState('');
  const [available, setAvailable] = useState(true);
  const [itemType, setItemType] = useState('');
  const [preparationTime, setPreparationTime] = useState('');
  const [discount, setDiscount] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const merchantId = useSelector((state: RootState) => state.user.merchantId);
  const [categories, setCategories] = useState<{ menuId: number; menuName: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>();

  useEffect(() => {
    if (editData) {
      setItemName(editData.itemName || '');
      setItemDescription(editData.itemDescription || '');
      setPrice(editData.price?.toString() || '');
      setAvailable(editData.available ?? true);
      setItemType(editData.itemType || '');
      setPreparationTime(editData.preparationTime?.toString() || '');
      setDiscount(editData.discount?.toString() || '');
      setIngredients(editData.ingredients || '');
      setImagePreview(editData.image || PLACEHOLDER_IMAGE);
    } else {
      setItemName('');
      setItemDescription('');
      setPrice('');
      setAvailable(true);
      setItemType('');
      setPreparationTime('');
      setDiscount('');
      setIngredients('');
      setImageFile(null);
      setImagePreview(PLACEHOLDER_IMAGE);
    }
  }, [editData, isOpen]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await AllCategory();
        if (response?.data) setCategories(response.data);
      } catch (error) {
        toast.error('Failed to load categories');
      }
    };
    if (isOpen) fetchCategories();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSave = async () => {
    try {
      if (!itemName  || !selectedCategory) {
        toast.warn("Please fill all required fields!");
        return;
      }

      if (!imageFile && !editData?.image) {
        toast.warn("Please upload an image before saving.");
        return;
      }

      let response;

      if (editData) {
        const updateBody = {
          Id: selectedCategory,
          itemId: editData.itemId,
          itemName,
          itemDescription,
          price: parseFloat(price),
          available,
          itemType,
          preparationTime: parseInt(preparationTime),
          discount: parseFloat(discount),
          ingredients,
          imageFile: imageFile || editData.image,
        };
        const response = await UpdateCategoryItem(updateBody);
        toast.success("Item updated successfully!");
      } else {
        const addBody = {
          merchantId: selectedCategory,
          itemId: 0,
          itemName,
          itemDescription,
          price: parseFloat(price),
          available,
          itemType,
          preparationTime: parseInt(preparationTime),
          discount: parseFloat(discount),
          ingredients,
          imageFile: imageFile!,
        };
        response = await AddCategoryItem(addBody);
        toast.success("Item added successfully!");
      }

      onClose();
      onSave(true)
    } catch (error) {
      console.log(error)
      toast.error("Failed to save menu item. Please try again.");
    }

  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-xl mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold text-gray-800">
            {editData ? 'Edit Menu Item' : 'Add Menu Item'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        {/* 🧩 Added overflow-visible here to fix dropdown clipping */}
        <div className="p-6 space-y-6 overflow-visible">
          {/* Item Name */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <label className="w-1/3 font-medium text-gray-700 mb-1 sm:mb-0">Name:</label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Enter Item Name"
              className="w-full sm:w-2/3 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col sm:flex-row items-start">
            <label className="w-1/3 font-medium text-gray-700 mt-2 mb-1 sm:mb-0">Description:</label>
            <textarea
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              placeholder="Item Description..."
              rows={3}
              className="w-full sm:w-2/3 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>

          {/* Price */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <label className="w-1/3 font-medium text-gray-700 mb-1 sm:mb-0">Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="250"
              className="w-full sm:w-2/3 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Available Toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <label className="w-1/3 font-medium text-gray-700 mb-1 sm:mb-0">Available:</label>
            <button
              onClick={() => setAvailable(!available)}
              className={`relative inline-flex h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors duration-200 ${available ? 'bg-green-500' : 'bg-red-500'
                }`}
            >
              <span
                aria-hidden="true"
                className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition duration-200 ${available ? 'translate-x-5' : 'translate-x-0'
                  }`}
              />
            </button>
            <span className="ml-3 text-sm">{available ? 'Available' : 'Unavailable'}</span>
          </div>

          {/* Category Dropdown */}
          <div className="flex flex-col w-full sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
            <label className="font-medium text-gray-700 sm:w-1/3 w-full">
              Category:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-2/3 p-2 h-11 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500 relative"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.menuId} value={cat.menuId}>
                  {cat.menuName}
                </option>
              ))}
            </select>
          </div>

          {/* Preparation Time */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <label className="w-1/3 font-medium text-gray-700 mb-1 sm:mb-0">Prep Time (mins):</label>
            <input
              type="number"
              value={preparationTime}
              onChange={(e) => setPreparationTime(e.target.value)}
              placeholder="20"
              className="w-full sm:w-2/3 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Discount */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <label className="w-1/3 font-medium text-gray-700 mb-1 sm:mb-0">Discount (%):</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="10"
              className="w-full sm:w-2/3 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Ingredients */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <label className="w-1/3 font-medium text-gray-700 mb-1 sm:mb-0">Ingredients:</label>
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Chicken, Rice, Spices"
              className="w-full sm:w-2/3 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Image Upload */}
          <div className="flex flex-col sm:flex-row items-start">
            <label className="w-1/3 font-medium text-gray-700 mt-1">Image:</label>
            <div className="w-full sm:w-2/3 flex flex-col items-start">
              <div className="mb-3 w-[100px] h-[100px] border-2 border-dashed border-gray-300 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50 relative group">
                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    {imagePreview !== PLACEHOLDER_IMAGE && (
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <Trash2 className="w-6 h-6" />
                      </button>
                    )}
                  </>
                ) : (
                  <ImageIcon className="w-12 h-12 text-gray-400" />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm bg-gray-50 hover:bg-gray-100 transition"
              >
                Upload Image
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            {editData ? 'Update' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMenuItemModal;
