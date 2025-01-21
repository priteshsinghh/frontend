import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, children }) {
  const location = useLocation();

  // Redirect unauthenticated users from protected routes to login
  // if (!isAuthenticated) {
  //   if (location.pathname.includes("/shop")) {
  //     return <Navigate to="/auth/login" replace />;
  //   }
  // }

  // Redirect authenticated users away from auth pages (e.g., login/register) to home
  if (
    isAuthenticated &&
    (location.pathname === "/auth/login" || location.pathname === "/auth/register")
  ) {
    return <Navigate to="/shop" replace />;
  }

  // Render children if no redirection is needed
  return <>{children}</>;
}

export default CheckAuth;
