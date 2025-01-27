import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const EmailVerification: React.FC = () => {
  const [verificationStatus, setVerificationStatus] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract query parameters from the URL
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const phoneNumber = queryParams.get("phoneNumber");

    // Verify email through the backend API
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/auth/mail-verification`,
          { params: { token, phoneNumber } }
        );

        if (response.data.success) {
          setVerificationStatus("User verified successfully! Click to login...");
        //   setTimeout(() => navigate("/auth/login"), 3000); // Redirect to login after 3 seconds
        } else {
          setVerificationStatus("Verification failed. Invalid token or phone number.");
        }
      } catch (error) {
        setVerificationStatus("An error occurred during verification. Please try again.");
        console.error(error);
      }
    };

    verifyEmail();
  }, [location.search, navigate]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white bg-opacity-30 backdrop-blur-lg rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-black">Email Verification</h1>
        <p className="text-black mb-6">{verificationStatus}</p>
        {verificationStatus.includes("successfully") && (
          <button
            onClick={() => navigate("/auth/login")}
            className="bg-green-500 text-black py-2 px-4 rounded hover:bg-green-700 transition"
          >
            Back to Login
          </button>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
