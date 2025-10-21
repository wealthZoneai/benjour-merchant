// src/pages/SettingsPage.js (Main Layout)
import React, { useState } from 'react';
import SettingsSidebar from './SettingsSidebar';
import RestaurantProfileForm from './RestaurantProfileForm';
// Other content components (Notifications, Payment, etc.) would be imported here

const Settings = () => {
    const [activeSetting, setActiveSetting] = useState('Restaurant Profile');

    // Function to render the correct content based on the active tab
    const renderContent = () => {
        switch (activeSetting) {
            case 'Restaurant Profile':
                return <RestaurantProfileForm />;
            case 'Notifications':
                return <div className="flex-1 p-6 bg-white rounded-xl shadow-md text-center text-gray-500">Notifications Settings Content</div>;
            case 'Payment Settings':
                return <div className="flex-1 p-6 bg-white rounded-xl shadow-md text-center text-gray-500">Payment Settings Content</div>;
            case 'User Management':
                return <div className="flex-1 p-6 bg-white rounded-xl shadow-md text-center text-gray-500">User Management Content</div>;
            case 'Security':
                return <div className="flex-1 p-6 bg-white rounded-xl shadow-md text-center text-gray-500">Security Settings Content</div>;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-8">
            {/* Header */}
            <header className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
                <p className="text-gray-600 mt-1">Manage Your Restaurant Settings And Preferences</p>
            </header>

            {/* Main Content Area: Sidebar + Content */}
            <div className="flex flex-col lg:flex-row gap-6 h-full">
                {/* 1. Sidebar */}
                <SettingsSidebar 
                    activeItem={activeSetting} 
                    setActiveItem={setActiveSetting} 
                />

                {/* 2. Content */}
                {renderContent()}
            </div>
        </div>
    );
};

export default Settings;