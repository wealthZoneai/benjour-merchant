// src/components/StatusBadge.js
import React from 'react';

const StatusBadge = ({ status }) => {
    let bgColor, textColor;
    switch (status) {
        case 'Pending':
            bgColor = 'bg-red-100';
            textColor = 'text-red-700';
            break;
        case 'Ready':
            bgColor = 'bg-green-100';
            textColor = 'text-green-700';
            break;
        default:
            bgColor = 'bg-gray-100';
            textColor = 'text-gray-700';
    }
    return (
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${bgColor} ${textColor}`}>
            {status}
        </span>
    );
};

export default StatusBadge;