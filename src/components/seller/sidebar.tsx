import React, { useState } from "react";
import { Home, Settings, Menu, X, BarChart2Icon } from "lucide-react";
import { Link } from "react-router-dom";

const SellerSidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Toggle Button for Mobile */}
            <button 
                className="md:hidden bg-indigo-500 text-white p-2 rounded-full fixed top-4 left-4 z-50"
                onClick={() => setIsOpen(true)}
            >
                <Menu size={24} />
            </button>  

            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-full bg-white border-r shadow-lg w-64 p-6 transition-transform 
                ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:h-auto md:flex md:flex-col z-50`}>
                
                {/* Close Button for Mobile */}
                <button className="md:hidden mb-4 bg-gray-200 p-2 rounded-full" onClick={() => setIsOpen(false)}>
                    <X size={24} />
                </button>

                <h1 className="flex items-center gap-2 text-2xl font-bold text-indigo-600 mb-6">
                    <BarChart2Icon size={30}/> Seller Panel
                </h1>
                
                <nav className="flex flex-col space-y-4">
                    <Link to="/seller/dashboard" className="text-gray-700 hover:text-indigo-500 flex items-center gap-2">
                        <Home size={20} /> Dashboard
                    </Link>
                    <Link to="/seller/settings" className="text-gray-700 hover:text-indigo-500 flex items-center gap-2">
                        <Settings size={20} /> Settings
                    </Link>
                </nav>
            </div>

            {/* Background Overlay when Sidebar is Open */}
            {isOpen && (
                <div 
                    className="md:hidden fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 z-40"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}
        </>
    );
};

export default SellerSidebar;
