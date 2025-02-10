/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useSelector } from "react-redux";

import { Navigate } from "react-router-dom";


interface ProtectedRouteProps {
    allowedRoles: string[];  // Accepts an array of allowed roles
    children : any
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children, }) => {
    

    const {user, isAuthenticated} = useSelector((state)=> state.auth)

    
    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />;
    }

    if (!allowedRoles.includes(user?.userRole || "")) {
        return user?.userRole === "seller" ? (
            <Navigate to="/seller/dashboard" replace />
        ) : (
            <Navigate to="/shop/home" replace />
        );
    }

    return children;
};

export default ProtectedRoute;
