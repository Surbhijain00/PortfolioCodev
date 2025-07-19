"use client";

import ProfileCodefolio from "@/components/ProfileComponents/ProfileCodefolio";
import axios from "axios";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { FiBriefcase } from "react-icons/fi";
import { IoLogoGithub } from "react-icons/io5";
import { MdArrowOutward, MdInfoOutline } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { motion } from "motion/react";
import Loader from "@/components/ui/Loader";
import { notifyError } from "@/components/ui/Toast";

const ProfilePage = ({ params }) => {
  const { username } = use(params);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/${username}`,
          { withCredentials: true }
        );
        setProfileData(response.data);
      } catch (err) {
        notifyError(err.response.data.message);
      }
    };
    getUserProfile();
  }, []);

  if(!profileData) return <Loader />;
  const profileImgSrc = profileData.profilePhoto || "/user.jpg";

  return (
    <motion.main
      className="px-4 sm:px-12 lg:px-48 py-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col gap-6 w-full bg-zinc-900 p-4 sm:p-6 rounded-md border border-white/5">
        <h1 className="text-4xl lg:text-5xl font-medium">
          {username}&apos;s Profile
        </h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative min-w-[125px] sm:min-w-[200px] w-[125px] h-[125px] sm:w-[200px] sm:h-[200px] border border-zinc-900 rounded-lg">
            <Image
              src={profileImgSrc}
              alt="user-img"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-2">
            <a href={`mailto:${profileData.email}`}>
              <span className="flex items-center gap-1 hover:underline text-lg">
                {profileData.email} <MdArrowOutward />
              </span>
            </a>
            {profileData.about && (
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-1 text-lg">
                  <MdInfoOutline /> About
                </span>
                <p className="opacity-75">{profileData.about}</p>
              </div>
            )}
            {profileData.location && (
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-1 text-lg">
                  <SlLocationPin /> Location
                </span>
                <p className="opacity-75">{profileData.location}</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap justify-evenly gap-2 rounded-md p-4 black-bg">
          {profileData.portfolio && (
            <div className="border border-blue-500/50 black-bg py-2 px-4 rounded-md hover:scale-102 transition-all duration:200">
              <a href={profileData.portfolio} target="_blank">
                <span className="flex items-center gap-1 opacity-75 hover:underline hover:opacity-100">
                  <FiBriefcase /> Portfolio <MdArrowOutward />
                </span>
              </a>
            </div>
          )}
          {profileData.linkedIn && (
            <div className="border border-blue-500/50 black-bg py-2 px-4 rounded-md hover:scale-102 transition-all duration:200">
              <a
                href={`https://linkedin.com/in/${profileData.linkedIn}`}
                target="_blank"
              >
                <span className="flex items-center gap-1 opacity-75 hover:underline hover:opacity-100">
                  <FaLinkedin /> LinkedIn <MdArrowOutward />
                </span>
              </a>
            </div>
          )}
          {profileData.github && (
            <div className="border border-blue-500/50 black-bg py-2 px-4 rounded-md hover:scale-102 transition-all duration:200">
              <a
                href={`https://github.com/${profileData.github}`}
                target="_blank"
              >
                <span className="flex items-center gap-1 opacity-75 hover:underline hover:opacity-100">
                  <IoLogoGithub /> GitHub <MdArrowOutward />
                </span>
              </a>
            </div>
          )}
        </div>
        <ProfileCodefolio profileData={profileData} />
      </div>
    </motion.main>
  );
};

export default ProfilePage;