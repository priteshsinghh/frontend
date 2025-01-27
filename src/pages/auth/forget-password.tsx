/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

const ForgetPassword: React.FC = () => {
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        if (!email || !phoneNumber) {
            setError("Please provide both email and phone number.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post("http://localhost:5001/auth/forget-password", {
                email,
                phoneNumber,
            });

            if (response.data.success) {
                setSuccessMessage("Check your mail to reset your password.");
                setEmail("");
                setPhoneNumber("");
                setIsSubmitted(true); // Disable inputs after successful submission
            } else {
                setError(response.data.message);
            }
        } catch (err: any) {
            setError(
                err.response?.data?.message || "An error occurred. Please try again later."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="">
            <div className="max-w-md w-full bg-white bg-opacity-30 backdrop-blur-lg p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
                    Forget Password
                </h2>

                {error && (
                    <p className="mb-4 text-sm bg-white text-red-500 text-center">{error}</p>
                )}
                {successMessage && (
                    <p className="mb-4 text-sm bg-white text-green-800 text-center">
                        {successMessage}
                    </p>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-black"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setEmail(e.target.value)
                            }
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your email"
                            required
                            disabled={isSubmitted} // Disable input if submitted
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="phoneNumber"
                            className="block text-sm font-medium text-black"
                        >
                            Phone Number
                        </label>
                        <input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={phoneNumber}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setPhoneNumber(e.target.value)
                            }
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your phone number"
                            required
                            disabled={isSubmitted} // Disable input if submitted
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
                        disabled={loading || isSubmitted} // Disable button if loading or submitted
                    >
                        {loading ? "Sending..." : isSubmitted ? "Submitted" : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;
