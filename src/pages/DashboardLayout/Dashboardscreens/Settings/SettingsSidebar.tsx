// src/components/SettingsSidebar.js
import React from 'react';
import { User, Bell, DollarSign, Users, Lock } from 'lucide-react';

const navItems = [
    { name: 'Restaurant Profile', icon: User, active: true },
    { name: 'Notifications', icon: Bell, active: false },
    { name: 'Payment Settings', icon: DollarSign, active: false },
    { name: 'User Management', icon: Users, active: false },
    { name: 'Security', icon: Lock, active: false },
];

const SettingsSidebar = ({ activeItem, setActiveItem }) => {
    return (
        <div className="w-64 p-6 bg-white rounded-xl shadow-md h-full">
            {navItems.map((item) => (
                <button
                    key={item.name}
                    onClick={() => setActiveItem(item.name)}
                    className={`flex items-center w-full py-3 px-4 mb-2 text-sm font-medium rounded-lg transition-colors
                        ${activeItem === item.name
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                </button>
            ))}
        </div>
    );
};

export default SettingsSidebar;