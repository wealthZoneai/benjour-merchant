import React, { useState, useEffect } from 'react';
import { User, Phone, Mail, Building2, MapPin } from 'lucide-react';

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
    initialData: {
        fullName: string,
        phoneNumber: string,
        emailId: string,
        location: string,
        role: string,
        lastLogin: string,
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

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Edit Profile</h3>
                <form onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div className="mb-4">
                        <label htmlFor="fullName" className="sr-only">Full Name</label>
                        <div className="relative">
                            <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Full Name"
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div className="mb-4">
                        <label htmlFor="phone" className="sr-only">Phone Number</label>
                        <div className="relative">
                            <Phone size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Email ID */}
                    <div className="mb-4">
                        <label htmlFor="email" className="sr-only">Email ID</label>
                        <div className="relative">
                            <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                id="emailId"
                                name="emailId"
                                value={formData.emailId}
                                onChange={handleChange}
                                placeholder="Email ID"
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Restaurant Name */}
                    <div className="mb-4">
                        <label htmlFor="restaurantName" className="sr-only">Restaurant Name</label>
                        <div className="relative">
                            <Building2 size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                placeholder="Restaurant Name"
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div className="mb-6">
                        <label htmlFor="location" className="sr-only">Location</label>
                        <div className="relative">
                            <MapPin size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Location"
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex justify-center gap-3">
                        <button
                            type="submit"
                            className="px-6 py-3 w-[200px] bg-[#0099FF] text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
                        >
                            SAVE
                        </button>
                         <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 w-[200px] bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium"
                        >
                            CANCEL
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;