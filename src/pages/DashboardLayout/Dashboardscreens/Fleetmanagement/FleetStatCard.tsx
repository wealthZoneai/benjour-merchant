// src/components/FleetStatCard.js
import React from 'react';
import { Truck, CheckCircle, Clock, MapPin } from 'lucide-react';

const icons = { Truck, CheckCircle, Clock, MapPin };

const FleetStatCard = ({ title, value, change, changeColor, iconName }) => {
    const Icon = icons[iconName] || Clock;

    return (
        <div className="bg-[#ADB8BD1F] p-4 rounded-xl shadow-md border border-gray-100">
            <div className="flex justify-between items-center mb-1">
                <h4 className="text-sm font-medium text-gray-500">{title}</h4>
                <Icon className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
            <p className={`text-xs ${changeColor} mt-1`}>{change}</p>
        </div>
    );
};

export default FleetStatCard;