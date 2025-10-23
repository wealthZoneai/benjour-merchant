import React, { useRef, useState, useEffect } from 'react';
import { User, Phone, MapPin, ChevronDown } from 'lucide-react';

const OrderCard = ({ order }) => {
    const listRef = useRef<HTMLDivElement | null>(null);
    const [isScrollable, setIsScrollable] = useState(false);
    const [isAtBottom, setIsAtBottom] = useState(false);

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

    // ===== Status Badge =====
    const getStatusBadge = (status) => {
        let bgColor, textColor, badgeText;
        switch (status) {
            case 'New':
                bgColor = 'bg-red-500';
                textColor = 'text-white';
                badgeText = 'New Order';
                break;
            case 'Preparing':
                bgColor = 'bg-yellow-400';
                textColor = 'text-gray-800';
                badgeText = 'Preparing';
                break;
            case 'Ready':
                bgColor = 'bg-blue-500';
                textColor = 'text-white';
                badgeText = 'Ready';
                break;
            case 'Assigned':
                bgColor = 'bg-blue-500';
                textColor = 'text-white';
                badgeText = 'Assign Order';
                break;
            case 'Out Of Delivery':
                return null;
            default:
                bgColor = 'bg-gray-200';
                textColor = 'text-gray-800';
                badgeText = status;
        }
        return (
            <span className={`px-3 py-1 text-xs font-semibold rounded ${bgColor} ${textColor}`}>
                {badgeText}
            </span>
        );
    };

    // ===== Button Logic =====
    const getActionButtonDetails = (status) => {
        let primaryButtonText, primaryButtonClasses, secondaryButtonText, secondaryButtonClasses;
        secondaryButtonText = 'View Details';
        secondaryButtonClasses = 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200';

        switch (status) {
            case 'New':
                primaryButtonText = 'Start Preparing';
                primaryButtonClasses = 'bg-blue-600 text-white hover:bg-blue-700';
                break;
            case 'Preparing':
                primaryButtonText = 'Start Preparing';
                primaryButtonClasses = 'bg-purple-600 text-white hover:bg-purple-700';
                break;
            case 'Ready':
                primaryButtonText = 'Assign Order';
                primaryButtonClasses = 'bg-blue-600 text-white hover:bg-blue-700';
                break;
            case 'Assigned':
                primaryButtonText = 'Delivery';
                primaryButtonClasses = 'bg-blue-600 text-white hover:bg-blue-700';
                break;
            case 'Out Of Delivery':
                primaryButtonText = 'Out Of Delivery';
                primaryButtonClasses = 'bg-red-600 text-white hover:bg-red-700';
                break;
            default:
                primaryButtonText = 'Action';
                primaryButtonClasses = 'bg-gray-500 text-white hover:bg-gray-600';
        }
        return { primaryButtonText, primaryButtonClasses, secondaryButtonText, secondaryButtonClasses };
    };

    const { primaryButtonText, primaryButtonClasses, secondaryButtonText, secondaryButtonClasses } =
        getActionButtonDetails(order.status);

    return (
        <div className="bg-[#F1F1F4] p-4  rounded-xl shadow-lg border relative flex flex-col">
            <div className="absolute top-4 right-4 z-10">{getStatusBadge(order.status)}</div>

            {/* Order Header */}
            <div className="mb-4 pt-2">
                <h3 className="text-xl font-bold text-gray-800">#{order.id}</h3>
                <p className="text-lg text-gray-600">{order.time}</p>
            </div>

            {/* Customer Info */}
            <div className="space-y-2 text-gray-700 mb-4">
                <div className="flex items-center text-sm">
                    <User className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{order.customer}</span>
                </div>
                <div className="flex items-center text-sm">
                    <Phone className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{order.phone}</span>
                </div>
                <div className="flex items-start text-sm">
                    <MapPin className="w-4 h-4 mr-2 mt-0.5 text-gray-500" />
                    <span>{order.address}</span>
                </div>
            </div>

            {/* Items Ordered - Scrollable with Arrow */}
            <div className="relative mb-4">
                <div
                    ref={listRef}
                    className="flex-1 overflow-y-auto no-scrollbar p-3"
                    style={{ maxHeight: '120px' }}
                >
                    <p className="font-medium text-gray-800 mb-2">Items:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                        {order.items.map((item, index) => (
                            <li key={index} className="flex justify-between">
                                <span>
                                    {item.quantity}x {item.name}
                                </span>
                                <span>₹{item.price.toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {isScrollable && !isAtBottom && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-gray-400 animate-bounce">
                        <ChevronDown className="w-5 h-5" />
                    </div>
                )}
            </div>

            <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-auto">
                <p className="text-base font-semibold text-gray-800">Total:</p>
                <p className="text-lg font-bold text-gray-900">₹{order.total.toFixed(2)}</p>
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center mt-6 space-x-3">
                <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${secondaryButtonClasses}`}
                >
                    {secondaryButtonText}
                </button>
                <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${primaryButtonClasses}`}
                >
                    {primaryButtonText}
                </button>
            </div>
        </div>
    );
};

export default OrderCard;