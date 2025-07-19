
'use client'

import { logout } from "@/redux/features/authSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import { notifyError } from "./Toast";

const LogoutButton = () => {

  const dispatch = useDispatch();
  const router = useRouter();
  const logoutHandler = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {}, { withCredentials: true });
      dispatch(logout());
      router.push('/');
    } catch (err) {
      notifyError(err.response.data.message);
    }
  }

  return (
    <button 
      className="flex justify-center w-full sm:w-56 py-1.5 text-[#E63E3E] bg-[#2F1E1E] border border-transparent rounded-sm hover:scale-102 transition-all duration-300 cursor-pointer"
      onClick={logoutHandler}>
        Logout
    </button>
  );
};

export default LogoutButton;
