/* eslint-disable @typescript-eslint/no-explicit-any */
//ts-nocheck

import { LogOut, ShoppingCartIcon, User2Icon } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleCart } from "../../store/cartSlice";

const Header: React.FC = () => {
  const { isAuthenticated, user } = useSelector((state: any) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state: any) => state.cart.items);
  const itemCount = cartItems.reduce(
    (count: number, item: any) => count + item.quantity,
    0
  );

  function handleLogout() {
    localStorage.clear();
    navigate("/auth/login");
  }

  function handleLogin() {
    navigate("/auth/login");
  }

  function handleNavigate() {
    navigate("/shop/profile");
    setDropdownOpen(!dropdownOpen);
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
          <a
            href="/shop/home"
            className="text-green-500 font-semibold hover:text-green-500"
          >
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

      <div className="flex justify-center gap-4 relative">
        <div
          className="hidden md:flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer relative"
          onClick={() => dispatch(toggleCart())}
        >
          <ShoppingCartIcon />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
              {itemCount}
            </span>
          )}
        </div>

        {/* Profile Picture */}
        <img
          src={user.profilePic}
          className="object-cover w-[40px] h-[40px] rounded-full cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown on image click
          alt="Profile"
        />
        <h1
          className="flex items-center cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {user.userName}
        </h1>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute mt-16 mr-4 w-50 bg-white rounded-lg shadow-lg py-1">
            <div className="cursor-pointer rounded-lg p-2">
              <h1 className="text-2xl  cursor-pointer">
                Hello, {user.userName.split(" ")[0]}
              </h1>
              <p className="text-sm ">{user.email}</p>
            </div>
            <hr></hr>
            <h1
              className="flex gap-2 block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white cursor-pointer"
              onClick={handleNavigate}
            >
              <User2Icon /> My Account
            </h1>
            <h1
              className={`flex gap-2 block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white cursor-pointer ${
                isAuthenticated ? "hidden" : ""
              }`}
              onClick={handleLogin}
            >
              Login/SignUp
            </h1>
            <h1
              className={`flex gap-2 block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white cursor-pointer ${
                isAuthenticated ? "" : "hidden"
              }`}
              onClick={handleLogout}
            >
              <LogOut /> Logout
            </h1>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
