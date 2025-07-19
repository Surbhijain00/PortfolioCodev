
import React from "react";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { RiShareBoxFill } from "react-icons/ri";
import { notifyError, notifySuccess } from "../ui/Toast";

const DashboardProjectCards = (props) => {
  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}`
      );
      props.setProjects((prev) => prev.filter((project) => project._id !== id));
      notifySuccess(response.data.message);
    } catch (err) {
      notifyError(err.response.data.message);
    }
  };

  return (
    <div className="w-full flex flex-col border-2 border-white/10 rounded-lg overflow-hidden hover:scale-101 duration-300">
      <div className="flex justify-between items-center p-3 border-b-2 border-white/10 bg-zinc-900">
        <h3 className="text-xl sm:text-2xl">{props.title}</h3>
        <span
          className="p-2 rounded-sm text-xl hover:text-[#E63E3E] hover:bg-[#2F1E1E] cursor-pointer duration-200"
          onClick={() => deleteHandler(props.id)}
        >
          <RxCross1 />
        </span>
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

export default DashboardProjectCards;
