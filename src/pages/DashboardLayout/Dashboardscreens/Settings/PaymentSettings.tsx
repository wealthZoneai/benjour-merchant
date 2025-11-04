import React from 'react';
import { CreditCard, History, Banknote } from 'lucide-react';

// --- 1. Type Definitions ---

// Defines the structure for a single transaction record
interface Transaction {
    id: string;
    customer: string;
    amount: string;
    method: 'credit card' | 'digital wallet' | 'debit card';
    status: 'completed' | 'processing' | 'failed';
    date: string;
}

// Defines the structure for bank account details
interface BankDetails {
    bankName: string;
    accountType: string;
    accountNumber: string;
}

// --- 2. Mock Data ---

// Mock Bank Account Data
const mockBankDetails: BankDetails = {
    bankName: 'Chase Bank',
    accountType: 'Business Checking',
    accountNumber: '1234567891234', // Masked or partial number in a real app
};

// Mock Transaction Data
const mockTransactions: Transaction[] = [
    { id: 'TXN-12345', customer: 'john', amount: '$45.99', method: 'credit card', status: 'completed', date: '2024-01-15 14:30' },
    { id: 'TXN-12345', customer: 'sarah', amount: '$45.99', method: 'digital wallet', status: 'completed', date: '2024-01-15 14:30' },
    { id: 'TXN-12345', customer: 'mike wilson', amount: '$45.99', method: 'debit card', status: 'processing', date: '2024-01-15 14:30' },
    { id: 'TXN-12345', customer: 'emily davis', amount: '$45.99', method: 'credit card', status: 'failed', date: '2024-01-15 14:30' },
];

// --- 3. Utility Components ---

/**
 * Returns Tailwind classes for status chip based on status value.
 */
const getStatusClasses = (status: Transaction['status']): string => {
    switch (status) {
        case 'completed':
            return 'bg-green-100 text-green-700 border-green-300';
        case 'processing':
            return 'bg-yellow-100 text-yellow-700 border-yellow-300';
        case 'failed':
            return 'bg-red-100 text-red-700 border-red-300';
        default:
            return 'bg-gray-100 text-gray-700 border-gray-300';
    }
};


// --- 4. Main Component ---

const PaymentSettings: React.FC = () => {

    return (
        <div className="flex-1 p-6 bg-white rounded-xl shadow-lg min-h-[70vh]">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">💰 Payment Settings</h2>
            <p className="text-gray-500 mb-8">Manage your payout account and view transaction history.</p>

            {/* A. Bank Account Details Section */}
            <div className="mb-10 p-6 bg-gray-50 rounded-xl shadow-inner border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                    <Banknote className="w-5 h-5 mr-2 text-indigo-500" /> Bank account details
                </h3>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 max-w-lg">
                    {/* Labels (Left Column) */}
                    <p className="text-gray-600 font-medium">Bank Name</p>
                    <p className="text-gray-900">{mockBankDetails.bankName}</p>

                    <p className="text-gray-600 font-medium">Account Type</p>
                    <p className="text-gray-900">{mockBankDetails.accountType}</p>

                    <p className="text-gray-600 font-medium">Account Number</p>
                    {/* Displaying only the last 4 digits for security */}
                    <p className="text-gray-900">••••••••{mockBankDetails.accountNumber.slice(-4)}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                    <button
                        className="w-full sm:w-auto px-6 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition duration-150 font-medium"
                        onClick={() => alert('Opening Update Bank Details form...')}
                    >
                        Update Bank Details
                    </button>
                </div>
            </div>

            {/* B. Recent Transactions Section */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                    <History className="w-5 h-5 mr-2 text-purple-500" /> Recent transactions
                </h3>
                <p className="text-gray-500 mb-4">Latest payment activity</p>

                {/* ✅ Proper scroll container */}
                <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50 sticky top-0 z-10">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                                    Transaction ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                                    Customer
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                                    Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                                    Method
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                                    Date
                                </th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-100">
                            {mockTransactions.map((tx) => (
                                <tr
                                    key={tx.id + tx.customer}
                                    className="hover:bg-gray-50 transition-colors duration-150"
                                >
                                    <td className="px-6 py-3 whitespace-nowrap font-medium text-indigo-600">
                                        {tx.id}
                                    </td>
                                    <td className="px-6 py-3 whitespace-nowrap capitalize text-gray-800">
                                        {tx.customer}
                                    </td>
                                    <td className="px-6 py-3 whitespace-nowrap text-gray-900">
                                        {tx.amount}
                                    </td>
                                    <td className="px-6 py-3 whitespace-nowrap capitalize text-gray-500">
                                        {tx.method}
                                    </td>
                                    <td className="px-6 py-3 whitespace-nowrap">
                                        <span
                                            className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusClasses(
                                                tx.status
                                            )}`}
                                        >
                                            {tx.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 whitespace-nowrap text-gray-500">
                                        {tx.date}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default PaymentSettings;