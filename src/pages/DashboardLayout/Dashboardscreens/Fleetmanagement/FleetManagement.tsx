// src/pages/FleetManagement.tsx
import React, { useState, useMemo } from 'react';
import { Plus, MapPin, Clock, Truck, CheckCircle, Package } from 'lucide-react';
import PreBookingTable from './preBookingOrders';
import FleetStatCard from './FleetStatCard';
import FleetContextTabs from './FleetContextTabs';
import { useNavigate } from 'react-router-dom';
import BatchAllocationScreen from './BatchAllocationScreen';
import RiderOverviewScreen from './RiderOverviewScreen';

// --- 1. Icon Type Fix and Mapping ---
// We use 'typeof Clock' to correctly get the TypeScript type for a Lucide Icon component.
type LucideIconType = typeof Clock; 

const iconMap: Record<string, LucideIconType> = {
    Clock: Clock,
    Truck: Truck,
    MapPin: MapPin,
    CheckCircle: CheckCircle,
    Package: Package,
};

// --- 2. Helper: FleetStatCard Component ---
interface StatCardProps {
    title: string;
    value: string;
    change: string;
    changeColor: string;
    iconName: keyof typeof iconMap; // Ensures the string is a valid key from iconMap
}




const fleetStats: StatCardProps[] = [
    { title: 'Pending Orders', value: '24', change: '-15% From Yesterday', changeColor: 'text-red-500', iconName: 'Clock' },
    { title: 'Active Batches', value: '8', change: '+5% From Yesterday', changeColor: 'text-blue-500', iconName: 'Truck' },
    { title: 'Available Slots', value: '16', change: '-8% From Yesterday', changeColor: 'text-red-500', iconName: 'MapPin' },
    { title: 'Completed', value: '42', change: '+5% From Yesterday', changeColor: 'text-green-500', iconName: 'CheckCircle' },
];

const FleetManagement: React.FC = () => {
    const [activeContextTab, setActiveContextTab] = useState('Order Management');
    const navigate = useNavigate();

    // Dynamically render content based on the active tab
    const renderContent = useMemo(() => {
        switch (activeContextTab) {
            case 'Order Management':
                return <PreBookingTable />;
            
            case 'Batch Management':
                return <BatchAllocationScreen/>;
            case 'Delivery Slots':
                return <RiderOverviewScreen/>;
            default:
                return null;
        }
    }, [activeContextTab]);

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-8">
            <header className="bg-white p-6 rounded-xl shadow-md mb-6 flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Fleet Management</h1>
                    <p className="text-gray-600 mt-1">Manage Your Orders, Batches, and Delivery Slots</p>
                </div>
                <div className="flex space-x-3">
                    <button className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition"
                    onClick={() => navigate('/liveDeliveryTracking')}
                    >
                        <MapPin className="w-4 h-4 mr-1" />
                        Track All Orders
                    </button>
                    <button className="flex items-center px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md" 
                    onClick={() => navigate('/deliverySlotBooking')}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Ticket For Slot
                    </button>
                </div>
            </header>

            {/* --- Status Cards --- */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                {fleetStats.map((stat, index) => (
                    <FleetStatCard key={index} {...stat} />
                ))}
            </div>

            {/* --- Context Tabs and Dynamic Content --- */}
            <FleetContextTabs activeTab={activeContextTab} setActiveTab={setActiveContextTab} />
            
            <div className="mt-6">
                {renderContent}
            </div>
        </div>
    );
};

export default FleetManagement;