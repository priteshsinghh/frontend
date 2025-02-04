import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfilePage: React.FC = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate()

    function handleEdit(){
        navigate("/shop/edit-profile");
    }

    function handleLogout(){
        localStorage.clear()
        navigate("/auth/login")
    }

    return (
        <div className="bg-gray-100 min-h-screen py-8 px-4">
            <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <div className="flex flex-col items-center justify-center mb-6">
                    <img
                        src={user.profilePic}
                        alt={user.userName}
                        className="h-40 w-40 rounded-full border-4 border-indigo-500 shadow-lg mb-4"
                    />
                    <div className="flex flex-col items-center justify-start">
                        <h1 className="text-3xl font-semibold text-gray-800">{user.userName}</h1>
                        <p className="text-gray-500 text-lg mb-2 justify-start">{user.email}</p>
                        <p className="text-gray-500 text-lg mb-2">{user.phoneNumber}</p>
                        <p className="text-gray-500 text-lg mb-4">{user.gender}</p>
                        <h1 className={`text-3xl font-bold ${user.isVerified === 1 ? "text-green-500" : "text-red-500"}`}>
                            {user.isVerified === 1 ? "Verified" : "Not Verified"}
                        </h1>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-6">
                    <button onClick={handleEdit} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300">
                        Edit Profile
                    </button>
                    <button onClick={handleLogout} className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
