import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface CheckAuthProps {
  isAuthenticated: boolean;
  children: ReactNode;
}

const CheckAuth: React.FC<CheckAuthProps> = ({ isAuthenticated, children }) => {
  const location = useLocation();

  // Redirect unauthenticated users accessing protected routes to login
  if (!isAuthenticated && location.pathname.startsWith("/shop")) {
    return <Navigate to="/auth/login" replace />;
  }

  // Redirect authenticated users away from auth pages to /shop/home
  if (isAuthenticated && location.pathname.startsWith("/auth")) {
    return <Navigate to="/shop/home" replace />;
  }

  // Render children if no redirection is needed
  return <>{children}</>;
};

export default CheckAuth;
