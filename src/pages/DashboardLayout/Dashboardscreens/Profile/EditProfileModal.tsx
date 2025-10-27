import React, { useState, useEffect } from 'react';
import { User, Phone, Mail, Building2, MapPin } from 'lucide-react';

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
    initialData: {
        fullName: string;
        phoneNumber: string;
        emailId: string;
        location: string;
        role: string;
        lastLogin: string;
    };
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
    const [formData, setFormData] = useState(initialData);

    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    const inputClass = "pl-12 pr-4 py-3 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-slide-in">
                
                {/* Modal Header */}
                <div className="mb-6 text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Edit Profile</h3>
                    <p className="text-sm text-gray-500">Update your profile information</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 bg-blue-100 p-2 rounded-full">
                            <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className={inputClass}
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 bg-green-100 p-2 rounded-full">
                            <Phone className="w-5 h-5 text-green-600" />
                        </div>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className={inputClass}
                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 bg-yellow-100 p-2 rounded-full">
                            <Mail className="w-5 h-5 text-yellow-600" />
                        </div>
                        <input
                            type="email"
                            name="emailId"
                            value={formData.emailId}
                            onChange={handleChange}
                            placeholder="Email ID"
                            className={inputClass}
                        />
                    </div>

                    {/* Restaurant / Role */}
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 bg-purple-100 p-2 rounded-full">
                            <Building2 className="w-5 h-5 text-purple-600" />
                        </div>
                        <input
                            type="text"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            placeholder="Restaurant Name"
                            className={inputClass}
                        />
                    </div>

                    {/* Location */}
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 bg-pink-100 p-2 rounded-full">
                            <MapPin className="w-5 h-5 text-pink-600" />
                        </div>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Location"
                            className={inputClass}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition transform hover:scale-105"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;
