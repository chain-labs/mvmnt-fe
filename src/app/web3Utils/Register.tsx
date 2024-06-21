import React, { useState } from "react";
import { useSmartAcc } from "./useSmartAcc";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const { sendCode, loginWithCode } = useSmartAcc();

  const handleSendCode = () => {
    if (email) {
      sendCode({ email: email });
    }
  };
  const handleRegister = () => {
    if (email && otp) {
      loginWithCode({ code: otp });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-48 text-[#212124]"
        />
        <button
          className="bg-blue-400 p-2 rounded-md text-xs"
          onClick={handleSendCode}
        >
          Confirm
        </button>
      </div>
      <input
        type="text"
        placeholder="Enter your 6-digit OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="p-2 border border-gray-300 rounded-md w-64 text-[#212124]"
        maxLength={6}
      />
      <button
        className="bg-blue-400 p-3 w-64 rounded-xl"
        onClick={handleRegister}
      >
        Register
      </button>
    </div>
  );
};

export default Register;
