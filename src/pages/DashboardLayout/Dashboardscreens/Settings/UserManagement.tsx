import React, { useState, useMemo } from 'react';
import { Users, Edit, Trash2, Search, Plus } from 'lucide-react';

// --- 1. Type Definitions ---

// Define possible user roles
type UserRole = 'manager' | 'chef' | 'waiter' | 'cashier' | 'kitchen staff';
// Define possible user statuses
type UserStatus = 'active' | 'pending' | 'inactive';

// Defines the structure for a single user object
interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    lastLogin: string;
}

// Defines the structure for filtering state
interface Filters {
    search: string;
    role: 'All' | UserRole;
}

// --- 2. Mock Data ---

const mockUsers: User[] = [
    { id: 1, name: 'John Smith', email: 'john@bonjour.com', role: 'manager', status: 'active', lastLogin: '2 Hours Ago' },
    { id: 2, name: 'Sarah Chen', email: 'sarah@bonjour.com', role: 'chef', status: 'active', lastLogin: '1 Day Ago' },
    { id: 3, name: 'Mike Wilson', email: 'mike@bonjour.com', role: 'waiter', status: 'active', lastLogin: '3 Hours Ago' },
    { id: 4, name: 'Emily Davis', email: 'emily@bonjour.com', role: 'cashier', status: 'pending', lastLogin: 'Never' },
    { id: 5, name: 'David Lee', email: 'david@bonjour.com', role: 'kitchen staff', status: 'inactive', lastLogin: '1 Week Ago' },
    // Add more users for testing
    { id: 6, name: 'Jessica Alba', email: 'jessica@bonjour.com', role: 'waiter', status: 'active', lastLogin: '5 Minutes Ago' },
];


const getStatusClasses = (status: UserStatus): string => {
    switch (status) {
        case 'active':
            return 'bg-green-100 text-green-700';
        case 'pending':
            return 'bg-yellow-100 text-yellow-700';
        case 'inactive':
            return 'bg-red-100 text-red-700';
    }
};

/**
 * Returns Tailwind classes for role badge based on role value.
 */
const getRoleClasses = (role: UserRole): string => {
    switch (role) {
        case 'manager':
            return 'bg-blue-100 text-blue-700';
        case 'chef':
            return 'bg-cyan-100 text-cyan-700';
        case 'waiter':
            return 'bg-indigo-100 text-indigo-700';
        case 'cashier':
            return 'bg-pink-100 text-pink-700';
        case 'kitchen staff':
            return 'bg-orange-100 text-orange-700';
    }
};

// Available roles for the filter dropdown
const roleOptions: ('All' | UserRole)[] = ['All', 'manager', 'chef', 'waiter', 'cashier', 'kitchen staff'];


// --- 4. Main Component ---

const UserManagement: React.FC = () => {
    const [filters, setFilters] = useState<Filters>({ search: '', role: 'All' });

    const handleFilterChange = (key: keyof Filters, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value as any }));
    };

    // Filtered users calculation using useMemo for performance
    const filteredUsers = useMemo(() => {
        return mockUsers.filter(user => {
            const matchesSearch = user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                                user.email.toLowerCase().includes(filters.search.toLowerCase());
            
            const matchesRole = filters.role === 'All' || user.role === filters.role;

            return matchesSearch && matchesRole;
        });
    }, [filters]);
    
    // Action Handlers (Stubs)
    const handleEdit = (user: User) => alert(`Editing user: ${user.name}`);
    const handleDelete = (user: User) => {
        if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
            console.log(`Deleting user: ${user.id}`);
            // In a real app, this would trigger an API call and state update
        }
    };
    const handleAddUser = () => alert('Opening Add User Modal...');

    return (
        <div className="flex-1 p-6 bg-white rounded-xl shadow-lg min-h-[70vh]">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">👥 User Management</h2>
            <p className="text-gray-500 mb-8">Manage staff roles, permissions, and access.</p>

            {/* A. Controls (Search, Filter, Add User) */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-between">
                
                {/* Search Bar */}
                <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search Users..."
                        value={filters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                {/* Role Filter Dropdown */}
                <div className="flex gap-4 w-full sm:w-auto">
                    <select
                        value={filters.role}
                        onChange={(e) => handleFilterChange('role', e.target.value)}
                        className="py-2 px-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 capitalize"
                    >
                        {roleOptions.map(role => (
                            <option key={role} value={role} className='capitalize'>{role} Roles</option>
                        ))}
                    </select>
                
                    {/* Add User Button */}
                    <button
                        onClick={handleAddUser}
                        className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-150 shadow-md"
                    >
                        <Plus className="w-5 h-5 mr-2" /> Add User
                    </button>
                </div>
            </div>

            {/* B. User Table */}
            <div className="overflow-x-auto border border-gray-200 rounded-xl">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Last Login</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-md capitalize ${getRoleClasses(user.role)}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-md capitalize ${getStatusClasses(user.status)}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastLogin}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        <button onClick={() => handleEdit(user)} className="text-blue-500 hover:text-blue-700 mx-1 p-1">
                                            <Edit className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => handleDelete(user)} className="text-red-500 hover:text-red-700 mx-1 p-1">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-gray-500 text-lg">
                                    No users found matching your filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;