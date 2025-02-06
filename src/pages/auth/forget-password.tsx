/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, ChangeEvent, FormEvent } from "react";
import { forgetPassword } from "../../APIs/api";
import { useToast } from "../../hooks/use-toast";
import { useNavigate } from "react-router-dom";

const ForgetPassword: React.FC = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await forgetPassword({ email });
            console.log(response);

            if (response.data.success) {
                toast({ title: "Check your mail to reset your password." });
                setEmail("");
                setIsSubmitted(true); // Disable inputs after successful submission
            } else {
                toast({ title: response.data.message, variant: "destructive" });
            }
        } catch (err: any) {
            toast(
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

                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
                            disabled={loading || isSubmitted} // Disable button if loading or submitted
                        >
                            {loading ? "Sending..." : isSubmitted ? "Submitted" : "Submit"}
                        </button>

                        <button
                            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-200"
                            onClick={()=> navigate("/auth/login")}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;
