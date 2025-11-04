// src/pages/DeliverySlotBooking.tsx
import React, { useState } from 'react';
import { Calendar, Edit, XCircle, CheckCircle, Clock } from 'lucide-react';

// --- Type Definitions ---

interface Slot {
    time: string;
    ridersAvailable: number;
    bookedCount: number;
    isHighlighted?: boolean; // For visual emphasis on tomorrow slots
}

interface Booking {
    id: string;
    customer: string;
    dateTime: string;
    riderAssigned: string;
    status: 'Confirmed' | 'In Progress' | 'Pending' | 'Canceled';
}

// --- Mock Data ---

const todaySlots: Slot[] = [
    { time: '01:00 AM - 02:00 PM', ridersAvailable: 5, bookedCount: 3 },
    { time: '01:00 AM - 02:00 PM', ridersAvailable: 5, bookedCount: 3 },
    { time: '01:00 AM - 02:00 PM', ridersAvailable: 5, bookedCount: 3 },
    { time: '03:00 AM - 04:00 PM', ridersAvailable: 5, bookedCount: 6 },
    { time: '05:00 AM - 05:00 PM', ridersAvailable: 5, bookedCount: 3 },
    { time: '09:00 AM - 10:00 AM', ridersAvailable: 5, bookedCount: 3 },
    { time: '09:00 AM - 10:00 AM', ridersAvailable: 5, bookedCount: 8, isHighlighted: true }, // Example of a highly booked slot
];

const tomorrowSlots: Slot[] = [
    { time: '9:00 AM - 10:00 AM', ridersAvailable: 5, bookedCount: 3 },
    { time: '9:00 AM - 10:00 AM', ridersAvailable: 5, bookedCount: 7, isHighlighted: true }, // Example of a critical slot
    { time: '9:00 AM - 10:00 AM', ridersAvailable: 5, bookedCount: 3 },
    { time: '9:00 AM - 10:00 AM', ridersAvailable: 5, bookedCount: 2 },
    { time: '9:00 AM - 10:00 AM', ridersAvailable: 5, bookedCount: 4 },
    { time: '9:00 AM - 10:00 AM', ridersAvailable: 5, bookedCount: 1 },
    { time: '9:00 AM - 10:00 AM', ridersAvailable: 5, bookedCount: 5 },
];

const recentBookings: Booking[] = [
    { id: 'BK001', customer: 'John Smith', dateTime: '2025-10-15 At 10:00am', riderAssigned: 'Alex', status: 'Confirmed' },
    { id: 'BK001', customer: 'Sarah', dateTime: '2025-10-15 At 10:00am', riderAssigned: 'Maria Garcia', status: 'In Progress' },
    { id: 'BK001', customer: 'Mike Wilson', dateTime: '2025-10-15 At 10:00am', riderAssigned: 'David Chen', status: 'Pending' },
    { id: 'BK001', customer: 'Emma Davis', dateTime: '2025-10-15 At 10:00am', riderAssigned: 'Lisa Thompson', status: 'Confirmed' },
];

// Helper function to get status badge colors
const getStatusClasses = (status: Booking['status']) => {
    switch (status) {
        case 'Confirmed': return 'bg-green-100 text-green-700';
        case 'In Progress': return 'bg-blue-100 text-blue-700';
        case 'Pending': return 'bg-yellow-100 text-yellow-700';
        case 'Canceled': return 'bg-red-100 text-red-700';
    }
};

const DeliverySlotBooking: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState('22-10-2025');

    // Function to handle booking or slot selection (mock action)
    const handleSlotClick = (slot: Slot, day: 'Today' | 'Tomorrow') => {
        alert(`You selected the ${slot.time} slot for ${day}. Booked: ${slot.bookedCount}`);
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">Delivery Slot Booking</h1>
            
            {/* --- Date Selection --- */}
            <div className="flex items-center space-x-4 pb-4 border-b border-gray-200">
                <label className="text-gray-600 font-medium">Select Date</label>
                <div className="relative">
                    <input
                        type="text"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="p-2 pl-4 border border-gray-300 rounded-lg pr-10 focus:ring-blue-500 focus:border-blue-500 w-48"
                        placeholder="DD-MM-YYYY"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
            </div>

            {/* --- Available Time Slots --- */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Available Time Slots</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Today's Slots */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Today</h3>
                        <div className="space-y-3">
                            {todaySlots.map((slot, i) => (
                                <div
                                    key={`today-${i}`}
                                    onClick={() => handleSlotClick(slot, 'Today')}
                                    className={`
                                        flex justify-between items-center p-4 rounded-lg cursor-pointer transition 
                                        ${slot.bookedCount >= 7 ? 'bg-red-50 border-red-300 shadow-md hover:bg-red-100' : 'bg-gray-50 border-gray-200 hover:bg-blue-50'}
                                        border
                                    `}
                                >
                                    <div>
                                        <p className="font-semibold text-base text-gray-800">{slot.time}</p>
                                        <p className="text-sm text-gray-500">{slot.ridersAvailable} Riders Available</p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`font-bold ${slot.bookedCount >= 7 ? 'text-red-700' : 'text-green-600'}`}>
                                            {slot.bookedCount} Booked
                                        </span>
                                        <div className="w-2 h-2 rounded-full inline-block ml-2 bg-green-500" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tomorrow's Slots */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Tomorrow</h3>
                        <div className="space-y-3">
                            {tomorrowSlots.map((slot, i) => (
                                <div
                                    key={`tomorrow-${i}`}
                                    onClick={() => handleSlotClick(slot, 'Tomorrow')}
                                    className={`
                                        flex justify-between items-center p-4 rounded-lg cursor-pointer transition 
                                        ${slot.bookedCount >= 7 ? 'bg-red-50 border-red-300 shadow-md hover:bg-red-100' : 'bg-gray-50 border-gray-200 hover:bg-blue-50'}
                                        border
                                    `}
                                >
                                    <div>
                                        <p className="font-semibold text-base text-gray-800">{slot.time}</p>
                                        <p className="text-sm text-gray-500">{slot.ridersAvailable} Riders Available</p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`font-bold ${slot.bookedCount >= 7 ? 'text-red-700' : 'text-green-600'}`}>
                                            {slot.bookedCount} Booked
                                        </span>
                                        <div className="w-2 h-2 rounded-full inline-block ml-2 bg-green-500" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Recent Slot Bookings Table --- */}
            <div className="pt-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Slot Bookings</h2>
                <div className="overflow-x-auto bg-gray-50 rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                {['Booking ID', 'Customer', 'Date&Time', 'Rider Assigned', 'Status', 'Actions'].map(header => (
                                    <th
                                        key={header}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {recentBookings.map((booking, i) => (
                                <tr key={i} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{booking.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.customer}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.dateTime}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.riderAssigned}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(booking.status)}`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        <button className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition">
                                            <Edit className="w-4 h-4 inline" /> Edit
                                        </button>
                                        <button className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition">
                                            <XCircle className="w-4 h-4 inline" /> Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DeliverySlotBooking;