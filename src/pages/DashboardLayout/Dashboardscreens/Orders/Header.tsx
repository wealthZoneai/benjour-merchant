import React, { useState } from "react";
import { RefreshCcw, Download, Search } from "lucide-react";

interface HeaderProps {
  orders: any[];
  onRefresh?: () => void;
}

const Header: React.FC<HeaderProps> = ({ orders, onRefresh }) => {
  const [isRotating, setIsRotating] = useState(false);

  const handleRefreshClick = () => {
    setIsRotating(true);
    if (onRefresh) onRefresh();

    setTimeout(() => setIsRotating(false), 1000);
  };

  const handleExportClick = () => {
    if (!orders || orders.length === 0) return alert("No orders to export!");

    const header = ["Order ID", "Customer", "Phone", "Address", "Status", "Total"];
    const rows = orders.map((order) => [
      order.id,
      order.customer,
      order.phone,
      order.address,
      order.status,
      order.total,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [header, ...rows].map((row) => row.join(",")).join("\n");

    // Create downloadable link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = "orders.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white p-6 shadow-md flex flex-col md:flex-row md:justify-between md:items-center sticky top-0 z-20">
      {/* Title */}
      <div className="mb-4 md:mb-0">
        <h1 className="text-3xl font-bold text-gray-800">Order Management</h1>
        <p className="text-gray-600 mt-1">
          Manage Incoming Orders And Track Their Progress
        </p>
      </div>

      {/* Right actions */}
      <div className="flex space-x-2 items-center">
        {/* Search input */}
        <div className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Search By Order ID, Customer Name..."
            className="p-2 pl-10 border rounded-lg text-sm w-64 focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-500"

          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>

        {/* Refresh */}
        <button
          onClick={handleRefreshClick}
          className="flex items-center px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
        >
          <RefreshCcw
            className={`w-4 h-4 mr-2 transition-transform duration-500 ${
              isRotating ? "animate-spin" : ""
            }`}
          />
          Refresh
        </button>

        {/* Export */}
        <button
          onClick={handleExportClick}
          className="flex items-center px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Orders
        </button>
      </div>
    </div>
  );
};

export default Header;