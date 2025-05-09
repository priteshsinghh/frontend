/* eslint-disable @typescript-eslint/no-explicit-any */


import { LogOut, Menu, ShoppingCartIcon, User2Icon, X } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleCart } from "../../store/cartSlice";

const Header: React.FC = () => {
  const { isAuthenticated, user } = useSelector((state: any) => state.auth);
  const cartItems = useSelector((state: any) => state.cart.items);
  const itemCount = cartItems.reduce(
    (count: number, item: any) => count + item.quantity,
    0
  );

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleLogout() {
    localStorage.clear();
    navigate("/auth/login");
  }

  function handleLogin() {
    navigate("/auth/login");
  }

  function handleNavigate() {
    navigate("/shop/profile");
    setDropdownOpen(false);
  }

  return (
    <nav className="flex items-center justify-between px-6 md:px-20 py-4 bg-white border-b relative">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">SF</span>
        </div>
        <div>
          <h1 className="text-xl font-bold">StayFit</h1>
          <p className="text-sm text-green-500">food delivery</p>
        </div>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex space-x-6 text-gray-700 font-semibold">
        <li>
          <a href="/shop/home" className="text-green-500 hover:text-green-600">
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

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center space-x-2">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Cart and Profile */}
      <div className="flex items-center justify-center gap-4 relative ml-4">
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

        {/* Profile Picture and Dropdown */}
        {/* Profile Picture and Dropdown */}
        <div className="relative flex items-center gap-2" ref={dropdownRef}>
          <img
            src={user.profilePic}
            className="w-10 h-10 rounded-full cursor-pointer object-cover"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            alt="Profile"
          />
          <h1
            className="text-md uppercase md:flex hidden items-center cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {user.userName.split(" ")[0]}
          </h1>

          {dropdownOpen && (
            <div className="absolute right-0 top-12 w-56 bg-white rounded-lg shadow-lg py-2 z-30">
              <div className="px-4 py-2">
                <h1 className="text-lg">
                  Hello, {user.userName.split(" ")[0]}
                </h1>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <hr />
              <div
                className="flex gap-2 px-4 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer"
                onClick={handleNavigate}
              >
                <User2Icon size={16} /> My Account
              </div>
              {!isAuthenticated && (
                <div
                  className="flex gap-2 px-4 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer"
                  onClick={handleLogin}
                >
                  Login/SignUp
                </div>
              )}
              {isAuthenticated && (
                <div
                  className="flex gap-2 px-4 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut size={16} /> Logout
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <ul className="absolute top-20 left-0 right-0 bg-white flex flex-col space-y-2 px-6 py-4 shadow-md md:hidden z-20">
          <li>
            <a href="/shop/home" className="text-green-500 font-semibold">
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
      )}
    </nav>
  );
};

export default Header;
