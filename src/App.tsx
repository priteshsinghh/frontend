
import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './components/auth/layout'
import Login from './pages/auth/login'
import Register from './pages/auth/register'
import Home from './pages/auth/home/home'

function App() {


  return (
   
      
      <Routes>

        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path='/home' element={<Home/>}/>





      </Routes>
  
  )
}

export default App
