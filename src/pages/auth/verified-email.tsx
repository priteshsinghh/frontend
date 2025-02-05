/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifiedEmail } from "../../APIs/api";
import { useToast } from "../../hooks/use-toast";

const EmailVerification: React.FC = () => {
  const [verificationStatus] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const {toast} = useToast();

  useEffect(() => {
    
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const phoneNumber = queryParams.get("phoneNumber");

    
    const verifyEmail = async () => {
      try {
        const response = await verifiedEmail({ params: { token, phoneNumber } });

        if (response.data.success) {
          toast({title: response.data.message});
        
        } else {
          toast({title:response.data.message, variant: "destructive"});
        }
      } catch (error) {
        toast({title: "Token Expired.", variant: "destructive"});
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
