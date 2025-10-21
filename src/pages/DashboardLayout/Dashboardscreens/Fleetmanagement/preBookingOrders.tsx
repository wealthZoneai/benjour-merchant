// src/components/PreBookingTable.js
import React from 'react';
import { Plus } from 'lucide-react';
import StatusBadge from './StatusBadge';

const preBookingOrders = [
    { id: 'ORD-001', customer: 'John Smith', items: 'Chicken Burger, French Fries, Coke', amount: 24.99, delivery: '12:00PM', status: 'Pending' },
    { id: 'ORD-002', customer: 'Sarah Johnson', items: 'Pizza Margherita, Garlic Bread', amount: 18.50, delivery: '12:15PM', status: 'Ready' },
    { id: 'ORD-003', customer: 'Mike Wilson', items: 'Caesar Salad, Grilled Chicken', amount: 16.75, delivery: '1:30PM', status: 'Ready' },
    { id: 'ORD-004', customer: 'Emily Davis', items: 'Pasta Carbonara, Tiramisu', amount: 22.00, delivery: '12:45PM', status: 'Pending' },
];

const PreBookingTable = () => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            {/* Table Header/Controls */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Pre-Booking Orders</h2>
                <div className="flex items-center space-x-3">
                     {/* Dropdown Mimic */}
                    <select className="px-4 py-2 text-sm border rounded-lg bg-white">
                        <option>All Orders</option>
                        <option>Next Day</option>
                        <option>Upcoming Week</option>
                    </select>
                    <button className="flex items-center px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <Plus className="w-4 h-4 mr-2" />
                        New Order
                    </button>
                </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <th className="p-4 w-10"><input type="checkbox" className="rounded text-blue-600" /></th>
                            <th className="p-4">ORDER ID</th>
                            <th className="p-4">CUSTOMER</th>
                            <th className="p-4">ITEMS</th>
                            <th className="p-4">AMOUNT</th>
                            <th className="p-4">DELIVERY</th>
                            <th className="p-4 text-center">STATUS</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {preBookingOrders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 whitespace-nowrap"><input type="checkbox" className="rounded text-blue-600" /></td>
                                <td className="p-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                                <td className="p-4 whitespace-nowrap text-sm text-gray-700">{order.customer}</td>
                                <td className="p-4 whitespace-nowrap text-sm text-gray-700">{order.items}</td>
                                <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">${order.amount.toFixed(2)}</td>
                                <td className="p-4 whitespace-nowrap text-sm text-gray-700">{order.delivery}</td>
                                <td className="p-4 whitespace-nowrap text-sm text-center">
                                    <StatusBadge status={order.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PreBookingTable;