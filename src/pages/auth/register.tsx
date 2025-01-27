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
        userRole: "",
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
        if (!formData.userRole) newErrors.gender = "role selection is required.";
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

        // alert("Registration Successfull");
        navigate("/auth/login");
    };

    console.log("formdata", formData);


    return (
        <div className="min-h-screen flex items-center justify-center">
            {/* Blur Container */}
            <div className="w-full max-w-md p-8 bg-white bg-opacity-30 backdrop-blur-lg rounded-xl shadow-lg">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-3xl font-bold text-center mb-6 text-black">Register</h2>

                    {/* Username */}
                    <div className="mb-4">
                        <label
                            htmlFor="userName"
                            className="block text-sm font-medium text-black mb-1"
                        >
                            Username:
                        </label>
                        <input
                            type="text"
                            id="userName"
                            placeholder="Enter your username"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-black mb-1"
                        >
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="mb-4">
                        <label
                            htmlFor="phoneNumber"
                            className="block text-sm font-medium text-black mb-1"
                        >
                            Phone Number:
                        </label>
                        <input
                            type="text"
                            id="phoneNumber"
                            placeholder="Enter your phone number"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Gender */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-black mb-1">
                            Gender:
                        </label>
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
                                    <label
                                        htmlFor={option}
                                        className="text-sm text-black capitalize"
                                    >
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* userrole */}
                    <div className="mb-4">
                        <label
                            htmlFor="userRole"
                            className="block text-sm font-medium text-black mb-1"
                        >
                            Select Role:
                        </label>
                        <select
                            id="userRole"
                            name="userRole"
                            value={formData.userRole}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="" disabled>
                                Choose your role
                            </option>
                            <option value="seller">Seller</option>
                            <option value="buyer">Buyer</option>
                        </select>
                    </div>


                    {/* File Upload */}
                    <div className="mb-4">
                        <label
                            htmlFor="file-upload"
                            className="block text-sm font-medium text-black mb-1"
                        >
                            Upload Profile Picture:
                        </label>
                        <input
                            type="file"
                            id="file-upload"
                            name="profilePic"
                            onChange={handleFileChange}
                            accept=".jpeg,.png,.jpg"
                            className="w-full text-black"
                        />
                    </div>

                    {/* Password */}
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
                            placeholder="Enter your password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 hover:shadow-lg transition duration-300"
                    >
                        Register
                    </button>

                    <div className="mt-4 text-center">
                        <p className="text-md text-black">
                            Already have an account?{" "}
                            <Link to="/auth/login" className="text-blue-500 hover:underline">
                                Login
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
