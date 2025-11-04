// src/pages/LiveDeliveryTracking.tsx
import React, { useState, useMemo } from 'react';
import { MapPin, Dot, Truck, User, Search, RefreshCcw } from 'lucide-react';
import RealTimeMapIntegration from './RealTimeMapIntegration';

// --- Type Definitions (Needed for Map Integration) ---

interface Location {
    lat: number;
    lng: number;
    label: string;
}

interface RiderStatus {
    id: string;
    name: string;
    status: 'On Delivery' | 'Available' | 'Break';
}

interface ActiveRider extends RiderStatus {
    location: Location; // Added location to the Rider Status type
}

interface ActiveDelivery {
    id: string;
    customerName: string;
    pickupLocation: string;
    deliveryLocation: string;
    riderName: string;
    status: 'Picked Up' | 'On Route' | 'Delivered' | 'Pending';
}

interface DeliveryRoute {
    id: string;
    riderId: string;
    pickup: Location;
    delivery: Location;
    color: string;
}

// --- Mock Data ---

const mapCenter: Location = { lat: 51.505, lng: -0.09, label: 'Central Depot' };

const initialRiderStatuses: ActiveRider[] = [
    { id: 'R001', name: 'Alex Rodriguez', status: 'On Delivery', location: { lat: 51.515, lng: -0.12, label: 'Alex (DEL001, 003)' } },
    { id: 'R002', name: 'María Garcia', status: 'Available', location: { lat: 51.490, lng: -0.15, label: 'María (Avail)' } },
    { id: 'R003', name: 'David Chen', status: 'On Delivery', location: { lat: 51.500, lng: -0.05, label: 'David (DEL002)' } },
    { id: 'R004', name: 'Lisa Thompson', status: 'Break', location: { lat: 51.520, lng: -0.08, label: 'Lisa (Break)' } },
    { id: 'R005', name: 'Sam Wilson', status: 'Available', location: { lat: 51.485, lng: -0.11, label: 'Sam (Avail)' } },
];

const initialActiveDeliveries: ActiveDelivery[] = [
    {
        id: 'DEL001',
        customerName: 'Anya Sharma',
        pickupLocation: 'Store 123',
        deliveryLocation: '456 Oak Lane',
        riderName: 'Alex Rodriguez',
        status: 'On Route',
    },
    {
        id: 'DEL002',
        customerName: 'Ben Carter',
        pickupLocation: 'Main Kitchen',
        deliveryLocation: '789 Pine Ave',
        riderName: 'David Chen',
        status: 'Picked Up',
    },
    {
        id: 'DEL003',
        customerName: 'Charlie Davis',
        pickupLocation: 'Store 456',
        deliveryLocation: '101 Elm St',
        riderName: 'Alex Rodriguez',
        status: 'Pending',
    },
];

const mockRoutes: DeliveryRoute[] = [
    { id: 'Route001', riderId: 'R001', 
      pickup: { lat: 51.51, lng: -0.13, label: 'Store 123' }, 
      delivery: { lat: 51.525, lng: -0.11, label: '456 Oak Lane' }, 
      color: '#3b82f6' 
    },
    { id: 'Route002', riderId: 'R003', 
      pickup: { lat: 51.495, lng: -0.07, label: 'Main Kitchen' }, 
      delivery: { lat: 51.505, lng: -0.03, label: '789 Pine Ave' }, 
      color: '#a855f7' 
    },
    // DEL003 route is pending/not assigned yet for visual distinction
];

// Helper functions (remain the same)
const getRiderStatusClasses = (status: RiderStatus['status']) => {
    switch (status) {
        case 'On Delivery': return 'text-blue-600 bg-blue-100';
        case 'Available': return 'text-green-600 bg-green-100';
        case 'Break': return 'text-yellow-600 bg-yellow-100';
    }
};

const getDeliveryStatusClasses = (status: ActiveDelivery['status']) => {
    switch (status) {
        case 'Pending': return 'bg-yellow-100 text-yellow-700';
        case 'Picked Up': return 'bg-purple-100 text-purple-700';
        case 'On Route': return 'bg-blue-100 text-blue-700';
        case 'Delivered': return 'bg-green-100 text-green-700'; 
    }
};

// --- Main Component ---

const LiveDeliveryTracking: React.FC = () => {
    // State to manage rider data and filters
    const [riders, setRiders] = useState(initialRiderStatuses);
    const [deliveries, setDeliveries] = useState(initialActiveDeliveries);
    const [riderSearchTerm, setRiderSearchTerm] = useState('');
    const [riderStatusFilter, setRiderStatusFilter] = useState<'All' | RiderStatus['status']>('All');

    // --- Dynamic Filtering Logic ---
    const filteredRiders = useMemo(() => {
        return riders.filter(rider => {
            const matchesSearch = rider.name.toLowerCase().includes(riderSearchTerm.toLowerCase());
            const matchesStatus = riderStatusFilter === 'All' || rider.status === riderStatusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [riders, riderSearchTerm, riderStatusFilter]);

    // Get only the riders who are currently active (On Delivery or Available) for the map
    const activeRidersForMap = useMemo(() => {
        return riders.filter(r => r.status !== 'Break');
    }, [riders]);

    // Get routes only for active deliveries
    const activeDeliveryRoutes = useMemo(() => {
        const activeDeliveryRiderNames = new Set(
            deliveries
                .filter(d => d.status === 'On Route' || d.status === 'Picked Up')
                .map(d => d.riderName)
        );
        
        return mockRoutes.filter(route => {
            const rider = riders.find(r => r.id === route.riderId);
            return rider && activeDeliveryRiderNames.has(rider.name);
        });
    }, [deliveries, riders]);


    // --- Mock Interaction Functionality ---
    const handleStatusChange = (deliveryId: string, newStatus: ActiveDelivery['status']) => {
        setDeliveries(prevDeliveries => 
            prevDeliveries.map(delivery => 
                delivery.id === deliveryId ? { ...delivery, status: newStatus } : delivery
            )
        );
    };

    const handleRiderStatusToggle = (riderId: string) => {
        setRiders(prevRiders => 
            prevRiders.map(rider => {
                if (rider.id === riderId) {
                    // Toggle between Available and Break for demonstration
                    const nextStatus = rider.status === 'Available' ? 'Break' : 
                                       rider.status === 'Break' ? 'Available' : 
                                       rider.status; // Keep 'On Delivery' unless directly changed
                    return { ...rider, status: nextStatus };
                }
                return rider;
            })
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-8">
            {/* Header */}
            <header className="flex justify-between items-center bg-white p-6 rounded-xl shadow-md mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Live Delivery Tracking</h1>
                <button className="flex items-center px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
                    <RefreshCcw className="w-4 h-4 mr-2" /> Live Refresh
                </button>
            </header>
            
            {/* --- Top Section: Map & Rider Status (Dynamic) --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Real Time Map */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-200 p-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Real Time Map</h2>
                    <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
                        
                        {/* 🌟 Map Integration Component 🌟 */}
                        <RealTimeMapIntegration
                            riders={activeRidersForMap} // Only send active riders
                            deliveryRoutes={activeDeliveryRoutes} 
                            center={mapCenter}
                            zoom={13} 
                        />
                        
                       
                    </div>
                </div>

                {/* Rider Status Panel (Dynamic with Search & Filter) */}
                <div className="lg:col-span-1 bg-white rounded-xl shadow-lg border border-gray-200 p-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Rider Status ({filteredRiders.length}/{riders.length})</h2>
                    
                    {/* Search and Filter Controls */}
                    <div className="space-y-3 mb-4">
                        <div className="relative flex items-center">
                            <Search className="absolute left-3 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search rider name..."
                                value={riderSearchTerm}
                                onChange={(e) => setRiderSearchTerm(e.target.value)}
                                className="w-full p-2 pl-10 border border-gray-300 rounded-lg text-sm focus:border-blue-500"
                            />
                        </div>
                        <select 
                            value={riderStatusFilter} 
                            onChange={(e) => setRiderStatusFilter(e.target.value as 'All' | RiderStatus['status'])}
                            className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500"
                        >
                            <option value="All">All Statuses</option>
                            <option value="On Delivery">On Delivery</option>
                            <option value="Available">Available</option>
                            <option value="Break">On Break</option>
                        </select>
                    </div>

                    {/* Filtered Rider List */}
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                        {filteredRiders.map((rider) => (
                            <div key={rider.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition">
                                <div className="flex items-center">
                                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getRiderStatusClasses(rider.status)}`}>
                                        {rider.status}
                                    </span>
                                    <span className="text-gray-700 font-medium ml-3">{rider.name}</span>
                                </div>
                                <button 
                                    onClick={() => handleRiderStatusToggle(rider.id)}
                                    className='text-xs text-blue-600 hover:underline'
                                >
                                    {rider.status === 'Available' ? 'Set Break' : (rider.status === 'Break' ? 'Set Available' : 'On Delivery')}
                                </button>
                            </div>
                        ))}
                        {filteredRiders.length === 0 && (
                            <p className="text-center text-gray-400 p-4">No riders match your filter.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* --- Bottom Section: Active Deliveries (Dynamic) --- */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Active Deliveries ({deliveries.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {deliveries.map((delivery) => (
                        <div key={delivery.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-gray-800">{delivery.id}</h3>
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getDeliveryStatusClasses(delivery.status)}`}>
                                    {delivery.status}
                                </span>
                            </div>
                            <p className="text-gray-600 mb-4 font-medium">{delivery.customerName}</p>
                            
                            <div className="space-y-3 text-sm text-gray-700 mb-4 border-b pb-4">
                                <div className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-2 text-red-500 flex-shrink-0" />
                                    <span>Pick Up: **{delivery.pickupLocation}**</span>
                                </div>
                                <div className="flex items-center">
                                    <Truck className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
                                    <span>Delivery: **{delivery.deliveryLocation}**</span>
                                </div>
                                <div className="flex items-center">
                                    <User className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" />
                                    <span>Rider: **{delivery.riderName}**</span>
                                </div>
                            </div>

                            {/* Status Update Functionality */}
                            <div className='flex space-x-2 justify-between'>
                                <select 
                                    value={delivery.status}
                                    onChange={(e) => handleStatusChange(delivery.id, e.target.value as ActiveDelivery['status'])}
                                    className="p-2 border border-gray-300 rounded-lg text-sm w-full focus:border-blue-500"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Picked Up">Picked Up</option>
                                    <option value="On Route">On Route</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                            </div>
                        </div>
                    ))}
                    {deliveries.length === 0 && (
                        <div className="lg:col-span-3 text-center p-10 bg-white rounded-xl shadow-lg text-gray-400">
                            No active deliveries currently in the system.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LiveDeliveryTracking;