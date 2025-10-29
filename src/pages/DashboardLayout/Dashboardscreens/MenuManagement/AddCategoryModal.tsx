import React, { useState, useRef } from 'react';
import { X, Image as ImageIcon, Trash2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { toast } from 'react-toastify';
import { AddCategory } from '../../../../services/apiHelpers';

const AddCategoryModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const merchantId = useSelector((state: RootState) => state.user.merchantId);
  const [categoryName, setCategoryName] = useState('');
  const [store, setStore] = useState('');
  const [isSchedulable, setIsSchedulable] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // --- Image Handling ---
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file); // ✅ store actual file
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => fileInputRef.current?.click();
  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // --- Save Category ---
  const handleSave = async () => {
    if (!merchantId) {
      toast.error('Merchant ID missing!');
      return;
    }

    if (!categoryName || !imageFile) {
      toast.error('Please fill all required fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await AddCategory({
        merchantId,
        name: categoryName,
        description: 'bhiriyani', 
        image: imageFile,
      });

      toast.success('Category added successfully!');
      console.log('✅ Added Category:', response.data);
      onClose();
    } catch (error) {
      console.error('❌ Error adding category:', error);
      toast.error('Failed to add category.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Add Category</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Category Name */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <label className="w-1/4 font-medium text-gray-700 mb-1 sm:mb-0">Name:</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter Category Name"
              className="w-full sm:w-3/4 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Store Dropdown */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <label className="w-1/4 font-medium text-gray-700 mb-1 sm:mb-0">Store:</label>
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

          {/* Image Upload */}
          <div className="flex flex-col sm:flex-row items-start">
            <label className="w-1/4 font-medium text-gray-700 mt-1">Image:</label>
            <div className="w-full sm:w-3/4 flex flex-col items-start">
              <div className="mb-3 w-[100px] h-[100px] border-2 border-dashed border-gray-300 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50 relative group">
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <Trash2 className="w-8 h-8" />
                    </button>
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
                onClick={triggerFileUpload}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm bg-gray-50 hover:bg-gray-100 transition"
              >
                Upload Image
              </button>

              <p className="text-xs text-gray-500 mt-1">Image Dimension 200x200 (Recommended)</p>
            </div>
          </div>

          {/* Is Schedulable */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <label className="w-1/3 font-medium text-gray-700 mb-1 sm:mb-0">Is Schedulable?</label>
            <div className="w-full sm:w-3/4">
              <button
                type="button"
                onClick={() => setIsSchedulable(!isSchedulable)}
                className={`relative inline-flex h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ${isSchedulable ? 'bg-pink-500' : 'bg-gray-200'}`}
              >
                <span
                  aria-hidden="true"
                  className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition ${isSchedulable ? 'translate-x-5' : 'translate-x-0'}`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="p-5 border-t flex justify-end">
          <button
            onClick={handleSave}
            disabled={loading}
            className={`px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;
