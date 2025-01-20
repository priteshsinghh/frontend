import { Link } from "react-router-dom";

function Login() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form>
                    {/* Email/Phone Input */}
                    <div className="mb-4">
                        <label 
                            htmlFor="phoneemail" 
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email/Phone Number
                        </label>
                        <input 
                            type="text" 
                            id="phoneemail" 
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
                            placeholder="Enter your Password" 
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

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
                        <Link to="/auth/register" className="hover-underline">Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
