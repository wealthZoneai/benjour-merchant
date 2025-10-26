import React, { useState, useEffect } from "react";
import { List, Menu, Truck, User, HelpCircle, Settings, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import renderImage from "../../utills/render-image";
import dashbord from "../../assets/dashboard.svg";
import Orders from "../../assets/Orders.svg";
import Feelt from "../../assets/Feelt.svg";
import Profile from "../../assets/Profile.svg";
import Help from "../../assets/help.svg";

interface MenuItem {
  id: number;
  label: string;
  icon: React.ReactNode;
  path: string;
}

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false); // mobile toggle
  const location = useLocation();

  const menuItems: MenuItem[] = [
    { id: 1, label: "Dashboard", icon: renderImage({ src: dashbord, alt: "Dashboard Icon", className: "w-5 h-5" }), path: "/dashboard" },
    { id: 2, label: "Orders", icon: <List size={20} />, path: "/dashboard/orders" },
    { id: 3, label: "Menu Management", icon: <Menu size={20} />, path: "/dashboard/menu" },
    { id: 4, label: "Fleet Management", icon: <Truck size={20} />, path: "/dashboard/fleet" },
    { id: 5, label: "Profile", icon: <User size={20} />, path: "/dashboard/profile" },
    { id: 6, label: "Help & Support", icon: <HelpCircle size={20} />, path: "/dashboard/help" },
    { id: 7, label: "Settings", icon: <Settings size={20} />, path: "/dashboard/settings" },
  ];

  useEffect(() => {
    const currentItem = menuItems.find((item) => location.pathname === item.path);
    if (currentItem) setActiveItem(currentItem.id);
  }, [location.pathname]);

  return (
    <>
      {/* 🔹 Mobile Menu Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-md shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* 🔹 Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full bg-[#0099FF] text-white flex flex-col justify-between 
          transition-transform duration-300 ease-in-out z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} 
          w-64`}
      >
        {/* Logo */}
        <div className="p-4 font-bold text-xl tracking-wide shrink-0">LOGO</div>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          <nav className="mt-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = activeItem === item.id;
              return (
                <Link
                  to={item.path}
                  key={item.id}
                  onClick={() => {
                    setActiveItem(item.id);
                    setIsOpen(false);
                  }}
                  className="relative block overflow-hidden"
                >
                  <div
                    className={`absolute top-0 right-0 h-full w-[98%] bg-white rounded-l-full 
                      transition-all duration-300 ease-in-out transform 
                      ${isActive ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
                    `}
                  ></div>

                  <div
                    className={`flex items-center gap-3 py-3 px-5 cursor-pointer relative z-10 transition-all duration-300 ease-in-out 
                      ${isActive ? "text-[#0099FF] font-semibold" : "hover:bg-[#0088EE] text-white"}
                    `}
                  >
                    {item.icon}
                    <span className="text-sm font-Poppins">{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="bg-[#0088EE] py-4 px-5 flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-full bg-white text-[#0099FF] flex items-center justify-center font-bold">
            J
          </div>
          <div>
            <p className="font-semibold text-sm">John Restaurant</p>
            <p className="text-xs opacity-80">Owner</p>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
