// src/components/SupportBox.js
import React from 'react';

const SupportBox = ({ icon: Icon, title, description, colorClass }) => {
    return (
        <div className="bg-white p-5 rounded-xl shadow-md cursor-pointer transition-shadow duration-200 hover:shadow-lg flex flex-col items-start h-full">
            <div className={`p-3 rounded-xl mb-3 ${colorClass.bg}`}>
                <Icon className={`w-6 h-6 ${colorClass.text}`} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
    );
};

export default SupportBox;