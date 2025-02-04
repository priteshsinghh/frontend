/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../store/authSlice";
import { PencilIcon } from "lucide-react";
import { editProfilePic } from "../../APIs/api";

const ProfilePage: React.FC = () => {
    const { user } = useSelector((state: any) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [imagePreview, setImagePreview] = useState(user.profilePic);

    // Handle Edit Profile Navigation
    function handleEdit() {
        navigate(`/shop/get-profile?email=${user.email}`);
    }

    // Handle Logout
    function handleLogout() {
        localStorage.clear();
        navigate("/auth/login");
    }

    // Handle Image Upload
    async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {

        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const formData = new FormData();
            formData.append("profilePic", file);
            formData.append("email", user.email);

            try {
                const response = await editProfilePic(formData)

                if (response.data.success) {
                    setImagePreview(response.data.profilePic); // Update preview
                    alert("Image Changed Succesfully")
                    dispatch(updateUser({ ...user, profilePic: response.data.profilePic })); // Update Redux
                }
            } catch (error) {
                console.error("Error updating profile picture:", error);
            }
        }
    }

    return (
        <div className="bg-gray-100 min-h-screen py-8 px-4">
            <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <div className="flex flex-col items-center justify-center mb-6">
                    <div className="relative w-40 h-40">
                        {/* Profile Picture */}
                        <img
                            src={imagePreview}
                            alt={user.userName}
                            className="w-full h-full rounded-full border-4 border-indigo-400 shadow-lg mb-4 object-cover"
                        />

                        {/* Hidden File Input */}
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id="fileInput"
                            onChange={handleImageUpload}
                        />

                        {/* Pencil Icon Button */}
                        <label htmlFor="fileInput" className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-200 transition">
                            <PencilIcon size={20} />
                        </label>
                    </div>

                    {/* User Info */}
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-semibold text-gray-800 mb-2">{user.userName}</h1>
                        <p className="text-gray-500 text-lg mb-2">Email: {user.email}</p>
                        <p className="text-gray-500 text-lg mb-2">Phone No: {user.phoneNumber}</p>
                        <p className="text-gray-500 text-lg mb-4">Gender: {user.gender}</p>
                        <h1 className={`text-3xl font-semibold ${user.isVerified === 1 ? "text-green-500" : "text-red-500"}`}>
                            {user.isVerified === 1 ? "Verified" : "Not Verified"}
                        </h1>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center mt-6">
                    <button
                        onClick={handleEdit}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
                    >
                        Edit Profile
                    </button>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
