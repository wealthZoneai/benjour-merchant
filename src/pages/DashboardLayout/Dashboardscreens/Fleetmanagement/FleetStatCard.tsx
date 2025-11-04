import React from "react";
import { Truck, CheckCircle, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const icons = { Truck, CheckCircle, Clock, MapPin };

const FleetStatCard = ({ title, value, change, changeColor, iconName }: any) => {
  const Icon = icons[iconName] || Clock;

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
      className="relative bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-5"
    >
      {/* Top Row */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-3xl font-semibold text-gray-900 mt-1">{value}</h3>
        </div>

        {/* Icon Box */}
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400 text-white shadow-md">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {/* Change Indicator */}
      {change && (
        <div className="mt-3 flex items-center gap-1">
          <span
            className={`text-xs font-semibold ${
              changeColor || "text-gray-500"
            }`}
          >
            {change}
          </span>
        </div>
      )}

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-xl bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400"></div>
    </motion.div>
  );
};

export default FleetStatCard;
