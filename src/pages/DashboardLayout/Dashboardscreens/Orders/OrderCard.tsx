import React, { useRef, useState, useEffect } from 'react';
import { User, Phone, MapPin } from 'lucide-react';
import ViewDetails from './ViewDetails';

interface OrderCardProps {
    order: any;
}

const OrderCard = ({ order }: OrderCardProps) => {
    const listRef = useRef<HTMLDivElement | null>(null);
    const [isScrollable, setIsScrollable] = useState(false);
    const [isAtBottom, setIsAtBottom] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const listEl = listRef.current;
        if (listEl) {
            const checkScroll = () => {
                setIsScrollable(listEl.scrollHeight > listEl.clientHeight);
                setIsAtBottom(listEl.scrollTop + listEl.clientHeight >= listEl.scrollHeight - 5);
            };
            checkScroll();
            listEl.addEventListener("scroll", checkScroll);
            return () => listEl.removeEventListener("scroll", checkScroll);
        }
    }, []);

    const getStatusBadge = (status: string) => {
        const badgeMap: Record<string, { bg: string; text: string }> = {
            'New': { bg: 'bg-green-500', text: 'New Order' },
            'Preparing': { bg: 'bg-yellow-400', text: 'Preparing' },
            'Ready': { bg: 'bg-blue-500', text: 'Ready' },
            'Assigned': { bg: 'bg-purple-500', text: 'Assigned' },
            'Out Of Delivery': { bg: 'bg-red-600', text: 'Out Of Delivery' },
        };
        const badge = badgeMap[status] || { bg: 'bg-gray-300', text: status };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-md ${badge.bg} text-white animate-pulse`}>
                {badge.text}
            </span>
        );
    };

    return (
        <>
            <div className="relative bg-gradient-to-tr  to-blue-50 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 p-6 flex flex-col justify-between h-full transition-transform hover:scale-[1.03] hover:shadow-3xl">
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4 z-10">{getStatusBadge(order.status)}</div>

                {/* Header */}
                <div className="mb-5">
                    <h3 className="text-2xl font-bold text-gray-900">#{order.id}</h3>
                    <p className="text-gray-500">{order.time}</p>
                </div>

                {/* Customer Info */}
                <div className="flex flex-col space-y-3 mb-5">
                    {[
                        { icon: User, value: order.customer },
                        { icon: Phone, value: order.phone },
                        { icon: MapPin, value: order.address },
                    ].map((info, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-white/60 backdrop-blur-xl p-3 rounded-xl shadow-md hover:shadow-lg transition-all">
                            <info.icon className="w-5 h-5 text-purple-500" />
                            <span className="text-gray-900 font-medium">{info.value}</span>
                        </div>
                    ))}
                </div>

                {/* Items List */}
                <div className="relative mb-5 flex-1">
                    <div
                        ref={listRef}
                        className="no-scrollbar overflow-y-auto max-h-36 p-4 rounded-2xl bg-white/50 backdrop-blur-xl shadow-inner"
                    >
                        <p className="font-semibold text-gray-900 mb-3 text-lg">Items:</p>
                        <ul className="space-y-2 text-gray-800 text-sm">
                            {order.items.map((item: any, idx: number) => (
                                <li key={idx} className="flex justify-between px-2 py-1 rounded-xl hover:bg-purple-50/50 transition">
                                    <span>{item.quantity}x {item.name}</span>
                                    <span className="font-medium">₹{item.price.toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {isScrollable && !isAtBottom && (
                        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white/70 to-transparent pointer-events-none rounded-b-xl"></div>
                    )}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center font-bold text-gray-900 mb-5 text-lg">
                    <span>Total:</span>
                    <span className="text-xl">₹{order.total.toFixed(2)}</span>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-auto">
                    <button
                        className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 text-white font-semibold hover:scale-105 hover:shadow-xl transition-transform shadow-md"
                        onClick={() => setIsModalOpen(true)}
                    >
                        View Details
                    </button>
                    <button
                        className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold hover:scale-105 hover:shadow-xl transition-transform shadow-md"
                    >
                        {order.status === 'New' ? 'Start Preparing' : 'Action'}
                    </button>
                </div>
            </div>

            <ViewDetails
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialData={order}
            />
        </>
    );
};

export default OrderCard;
