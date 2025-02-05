/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../APIs/api";
import { login } from "../../store/authSlice"; // Adjust path if needed
import { useToast } from "../../hooks/use-toast";


interface FormData {
    identifier: string;
    password: string;
}

const Login: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {toast} = useToast();
    

    const [formData, setFormData] = useState<FormData>({ identifier: "", password: "" });
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!formData.identifier || !formData.password) {
            setError("Email/Phone and Password are required.");
            setLoading(false);
            return;
        }

        try {
            const payload = formData.identifier.includes("@")
                ? { email: formData.identifier, password: formData.password }
                : { phoneNumber: formData.identifier, password: formData.password };

            const response = await loginUser(payload);
            console.log(response);

            if (response.data.success && response.data) {
                const { token, user } = response.data;
                const {userRole} = response.data.user;

                console.log(userRole);

                localStorage.setItem("token", token);
                localStorage.setItem("userRole", userRole);
                
                dispatch(login({ token, user }));
                toast({
                    title: response.data.message
                })

                navigate(userRole === "seller" ? "/admin/dashboard" : "/shop/home");
            } else {
                const errorMsg = response.data.error || response.data.message;
                toast({
                    title: errorMsg,
                    variant: "destructive"
                })
                setError(errorMsg);
                
            }
        } catch (error: any) {
            console.error("Login error:", error);
            const errorMsg = error.response?.data?.error || "An error occurred. Please try again.";
            setError(errorMsg);
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8 bg-white bg-opacity-30 backdrop-blur-lg rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6 text-black">Login</h2>
                <form onSubmit={handleSubmit}>
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

                    {error && <p className="mb-4 text-sm text-red-500 text-center">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full text-white py-2 rounded-md transition duration-300 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 hover:shadow-lg"
                            }`}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

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
