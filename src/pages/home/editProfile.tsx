/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editProfile } from "../../APIs/api";
import { updateUser } from "../../store/authSlice";
import { useToast } from "../../hooks/use-toast";

const EditProfile: React.FC = () => {
    const { user } = useSelector((state: any) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {toast} = useToast();

    // State for form inputs
    const [formData, setFormData] = useState({
        userName: "",
        phoneNumber: "",
        gender: "",
        oldPassword: "",
        email: "",
        newPassword: "",
    });

    // Load user data into form
    useEffect(() => {
        if (user) {
            setFormData({
                userName: user.userName || "",
                phoneNumber: user.phoneNumber || "",
                gender: user.gender || "",
                oldPassword: user.password || "",
                email: user.email || "",
                newPassword: "",
            });
        }
    }, [user]);

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Submit form
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {

            const response = await editProfile({ formData, user });

            if (response.data.success) {

                dispatch(updateUser(formData));
                toast({ title: "Profile updated successfully!" });


                setTimeout(() => navigate("/shop/profile"), 1500); // Redirect to profile after success

            } else {
                toast({ title: response.data.message, variant: "destructive" });
            }
        } catch (error) {
            console.error(error);
            toast({ title: "An error occurred while updating your profile.", variant: "destructive" });
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4">
            <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Edit Profile</h2>

                {/* {message && (
                    <div className={`text-center p-2 rounded-md ${message.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                        {message.text}
                    </div>
                )} */}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-600">User Name</label>
                        <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600">Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <button type="button" onClick={() => navigate("/shop/change-password")} className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
                        Change Password
                    </button>

                    <div className="flex justify-between mt-4">
                        <button type="button" onClick={() => navigate("/shop/profile")} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                            Cancel
                        </button>

                        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
