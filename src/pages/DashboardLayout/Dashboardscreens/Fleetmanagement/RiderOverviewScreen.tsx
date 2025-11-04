// src/components/RiderOverviewScreen.tsx
import React, { useState, useMemo } from 'react';
import { User, Smartphone, Mail, MapPin, Star, DollarSign, Edit, Trash2, Search, Filter, Plus } from 'lucide-react';

// --- Type Definitions ---

type RiderStatus = 'Available' | 'On Delivery' | 'Busy' | 'Offline';

interface Rider {
    id: string;
    name: string;
    contact: string;
    email: string;
    zone: string;
    status: RiderStatus;
    totalDeliveries: number;
    rating: number; // 1.0 to 5.0
    earningsToday: number;
    earningsWeek: number;
    earningsMonth: number;
}

// --- Mock Data ---

const initialRiders: Rider[] = [
    {
        id: 'R001',
        name: 'John Rider',
        contact: '+1(999)123-4567',
        email: 'john.rider@email.com',
        zone: 'Downtown',
        status: 'Available',
        totalDeliveries: 24,
        rating: 4.8,
        earningsToday: 185.90,
        earningsWeek: 650.00,
        earningsMonth: 1800.00,
    },
    {
        id: 'R002',
        name: 'Mike Delivery',
        contact: '+1(999)876-4321',
        email: 'mike.delivery@mail.com',
        zone: 'Uptown',
        status: 'On Delivery',
        totalDeliveries: 35,
        rating: 4.6,
        earningsToday: 72.25,
        earningsWeek: 820.00,
        earningsMonth: 1950.00,
    },
    {
        id: 'R003',
        name: 'Sarah Fast',
        contact: '+1(999)223-4567',
        email: 'sarah.fast@email.com',
        zone: 'Midtown',
        status: 'Available',
        totalDeliveries: 32,
        rating: 4.9,
        earningsToday: 98.30,
        earningsWeek: 780.00,
        earningsMonth: 2100.00,
    },
    // Adding an offline rider for full status representation
    {
        id: 'R004',
        name: 'Lisa Driver',
        contact: '+1(999)555-1212',
        email: 'lisa.d@email.com',
        zone: 'Suburbia',
        status: 'Offline',
        totalDeliveries: 15,
        rating: 4.5,
        earningsToday: 0.00,
        earningsWeek: 300.00,
        earningsMonth: 900.00,
    },
];

// Helper to get status colors
const getStatusClasses = (status: RiderStatus) => {
    switch (status) {
        case 'Available': return 'bg-green-100 text-green-700 border-green-400';
        case 'On Delivery': return 'bg-blue-100 text-blue-700 border-blue-400';
        case 'Busy': return 'bg-yellow-100 text-yellow-700 border-yellow-400';
        case 'Offline': return 'bg-gray-200 text-gray-700 border-gray-400';
    }
};

// --- Rider Card Component ---

interface RiderCardProps {
    rider: Rider;
    onStatusChange: (riderId: string, newStatus: RiderStatus) => void;
    onEdit: (rider: Rider) => void;
}

const RiderCard: React.FC<RiderCardProps> = ({ rider, onStatusChange, onEdit }) => {
    return (
        <div className="bg-white p-5 rounded-xl shadow-lg border-t-8 border-blue-500/20 flex flex-col hover:shadow-xl transition-shadow duration-300">
            
            {/* Header and Status Badge */}
            <div className="flex justify-between items-start mb-4 border-b pb-3">
                <div className="flex items-center">
                    <User className="w-8 h-8 p-1 mr-3 text-gray-700 bg-blue-50 rounded-full flex-shrink-0" />
                    <h3 className="text-xl font-bold text-gray-800">{rider.name}</h3>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusClasses(rider.status)}`}>
                    {rider.status}
                </span>
            </div>

            {/* Contact and Zone Details */}
            <div className="space-y-2 text-sm text-gray-700 mb-4">
                <p className="flex items-center">
                    <Smartphone className="w-4 h-4 mr-2 text-gray-400" />
                    {rider.contact}
                </p>
                <p className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    {rider.email}
                </p>
                <p className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    Zone: **{rider.zone}**
                </p>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm mb-4 border-t border-b py-3 border-gray-100">
                <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{rider.totalDeliveries}</p>
                    <p className="text-xs text-gray-500 mt-1">Total Delivers</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold flex items-center justify-center text-yellow-500">
                        <Star className="w-5 h-5 mr-1" /> {rider.rating.toFixed(1)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Rating</p>
                </div>
            </div>

            {/* Earnings Section */}
            <div className="mb-4">
                <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Earnings (USD)</h4>
                <div className="grid grid-cols-3 gap-2 text-center text-sm font-semibold">
                    <div className="p-2 bg-gray-50 rounded-lg">
                        <p className="text-base">${rider.earningsToday.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">Today</p>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-lg">
                        <p className="text-base">${rider.earningsWeek.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">Week</p>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-lg">
                        <p className="text-base">${rider.earningsMonth.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">Month</p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 mt-auto pt-3 border-t border-gray-100">
                {rider.status !== 'Offline' ? (
                    <button
                        onClick={() => onStatusChange(rider.id, 'Offline')}
                        className="flex-1 px-4 py-2 text-sm text-center text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition"
                    >
                        Set Offline
                    </button>
                ) : (
                    <button
                        onClick={() => onStatusChange(rider.id, 'Available')}
                        className="flex-1 px-4 py-2 text-sm text-center text-green-600 border border-green-300 rounded-lg hover:bg-green-50 transition"
                    >
                        Set Available
                    </button>
                )}
                <button
                    onClick={() => onEdit(rider)}
                    className="p-2 text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                    title="Edit Rider Details"
                >
                    <Edit className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

// --- Main Component ---

const RiderOverviewScreen: React.FC = () => {
    const [riders, setRiders] = useState<Rider[]>(initialRiders);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'All' | RiderStatus>('All');

    // --- Dynamic Logic ---

    const handleStatusChange = (riderId: string, newStatus: RiderStatus) => {
        setRiders(prevRiders => 
            prevRiders.map(r => 
                r.id === riderId ? { ...r, status: newStatus } : r
            )
        );
    };

    const handleEditRider = (rider: Rider) => {
        alert(`Opening edit modal for ${rider.name}. Rider ID: ${rider.id}`);
        // In a real app, this would open a modal to update rider details (zone, contact, etc.)
    };

    // --- Filtering ---

    const filteredRiders = useMemo(() => {
        return riders.filter(rider => {
            const statusMatch = filterStatus === 'All' || rider.status === filterStatus;
            const searchMatch = rider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                rider.zone.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                rider.id.toLowerCase().includes(searchTerm.toLowerCase());
            return statusMatch && searchMatch;
        });
    }, [riders, filterStatus, searchTerm]);

    const availableStatuses: Array<'All' | RiderStatus> = ['All', 'Available', 'On Delivery', 'Busy', 'Offline'];

    return (
        <div className="p-4 bg-white rounded-xl shadow-lg">
            
            {/* Header and Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Rider Fleet Overview</h2>
                {/* Track All Riders and Add Rider buttons can be added here */}
                <div className="flex space-x-3 mt-3 md:mt-0">
                     <button className="flex items-center px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md">
                        Track All Riders
                    </button>
                    <button className="flex items-center px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                        <Plus className="w-4 h-4 mr-2" /> Add New Rider
                    </button>
                </div>
            </div>
            
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search Rider Name, ID, or Zone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 pl-10 border border-gray-300 rounded-lg text-sm focus:border-blue-500"
                    />
                </div>
                
                <select 
                    value={filterStatus} 
                    onChange={(e) => setFilterStatus(e.target.value as 'All' | RiderStatus)}
                    className="p-2 border border-gray-300 rounded-lg text-sm bg-white"
                >
                    {availableStatuses.map(status => (
                        <option key={status} value={status}>
                            {status === 'All' ? 'All Statuses' : status}
                        </option>
                    ))}
                </select>
            </div>

            {/* Rider Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {filteredRiders.map(rider => (
                    <RiderCard
                        key={rider.id}
                        rider={rider}
                        onStatusChange={handleStatusChange}
                        onEdit={handleEditRider}
                    />
                ))}
                
                {filteredRiders.length === 0 && (
                    <div className="lg:col-span-4 text-center p-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-xl">
                        <User className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        No riders found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    );
};

export default RiderOverviewScreen;