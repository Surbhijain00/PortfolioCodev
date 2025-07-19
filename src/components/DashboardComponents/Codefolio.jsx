
"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { PiCopy } from "react-icons/pi";
import { IoCheckmark } from "react-icons/io5";
import DashboardCodingPlatforms from "./DashboardCodingPlatforms";
import DashboardProjects from "./DashboardProjects";
import { useSelector } from "react-redux";

const Codefolio = () => {

  const user = useSelector(state => state.auth.user);

  if(!user) return null;

  const shareLink = `${process.env.NEXT_PUBLIC_API_URL}/explore/${user.username}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <motion.div
      className="black-bg flex flex-col gap-5 p-4 sm:p-8 rounded-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-start gap-2">
        <div className="w-full flex justify-between items-center gap-4">
          <h2 className="text-xl lg:text-2xl">Share Your Profile URL</h2>
          <span
            className="text-xl p-2 bg-zinc-900 rounded-md cursor-pointer border border-white/10"
            onClick={handleCopy}
          >
            {copied ? <IoCheckmark /> : <PiCopy />}
          </span>
        </div>
        <p className="hidden sm:block w-full py-2 px-4 bg-zinc-900 rounded-md text-sm sm:text-base border border-white/10">
          {shareLink}
        </p>
      </div>
      {user.skills.length > 0 && 
        <div className="flex flex-col gap-4">
          <h2 className="text-xl lg:text-2xl">Skills</h2>
          <div className="flex flex-wrap items-center gap-2">
            {user.skills.map((skill, idx) => {
              return(
                <span key={idx}
                className="text-sm sm:text-base py-1 px-4 border border-blue-500/50 rounded-lg">
                  {skill}
                </span>
              )
            })}
          </div>
        </div>
      }
      <div className="flex flex-col gap-6">
        <DashboardCodingPlatforms />
        <DashboardProjects />
      </div>
    </motion.div>
  );
};

export default Codefolio;
