import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardHome from "../DashboardLayout/Dashboardscreens/Home/DashboardHome";
import Sidebar from "../Sidebar/Sidebar";
import OrderManagement from "./Dashboardscreens/Orders/OrderManagement";
import FleetManagement from "./Dashboardscreens/Fleetmanagement/FleetManagement";
import ProfilePage from "./Dashboardscreens/Profile/ProfilePage";
import HelpAndSupport from "./Dashboardscreens/HelpandSupport/HelpAndSupport";
import Settings from "./Dashboardscreens/Settings/SettingsPage";
import MenuManagement from "./Dashboardscreens/MenuManagement/MenuManagement";

const DashboardLayout: React.FC = () => {
  return (
     <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-50 overflow-auto">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="menu" element={<MenuManagement />} />
          <Route path="fleet" element={<FleetManagement />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="help" element={<HelpAndSupport />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashboardLayout;
