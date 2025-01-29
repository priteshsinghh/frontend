/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface FormData {
    identifier: string;
    password: string;
}

const Login: React.FC = () => {
    const navigate = useNavigate();

    // State for form data, errors, and loading
    const [formData, setFormData] = useState<FormData>({ identifier: "", password: "" });
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    // Handle input changes
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(""); // Clear previous errors
        setLoading(true); // Set loading state

        // Validation
        if (!formData.identifier || !formData.password) {
            setError("Email/Phone and Password are required.");
            setLoading(false);
            return;
        }

        try {
            const payload = formData.identifier.includes("@")
                ? { email: formData.identifier, password: formData.password }
                : { phoneNumber: formData.identifier, password: formData.password };

            const response = await axios.post("http://localhost:5001/auth/login", payload, {
                withCredentials: true,
            });

            if (response.data.status === "ok" && response.data.data) {
                const { token, userRole } = response.data.data;

                // Store in localStorage
                localStorage.setItem("token", token);
                localStorage.setItem("userRole", userRole);
                localStorage.setItem("islogin", JSON.stringify(true));

                // Navigate based on role
                if (userRole === "seller") {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/shop/home");
                }
            } else {
                setError(response.data.error || "Login failed. Please try again.");
            }
        } catch (error: any) {
            console.error("Login error:", error);
            setError(error.response?.data?.error || "An error occurred. Please try again.");
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8 bg-white bg-opacity-30 backdrop-blur-lg rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6 text-black">Login</h2>
                <form onSubmit={handleSubmit}>
                    {/* Identifier Input (Email/Phone) */}
                    <div className="mb-4">
                        <label htmlFor="identifier" className="block text-sm font-medium text-black mb-1">
                            Email or Phone Number:
                        </label>
                        <input
                            type="text"
                            id="identifier"
                            name="identifier"
                            value={formData.identifier}
                            onChange={handleChange}
                            placeholder="Enter your Email or Phone Number"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-black mb-1">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your Password"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Error Message */}
                    {error && <p className="mb-4 text-sm text-red-500 text-center">{error}</p>}

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full text-white py-2 rounded-md transition duration-300 ${
                            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 hover:shadow-lg"
                        }`}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    {/* Register & Forgot Password Links */}
                    <div className="mt-4 text-center flex flex-col">
                        <p className="text-md text-black">Don’t have an account? </p>
                        <Link to="/auth/register" className="text-blue-700 hover:underline">
                            Register
                        </Link>

                        <p className="text-md text-black">Forgot your Password? </p>
                        <Link to="/auth/forget-password" className="text-blue-700 hover:underline">
                            Reset Password
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
