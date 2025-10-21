import { Search, UserCircle } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex justify-between items-center shadow-md mb-1 p-6 bg-white sticky top-0 z-10">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Merchant Panel</h2>
        <p className="text-sm text-gray-500">
          Last Updated 13:09:06
        </p>
        <p className="text-gray-600 mt-1 text-sm">
          Welcome Back! Here's What's Happening at Your Restaurant Today.
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Search Orders, Menu Items..."
            className="p-2 pl-10 border rounded-lg text-sm w-64 focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>

        <div className="flex items-center space-x-2 cursor-pointer">
          <UserCircle className="w-8 h-8 text-gray-500" />
          <div className="hidden sm:block">
            <p className="text-sm font-medium">John Restaurant</p>
            <p className="text-xs text-gray-500">Owner</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;