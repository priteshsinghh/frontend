
import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './components/auth/layout'
import Login from './pages/auth/login'
import Register from './pages/auth/register'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './store/authSlice'
import CheckAuth from './components/common/check-auth'
import ShoppingLayout from './components/home/layout'
import NotFound from './pages/not-found'
import Home from './pages/auth/home/home'

function App() {

  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch])

  if (loading) return <div>Loading......</div>

  return (

    <>
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


        <Route path='/shop' element={
          <CheckAuth isAuthenticated={isAuthenticated}>
            <ShoppingLayout />
          </CheckAuth>
        }>
          <Route path="home" element={<Home />} />
        </Route>

        <Route path='*' element={<NotFound/>}/>


      </Routes>
    </>
  )
}

export default App
