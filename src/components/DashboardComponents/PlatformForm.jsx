
"use client";

import React, { useState } from "react";
import axios from 'axios';
import { notifyError, notifySuccess } from "../ui/Toast";

const codingPlatforms = [
  "LeetCode",
  "Codeforces",
  "CodeChef",
  "HackerRank",
  "HackerEarth",
  "GeeksforGeeks",
];

const PlatformForm = ({ setIsOpen, setPlatforms }) => {
  const [platformData, setPlatformData] = useState({
    platform: "",
    username: "",
    highlights: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setPlatformData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/platforms`, platformData, { withCredentials: true });
      const newPlatform = response.data.insertedPlatform;
      setPlatforms(prev => [...prev, newPlatform]);
      setIsOpen(false);
      notifySuccess(response.data.message);
    } catch (err) {
      notifyError(err.response.data.message);
    }
  };

  return (
    <div className="flex flex-col gap-6 rounded-md p-4 sm:p-8 border-2 border-white/10">
      <h2 className="text-xl">
        Link Coding Platforms
      </h2>
      <form onSubmit={submitHandler} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select
            name="platform"
            value={platformData.platform}
            onChange={changeHandler}
            className="black-bg border border-white/10 rounded-md p-2 outline-none focus:border-blue-500"
          >
            <option value="">Select Platform</option>
            {codingPlatforms.map((platform, idx) => (
              <option key={idx} value={platform}>
                {platform}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="username"
            value={platformData.username}
            onChange={changeHandler}
            placeholder="Platform Username"
            required
            className="black-bg border border-white/10 rounded-md p-2 outline-none focus:border-blue-500"
          />
        </div>
          <input
            type="text"
            name="highlights"
            value={platformData.highlights}
            onChange={changeHandler}
            maxLength={75}
            placeholder="Highlight (e.g., top 5% in contests)"
            required
            className="w-full border border-white/10 rounded-md p-2 outline-none focus:border-blue-500"
          />
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 rounded-sm hover:bg-blue-600 hover:scale-102 transition-all duration-300 cursor-pointer"
        >
          Link Platform
        </button>
      </form>
    </div>
  );
};

export default PlatformForm;
