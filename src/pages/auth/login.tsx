import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../store/authSlice";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // State to hold form data and errors
    const [formData, setFormData] = useState({
        identifier: "", // Single field for email/phone
        password: "",
    });
    const [error, setError] = useState("");

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        if (!formData.identifier || !formData.password) {
            setError("Please fill in both fields.");
            return;
        }

        try {
            const response = await dispatch(loginUser(formData)).unwrap(); // Handle async Thunk response
            console.log("Login successful:", response);
        } catch (err: any) {
            console.error("Login failed:", err);
            setError(err.message || "Login failed. Please try again.");
        }

        console.log(formData);
        alert("Login Successfull");
        navigate("/home");
        
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    {/* Identifier Input (Email/Phone) */}
                    <div className="mb-4">
                        <label
                            htmlFor="identifier"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email or Phone Number
                        </label>
                        <input
                            type="text"
                            id="identifier"
                            name="identifier"
                            value={formData.identifier}
                            onChange={handleChange}
                            placeholder="Enter your Email or Phone Number"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your Password"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <p className="mb-4 text-sm text-red-500 text-center">{error}</p>
                    )}

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Login
                    </button>

                    {/* Register Link */}
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">Don’t have an account?</p>
                        <Link to="/auth/register" className="text-blue-500 hover:underline">
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
