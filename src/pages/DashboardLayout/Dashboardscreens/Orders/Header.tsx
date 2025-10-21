import React from 'react';
import { RefreshCcw, Download } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="bg-white p-6 shadow-md  flex flex-col md:flex-row md:justify-between md:items-center sticky top-0 z-20">
      <div className="mb-4 md:mb-0">
        <h1 className="text-3xl font-bold text-gray-800">Order Management</h1>
        <p className="text-gray-600 mt-1">Manage Incoming Orders And Track Their Progress</p>
      </div>

      <div className="flex space-x-2">
        <button className="flex items-center px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
          <RefreshCcw className="w-4 h-4 mr-2" />
          Refresh
        </button>
        <button className="flex items-center px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="w-4 h-4 mr-2" />
          Export Orders
        </button>
      </div>
    </div>
  );
};

export default Header;
