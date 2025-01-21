import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../store/authSlice";

interface FormData {
    identifier: string;
    password: string;
}

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // State to hold form data and errors
    const [formData, setFormData] = useState<FormData>({
        identifier: "",
        password: "",
    });
    const [error, setError] = useState<string>("");

    // Handle input changes
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        // Validation
        if (!formData.identifier || !formData.password) {
            setError("Please fill in both fields.");
            return;
        }

        try {
            const response = await dispatch(
                loginUser({
                    identifier: formData.identifier,
                    password: formData.password,
                })
            ).unwrap();

            console.log("Login successful:", response);
            
            navigate("/shop/home");

        } catch (err: any) {
            console.error("Login failed:", err);
            setError(err || "Login failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            {/* Blur Container */}
            <div className="w-full max-w-md p-8 bg-white bg-opacity-30 backdrop-blur-lg rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6 text-black">Login</h2>
                <form onSubmit={handleSubmit}>
                    {/* Identifier Input (Email/Phone) */}
                    <div className="mb-4">
                        <label
                            htmlFor="identifier"
                            className="block text-sm font-medium text-black mb-1"
                        >
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
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-black mb-1"
                        >
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
                    {error && (
                        <p className="mb-4 text-sm text-red-500 text-center">{error}</p>
                    )}

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 hover:shadow-lg transition duration-300"
                    >
                        Login
                    </button>

                    {/* Register Link */}
                    <div className="mt-4 text-center">
                        <p className="text-md text-black">Don’t have an account?</p>
                        <Link to="/auth/register" className="text-blue-500 hover:underline">
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
