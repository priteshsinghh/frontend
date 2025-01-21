import { Outlet } from "react-router-dom";
import React from "react";

const AuthLayout: React.FC = () => {
    return (
        <div
            className="min-h-screen bg-cover bg-np-repeat"
            style={{
                backgroundImage: "url('/bg.jpg')", // Replace with the correct image path
            }}
        >
            <div className="bg-black bg-opacity-10 min-h-screen flex items-center justify-center">
                <div className="text-black max-w-lg">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
