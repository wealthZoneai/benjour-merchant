// src/components/SalesDynamicsChart.js (UPDATED)
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// Assuming DropdownSelect is in the same directory or accessible via path
import DropdownSelect from './DropdownSelect'; 

// Mock Data for a week of sales (Data can be swapped based on selectedPeriod)
const data = [
    { name: 'Sun', sales: 420, pv: 2400 },
    { name: 'Mon', sales: 250, pv: 1398 },
    { name: 'Tue', sales: 480, pv: 9800 },
    { name: 'Wed', sales: 300, pv: 3908 },
    { name: 'Thu', sales: 200, pv: 4800 },
    { name: 'Fri', sales: 380, pv: 3800 },
    { name: 'Sat', sales: 150, pv: 4300 },
].map(item => ({...item, sales: item.sales * 1000})); // Scale back up for display

const timeOptions = ['Day', 'Week', 'Month', 'Year'];

const SalesDynamicsChart = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('Day');

    // In a real application, you would fetch data here based on selectedPeriod
    const handlePeriodChange = (period: React.SetStateAction<string>) => {
        setSelectedPeriod(period);
        // fetchNewSalesData(period); // <-- Add your data fetching logic here
    };

    return (
        <div className="p-6 rounded-xl">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Sales Dynamics</h3>
                
                <DropdownSelect
                    options={timeOptions}
                    selectedOption={selectedPeriod}
                    onSelect={handlePeriodChange}
                />
            </div>
            
            <ResponsiveContainer width="100%" height={256}>
                <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="#888" />
                    <YAxis 
                        tickFormatter={(value) => `${value / 1000}K`} 
                        axisLine={false} 
                        tickLine={false} 
                        stroke="#888"
                    />
                    <Tooltip 
                        // Customizing Tooltip to show sales in a friendly format
                        formatter={(value, name, props) => [`$${value.toLocaleString()}`, "Sales"]}
                    />
                    <Bar 
                        dataKey="sales" 
                        fill="#3B82F6" 
                        barSize={20} 
                        radius={[10, 10, 0, 0]} 
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SalesDynamicsChart;