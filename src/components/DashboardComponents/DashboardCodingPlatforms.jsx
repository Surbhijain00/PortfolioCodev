
"use client";

import React, { useEffect, useState } from "react";
import { RiAddLargeLine } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import PlatformForm from "./PlatformForm";
import DashboardPlatformCards from "./DashboardPlatformCards";
import axios from "axios";
import { notifyError } from "../ui/Toast";

const DashboardCodingPlatforms = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    const getPlatforms = async () => {
      try {
        const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/platforms`,
        { withCredentials: true }
        );
        setPlatforms(response.data);
      } catch (err) {
        notifyError(err.response.data.message);
      }
    };
    getPlatforms();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <h2 className="text-xl lg:text-2xl">Coding Platforms</h2>
        <button
          className={`px-4 py-1.5 ${
            isOpen
              ? "bg-[#2F1E1E] text-[#E63E3E]"
              : "bg-blue-500 hover:bg-blue-600"
          } border border-transparent rounded-sm  hover:scale-102 transition-all duration-200 cursor-pointer`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <span className="flex items-center gap-1">
              <RxCross1 /> Cancel
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <RiAddLargeLine /> Add Platform
            </span>
          )}
        </button>
      </div>
      {isOpen && <PlatformForm setIsOpen={setIsOpen} setPlatforms={setPlatforms} />}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {platforms.map(platform => {
          return (
            <DashboardPlatformCards
            key={platform._id}
            id={platform._id}
            platform={platform.platform}
            username={platform.username}
            highlights={platform.highlights}
            setPlatforms={setPlatforms}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DashboardCodingPlatforms;
