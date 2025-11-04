import React, { useState } from "react";
import { X, CheckCircle2 } from "lucide-react";

interface OrderActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStatus: string;
  onStatusChange: (newStatus: string) => void;
}

const STATUS_FLOW = [
  "New",
  "Preparing",
  "Ready",
  "Assigned",
  "Out Of Delivery",
  "Delivered",
];

const statusColors: Record<string, string> = {
  "New": "from-red-500 to-red-600",
  "Preparing": "from-yellow-400 to-yellow-500",
  "Ready": "from-blue-500 to-blue-600",
  "Assigned": "from-purple-500 to-purple-600",
  "Out Of Delivery": "from-orange-500 to-orange-600",
  "Delivered": "from-green-600 to-green-700",
};

const OrderActionModal: React.FC<OrderActionModalProps> = ({
  isOpen,
  onClose,
  currentStatus,
  onStatusChange,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentIndex = STATUS_FLOW.indexOf(currentStatus);
  const availableStatuses = STATUS_FLOW.slice(currentIndex + 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-md p-6 rounded-3xl bg-white shadow-2xl flex flex-col gap-5 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="text-center mt-2">
          <h2 className="text-2xl font-bold text-gray-800">Update Order Status</h2>
          <p className="text-sm text-gray-500 mt-1">Current: {currentStatus}</p>
        </div>

        {/* Status Steps */}
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {availableStatuses.length > 0 ? (
            availableStatuses.map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-xl font-semibold text-sm shadow-md transition-all duration-200
                  ${
                    selectedStatus === status
                      ? `bg-gradient-to-r ${statusColors[status]} text-white scale-105`
                      : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                  }`}
              >
                {status}
              </button>
            ))
          ) : (
            <p className="text-gray-500 text-sm">Order already delivered 🎉</p>
          )}
        </div>

        {/* Status Preview */}
        {selectedStatus && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <CheckCircle2 className="text-green-500 w-5 h-5 animate-bounce" />
            <p className="text-gray-700 font-medium">
              Selected: <span className="font-bold">{selectedStatus}</span>
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="flex-1 mr-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-xl transition"
          >
            Cancel
          </button>
          <button
            disabled={!selectedStatus}
            onClick={() => onStatusChange(selectedStatus!)}
            className={`flex-1 ml-2 py-2 rounded-xl font-semibold transition-all duration-200 
              ${
                selectedStatus
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            {selectedStatus ? "Update Status" : "Select Status"}
          </button>
        </div>

        {/* Gradient Bar Bottom */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      </div>
    </div>
  );
};

export default OrderActionModal;
