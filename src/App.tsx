import { Route, Routes } from 'react-router-dom';
import './App.css';
import AuthLayout from './components/auth/layout';
import Login from './pages/auth/login';
import Register from './pages/auth/register';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from './store/authSlice';
import CheckAuth from './components/common/check-auth';
import ShoppingLayout from './components/home/layout';
import NotFound from './pages/not-found';
import Home from './pages/home/home';
import { RootState, AppDispatch } from './store/store'; // Import RootState and AppDispatch types
import AdminLayout from './components/admin/layout';
import AdminDashboard from './pages/admin/dashboard';
import AdminProducts from './pages/admin/products';
import AdminOrder from './pages/admin/orders';
import EmailVerification from './pages/auth/verified-email';
import ResetPassword from './pages/auth/reset-password';
import ForgetPassword from './pages/auth/forget-password';

const App: React.FC = () => {
  // Use RootState for the state type
  const { user, isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

  // Use AppDispatch for the dispatch type
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) return <><div className="flex-col gap-4 w-full flex items-center justify-center pt-20">
    <div
      className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
    >
      <div
        className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
      ></div>
    </div>
  </div></>/* From Uiverse.io by KHARBAQOssama */



  return (
    <>
      <Routes>

        <Route
          path="/"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        {/* Auth Routes */}

        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="mail-verification" element={<EmailVerification />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>


        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrder />} />

        </Route>



        {/* Protected Routes */}
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<Home />} />
        </Route>

        {/* Catch-All Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>

    </>
  );
};

export default App;
