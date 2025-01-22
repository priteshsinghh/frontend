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
import Home from './pages/auth/home/home';
import { RootState, AppDispatch } from './store/store'; // Import RootState and AppDispatch types

const App: React.FC = () => {
  // Use RootState for the state type
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

  // Use AppDispatch for the dispatch type
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) return <div>Loading......</div>;

  return (
    <>
      <Routes>
        {/* Auth Routes */}

        <Route
          path="/auth/*"
          element={
            <CheckAuth isAuthenticated={isAuthenticated}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Protected Routes */}
        <Route
          path="/shop/*"
          element={
            <CheckAuth isAuthenticated={isAuthenticated}>
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
