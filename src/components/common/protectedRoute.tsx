import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
    allowedRoles: string[];  // Accepts an array of allowed roles
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    const isLogin = localStorage.getItem("islogin");
    const userRole = localStorage.getItem("userRole");

    if (!isLogin) {
        return <Navigate to="/auth/login" replace />;
    }

    if (!allowedRoles.includes(userRole || "")) {
        return userRole === "seller" ? (
            <Navigate to="/admin/dashboard" replace />
        ) : (
            <Navigate to="/shop/home" replace />
        );
    }

    return <Outlet />;
};

export default ProtectedRoute;
