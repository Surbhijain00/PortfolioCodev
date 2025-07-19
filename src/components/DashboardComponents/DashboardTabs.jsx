
'use client';

import React, { useState } from "react";
import { LuUser } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
import Profile from "./Profile";
import Codefolio from "./Codefolio";

const DashboardTabs = () => {

    const [active, setActive] = useState("profile");

  return (
    <>
    <div className="w-full flex items-center gap-1 black-bg p-1.5 rounded-sm">
      <button
        className={`w-full flex justify-center items-center gap-1 ${
          active === "profile" ? "bg-zinc-900" : ""
        } text-base sm:text-lg py-1.5 rounded-sm cursor-pointer`}
        onClick={() => setActive("profile")}
        >
        <LuUser /> Profile
      </button>
      <button
        className={`w-full flex justify-center items-center gap-1 ${
          active === "codefolio" ? "bg-zinc-900" : ""
        } text-base sm:text-lg py-1.5 rounded-sm cursor-pointer`}
        onClick={() => setActive("codefolio")}
        >
        <RxDashboard /> Codefolio
      </button>
    </div>
    {active === "profile" && <Profile />}
    {active === "codefolio" && <Codefolio />}
    </>
  );
};

export default DashboardTabs;
