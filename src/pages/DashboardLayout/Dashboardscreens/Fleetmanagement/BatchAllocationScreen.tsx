// src/components/BatchAllocationScreen.tsx
import React, { useState, useMemo } from 'react';
import { Plus, Truck, Package, Clock, User, CheckCircle, Search, Calendar } from 'lucide-react';

// --- Type Definitions ---

type BatchStatus = 'Draft' | 'Ready' | 'Assigned' | 'In Transit' | 'Completed';

interface Batch {
    id: string;
    creationTime: string; // e.g., '2025-11-03 11:30 AM'
    deliverySlot: string; // e.g., '1:00 PM - 2:00 PM'
    totalOrders: number;
    totalValue: number;
    assignedRiderId: string | null;
    status: BatchStatus;
}

// --- Mock Data ---

const mockRiders = [
    { id: 'R001', name: 'Alex Rodriguez', status: 'Available' },
    { id: 'R003', name: 'David Chen', status: 'Available' },
    { id: 'R005', name: 'Sam Wilson', status: 'Available' },
];

const initialBatches: Batch[] = [
    {
        id: 'B9001',
        creationTime: '11:30 AM',
        deliverySlot: '12:00 PM - 1:00 PM',
        totalOrders: 6,
        totalValue: 90.34,
        assignedRiderId: 'R001',
        status: 'Assigned',
    },
    {
        id: 'B9002',
        creationTime: '11:30 AM',
        deliverySlot: '1:00 PM - 2:00 PM',
        totalOrders: 3,
        totalValue: 56.75,
        assignedRiderId: null,
        status: 'Ready',
    },
    {
        id: 'B9003',
        creationTime: '12:00 PM',
        deliverySlot: '2:00 PM - 3:00 PM',
        totalOrders: 10,
        totalValue: 150.99,
        assignedRiderId: 'R003',
        status: 'In Transit',
    },
    {
        id: 'B9004',
        creationTime: '1:00 PM',
        deliverySlot: '3:00 PM - 4:00 PM',
        totalOrders: 4,
        totalValue: 40.00,
        assignedRiderId: null,
        status: 'Draft',
    },
    {
        id: 'B9005',
        creationTime: '9:00 AM',
        deliverySlot: '10:00 AM - 11:00 AM',
        totalOrders: 8,
        totalValue: 120.50,
        assignedRiderId: 'R005',
        status: 'Completed',
    },
];

// Helper to get status colors
const getStatusClasses = (status: BatchStatus) => {
    switch (status) {
        case 'Draft': return 'bg-gray-200 text-gray-700 border-gray-400';
        case 'Ready': return 'bg-green-100 text-green-700 border-green-400';
        case 'Assigned': return 'bg-blue-100 text-blue-700 border-blue-400';
        case 'In Transit': return 'bg-purple-100 text-purple-700 border-purple-400';
        case 'Completed': return 'bg-teal-100 text-teal-700 border-teal-400';
    }
};

// --- Batch Card Component ---

interface BatchCardProps {
    batch: Batch;
    riders: typeof mockRiders;
    onAssignRider: (batchId: string, riderId: string) => void;
    onViewDetails: (batch: Batch) => void;
    onMarkReady: (batchId: string) => void;
}

const BatchCard: React.FC<BatchCardProps> = ({ batch, riders, onAssignRider, onViewDetails, onMarkReady }) => {
    const assignedRider = batch.assignedRiderId 
        ? mockRiders.find(r => r.id === batch.assignedRiderId)?.name 
        : null;

    const availableRiders = riders.filter(r => r.status === 'Available' || r.id === batch.assignedRiderId);

    return (
        <div className="bg-white p-5 rounded-xl shadow-lg border-t-4 border-b-4 border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col">
            
            {/* Header and Status */}
            <div className="flex justify-between items-start mb-4 border-b pb-3">
                <h3 className="text-xl font-bold text-gray-800 flex items-center">
                    <Package className="w-5 h-5 mr-2 text-blue-600" /> Batch **{batch.id}**
                </h3>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusClasses(batch.status)}`}>
                    {batch.status}
                </span>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm text-gray-600 mb-4 flex-grow">
                <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                    Slot: **{batch.deliverySlot}**
                </div>
                <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    Created: {batch.creationTime}
                </div>
                <div className="flex items-center">
                    <Truck className="w-4 h-4 mr-2 text-gray-400" />
                    Orders: **{batch.totalOrders}**
                </div>
                <div className="flex items-center">
                    <Package className="w-4 h-4 mr-2 text-gray-400" />
                    Value: **${batch.totalValue.toFixed(2)}**
                </div>
            </div>
            
            {/* Rider Assignment and Actions */}
            <div className="mt-auto pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium flex items-center">
                        <User className="w-4 h-4 mr-2 text-gray-500" /> 
                        Rider: **{assignedRider || 'Unassigned'}**
                    </span>
                    
                    {/* Conditional Assignment Logic */}
                    {(batch.status === 'Ready' || batch.status === 'Assigned') && (
                        <select
                            value={batch.assignedRiderId || ''}
                            onChange={(e) => onAssignRider(batch.id, e.target.value)}
                            className="p-1 border border-gray-300 rounded-lg text-xs focus:border-blue-500"
                            // disabled={batch.status === 'In Transit' || batch.status === 'Completed'}
                        >
                            <option value="">{assignedRider ? 'Change Rider' : 'Assign Rider'}</option>
                            {availableRiders.map(rider => (
                                <option key={rider.id} value={rider.id}>
                                    {rider.name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                {/* Bottom Action Buttons */}
                <div className="flex space-x-2 mt-3">
                    <button
                        onClick={() => onViewDetails(batch)}
                        className="flex-1 px-3 py-2 text-sm text-center text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition"
                    >
                        View Orders ({batch.totalOrders})
                    </button>
                    
                    {batch.status === 'Draft' && (
                        <button
                            onClick={() => onMarkReady(batch.id)}
                            className="px-3 py-2 text-sm text-white bg-green-500 rounded-lg hover:bg-green-600 transition"
                        >
                            <CheckCircle className="w-4 h-4 inline mr-1" /> Mark Ready
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Main Component ---

const BatchAllocationScreen: React.FC = () => {
    const [batches, setBatches] = useState<Batch[]>(initialBatches);
    const [filterStatus, setFilterStatus] = useState<BatchStatus | 'All'>('All');
    const [searchTerm, setSearchTerm] = useState('');

    // --- Dynamic Logic ---

    const handleAssignRider = (batchId: string, riderId: string) => {
        setBatches(prevBatches => 
            prevBatches.map(b => 
                b.id === batchId 
                ? { 
                    ...b, 
                    assignedRiderId: riderId, 
                    status: (riderId && b.status !== 'In Transit' && b.status !== 'Completed') ? 'Assigned' : b.status 
                } 
                : b
            )
        );
    };

    const handleMarkReady = (batchId: string) => {
        setBatches(prevBatches => 
            prevBatches.map(b => 
                b.id === batchId && b.status === 'Draft'
                ? { ...b, status: 'Ready' }
                : b
            )
        );
    };

    const handleViewDetails = (batch: Batch) => {
        alert(`Viewing detailed orders for Batch ${batch.id} (${batch.totalOrders} orders)`);
        // In a real app, this would open a modal or navigate to a detail page.
    };

    const handleCreateNewBatch = () => {
        alert("Creating a new batch... (A creation modal would open here)");
    };

    // --- Filtering ---

    const filteredBatches = useMemo(() => {
        return batches.filter(batch => {
            const statusMatch = filterStatus === 'All' || batch.status === filterStatus;
            const searchMatch = batch.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                batch.deliverySlot.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                (batch.assignedRiderId && mockRiders.find(r => r.id === batch.assignedRiderId)?.name.toLowerCase().includes(searchTerm.toLowerCase()));
            return statusMatch && searchMatch;
        });
    }, [batches, filterStatus, searchTerm]);

    const availableStatuses: Array<BatchStatus | 'All'> = ['All', 'Draft', 'Ready', 'Assigned', 'In Transit', 'Completed'];

    return (
        <div className="p-4 bg-white rounded-xl shadow-lg">
            
            {/* Header and Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-3 md:mb-0">Delivery Batch Management</h2>
                <div className="flex space-x-3">
                    <button
                        onClick={handleCreateNewBatch}
                        className="flex items-center px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                    >
                        <Plus className="w-4 h-4 mr-2" /> Create New Batch
                    </button>
                </div>
            </div>
            
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search Batch ID, Rider, or Slot..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 pl-10 border border-gray-300 rounded-lg text-sm focus:border-blue-500"
                    />
                </div>
                
                <select 
                    value={filterStatus} 
                    onChange={(e) => setFilterStatus(e.target.value as BatchStatus | 'All')}
                    className="p-2 border border-gray-300 rounded-lg text-sm bg-white"
                >
                    {availableStatuses.map(status => (
                        <option key={status} value={status}>
                            {status === 'All' ? 'All Batches' : status}
                        </option>
                    ))}
                </select>
            </div>

            {/* Batch Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {filteredBatches.map(batch => (
                    <BatchCard
                        key={batch.id}
                        batch={batch}
                        riders={mockRiders}
                        onAssignRider={handleAssignRider}
                        onViewDetails={handleViewDetails}
                        onMarkReady={handleMarkReady}
                    />
                ))}
                
                {filteredBatches.length === 0 && (
                    <div className="lg:col-span-4 text-center p-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-xl">
                        <Truck className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        No batches found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    );
};

export default BatchAllocationScreen;