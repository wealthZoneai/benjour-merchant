// src/pages/OrderManagement.js
import React, { useState } from 'react';

import Header from './Header';
import OrderFilterTabs from './OrderFilterTabs';
import OrderCard from './OrderCard';

const allOrders = [
    {
        id: '1234', time: '2:45', customer: 'Sarah Johnson', phone: '+1(555)123-456',
        address: '123 Main St,Downtown, City 12345', status: 'New',
        items: [
            { name: '2x Chicken Burger(No Onions)', price: 25.98 },
            { name: '1x French Fries', price: 4.99 },
            { name: '2x Coca Cola', price: 5.00 },
            { name: '2x Chicken Burger(No Onions)', price: 25.98 },
            { name: '1x French Fries', price: 4.99 },
            { name: '2x Coca Cola', price: 5.00 },
            { name: '2x Chicken Burger(No Onions)', price: 25.98 },
            { name: '1x French Fries', price: 4.99 },
            { name: '2x Coca Cola', price: 5.00 },
        ],
        total: 35.97, // Corrected total based on items
        actions: ['View Details', 'Start Preparing']
    },
    {
        id: '1235', time: '2:30', customer: 'Mike Chen', phone: '+1(555)123-456',
        address: '123 Oak Ave,Uptown 12345', status: 'Preparing',
        items: [
            { name: '2x Pizza Margherita', price: 15.98 },
            { name: '1x Garlic Bread', price: 5.99 },
        ],
        total: 21.97,
        actions: ['View Details', 'Start Preparing']
    },
    {
        id: '1236', time: '2:45', customer: 'Sarah Johnson', phone: '+1(555)123-456',
        address: '123 Main St,Downtown, City 12345', status: 'Ready',
        items: [
            { name: '2x Chicken Burger(No Onions)', price: 25.98 },
            { name: '1x French Fries', price: 4.99 },
            { name: '2x Coca Cola', price: 5.00 },
        ],
        total: 35.97,
        actions: ['View Details', 'Assign Order']
    },
    {
        id: '1237', time: '2:45', customer: 'Sarah Johnson', phone: '+1(555)123-456',
        address: '123 Main St,Downtown, City 12345', status: 'New',
        items: [
            { name: '2x Chicken Burger(No Onions)', price: 25.98 },
            { name: '1x French Fries', price: 4.99 },
            { name: '2x Coca Cola', price: 5.00 },
        ],
        total: 35.97,
        actions: ['View Details', 'Start Preparing']
    },
    {
        id: '1238', time: '2:30', customer: 'Mike Chen', phone: '+1(555)123-456',
        address: '123 Oak Ave,Uptown 12345', status: 'Out Of Delivery',
        items: [
            { name: '2x Pizza Margherita', price: 15.98 },
            { name: '1x Garlic Bread', price: 5.99 },
        ],
        total: 21.97,
        actions: ['View Details', 'Out Of Delivery']
    },
    {
        id: '1239', time: '2:45', customer: 'Sarah Johnson', phone: '+1(555)123-456',
        address: '123 Main St,Downtown, City 12345', status: 'Assigned',
        items: [
            { name: '2x Chicken Burger(No Onions)', price: 25.98 },
            { name: '1x French Fries', price: 4.99 },
            { name: '2x Coca Cola', price: 5.00 },
        ],
        total: 35.97,
        actions: ['View Details', 'Delivery']
    },
];

const OrderManagement = () => {
    const [activeTab, setActiveTab] = useState('All Orders');

    const filteredOrders = activeTab === 'All Orders'
        ? allOrders
        : allOrders.filter(order => order.status === activeTab.replace(/[^a-zA-Z]/g, ''));
    return (
        <div className="h-screen bg-gray-50 overflow-hidden">
            <Header />
            <div className="flex flex-col p-3  rounded-lg shadow-md bg-gray-50 h-[calc(100vh-100px)]">
                <div className="bg-white rounded-lg shadow-md mb-2 border-b border-gray-200 p-4 flex-shrink-0 shadow-sm">
                    <OrderFilterTabs
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        allOrdersCount={allOrders.length}
                        newOrdersCount={allOrders.filter(o => o.status === 'New').length}
                        preparingOrdersCount={allOrders.filter(o => o.status === 'Preparing').length}
                        readyOrdersCount={allOrders.filter(o => o.status === 'Ready').length}
                        assignedOrdersCount={allOrders.filter(o => o.status === 'Assigned').length}
                        outOfDeliveryOrdersCount={allOrders.filter(o => o.status === 'Out Of Delivery').length}
                    />
                </div>

                <div className="bg-white flex-1 overflow-y-auto p-3 mb-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 no-scrollbar">
                    {filteredOrders.map((order, index) => (
                        <OrderCard key={index} order={order} />
                    ))}
                </div>
            </div>
        </div>
    );

};

export default OrderManagement;