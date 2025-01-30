import { User2Icon } from 'lucide-react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../store/authSlice';

const Header: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleLogout(){
      localStorage.clear();
      navigate("/auth/login")
    }

    function handleLogin(){
        navigate("/auth/login");
    }

  return (
    <nav className="flex items-center justify-between px-20 py-4 bg-white border-b">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">🌱</span>
        </div>
        <div>
          <h1 className="text-xl font-bold">StayFit</h1>
          <p className="text-sm text-green-500">food delivery</p>
        </div>
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex space-x-6 text-gray-700 font-semibold">
        <li>
          <a href="/shop/home" className="text-green-500 font-semibold hover:text-green-500">
            Home
          </a>
        </li>
        <li>
          <a href="/shop/about-us" className="hover:text-green-500">
            About us
          </a>
        </li>
        <li>
          <a href="/shop/products" className="hover:text-green-500">
            Products
          </a>
        </li>
        <li>
          <a href="/shop/blog" className="hover:text-green-500">
            Blog
          </a>
        </li>
        <li>
          <a href="/shop/contacts" className="hover:text-green-500">
            Contacts
          </a>
        </li>
        <li>
          <a href="/shop/pages" className="hover:text-green-500">
            Pages
          </a>
        </li>
        <li>
          <a href="/shop/multipage" className="hover:text-green-500">
            Multipage
          </a>
        </li>
      </ul>

      {/* Get Menu Button */}
      
      <button className="flex gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-red-500" onClick={handleLogin}>
        <User2Icon/> Login/SignUp
      </button>
      <button className='flex gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-red-500' onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Header;
