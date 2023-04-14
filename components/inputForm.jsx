"use client";

import React, { useState } from "react";
import { getOTP, handleLogin, setLoginUser } from "@/utils/fetchingFunctions";
import { useRouter } from "next/navigation";

const inputForm = () => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("superadmin@example.com");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp) {
      console.log("NOW LOGIN REQUEST");
      await handleLogin(email, otp, router);
    } else {
      await getOTP(email, setError, setOtp);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center h-full justify-start pt-40 flex-col gap-2 w-full max-w-xs relative px-4"
    >
      <h3 className=" text-white text-lg font-semibold">LogIn as SuperAdmin</h3>

      {!otp ? (
        <>
          <input
            required
            placeholder="Enter Your Email Id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            id="email"
            name="email"
            type="email"
            className=" outline-none bg-transparent border-2 text-sm rounded-md text-white px-2 py-2 text-center leading-none w-full"
          />
          <button
            type="submit"
            className="bg-indigo-400 text-white py-2 rounded-md text-xs text-center w-full border-2 border-indigo-400 hover:bg-indigo-700 transition-all duration-200"
          >
            Get OTP
          </button>
        </>
      ) : (
        <>
          <input
            required
            disabled
            value={email}
            onChange={(e) => (e.target.value = email)}
            placeholder="Enter Your Email Id"
            autoComplete="off"
            id="email"
            name="email"
            type="email"
            className=" outline-none bg-transparent border-2 text-sm rounded-md text-white px-2 py-2 text-center leading-none w-full"
          />
          <input
            required
            defaultValue={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="OTP"
            autoComplete="off"
            id="otp"
            name="otp"
            type="text"
            className=" outline-none bg-transparent border-2 text-sm rounded-md text-white px-2 py-2 text-center leading-none w-full"
          />
          <button
            type="submit"
            className="bg-indigo-400 text-white py-2 rounded-md text-xs text-center w-full border-2 border-indigo-400 hover:bg-indigo-700 transition-all duration-200"
          >
            LogIn
          </button>
        </>
      )}

      <span
        className={` absolute bottom-2 bg-red-500/50 text-white font-semibold px-3 py-1 rounded-md text-sm transition-all duration-300 lg:text-xs text-center ${
          error ? ` opacity-100` : ` opacity-0`
        } `}
      >
        Please check your Email and/or OTP!!
      </span>
    </form>
  );
};

export default inputForm;
