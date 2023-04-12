"use client";

// http://172.232.70.228:8080/api/gql 


import React, { useEffect, useState } from "react";
import { logInUser, setLoginUser } from "@/utils/fetchingFunctions";
import { useRouter } from "next/navigation";

const inputForm = () => {
  const router = useRouter();
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email } = e.target;
    // console.log(userName.value);
    await logInUser(email.value, router, setError);
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center h-full justify-start pt-40 flex-col gap-2 w-full max-w-xs relative px-4"
    >
      <h3 className=" text-white text-lg font-semibold">
        LogIn as SuperAdmin
      </h3>
      <label className="text-white " htmlFor="userName">
        Email Id
      </label>
      <input
        autoComplete="off"
        id="email"
        name="email"
        type="email"
        className=" outline-none bg-transparent border-2 text-sm rounded-md text-white px-2 py-2 text-left leading-none w-full"
      />
      <button
        type="submit"
        className="bg-indigo-400 text-white py-2 rounded-md text-xs text-center w-full border-2 border-indigo-400 hover:bg-indigo-700 transition-all duration-200"
      >
        Continue
      </button>

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
