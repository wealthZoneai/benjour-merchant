// src/components/RestaurantProfileForm.js
import React from 'react';

// Mock data for operating hours structure
const initialHours = [
    { day: 'Monday', start: '09:00AM', end: '10:00PM', checked: true },
    { day: 'Tuesday', start: '09:00AM', end: '10:00PM', checked: true },
    { day: 'Wednesday', start: '09:00AM', end: '10:00PM', checked: true },
    { day: 'Thursday', start: '09:00AM', end: '10:00PM', checked: true },
    { day: 'Friday', start: '09:00AM', end: '10:00PM', checked: true },
    { day: 'Saturday', start: '09:00AM', end: '10:00PM', checked: true },
    { day: 'Sunday', start: '09:00AM', end: '10:00PM', checked: false },
];

const RestaurantProfileForm = () => {
    // In a real app, you would use state management (useState) here
    const [operatingHours, setOperatingHours] = React.useState(initialHours);

    // Simple handler to mimic checking/unchecking a day
    const handleCheck = (dayIndex) => {
        setOperatingHours(prevHours => prevHours.map((item, index) => 
            index === dayIndex ? { ...item, checked: !item.checked } : item
        ));
    };

    return (
        <div className="flex-1 bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Restaurant Information</h3>

            {/* Top Info Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant Name</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Restaurant Name" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Phone Number" />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Address" />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Description"></textarea>
                </div>
            </div>

            {/* Operating Hours */}
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Operating Hours</h3>
            <div className="space-y-3 mb-8">
                {operatingHours.map((hour, index) => (
                    <div key={hour.day} className="flex items-center space-x-4">
                        <span className="w-24 text-sm font-medium text-gray-700">{hour.day}</span>
                        
                        {/* Checkbox */}
                        <input 
                            type="checkbox" 
                            checked={hour.checked} 
                            onChange={() => handleCheck(index)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        
                        <span className="text-sm text-gray-600">From</span>
                        
                        {/* Start Time Input */}
                        <input 
                            type="text" 
                            defaultValue={hour.start}
                            disabled={!hour.checked}
                            className={`w-28 px-2 py-1 border rounded-lg text-sm text-center ${!hour.checked ? 'bg-gray-100 text-gray-400' : 'border-gray-300'}`}
                        />
                        
                        <span className="text-sm text-gray-600">To</span>
                        
                         {/* End Time Input */}
                         <input 
                            type="text" 
                            defaultValue={hour.end}
                            disabled={!hour.checked}
                            className={`w-28 px-2 py-1 border rounded-lg text-sm text-center ${!hour.checked ? 'bg-gray-100 text-gray-400' : 'border-gray-300'}`}
                        />
                    </div>
                ))}
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-gray-200 flex justify-end">
                <button className="px-6 py-3 text-lg bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md">
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default RestaurantProfileForm;