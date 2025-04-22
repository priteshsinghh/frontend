/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { changePassword } from "../../APIs/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/use-toast";

const ChangePassword: React.FC = () => {

    const { user } = useSelector((state: any) => state.auth);
    const navigate = useNavigate();
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    function handleChange(e: { preventDefault: () => void; target: { name: any; value: any; }; }) {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {

            const response = await changePassword({ formData, user });
            console.log(response);


            if (response.data.success) {
                toast({
                    title: response.data.message
                });
                setTimeout(() => navigate("/shop/profile"), 1500); // Redirect to profile after success
            } else {
                toast({
                    title: response.data.message,
                    variant: "destructive"
                });
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4">
            <div className="max-w-sm w-full bg-white p-6 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="currentPassword"
                            className="block text-sm font-medium text-black"
                        >
                            Current Password
                        </label>
                        <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your current password"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="newPassword"
                            className="block text-sm font-medium text-black"
                        >
                            New Password
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your current password"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-black"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your current password"
                            required
                        />
                    </div>

                    <div className="flex justify-between">
                        <button type="button" onClick={() => navigate("/shop/profile")} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"

                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default ChangePassword;