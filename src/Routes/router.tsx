
// import { Navigate } from "react-router-dom";
import AuthLayout from "../components/auth/layout";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import EmailVerification from "../pages/auth/verified-email";
import ForgetPassword from "../pages/auth/forget-password";
import ResetPassword from "../pages/auth/reset-password";
import AdminDashboard from "../pages/admin/dashboard";
import AdminProducts from "../pages/admin/products";
import AdminOrder from "../pages/admin/orders";
import Home from "../pages/home/home";
import NotFound from "../pages/not-found";
import ProtectedRoute from "../components/common/protectedRoute";
import { Navigate } from "react-router-dom";
import AdminLayout from "../components/admin/layout";
import ShoppingLayout from "../components/home/layout";


const routesConfig = [
    {
        path: "/",
        element: <Navigate to="auth/login" />,
    },
    {
        path: "/auth",
        element:  <AuthLayout />,
        children: [
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "mail-verification", element: <EmailVerification /> },
            { path: "forget-password", element: <ForgetPassword /> },
            { path: "reset-password", element: <ResetPassword /> },
        ],
    },
    {
        path: "/admin",
        element: (
            <ProtectedRoute allowedRoles={["seller"]}>
                <AdminLayout />
            </ProtectedRoute>
        ),
        children: [
            { path: "dashboard", element: <AdminDashboard /> },
            { path: "products", element: <AdminProducts /> },
            { path: "orders", element: <AdminOrder /> },
        ],
    },
    {
        path: "/shop",
        element: (
            <ProtectedRoute allowedRoles={["buyer"]}>
                <ShoppingLayout />
            </ProtectedRoute>
        ),
        children: [{ path: "home", element: <Home /> }],
    },
    {
        path: "*",
        element: <NotFound />,
    },
];


export default routesConfig;
