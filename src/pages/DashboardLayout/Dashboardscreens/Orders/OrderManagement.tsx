import React, { useState } from 'react';
import Header from './Header';
import OrderFilterTabs from './OrderFilterTabs';
import OrderCard from './OrderCard';
import DateRangePicker from '../../../../components/CustomCalendar/DateRangePicker';

const allOrders = [
    {
        id: '1234', time: '12-02-2025 - 2:45', customer: 'Sarah Johnson', phone: '+1(555)123-456',
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
            { name: '2x Chicken Burger(No Onions)', price: 25.98 },
            { name: '1x French Fries', price: 4.99 },
            { name: '2x Coca Cola', price: 5.00 },
           
        ],
        total: 35.97,
        actions: ['View Details', 'Start Preparing']
    },
    {
        id: '1235', time: '12-02-2025 - 2:30', customer: 'Mike Chen', phone: '+1(555)123-456',
        address: '123 Oak Ave,Uptown 12345', status: 'Preparing',
        items: [
            { name: '2x Pizza Margherita', price: 15.98 },
            { name: '1x Garlic Bread', price: 5.99 },
        ],
        total: 21.97,
        actions: ['View Details', 'Start Preparing']
    },
    {
        id: '1236', time: '12-02-2025 - 2:45', customer: 'Sarah Johnson', phone: '+1(555)123-456',
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
        id: '1237', time: '12-02-2025 - 2:45', customer: 'Sarah Johnson', phone: '+1(555)123-456',
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
        id: '1238', time: '12-02-2025 - 2:30', customer: 'Mike Chen', phone: '+1(555)123-456',
        address: '123 Oak Ave,Uptown 12345', status: 'Out Of Delivery',
        items: [
            { name: '2x Pizza Margherita', price: 15.98 },
            { name: '1x Garlic Bread', price: 5.99 },
        ],
        total: 21.97,
        actions: ['View Details', 'Out Of Delivery']
    },
    {
        id: '1239', time: '12-02-2025 - 2:45', customer: 'Sarah Johnson', phone: '+1(555)123-456',
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

    const filteredOrders =
        activeTab === 'All Orders'
            ? allOrders
            : allOrders.filter(
                  (order) =>
                      order.status.toLowerCase() ===
                      activeTab.replace(/[^a-zA-Z]/g, '').toLowerCase()
              );

    return (
        <div className="h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <Header orders={allOrders} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col p-3 overflow-hidden">
                {/* Tabs + Date Picker */}
                <div className="bg-white rounded-lg shadow-md border-b border-gray-200 p-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                    {/* Tabs */}
                    <div className="flex-1 w-full">
                        <OrderFilterTabs
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            allOrdersCount={allOrders.length}
                            newOrdersCount={allOrders.filter((o) => o.status === 'New').length}
                            preparingOrdersCount={allOrders.filter((o) => o.status === 'Preparing').length}
                            readyOrdersCount={allOrders.filter((o) => o.status === 'Ready').length}
                            assignedOrdersCount={allOrders.filter((o) => o.status === 'Assigned').length}
                            outOfDeliveryOrdersCount={allOrders.filter((o) => o.status === 'Out Of Delivery').length}
                            Refund={allOrders.filter((o) => o.status === 'Refund').length}
                        />
                    </div>

                    {/* Date Picker */}
                    <div className="w-full md:w-auto self-start md:self-auto">
                        <DateRangePicker />
                    </div>
                </div>

                {/* Orders Grid */}
                <div className="flex-1 overflow-y-auto mt-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredOrders.map((order) => (
                            <OrderCard key={order.id} order={order} />
                        ))}

                        {filteredOrders.length === 0 && (
                            <p className="text-gray-500 col-span-full text-center py-10">
                                No orders found for <strong>{activeTab}</strong>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderManagement;
