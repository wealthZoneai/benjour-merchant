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

            <div className="min-h-screen bg-gray-50 p-3 md:p-5 flex flex-col gap-5">
                {/* Top Section: Stats + Earnings */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {/* Stats + Date Picker */}
                    <div className="bg-white p-5 rounded-xl shadow-md flex flex-col gap-5">
                        <div className="flex justify-end">
                            <DateRangePicker />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                            {dashboardStats.map((stat, index) => (
                                <StatCard key={index} {...stat} />
                            ))}
                        </div>
                    </div>

                    {/* Earnings Chart */}
                    <div className="bg-white p-5 rounded-xl shadow-md flex flex-col">
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
