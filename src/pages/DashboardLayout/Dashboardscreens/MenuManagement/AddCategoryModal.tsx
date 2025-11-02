import React, { useState, useRef, useEffect } from 'react';
import { X, Image as ImageIcon, Trash2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { toast } from 'react-toastify';
import { AddCategory, UpdateCategory } from '../../../../services/apiHelpers';

interface AddCategoryModalProps {
  isOpen: boolean;
  onSave: (data: any) => void;
  onClose: () => void;
  isEdit?: boolean;
  editData?: any;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  isOpen,
  onClose,
  onSave,
  isEdit = false,
  editData = null,
}) => {
  const merchantId = useSelector((state: RootState) => state.user.merchantId);
  const [categoryName, setCategoryName] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ✅ Pre-fill data in edit mode
  useEffect(() => {
    if (isEdit && editData) {
      setCategoryName(editData.menuName || '');
      setImagePreview(editData.menuImage || null); // adjust key if API returns something different
    }
  }, [isEdit, editData]);

  if (!isOpen) return null;

  // --- Image Handling ---
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
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

  // --- Save or Update Category ---
  const handleSave = async () => {
    if (!merchantId) {
      toast.error('Merchant ID missing!');
      return;
    }

    if (!categoryName) {
      toast.error('Please enter a category name.');
      return;
    }

    if (!isEdit && !imageFile) {
      toast.error('Please upload an image.');
      return;
    }

    setLoading(true);
    try {
      let response;

      if (isEdit) {
        // ✅ Update existing category
        response = await UpdateCategory({
          merchantId,
          name: categoryName,
          image: imageFile || new File([], ''),
        });
        toast.success('Category updated successfully!');
      } else {
        // ✅ Add new category
        response = await AddCategory({
          merchantId,
          name: categoryName,
          image: imageFile || new File([], ''),
        });
        toast.success('Category added successfully!');
      }

      onSave((prev: boolean) => !prev);
      onClose();
    } catch (error) {
      toast.error(isEdit ? 'Failed to update category.' : 'Failed to add category.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-lg mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            {isEdit ? 'Edit Category' : 'Add Category'}
          </h2>
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
                {isEdit ? 'Change Image' : 'Upload Image'}
              </button>

              <p className="text-xs text-gray-500 mt-1">
                Image Dimension 200x200 (Recommended)
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="p-5 border-t flex justify-end">
          <button
            onClick={handleSave}
            disabled={loading}
            className={`px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Saving...' : isEdit ? 'Update' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;
