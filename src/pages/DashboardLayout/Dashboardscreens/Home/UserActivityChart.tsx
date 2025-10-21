import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';

// Mock Data for monthly user activity
const data = [
    { name: 'Jan', users: 4000 },
    { name: 'Feb', users: 3000 },
    { name: 'Mar', users: 5000 },
    { name: 'Apr', users: 4200 },
    { name: 'May', users: 6500 },
    { name: 'Jun', users: 5000 },
    { name: 'Jul', users: 7500 },
];

const UserActivityChart = () => {
    return (
        <div className="p-6 rounded-xl">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Overall user activity</h3>
                <button className="flex items-center text-sm text-gray-700 px-3 py-1 border rounded-lg">
                    Month <ChevronDown className="w-4 h-4 ml-1" />
                </button>
            </div>
            
            <ResponsiveContainer width="100%" height={256}>
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        {/* Gradient for the shaded area effect */}
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="#888" />
                    <YAxis axisLine={false} tickLine={false} stroke="#888" />
                    <Tooltip />
                    <Area 
                        type="monotone" 
                        dataKey="users" 
                        stroke="#3B82F6" 
                        fillOpacity={1} 
                        fill="url(#colorUsers)" 
                        strokeWidth={3}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default UserActivityChart;