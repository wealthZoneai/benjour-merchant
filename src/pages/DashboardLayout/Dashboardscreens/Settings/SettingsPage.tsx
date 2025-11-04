// src/pages/SettingsPage.js (Updated Main Layout)
import React, { useState } from 'react';
import SettingsSidebar from './SettingsSidebar';
import RestaurantProfileForm from './RestaurantProfileForm';
// Import the new TypeScript component
import NotificationSettings from './NotificationSettings'; 
import PaymentSettings from './PaymentSettings';
import UserManagement from './UserManagement';
import SecuritySettings from './SecuritySettings';

const Settings = () => {
    const [activeSetting, setActiveSetting] = useState('Restaurant Profile');

    // Function to render the correct content based on the active tab
    const renderContent = () => {
        switch (activeSetting) {
            case 'Restaurant Profile':
                return <RestaurantProfileForm />;
            case 'Notifications':
                // *** Use the new component here ***
                return <NotificationSettings />; 
            // ... other cases remain the same
            case 'Payment Settings':
                return<PaymentSettings />
            case 'User Management':
                return <UserManagement/>
            case 'Security':
                return <SecuritySettings/>
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-8">
            {/* Header and Layout */}
            {/* ... (rest of the Settings component structure is the same) ... */}
            <header className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
                <p className="text-gray-600 mt-1">Manage Your Restaurant Settings And Preferences</p>
            </header>

            <div className="flex flex-col lg:flex-row gap-6 h-full">
                <SettingsSidebar 
                    activeItem={activeSetting} 
                    setActiveItem={setActiveSetting} 
                />
                {renderContent()}
            </div>
        </div>
    );
};

export default Settings;