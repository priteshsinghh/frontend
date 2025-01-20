import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../store/authSlice";
import { useState } from "react";

function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        phoneNumber: "",
        gender: "",
        password: "",
        profilePic: null,
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.userName) newErrors.userName = "Username is required.";
        if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Valid email is required.";
        if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required.";
        if (!formData.gender) newErrors.gender = "Gender selection is required.";
        if (!formData.password || formData.password.length < 6)
            newErrors.password = "Password must be at least 6 characters.";
        if (formData.profilePic && formData.profilePic.size > 5 * 1024 * 1024)
            newErrors.profilePic = "Profile picture must be smaller than 5MB.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            if (file.size > 5 * 1024 * 1024) {
                setErrors((prev) => ({ ...prev, profilePic: "Profile picture must be smaller than 5MB." }));
                return;
            }
            setFormData({ ...formData, profilePic: file });
            setErrors((prev) => ({ ...prev, profilePic: "" }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        const form = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value) form.append(key, value as string | Blob);
        });
        dispatch(registerUser(form));

        alert("Registration Successfull");
        navigate("/auth/login");
    };

    console.log("formdata",formData);
    

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form className="w-full max-w-md p-6 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

                {/* Username */}
                <div className="mb-4">
                    <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
                        Username:
                    </label>
                    <input
                        type="text"
                        id="userName"
                        placeholder="Enter your username"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-describedby="username-error"
                    />
                    {errors.userName && (
                        <p id="username-error" className="text-sm text-red-500">
                            {errors.userName}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-describedby="email-error"
                    />
                    {errors.email && (
                        <p id="email-error" className="text-sm text-red-500">
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Phone Number */}
                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number:
                    </label>
                    <input
                        type="text"
                        id="phoneNumber"
                        placeholder="Enter your phone number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-describedby="phone-error"
                    />
                    {errors.phoneNumber && (
                        <p id="phone-error" className="text-sm text-red-500">
                            {errors.phoneNumber}
                        </p>
                    )}
                </div>

                {/* Gender */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender:</label>
                    <div className="flex items-center space-x-4">
                        {["male", "female", "other"].map((option) => (
                            <div key={option}>
                                <input
                                    type="radio"
                                    id={option}
                                    name="gender"
                                    value={option}
                                    checked={formData.gender === option}
                                    onChange={handleChange}
                                    className="mr-1"
                                />
                                <label htmlFor={option} className="text-sm text-gray-700 capitalize">
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                    {errors.gender && (
                        <p id="gender-error" className="text-sm text-red-500">
                            {errors.gender}
                        </p>
                    )}
                </div>

                {/* File Upload */}
                <div className="mb-4">
                    <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-1">
                        Upload Profile Picture:
                    </label>
                    <input
                        type="file"
                        id="file-upload"
                        name="profilePic"
                        onChange={handleFileChange}
                        accept=".jpeg,.png,.jpg"
                        className="w-full text-gray-700"
                        aria-describedby="file-error"
                    />
                    {errors.profilePic && (
                        <p id="file-error" className="text-sm text-red-500">
                            {errors.profilePic}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-describedby="password-error"
                    />
                    {errors.password && (
                        <p id="password-error" className="text-sm text-red-500">
                            {errors.password}
                        </p>
                    )}
                </div>

                {/* Register Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Register
                </button>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">Already have an account?</p>
                    <Link to="/auth/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Register;
