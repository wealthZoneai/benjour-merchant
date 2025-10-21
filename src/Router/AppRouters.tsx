import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./isAuthenticated";
import DashboardLayout from "../pages/DashboardLayout/DashboardLayout";

const Login = React.lazy(() => import("../pages/Auth/Signin/Login"));
const Signup = React.lazy(() => import("../pages/Auth/Signup/Signup"));
// const Dashboard = React.lazy(() => import("../pages/Dashboard/Dashboard"));
// const MainLayout = React.lazy(() => import("../pages/Layouts/MainLayout"));

const isAuthenticated = false;

const AppRouters = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard/*"
            element={
              // <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <DashboardLayout />
              // </ProtectedRoute>
            }
          />
        </Routes>
    </BrowserRouter>
  );
};

export default AppRouters;
