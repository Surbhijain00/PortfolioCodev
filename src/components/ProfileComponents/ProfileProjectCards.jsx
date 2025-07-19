
import React from "react";
import { RiShareBoxFill } from "react-icons/ri";

const ProfileProjectCards = (props) => {
  return (
    <div className="w-full flex flex-col border-2 border-white/10 rounded-lg overflow-hidden hover:scale-101 duration-300">
      <div className="flex justify-between items-center p-3 border-b-2 border-white/10 bg-zinc-900">
        <h3 className="text-xl sm:text-2xl">{props.title}</h3>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <span className="text-sm opacity-75">Description</span>
          <p className="text-sm sm:text-base">{props.description}</p>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm opacity-75">Technologies</span>
          <div className="flex flex-wrap gap-2">
            {props.technologies.map((tech, idx) => {
              return (
                <span
                  key={idx}
                  className="text-sm py-1 px-4 border border-blue-500 rounded-full opacity-90"
                >
                  {tech}
                </span>
              );
            })}
          </div>
        </div>
        <a
          href={props.link}
          target="_blank"
          className="flex items-center gap-1 self-end pb-2 pr-2 text-blue-500 duration-300 hover:scale-102"
        >
          View Project <RiShareBoxFill />
        </a>
      </div>
    </div>
  );
};

export default ProfileProjectCards;
