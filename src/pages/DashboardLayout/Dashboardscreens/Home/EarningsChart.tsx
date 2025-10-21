import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';

const data = [
    { name: 'Daily', uv: 31.47, fill: '#10B981', color: 'bg-green-500' }, // Green
    { name: 'Week', uv: 26.69, fill: '#F59E0B', color: 'bg-orange-500' }, // Orange
    { name: 'Month', uv: 43.10, fill: '#3B82F6', color: 'bg-blue-500' },  // Blue
];

const EarningsChart = () => {
    return (
        <div className="p-5 rounded-xl h-full flex flex-col items-center">
            <ResponsiveContainer width="100%" height={200}>
                <RadialBarChart 
                    cx="50%" 
                    cy="50%" 
                    innerRadius="40%" 
                    outerRadius="100%" 
                    barSize={10} 
                    data={data}
                >
                    <PolarAngleAxis 
                        type="number" 
                        domain={[0, 100]} 
                        angleAxisId={0} 
                        tick={false} 
                    />
                    <RadialBar 
                        background 
                        dataKey="uv" 
                        angleAxisId={0} 
                        cornerRadius={5} 
                    />
                </RadialBarChart>
            </ResponsiveContainer>

            <div className="flex justify-center space-x-4 mt-4 text-xs text-gray-600">
                {data.map((item, index) => (
                    <span key={index} className="flex items-center">
                        <span className={`w-2 h-2 rounded-full ${item.color} mr-1`}></span> 
                        {item.name}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default EarningsChart;