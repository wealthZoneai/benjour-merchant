// import React, { useState, useRef } from 'react';
// import { X } from 'lucide-react';

// const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/200?text=200x200';

// interface AddCategoryModalProps {
//     isOpen: boolean;
//     onClose: () => void;
// }

// const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ isOpen, onClose }) => {
//     const [categoryName, setCategoryName] = useState('');
//     const [store, setStore] = useState('');
//     const [isSchedulable, setIsSchedulable] = useState(false);

//     // State for image handling
//     const [imagePreview, setImagePreview] = useState<string | null>(null);
//     const fileInputRef = useRef<HTMLInputElement>(null); // Ref to access the hidden file input

//     if (!isOpen) return null;

//     // --- Image Handling Logic ---

//     const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files?.[0];
//         if (file) {
//             // Create a temporary URL for the file to display a preview
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 // Set the image data URL to the state
//                 setImagePreview(reader.result as string);
//             };
//             reader.readAsDataURL(file);

//             // Optionally, you might handle the file object itself here (e.g., setFile(file))
//         }
//     };

//     const triggerFileUpload = () => {
//         fileInputRef.current?.click(); // Programmatically click the hidden input
//     };

//     // --- Render ---

//     return (
//         <div
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
//             onClick={onClose}
//         >
//             <div
//                 className="bg-white rounded-lg shadow-2xl w-full max-w-lg mx-4"
//                 onClick={e => e.stopPropagation()}
//             >
//                 <div className="flex justify-between items-center p-5 border-b">
//                     <h2 className="text-xl font-semibold text-gray-800">Add Category</h2>
//                     <button
//                         onClick={onClose}
//                         className="text-gray-400 hover:text-gray-600 transition"
//                     >
//                         <X className="w-6 h-6" />
//                     </button>
//                 </div>

//                 <div className="p-6 space-y-6">

//                     {/* 1. Name Input */}
//                     <div className="flex flex-col sm:flex-row items-start sm:items-center">
//                         <label className="w-1/4 font-medium text-gray-700 mb-1 sm:mb-0">
//                             Name:
//                         </label>
//                         <input
//                             type="text"
//                             value={categoryName}
//                             onChange={(e) => setCategoryName(e.target.value)}
//                             placeholder="Enter Category Name"
//                             className="w-full sm:w-3/4 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                         />
//                     </div>

//                     {/* 2. Store Dropdown */}
//                     <div className="flex flex-col sm:flex-row items-start sm:items-center">
//                         <label className="w-1/4 font-medium text-gray-700 mb-1 sm:mb-0">
//                             Store:
//                         </label>
//                         <select
//                             value={store}
//                             onChange={(e) => setStore(e.target.value)}
//                             className="w-full sm:w-3/4 p-2 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500 appearance-none pr-8"
//                         >
//                             <option value="" disabled>Select A Store</option>
//                             <option value="store1">Store A</option>
//                             <option value="store2">Store B</option>
//                         </select>
//                         {/* Tailwind utility to add a custom arrow is often needed for clean select styles */}
//                     </div>

//                     {/* 3. Image Upload Section (UPDATED) */}
//                     <div className="flex flex-col sm:flex-row items-start">
//                         <label className="w-1/4 font-medium text-gray-700 mt-1">
//                             Image:
//                         </label>
//                         <div className="w-full sm:w-3/4 flex flex-col">

//                             {/* Image Preview Area */}
//                             <div className="mb-3 w-[100px] h-[100px] border border-dashed border-gray-400 flex items-center justify-center rounded-lg overflow-hidden bg-gray-50">
//                                 <img
//                                     src={imagePreview || PLACEHOLDER_IMAGE}
//                                     alt="Category Preview"
//                                     className="w-full h-full object-cover"
//                                 />
//                             </div>

//                             <div className="flex space-x-3 items-center">
//                                 {/* Hidden File Input */}
//                                 <input
//                                     type="file"
//                                     accept="image/*"
//                                     ref={fileInputRef}
//                                     onChange={handleImageUpload}
//                                     className="hidden" // Keep the input hidden
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={triggerFileUpload}
//                                     className="px-3 py-1 border border-gray-300 rounded-lg text-sm bg-gray-50 hover:bg-gray-100 transition"
//                                 >
//                                     Upload Image
//                                 </button>
//                             </div>

//                             <p className="text-xs text-gray-500 mt-1">
//                                 Image Dimension 200x200
//                             </p>
//                         </div>
//                     </div>

//                     {/* 4. Is Schedulable Toggle */}
//                     <div className="flex flex-col sm:flex-row items-start sm:items-center">
//                         <label className="w-1/2 font-medium text-gray-700 mb-1 sm:mb-0">
//                             Is Schedulable?
//                         </label>
//                         <div className="w-full sm:w-3/4">
//                             <button
//                                 onClick={() => setIsSchedulable(!isSchedulable)}
//                                 className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${isSchedulable ? 'bg-pink-500' : 'bg-gray-200'}`}
//                             >
//                                 <span className="sr-only">Toggle Schedulable</span>
//                                 <span
//                                     aria-hidden="true"
//                                     className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${isSchedulable ? 'translate-x-5' : 'translate-x-0'}`}
//                                 />
//                             </button>
//                         </div>
//                     </div>

//                 </div>

//                 <div className="p-5 border-t flex justify-end">
//                     <button
//                         onClick={onClose}
//                         className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition"
//                     >
//                         Save
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddCategoryModal;



import React, { useState, useRef } from 'react';
import { X, Image as ImageIcon, Trash2 } from 'lucide-react'; // Import Image and Trash icons
// Assuming a placeholder image for the initial state or when no image is selected
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/200?text=Upload+Image'; // Updated placeholder text

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ isOpen, onClose }) => {
  // ... (existing state for categoryName, store, isSchedulable)
  const [categoryName, setCategoryName] = useState('');
  const [store, setStore] = useState('');
  const [isSchedulable, setIsSchedulable] = useState(false);

  // State for image handling
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
      // You might also want to store the actual File object if you plan to send it to a backend:
      // setSelectedFile(file); 
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setImagePreview(null); // Clear the preview
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the file input's value
    }
    // Optionally: setSelectedFile(null);
  };

  // --- Render ---
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-lg mx-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Add Category</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">

          {/* Name Input (unchanged) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <label className="w-1/4 font-medium text-gray-700 mb-1 sm:mb-0">
              Name:
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter Category Name"
              className="w-full sm:w-3/4 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Store Dropdown (unchanged) */}
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
            {/* Tailwind utility to add a custom arrow is often needed for clean select styles */}
          </div>

          {/* 3. Image Upload Section (REFINED) */}
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

          {/* Is Schedulable Toggle (unchanged) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <label className="w-1/3 font-medium text-gray-700 mb-1 sm:mb-0">
              Is Schedulable?
            </label>
            <div className="w-full sm:w-3/4">
              <button
                onClick={() => setIsSchedulable(!isSchedulable)}
                className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${isSchedulable ? 'bg-pink-500' : 'bg-gray-200'}`}
              >
                <span className="sr-only">Toggle Schedulable</span>
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${isSchedulable ? 'translate-x-5' : 'translate-x-0'}`}
                />
              </button>
            </div>
          </div>

        </div>

        {/* Footer with Save Button (unchanged) */}
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

export default AddCategoryModal;