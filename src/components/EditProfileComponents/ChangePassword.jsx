
'use client';

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/authSlice";
import { notifyError, notifySuccess } from "../ui/Toast";

const ChangePassword = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/password`,
        passwordData,
        { withCredentials: true }
      );
      dispatch(logout());
      router.push("/");
      notifySuccess(response.data.message);
    } catch (err) {
      notifyError(err.response.data.message);
    }

    setPasswordData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };
  
  return (
    <form
      onSubmit={submitHandler}
      className="w-full flex flex-col items-center gap-4"
    >
      <div className="flex flex-col w-full gap-3">
        <div className="flex flex-col gap-1">
          <label>Old Password</label>
          <input
            className="w-full border border-white/10 rounded-md p-2.5 outline-none focus:border-blue-500 placeholder:font-light"
            type="password"
            placeholder="Old Password"
            required
            name="oldPassword"
            value={passwordData.oldPassword}
            onChange={changeHandler}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>New Password</label>
          <input
            className="w-full border border-white/10 rounded-md p-2.5 outline-none focus:border-blue-500 placeholder:font-light"
            type="password"
            placeholder="New Password"
            required
            name="newPassword"
            value={passwordData.newPassword}
            onChange={changeHandler}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>Confirm Password</label>
          <input
            className="w-full border border-white/10 rounded-md p-2.5 outline-none focus:border-blue-500 placeholder:font-light"
            type="password"
            placeholder="Confirm Password"
            required
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={changeHandler}
          />
        </div>
      </div>
      <button
        type="submit"
        className="self-end text-base py-2 px-4 mt-4 bg-blue-500 rounded-sm hover:bg-blue-600 hover:scale-102 transition-all duration-200 cursor-pointer"
      >
        Change Password
      </button>
    </form>
  );
};

export default ChangePassword;
