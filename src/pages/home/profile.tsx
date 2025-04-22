/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../store/authSlice";
import { PencilIcon, VerifiedIcon } from "lucide-react";
import { editProfilePic } from "../../APIs/api";
import { useToast } from "../../hooks/use-toast";

const ProfilePage: React.FC = () => {
    const { user } = useSelector((state: any) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { toast } = useToast();
    const [imagePreview, setImagePreview] = useState(user.profilePic);

    // Handle Edit Profile Navigation
    function handleEdit() {
        navigate(`/shop/get-profile`);
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
                    toast({
                        title: response.data.message,
                    });
                    dispatch(updateUser({ ...user, profilePic: response.data.profilePic })); // Update Redux
                } else {
                    toast({
                        title: response.data.message,
                        variant: "destructive"
                    });
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
                    <div className="relative w-40 h-40 mb-3">
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
                        <div className="flex justify-between gap-2 items-center mb-2">
                            <p className="text-gray-500 text-lg flex items-center gap-3">Email: {user.email}
                                <span className={`text-lg ${user.isVerified === 1 ? "text-green-500" : "text-red-500"}`}>
                                    <VerifiedIcon size={20} />
                                </span>
                            </p>

                        </div>
                        <p className="text-gray-500 text-lg mb-2">Phone No: {user.phoneNumber}</p>
                        <p className="text-gray-500 text-lg mb-4">Gender: {user.gender}</p>

                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center items-center mt-6">
                    <button
                        onClick={handleEdit}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
                    >
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
