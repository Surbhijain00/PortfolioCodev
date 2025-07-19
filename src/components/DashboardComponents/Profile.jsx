
"use client";

import Image from "next/image";
import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FiBriefcase } from "react-icons/fi";
import { IoLogoGithub } from "react-icons/io";
import { MdArrowOutward, MdInfoOutline } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { motion } from "motion/react";
import LogoutButton from "../ui/LogoutButton";
import EditProfileButton from "../ui/EditProfileButton";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  if(!user) return null;
  const profileSrc = user.profilePhoto || "/user.jpg";

  return (
    <motion.div
      className="black-bg flex flex-col gap-5 p-4 sm:p-8 rounded-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
        <div className="relative w-[125px] h-[125px] sm:w-[200px] sm:h-[200px] border border-zinc-900 rounded-lg">
          <Image
            src={profileSrc}
            alt="user-img"
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl sm:text-3xl font-semibold">
            {user.username}
          </h3>
          <span className="opacity-75">{user.email}</span>
          <div className="mt-10 hidden sm:flex flex-col items-start gap-3">
            <EditProfileButton />
            <LogoutButton />
          </div>
        </div>
      </div>
      {user.about && (
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-1 text-lg">
            <MdInfoOutline /> About
          </span>
          <p className="opacity-75">{user.about}</p>
        </div>
      )}
      {user.location && (
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-1 text-lg">
            <SlLocationPin /> Location
          </span>
          <p className="opacity-75">{user.location}</p>
        </div>
      )}
      {user.portfolio && (
        <div className="flex flex-col items-start gap-1">
          <span className="flex items-center gap-1 text-lg">
            <FiBriefcase /> Portfolio
          </span>
          <a href={user.portfolio} target="_blank">
            <span className="hover:underline hover:opacity-100 opacity-75 flex items-center gap-1">
              View Portfolio <MdArrowOutward />
            </span>
          </a>
        </div>
      )}
      {user.linkedIn && (
        <div className="flex flex-col items-start gap-1">
          <span className="flex items-center gap-1 text-lg">
            <FaLinkedin /> LinkedIn
          </span>
          <a href={`https://linkedin.com/in/${user.linkedIn}`} target="_blank">
            <span className="hover:underline hover:opacity-100 opacity-75 flex items-center gap-1">
              Visit LinkedIn <MdArrowOutward />
            </span>
          </a>
        </div>
      )}
      {user.github && (
        <div className="flex flex-col items-start gap-1">
          <span className="flex items-center gap-1 text-lg">
            <IoLogoGithub /> GitHub
          </span>
          <a href={`https://github.com/${user.github}`} target="_blank">
            <span className="hover:underline hover:opacity-100 opacity-75 flex items-center gap-1">
              Visit GitHub <MdArrowOutward />
            </span>
          </a>
        </div>
      )}
      <div className="mt-4 sm:hidden flex flex-col items-start gap-3">
        <EditProfileButton />
        <LogoutButton />
      </div>
    </motion.div>
  );
};

export default Profile;
