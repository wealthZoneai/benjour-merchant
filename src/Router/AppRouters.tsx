import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./isAuthenticated";
import OtpScreen from "../pages/Auth/Signup/OtpScreen";
import DeliverySlotBooking from "../pages/DashboardLayout/Dashboardscreens/Fleetmanagement/DeliverySlotBooking";
import LiveDeliveryTracking from "../pages/DashboardLayout/Dashboardscreens/Fleetmanagement/LiveDeliveryTracking";

const Login = React.lazy(() => import("../pages/Auth/Signin/Login"));
const Signup = React.lazy(() => import("../pages/Auth/Signup/Signup"));
const DashboardLayout = React.lazy(() => import("../pages/DashboardLayout/DashboardLayout"));

const AppRouters = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
            }
          />
          <Route
            path="/signup"
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <Signup />
            }
          />
          <Route path="/otp" element={<OtpScreen />} />

          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          />
          <Route path="deliverySlotBooking" element={<DeliverySlotBooking />} />
          <Route path="liveDeliveryTracking" element={<LiveDeliveryTracking />} />

          {/* fallback for unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouters;
