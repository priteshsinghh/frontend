/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    allowedRoles: string[];  // Accepts an array of allowed roles
    children : any
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
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

    return children;
};

export default ProtectedRoute;
