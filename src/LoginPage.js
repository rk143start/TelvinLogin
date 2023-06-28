import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOTP] = useState('');
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [isOTPSent, setIsOTPSent] = useState(false);
  const navigate = useNavigate();

  const sendOTP = async () => {
    try {
      await axios.post('https://storebh.bhaaraterp.com/api/login/', {
        mobile_number: mobileNumber
      });
      setIsOTPSent(true);
    } catch (error) {
      console.log(error);
    }
  };

  const verifyOTP = async () => {
    try {
      await axios.post('https://storebh.bhaaraterp.com/api/verify-login-otp/', {
        mobile_otp: otp,
        mobile_number: mobileNumber,
        type: 'web',
        registration_token: ''
      });

      setIsOTPVerified(true);
    } catch (error) {
      console.log(error);
    }
  };

  const resendOTP = () => {
    setOTP('');
    setIsOTPVerified(false);
    setIsOTPSent(false);
  };

  const login = () => {
    navigate('/profile');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-2/4 bg-orange-500 flex items-center justify-center rounded-full">
          <img src="/assets/shiging.jpg" alt="" className="w-2/3" />
         </div> 
      <div className="w-3/5 h-2/1 bg-pink-700 p-2 shadow-md rounded-md flex items-center justify-center">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">Login Page</h2>
          <h3 className="text-lg mb-2 text-white">Enter Your Mobile Number to start shopping</h3>
          <div className="mb-4">
            <input
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Enter mobile number"
              className="w-full border border-gray-500 px-3 py-2 rounded"
            />
            {!isOTPSent && !isOTPVerified && (
              <button
                className="bg-white text-green-800 px-6 py-3 rounded mt-3"
                onClick={sendOTP}
              >
                Send OTP
              </button>
            )}
          </div>
          {isOTPSent && !isOTPVerified && (
            <div className="mb-4">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                placeholder="Enter OTP"
                className="w-full border border-gray-300 px-2 py-1 rounded"
              />
              <button
                className="bg-white text-blue-500 px-4 py-2 rounded mt-2"
                onClick={verifyOTP}
              >
                Verify OTP
              </button>
            </div>
          )}
          {isOTPVerified && (
            <div className="mb-4">
              <button
                className="bg-white text-blue-500 px-4 py-2 rounded"
                onClick={login}
              >
                Login
              </button>
            </div>
          )}
          {isOTPSent && !isOTPVerified && (
            <div className="mb-4">
              <button
                className="bg-white text-blue-500 px-4 py-2 rounded"
                onClick={resendOTP}
              >
                Resend OTP
              </button>
            </div>
          )}
          <div>
            <h2 className="text-white">{isOTPVerified}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
