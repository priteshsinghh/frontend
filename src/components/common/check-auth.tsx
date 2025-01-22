import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface CheckAuthProps {
  isAuthenticated: boolean;
  user: any;
  children: ReactNode;
}

const CheckAuth: React.FC<CheckAuthProps> = ({ isAuthenticated, children, user }) => {
  const location = useLocation();


  if (!isAuthenticated) {
    if (location.pathname.startsWith("/shop") || location.pathname.startsWith("/admin")) {
      return <Navigate to="/auth/login" replace />;
    }
  }

  if (isAuthenticated) {
    if (location.pathname.startsWith("/auth")) {
      if (user?.userRole === "seller") {
        return <Navigate to="/admin/dashboard" replace />;
      } else {
        console.log("Redirecting authenticated user to shop home...");
        return <Navigate to="/shop/home" replace />;
      }
    }

    if (location.pathname.startsWith("/admin") && user?.userRole !== "seller") {
      return <Navigate to="/shop/home" replace />;
    }
  }

  return <>{children}</>;
};

export default CheckAuth;
