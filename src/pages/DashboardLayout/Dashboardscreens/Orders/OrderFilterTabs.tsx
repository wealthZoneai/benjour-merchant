import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GetStatusOrders } from "../../../../services/apiHelpers";
import { RootState } from "../../../../store";

const OrderFilterTabs = ({ activeTab, setActiveTab }: any) => {
  const merchantId = useSelector((state: RootState) => state.user.merchantId);
  const [statusCounts, setStatusCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchTabs = async () => {
      try {
        const response = await GetStatusOrders(Number(merchantId));
        if (response?.data?.orderStatusCounts) {
          const countsObj: Record<string, number> = {};
          response.data.orderStatusCounts.forEach((item: any) => {
            countsObj[item.orderStatus] = item.count;
          });

          console.log("✅ Order Status Counts:", countsObj);
          setStatusCounts(countsObj);
        } else {
          console.log("⚠️ No orderStatusCounts in API response");
        }
      } catch (error) {
        console.error("❌ Error fetching order status counts:", error);
      }
    };

    if (merchantId) fetchTabs();
  }, [merchantId]);

  const tabs = [
    { name: "All Orders", key: "ALL", color: "from-blue-400 to-blue-600", count: Object.values(statusCounts).reduce((a, b) => a + b, 0) || 0 },
    { name: "Placed", key: "PLACED", color: "from-green-400 to-green-600", count: statusCounts.PLACED || 0 },
    { name: "Accepted", key: "ACCEPTED", color: "from-emerald-400 to-emerald-600", count: statusCounts.ACCEPTED || 0 },
    { name: "Preparing", key: "PREPARING", color: "from-yellow-400 to-yellow-500", count: statusCounts.PREPARING || 0 },
    { name: "Ready", key: "READY", color: "from-purple-400 to-purple-600", count: statusCounts.READY || 0 },
    { name: "Assigned", key: "ASSIGNED", color: "from-pink-400 to-pink-600", count: statusCounts.ASSIGNED || 0 },
    { name: "Picked Up", key: "PICKED_UP", color: "from-indigo-400 to-indigo-600", count: statusCounts.PICKED_UP || 0 },
    { name: "In Transit", key: "IN_TRANSIT", color: "from-orange-400 to-orange-600", count: statusCounts.IN_TRANSIT || 0 },
    { name: "Delivered", key: "DELIVERED", color: "from-cyan-400 to-cyan-600", count: statusCounts.DELIVERED || 0 },
    { name: "Cancelled", key: "CANCELLED", color: "from-red-400 to-red-600", count: statusCounts.CANCELLED || 0 },
  ];

  return (
    <div className="flex space-x-3 overflow-x-auto no-scrollbar p-3">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.name;
        return (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center gap-2 flex-shrink-0 px-5 py-2 rounded-2xl font-semibold text-sm transition-all duration-300
              ${
                isActive
                  ? `bg-gradient-to-r ${tab.color} text-white shadow-lg scale-105`
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            <span>{tab.name}</span>
            <span
              className={`inline-flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full 
                ${isActive ? "bg-white text-gray-800" : "bg-gray-300 text-gray-700"}`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default OrderFilterTabs;
