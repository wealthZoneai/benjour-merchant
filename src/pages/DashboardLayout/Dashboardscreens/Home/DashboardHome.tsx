import Header from './Header';
import StatCard from './StatCard';
import TopMenuItems from './TopMenuItems';
import EarningsChart from './EarningsChart';
import SalesDynamicsChart from './SalesDynamicsChart';
import UserActivityChart from './UserActivityChart';
import DateRangePicker from '../../../../components/CustomCalendar/DateRangePicker';

// Mock Data for Stat Cards
const dashboardStats = [
    { title: 'Orders', value: '52', iconName: 'Orders' },
    { title: 'Approved', value: '55', iconName: 'Approved' },
    { title: 'Monthly total', value: '55555', iconName: 'Monthly total' },
    { title: 'Revenue', value: '4546', iconName: 'Revenue' },
];

const DashboardHome = () => {
    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50 md:p-5">
                <div className="grid grid-cols-12 gap-6 mb-5">
                    <div className="bg-white p-5 rounded-xl shadow-md flex flex-col justify-center items-start col-span-12 lg:col-span-6 space-y-6 relative">
                        {/* Top Bar (Date Button) */}
                        <div className="flex  w-full justify-end">
                            <DateRangePicker />
                        </div>

                        {/* StatCards Section (2 columns, full width) */}
                        <div className="grid grid-cols-2 gap-6 w-full">
                            {dashboardStats.map((stat, index) => (
                                <StatCard key={index} {...stat} />
                            ))}
                        </div>
                    </div>

                    <div className="col-span-14 lg:col-span-6 bg-white p-5 rounded-xl shadow-md h-full">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Earnings</h3>
                        <EarningsChart />
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 lg:col-span-7 bg-white p-6 rounded-xl shadow-md">

                        {/* Placeholder for Bar Chart */}
                        <SalesDynamicsChart />
                    </div>

                    <div className="col-span-12 lg:col-span-5 space-y-6">
                        <TopMenuItems />
                    </div>

                    {/* Overall User Activity (Line Chart) - Spans 8 columns (below Sales Dynamics) */}
                    <div className="col-span-12 lg:col-span-8 bg-white p-6 rounded-xl shadow-md ">
                        <UserActivityChart />
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardHome;