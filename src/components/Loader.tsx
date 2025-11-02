import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      {/* Spinning Pizza */}
      <div className="relative w-20 h-20 animate-spin-slow drop-shadow-[0_0_12px_rgba(255,200,0,0.8)]">
        {/* Pizza base */}
        <div className="absolute w-full h-full rounded-full bg-yellow-400 border-[6px] border-orange-500 shadow-[0_0_25px_rgba(255,150,0,0.6)]"></div>

        {/* Toppings */}
        <div className="absolute w-4 h-4 bg-red-600 rounded-full top-3 left-5 shadow-[0_0_10px_rgba(255,0,0,0.7)]"></div>
        <div className="absolute w-4 h-4 bg-red-600 rounded-full bottom-3 right-4 shadow-[0_0_10px_rgba(255,0,0,0.7)]"></div>
        <div className="absolute w-3 h-3 bg-green-500 rounded-full top-5 right-6 shadow-[0_0_10px_rgba(0,255,0,0.7)]"></div>
        <div className="absolute w-3 h-3 bg-brown-500 rounded-full bottom-4 left-6 shadow-[0_0_10px_rgba(150,75,0,0.6)]"></div>
      </div>

      {/* Text */}
      <p className="mt-5 text-yellow-300 text-base font-semibold tracking-wide animate-pulse drop-shadow-[0_0_5px_rgba(255,255,0,0.6)]">
        Loading your data...
      </p>

      {/* Custom animation */}
      <style>
        {`
          .animate-spin-slow {
            animation: spin 2.5s linear infinite;
          }
          @keyframes spin {
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
