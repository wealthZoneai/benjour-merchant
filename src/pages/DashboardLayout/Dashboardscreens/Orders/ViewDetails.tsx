import React, { useEffect, useRef, useState } from "react";
import { User, Phone, MapPin, X } from "lucide-react";

interface ViewDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    initialData: any;
}

   const getStatusBadge = (status: string) => {
        const badgeMap: Record<string, { bg: string; text: string }> = {
            PLACED: { bg: "bg-green-500", text: "Placed" },
            ACCEPTED: { bg: "bg-emerald-500", text: "Accepted" },
            PREPARING: { bg: "bg-yellow-400", text: "Preparing" },
            READY: { bg: "bg-blue-500", text: "Ready" },
            ASSIGNED: { bg: "bg-purple-500", text: "Assigned" },
            PICKED_UP: { bg: "bg-indigo-500", text: "Picked Up" },
            IN_TRANSIT: { bg: "bg-orange-500", text: "In Transit" },
            DELIVERED: { bg: "bg-cyan-500", text: "Delivered" },
            REJECTED: { bg: "bg-gray-500", text: "Rejected" },
            CANCELLED: { bg: "bg-red-600", text: "Cancelled" },
        };

        const badge = badgeMap[status] || { bg: "bg-gray-300", text: status };

        return (
            <span
                className={`px-3 py-1 rounded-full text-xs font-semibold shadow-md ${badge.bg} text-white animate-pulse`}
            >
                {badge.text}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="relative w-full max-w-md p-6 rounded-3xl bg-white shadow-2xl flex flex-col gap-5">
                
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Status Badge */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2">
                    {getStatusBadge(initialData?.status)}
                </div>

                {/* Header */}
                <div className="text-center mt-6">
                    <h2 className="text-2xl font-bold text-gray-800">Order #{initialData?.orderNumber}</h2>
                    <p className="text-sm text-gray-500">{initialData?.orderDate}</p>
                </div>

                {/* Customer Info */}
                <div className="grid grid-cols-1 gap-2 md:grid-cols-3 text-gray-700 text-sm">
                    {[
                        { icon: User, label: initialData?.customerName },
                        { icon: Phone, label: initialData?.customerNumber },
                        { icon: MapPin, label: initialData?.deliveryAddress },
                    ].map((info, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 shadow-inner hover:shadow-lg transition-shadow"
                        >
                            <info.icon className="w-4 h-4 text-gray-600" />
                             <span className="text-gray-900 font-medium line-clamp-4">{info.label}</span>
                        </div>
                    ))}
                </div>

                {/* Items List */}
                <div className="relative flex-1">
                    <div
                        ref={listRef}
                        className=" no-scrollbar overflow-y-auto max-h-48 p-4 rounded-2xl bg-gray-50 border border-gray-200 shadow-inner"
                    >
                        <p className="text-gray-800 font-semibold mb-2">Items Ordered</p>
                        <ul className="space-y-2">
                            {initialData?.items?.map((item: any, idx: number) => (
                                <li
                                    key={idx}
                                    className="flex justify-between px-3 py-2 rounded-lg bg-white shadow hover:shadow-md transition-shadow"
                                >
                                    <span>{item?.quantity}x {item?.productName}</span>
                                    <span>₹{item?.totalPrice.toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {isScrollable && !isAtBottom && (
                        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent pointer-events-none rounded-b-2xl"></div>
                    )}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mt-2 p-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-lg shadow-md">
                    <span>Total</span>
                    <span>₹{initialData?.totalAmount?.toFixed(2)}</span>
                </div>

            </div>
        </div>
    );
};

export default ViewDetails;
