import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NetworkStatusHandler: React.FC = () => {
  useEffect(() => {
    const handleOffline = () => {
      toast.error("You are offline! Please check your internet.", {
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        draggable: false,
        theme: "colored",
      });
    };

    const handleOnline = () => {
      toast.dismiss();
      toast.success("You are back online!", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    // Cleanup
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return <ToastContainer />;
};

export default NetworkStatusHandler;
