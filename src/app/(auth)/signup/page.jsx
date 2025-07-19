
"use client";

import Loader from "@/components/ui/Loader";
import { notifyError, notifySuccess } from "@/components/ui/Toast";
import { login } from "@/redux/features/authSlice";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { RiCodeSSlashFill } from "react-icons/ri";
import { useDispatch } from "react-redux";

const Signup = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        signupData,
        { withCredentials: true }
      );
      dispatch(login(response.data.user));
      router.push("/dashboard");
      notifySuccess(`Welcome to Codev ${response.data.user.username}!`);
    } catch (err) {
      notifyError(err.response.data.message);
    } finally {
      setLoading(false);
    }

    setSignupData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  if(loading) return <Loader />;

  return (
    <main className="flex justify-center px-4 sm:px-12 lg:px-20 my-12">
      <div className="w-full sm:w-4/5 lg:w-2/6 lg:min-w-[400px] flex flex-col items-center gap-6 border border-white/10 rounded-lg p-6">
        <div className="flex flex-col items-center gap-2">
          <span className="text-3xl text-blue-500 bg-blue-500/10 p-3 rounded-full">
            <RiCodeSSlashFill />
          </span>
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="text-sm opacity-75">
            Enter your details to start using Codev
          </p>
        </div>
        <form
          onSubmit={submitHandler}
          className="w-full flex flex-col items-center gap-4"
        >
          <div className="flex flex-col w-full gap-3">
            <div className="flex flex-col gap-2">
              <label className="text-sm">Username</label>
              <input
                className="w-full border border-white/10 rounded-md p-3 outline-none focus:border-blue-500 placeholder:font-light"
                type="text"
                placeholder="Username"
                required
                name="username"
                value={signupData.username}
                onChange={changeHandler}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm">Email</label>
              <input
                className="w-full border border-white/10 rounded-md p-3 outline-none focus:border-blue-500 placeholder:font-light"
                type="email"
                placeholder="Email"
                required
                name="email"
                value={signupData.email}
                onChange={changeHandler}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm">Password</label>
              <input
                className="w-full border border-white/10 rounded-md p-3 outline-none focus:border-blue-500 placeholder:font-light"
                type="password"
                placeholder="Password"
                required
                name="password"
                value={signupData.password}
                onChange={changeHandler}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm">Confirm Password</label>
              <input
                className="w-full border border-white/10 rounded-md p-3 outline-none focus:border-blue-500 placeholder:font-light"
                type="password"
                placeholder="Confirm Password"
                required
                name="confirmPassword"
                value={signupData.confirmPassword}
                onChange={changeHandler}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-sm sm:text-base py-2.5 mt-4 bg-blue-500 rounded-sm hover:bg-blue-600 hover:scale-102 transition-all duration-200 cursor-pointer"
          >
            Sign Up
          </button>
        </form>
        <p>
          {"Already have an account? "}
          <Link href="/login">
            <span className="text-blue-500 hover:underline">Login</span>
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Signup;
