"use client";

// http://172.232.70.228:8080/api/gql

import React, { useEffect, useState } from "react";
import { getOTP, handleLogin, setLoginUser } from "@/utils/fetchingFunctions";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addUser } from "@/store/setUser-slice";
import store from "@/store/store";

const inputForm = () => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("superadmin@example.com");
  const [phone, setPhone] = useState("");
  // const dispatch = useDispatch();
  // console.log(email)

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const { email } = e.target;
    // console.log(userName.value);
    // await logInUser(email, router, setError, setOtp);

    if (otp) {
      console.log("NOW LOGIN REQUEST");
      await handleLogin(email, otp, router);
      // store.dispatch(addUser(userSet))
    } else {
      await getOTP(email, router, setError, setOtp);
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
          {/* <label className="text-white " htmlFor="userName">
            Email Id
          </label> */}
          <input
            // required
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
          {/* <label className="text-white " htmlFor="userName">
            Email Id
          </label> */}
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
          {/* <input
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            autoComplete="off"
            id="phone"
            name="phone"
            type="number"
            className=" outline-none bg-transparent border-2 text-sm rounded-md text-white px-2 py-2 text-center leading-none w-full"
          /> */}
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
        Please check your username and password!!
      </span>
    </form>
  );
};

export default inputForm;
