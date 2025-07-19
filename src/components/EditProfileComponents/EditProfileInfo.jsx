
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from 'framer-motion';
import axios from "axios";
import { login } from "@/redux/features/authSlice";
import { notifyError, notifySuccess } from "../ui/Toast";

const EditProfileInfo = () => {
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();
  const dispatch = useDispatch();

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const [profileData, setProfileData] = useState({
    username: user?.username,
    email: user?.email,
    about: user?.about || "",
    location: user?.location || "",
    portfolio: user?.portfolio || "",
    linkedIn: user?.linkedIn || "",
    github: user?.github || "",
    skills: user?.skills || "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedPhoto(file);
  };

  const cancelHandler = () => {
    setSelectedPhoto(null);
    router.push("/dashboard");
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      for (const key in profileData) {
        formData.append(key, profileData[key]);
      }
      if (selectedPhoto) formData.append("profilePhoto", selectedPhoto);

      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSelectedPhoto(null);
      dispatch(login(response.data.updatedUser));
      router.push("/dashboard");
      notifySuccess(response.data.message);
    } catch (err) {
      notifyError(err.response.data.message);
    }
  };

  return (
    <motion.div
      className="black-bg flex flex-col gap-8 p-4 sm:p-8 rounded-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form
        onSubmit={submitHandler}
        encType="multipart/form-data"
        className="w-full flex flex-col gap-4"
      >
        {/* Profile Image */}
        <div className="relative w-[125px] h-[125px] sm:w-[200px] sm:h-[200px] border border-zinc-900 rounded-lg overflow-hidden group">
          <Image
            src={
              selectedPhoto
                ? URL.createObjectURL(selectedPhoto)
                : user?.profilePhoto || "/user.jpg"
            }
            alt="profile-pic"
            fill
            className="object-cover"
          />
          <label
            htmlFor="profile-photo"
            className="absolute bottom-0 left-0 right-0 bg-black/50 text-sm sm:text-base text-center py-2 cursor-pointer group-hover:py-4 group-hover:text-lg duration-300"
          >
            Upload Photo
          </label>
          <input
            type="file"
            id="profile-photo"
            name="profilePhoto"
            accept="image/*"
            onChange={fileChangeHandler}
            className="hidden"
          />
        </div>

        {/* Username */}
        <div className="flex flex-col gap-1">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={profileData.username}
            onChange={changeHandler}
            className="w-full border border-white/10 rounded-md p-2.5 outline-none focus:border-blue-500 placeholder:font-light"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={profileData.email}
            readOnly
            className="w-full border border-white/10 rounded-md p-2.5 outline-none placeholder:font-light bg-zinc-900/30 text-gray-300"
          />
        </div>

        {/* About */}
        <div className="flex flex-col gap-1">
          <label>About</label>
          <textarea
            name="about"
            value={profileData.about}
            onChange={changeHandler}
            rows={4}
            maxLength={200}
            placeholder="Max Characters: 200"
            className="w-full border border-white/10 rounded-md p-2.5 outline-none focus:border-blue-500 placeholder:font-light"
          />
        </div>

        {/* Location */}
        <div className="flex flex-col gap-1">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={profileData.location}
            onChange={changeHandler}
            placeholder="Location"
            className="w-full border border-white/10 rounded-md p-2.5 outline-none focus:border-blue-500 placeholder:font-light"
          />
        </div>
        

        {/* Portfolio Website */}
        <div className="flex flex-col gap-1">
          <label>Portfolio Website</label>
          <input
            type="text"
            name="portfolio"
            value={profileData.portfolio}
            onChange={changeHandler}
            placeholder="https://..."
            className="w-full border border-white/10 rounded-md p-2.5 outline-none focus:border-blue-500 placeholder:font-light"
          />
        </div>

        {/* LinkedIn */}
        <div className="flex flex-col gap-1">
          <label>LinkedIn</label>
          <input
            type="text"
            name="linkedIn"
            value={profileData.linkedIn}
            onChange={changeHandler}
            placeholder="LinkedIn username"
            className="w-full border border-white/10 rounded-md p-2.5 outline-none focus:border-blue-500 placeholder:font-light"
          />
        </div>

        {/* GitHub */}
        <div className="flex flex-col gap-1">
          <label>GitHub</label>
          <input
            type="text"
            name="github"
            value={profileData.github}
            onChange={changeHandler}
            placeholder="GitHub username"
            className="w-full border border-white/10 rounded-md p-2.5 outline-none focus:border-blue-500 placeholder:font-light"
          />
        </div>

        {/* Skills */}
        <div className="flex flex-col gap-1">
          <label>Skills</label>
          <input
            type="text"
            name="skills"
            value={profileData.skills}
            onChange={changeHandler}
            placeholder="Skills (comma separated)"
            className="w-full border border-white/10 rounded-md p-2.5 outline-none focus:border-blue-500 placeholder:font-light"
          />
        </div>
        
        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={cancelHandler}
            className="py-2 px-4 bg-transparent border border-white/20 rounded-sm hover:bg-zinc-800 hover:border-transparent hover:scale-102 transition-all duration-200 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 rounded-sm hover:bg-blue-600 hover:scale-102 transition-all duration-200 cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default EditProfileInfo;
