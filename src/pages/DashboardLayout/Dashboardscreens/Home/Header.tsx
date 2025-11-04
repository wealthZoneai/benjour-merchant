import { Search, UserCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

const Header = () => {
  const userName = useSelector((state: RootState) => state.user.userName);

  return (
    <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center shadow-md mb-1 p-4 sm:p-6 bg-white sticky top-0 z-10 gap-3">
      {/* 🔹 Left Section */}
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          Merchant Panel
        </h2>
        <p className="text-xs sm:text-sm text-gray-500">
          Last Updated 13:09:06
        </p>
        <p className="text-gray-600 mt-1 text-xs sm:text-sm">
          Welcome Back! Here's What's Happening at Your Restaurant Today.
        </p>
      </div>

      {/* 🔹 Right Section */}
      <div className="flex justify-center sm:justify-end items-center space-x-3 sm:space-x-4">
        {/* Optional search bar for larger screens */}
        {/* 
        <div className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Search Orders, Menu Items..."
            className="p-2 pl-10 border rounded-lg text-sm w-56 sm:w-64 focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
        */}

        <div className="flex items-center space-x-2 cursor-pointer">
          <UserCircle className="w-7 h-7 sm:w-8 sm:h-8 text-gray-500" />
          <div className="hidden sm:block">
            <p className="text-sm font-medium">{userName}</p>
            <p className="text-xs text-gray-500">Owner</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
