import React, { useState } from 'react';
import { LogIn, ChevronRight, BellRing, ShieldCheck, User, Phone, Mail, MapPin, Briefcase } from 'lucide-react';
import ProfileHeader from './ProfileHeader'; // Import the new header component
import EditProfileModal from './EditProfileModal'; // Import the new modal component

// Reusable component for an input field
const ProfileField: React.FC<{ icon: React.ElementType, label: string, value: string }> = ({ icon: Icon, label, value }) => (
    <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex items-center shadow-sm">
        {Icon && <Icon className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0" />}
        <div>
            <p className="text-xs text-gray-400">{label}</p>
            <p className="font-medium text-gray-800 break-words">{value}</p>
        </div>
    </div>
);

// Toggle switch component to mimic the iOS style in the image
const ToggleSwitch: React.FC<{ checked: boolean, onChange: () => void, primaryColor: string }> = ({ checked, onChange, primaryColor }) => (
    <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
        <div className={`w-11 h-6 ${checked ? primaryColor : 'bg-gray-300'} peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
    </label>
);

const initialProfileData = {
    fullName: 'John Doe',
    phoneNumber: '+1 (123) 456-7890',
    emailId: 'john.doe@restaurant.com',
    location: '456 Oak Avenue, Uptown, City 12345',
    role: 'Administrator',
    lastLogin: 'Windows Last Active At 11:00 PM',
};

const ProfilePage: React.FC = () => {
    // State to hold the profile data
    const [profileData, setProfileData] = useState(initialProfileData);
    const [notificationsActive, setNotificationsActive] = useState(true);
    const [privacyActive, setPrivacyActive] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSaveProfile = (updatedData: typeof initialProfileData) => {
        setProfileData(updatedData);
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <ProfileHeader 
                name={profileData.fullName} 
                role={profileData.role} 
                onEditClick={() => setIsModalOpen(true)} 
            />

            <div className="max-w-6xl mx-auto">
                {/* Personal Information Section */}
                <div className="bg-white p-6 rounded-xl shadow-md mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Personal Information</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <ProfileField icon={User} label="Full Name" value={profileData.fullName} />
                        <ProfileField icon={Phone} label="Phone Number" value={profileData.phoneNumber} />
                        <ProfileField icon={Mail} label="Email ID" value={profileData.emailId} />
                        <ProfileField icon={MapPin} label="Location" value={profileData.location} />
                        <ProfileField icon={LogIn} label="Last Login" value={profileData.lastLogin} />
                        <ProfileField icon={Briefcase} label="Role" value={profileData.role} />
                    </div>
                </div>

                {/* Change Password Section */}
                <div className="bg-white p-6 rounded-xl shadow-md mb-6 cursor-pointer hover:bg-gray-100 transition-colors flex justify-between items-center"
                    onClick={() => console.log('Navigate to Change Password')}>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Change Password</h3>
                        <p className="text-sm text-gray-500">Change your password & Update Profile</p>
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-400" />
                </div>

                {/* Notifications Settings */}
                <div className="bg-white p-6 rounded-xl shadow-md mb-6 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <BellRing className="w-5 h-5 text-pink-500" /> Notifications
                        </h3>
                        <p className="text-sm text-gray-500">Change Settings to Active Notifications</p>
                    </div>
                    <ToggleSwitch 
                        checked={notificationsActive} 
                        onChange={() => setNotificationsActive(!notificationsActive)} 
                        primaryColor="bg-pink-500"
                    />
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md mb-6 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-pink-500" /> Privacy & Security Settings
                        </h3>
                        <p className="text-sm text-gray-500">Change Settings For Privacy Settings</p>
                    </div>
                    <ToggleSwitch 
                        checked={privacyActive} 
                        onChange={() => setPrivacyActive(!privacyActive)} 
                        primaryColor="bg-pink-500"
                    />
                </div>
            </div>

            <EditProfileModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveProfile}
                initialData={profileData}
            />
        </div>
    );
};

export default ProfilePage;
