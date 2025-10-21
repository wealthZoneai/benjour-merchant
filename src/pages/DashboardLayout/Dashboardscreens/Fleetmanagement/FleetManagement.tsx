import React, { useState } from 'react';
import { Plus, MapPin, Clock, Truck, CheckCircle } from 'lucide-react';
import FleetStatCard from './FleetStatCard';
import FleetStatusTabs from './FleetStatusTabs';
import FleetContextTabs from './FleetContextTabs';
import PreBookingTable from './preBookingOrders';

const fleetStats = [
    { title: 'Pending Orders', value: '24', change: '-15% From Yesterday', changeColor: 'text-red-500', iconName: 'Clock' },
    { title: 'Active Batches', value: '8', change: '+5% From Yesterday', changeColor: 'text-blue-500', iconName: 'Truck' },
    { title: 'Available Slots', value: '16', change: '-8% From Yesterday', changeColor: 'text-red-500', iconName: 'MapPin' },
    { title: 'Completed', value: '42', change: '+5% From Yesterday', changeColor: 'text-green-500', iconName: 'CheckCircle' },
];

const FleetManagement = () => {
    const [activeMainTab, setActiveMainTab] = useState('Book Slot');
    const [activeContextTab, setActiveContextTab] = useState('Order Management');

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-8">
            <header className="bg-white p-6 rounded-lg shadow-md mb-6 flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Fleet Management</h1>
                    <p className="text-gray-600 mt-1">Manage Your Orders, Batches, and Delivery Slots</p>
                </div>
                <div className="flex space-x-3">
                    <button className="flex items-center text-sm text-gray-600 hover:text-gray-800">
                        <MapPin className="w-4 h-4 mr-1" />
                        Track All Orders
                    </button>
                    <button className="flex items-center px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Ticket For Slot
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                {fleetStats.map((stat, index) => (
                    <FleetStatCard key={index} {...stat} />
                ))}
            </div>
            <FleetStatusTabs activeTab={activeMainTab} setActiveTab={setActiveMainTab} />
            <FleetContextTabs activeTab={activeContextTab} setActiveTab={setActiveContextTab} />
            {activeContextTab === 'Order Management' && <PreBookingTable />}
            {activeContextTab !== 'Order Management' && (
                 <div className="bg-white p-12 rounded-xl shadow-lg text-center text-gray-500">
                    Content for **{activeContextTab}** goes here.
                 </div>
            )}
        </div>
    );
};

export default FleetManagement;