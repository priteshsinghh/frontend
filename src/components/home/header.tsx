// import { User2Icon } from 'lucide-react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Header: React.FC = () => {


  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/auth/login")
  }

  function handleLogin() {
    navigate("/auth/login");
  }

  function handleNavigate() {
    navigate("/shop/profile")
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

      <div className='flex justify-center gap-4 relative'>
        {/* Profile Picture */}
        <img
          src={user?.profilePic}
          className="object-cover w-[40px] h-[40px] rounded-full cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}  // Toggle dropdown on image click
          alt="Profile"
        />

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute mt-16 mr-4 w-50 bg-white rounded-lg shadow-lg py-1">
            <div className='cursor-pointer rounded-lg p-2'>
              <h1 className='text-2xl  cursor-pointer'>Hello, {user.userName}</h1>
              <p className='text-sm '>{user.email}</p>
            </div>
            <h1 className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white cursor-pointer" onClick={handleNavigate}>My Account</h1>
            <h1 className={`block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white cursor-pointer ${isAuthenticated ? 'hidden' : ''}`} onClick={handleLogin}>Login/SignUp</h1>
            <h1 className={`block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white cursor-pointer ${isAuthenticated ? '' : 'hidden'}`} onClick={handleLogout}>Logout</h1>
          </div>
        )}

      </div>

    </nav>
  );
};

export default Header;
