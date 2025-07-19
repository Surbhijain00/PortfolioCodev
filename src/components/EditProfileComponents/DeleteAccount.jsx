
"use client";

import { logout } from "@/redux/features/authSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { notifyError, notifySuccess } from "../ui/Toast";

const DeleteAccount = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [deleteText, setDeleteText] = useState("");

  const deleteHandler = async (e) => {
    if (deleteText !== "Delete my account") return;
    try {
      e.preventDefault();
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
        { withCredentials: true }
      );
      dispatch(logout());
      router.push("/");
      notifySuccess(response.data.message);
    } catch (err) {
      notifyError(err.response.data.message);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl sm:text-3xl font-semibold">Delete Account</h2>
        <p className="font-light opacity-75">
          This action is irreversible. All your data will be permanently
          deleted.
        </p>
      </div>
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex justify-center w-full sm:w-auto px-4 py-1.5 text-[#E63E3E] bg-[#2F1E1E] border border-transparent rounded-sm hover:scale-102 transition-all duration-300 cursor-pointer"
        >
          Delete Account
        </button>
        {isOpen && (
          <div className="flex flex-col gap-2 mt-4">
            <p>Type "Delete my account" and click on Confirm button</p>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                className="w-full border border-white/10 rounded-md p-2.5 outline-none focus:border-blue-500 placeholder:font-light"
                placeholder="Delete my account"
                onChange={(e) => {
                  setDeleteText(e.target.value);
                }}
                value={deleteText}
              />
              <button
                type="button"
                onClick={deleteHandler}
                className="flex self-start justify-center w-full sm:w-auto px-4 py-1.5 text-[#E63E3E] bg-[#2F1E1E] border border-transparent rounded-sm hover:scale-102 transition-all duration-300 cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteAccount;
