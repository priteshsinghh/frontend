
import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './components/auth/layout'
import Login from './pages/auth/login'
import Register from './pages/auth/register'
import Home from './pages/auth/home/home'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './store/authSlice'
import CheckAuth from './components/common/check-auth'

function App() {

  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch])

  if (loading) return <div>Loading......</div>

  return (


    <Routes>

      <Route path="/" element={
        <CheckAuth isAuthenticated={isAuthenticated}>
          <AuthLayout />
        </CheckAuth>
      }>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>


      <Route path="/auth" element={
        <CheckAuth isAuthenticated={isAuthenticated}>
          <AuthLayout />
        </CheckAuth>
      }>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>


      <Route path='/home' element={<CheckAuth isAuthenticated={isAuthenticated}>
        <Home />
      </CheckAuth>} />





    </Routes>

  )
}

export default App
