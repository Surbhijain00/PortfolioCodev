
'use client';

import React, { useState } from "react";
import { LuUser } from "react-icons/lu";
import { MdOutlineLock } from "react-icons/md";
import EditProfileInfo from "./EditProfileInfo";
import EditProfileSecurity from "./EditProfileSecurity";

const EditProfileTabs = () => {

    const [active, setActive] = useState("information");

  return (
    <>
    <div className="w-full flex items-center gap-1 black-bg p-1.5 rounded-sm">
      <button
        className={`w-full flex justify-center items-center gap-1 ${
          active === "information" ? "bg-zinc-900" : ""
        } text-base sm:text-lg py-1.5 rounded-sm cursor-pointer`}
        onClick={() => setActive("information")}
        >
        <LuUser /> Information
      </button>
      <button
        className={`w-full flex justify-center items-center gap-1 ${
          active === "security" ? "bg-zinc-900" : ""
        } text-base sm:text-lg py-1.5 rounded-sm cursor-pointer`}
        onClick={() => setActive("security")}
        >
        <MdOutlineLock /> Security
      </button>
    </div>
    {active === "information" && <EditProfileInfo />}
    {active === "security" && <EditProfileSecurity />}
    </>
  );
};

export default EditProfileTabs;
