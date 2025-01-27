/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResetPassword: React.FC = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate()

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setError(null);

        const token = new URLSearchParams(window.location.search).get('token');
        const phoneNumber = new URLSearchParams(window.location.search).get('phoneNumber');

        const resetData = {
            token,
            phoneNumber,
            newPassword,
        };

        try {
            const response = await axios.post('http://localhost:5001/auth/reset-password', resetData);

            if (response.data.success) {
                setSuccessMessage(response.data.message);
                setNewPassword('');
                setConfirmPassword('');
            } else {
                setError(response.data.message);
            }
        } catch (error: any) {
            console.error('Error resetting password:', error);
            setError(
                error.response?.data?.message || 'Failed to reset password. Please try again later.'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleGoToLogin = () => {
        navigate("/auth/login");
    };

    return (
        <div className="">
            <div className="w-full max-w-md p-8 bg-white bg-opacity-30 backdrop-blur-lg rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset Your Password</h2>
                    {error && <p className="mt-2 text-center bg-white text-sm text-red-600">{error}</p>}
                    {successMessage && (
                        <p className="mt-2 text-center bg-white text-sm text-green-600">{successMessage}</p>
                    )}
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="newPassword" className="sr-only">
                                New Password
                            </label>
                            <input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border 
                                border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none 
                                focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="sr-only">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border 
                                border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none 
                                focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm 
                               font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none 
                               focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {loading ? 'Loading...' : 'Reset Password'}
                        </button>
                    </div>
                </form>
                {successMessage && (
                    <div className="mt-4">
                        <button
                            onClick={handleGoToLogin}
                            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm 
                                font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none 
                                focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Go to Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;
