import React, { useState, useEffect } from "react";
import { List, Menu, Truck, User, HelpCircle, Settings } from "lucide-react";
// Import useLocation for URL-based active state
import { Link, useLocation } from "react-router-dom"; 
import dashbord from "../../assets/dashboard.svg";
import renderImage from "../../utills/render-image";

interface MenuItem {
  id: number;
  label: string;
  icon: React.ReactNode;
  path: string;
}

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const location = useLocation(); // Get current URL information

  const menuItems: MenuItem[] = [
    {
      id: 1,
      label: "Dashboard",
      icon: renderImage({
        src: dashbord,
        alt: "Dashboard Icon",
        className: "w-5 h-5",
      }),
      path: "/dashboard",
    },
    { id: 2, label: "Orders", icon: <List size={20} />, path: "/dashboard/orders" },
    { id: 3, label: "Menu Management", icon: <Menu size={20} />, path: "/dashboard/menu" },
    { id: 4, label: "Fleet Management", icon: <Truck size={20} />, path: "/dashboard/fleet" },
    { id: 5, label: "Profile", icon: <User size={20} />, path: "/dashboard/profile" },
    { id: 6, label: "Help & Support", icon: <HelpCircle size={20} />, path: "/dashboard/help" },
    { id: 7, label: "Settings", icon: <Settings size={20} />, path: "/dashboard/settings" },
  ];

  // FIX: Determine active item based on the current URL
  useEffect(() => {
    const currentItem = menuItems.find(
      (item) => location.pathname === item.path
    );
    
    // Set the ID if a match is found and it's different from the current state
    if (currentItem && currentItem.id !== activeItem) {
      setActiveItem(currentItem.id);
    }
    // Note: menuItems is constant, so omitting it from dependency array is okay, 
    // but location.pathname is essential.
  }, [location.pathname]); 

  return (
    <div className="w-64 h-screen bg-[#0099FF] text-white flex flex-col justify-between">
      <div>
        <div className="p-4 font-bold text-xl tracking-wide">LOGO</div>
        <nav className="mt-4 flex-1">
          {menuItems.map((item) => (
            <Link 
              to={item.path} 
              key={item.id}
              // Set active item immediately on click for quick feedback
              onClick={() => setActiveItem(item.id)} 
              className="relative block overflow-hidden" 
            >
              
              {/* Animated Pill Background */}
              <div
                className={`
                  absolute top-0 right-0 h-full w-[98%] bg-white rounded-l-full 
                  transition-all duration-300 ease-in-out transform 
                  ${
                    activeItem === item.id
                      ? "translate-x-0 opacity-100"
                      : "translate-x-full opacity-0" 
                  }
                `}
              ></div>

              {/* Content Layer (z-10) */}
              <div
                className={`
                  flex items-center gap-3 py-3 px-5 cursor-pointer 
                  relative z-10 
                  transition-all duration-300 ease-in-out 
                  ${
                    activeItem === item.id 
                      ? "text-[#0099FF] font-semibold"
                      : "hover:bg-[#0088EE] text-white" 
                  }
                `}
              >
                {item.icon}
                <span className="text-sm font-Poppins">{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>

      <div className="bg-[#0088EE] py-4 px-5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white text-[#0099FF] flex items-center justify-center font-bold">
          J
        </div>
        <div>
          <p className="font-semibold text-sm">John Restaurant</p>
          <p className="text-xs opacity-80">Owner</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;