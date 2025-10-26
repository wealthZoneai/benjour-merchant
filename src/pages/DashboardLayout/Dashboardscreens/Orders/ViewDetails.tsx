import React, { useEffect, useRef, useState } from "react";
import { User, Phone, MapPin, ChevronDown, X } from "lucide-react";

interface ViewDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    initialData: any;
}

const getStatusBadge = (status: string) => {
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

const ViewDetails: React.FC<ViewDetailsProps> = ({ isOpen, onClose, initialData }) => {
    const listRef = useRef<HTMLDivElement>(null);
    const [isScrollable, setIsScrollable] = useState(false);
    const [isAtBottom, setIsAtBottom] = useState(false);

    useEffect(() => {
        if (listRef.current) {
            const el = listRef.current;
            setIsScrollable(el.scrollHeight > el.clientHeight);

            const handleScroll = () => {
                setIsAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 5);
            };

            el.addEventListener("scroll", handleScroll);
            return () => el.removeEventListener("scroll", handleScroll);
        }
    }, [initialData]);

    if (!isOpen || !initialData) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    <X size={20} />
                </button>
                <div className="absolute top-3 right-11">
                    {getStatusBadge(initialData.status)}
                </div>
                <div className="mb-4 mt-2">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        #{initialData.id}
                    </h2>
                    <p className="text-sm text-gray-500">{initialData.time}</p>
                </div>

                <div className="space-y-2 text-gray-700 mb-4">
                    <div className="flex items-center text-sm">
                        <User className="w-4 h-4 mr-2 text-gray-500" />
                        <span>{initialData.customer}</span>
                    </div>
                    <div className="flex items-center text-sm">
                        <Phone className="w-4 h-4 mr-2 text-gray-500" />
                        <span>{initialData.phone}</span>
                    </div>
                    <div className="flex items-start text-sm">
                        <MapPin className="w-4 h-4 mr-2 mt-0.5 text-gray-500" />
                        <span>{initialData.address}</span>
                    </div>
                </div>

                <div className="relative mb-4">
                    <div
                        ref={listRef}
                        className="overflow-y-auto no-scrollbar border rounded-lg p-3 bg-gray-50"
                        style={{ maxHeight: "230px" }}
                    >
                        <p className="font-medium text-gray-800 mb-2">Items:</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                            {initialData.items?.map((item: any, index: number) => (
                                <li key={index} className="flex justify-between">
                                    <span>{item.name}</span>
                                    <span>₹{item.price.toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                <div className="flex justify-between items-center border-t border-gray-200 pt-3">
                    <p className="text-base font-semibold text-gray-800">Total:</p>
                    <p className="text-lg font-bold text-gray-900">
                        ₹{initialData.total?.toFixed(2)}
                    </p>
                </div>

            </div>
        </div>
    );
};

export default ViewDetails;
