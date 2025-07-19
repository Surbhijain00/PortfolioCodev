
import React from "react";

const HomepageInfoCards = (props) => {
  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-zinc-900 border border-blue-700/10 rounded-xl shadow-[0px_2px_10px_#1C2331]">
      <span className="text-2xl text-blue-500 bg-blue-500/10 p-3 rounded-full">
        {props.icon}
      </span>
      <h3 className="text-lg sm:text-xl">{props.heading}</h3>
      <p className="text-sm sm:text-base font-light opacity-75">
        {props.description}
      </p>
    </div>
  );
};

export default HomepageInfoCards;
