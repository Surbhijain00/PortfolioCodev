
import React from "react";
import axios from "axios";
import Image from "next/image";
import { RiShareBoxFill } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import { notifyError, notifySuccess } from "../ui/Toast";

const getPlatformDetails = (platform, username) => {
  switch (platform) {
    case "LeetCode":
      return `https://leetcode.com/${username}`;
    case "Codeforces":
      return `https://codeforces.com/profile/${username}`;
    case "CodeChef":
      return `https://www.codechef.com/users/${username}`;
    case "HackerRank":
      return `https://www.hackerrank.com/profile/${username}`;
    case "HackerEarth":
      return `https://www.hackerearth.com/@${username}`;
    case "GeeksforGeeks":
      return `https://geeksforgeeks.org/user/${username}`;
    default:
      return "#";
  }
};

const DashboardPlatformCards = (props) => {
  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/platforms/${id}`);
      props.setPlatforms(prev => prev.filter(platform => platform._id !== id));
      notifySuccess(response.data.message);
    } catch (err) {
      notifyError(err.response.data.message);
    }
  }

  return (
    <div className="w-full flex flex-col border-2 border-white/10 rounded-lg overflow-hidden hover:scale-101 duration-300">
      <div className="flex justify-between items-center p-3 border-b-2 border-white/10 bg-zinc-900">
        <div className="flex items-center gap-2">
          <div className="relative w-10 h-10 bg-white rounded-full overflow-hidden">
            <Image
              src={`/platforms/${props.platform}.svg`}
              alt={props.platform}
              fill
              className="p-1"
            />
          </div>
          <h3 className="text-xl">{props.platform}</h3>
        </div>
        <span
          className="p-2 rounded-sm text-xl hover:text-[#E63E3E] hover:bg-[#2F1E1E] cursor-pointer duration-200"
          onClick={() => deleteHandler(props.id)}
        >
          <RxCross1 />
        </span>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <span className="text-sm opacity-75">Username</span>
          <p>{props.username}</p>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm opacity-75">Highlights</span>
          <p>{props.highlights}</p>
        </div>
        <a
          href={getPlatformDetails(props.platform, props.username)}
          target="_blank"
          className="flex items-center gap-1 self-end pb-2 pr-2 text-blue-500 duration-300 hover:scale-102"
        >
          View Profile <RiShareBoxFill />
        </a>
      </div>
    </div>
  );
};

export default DashboardPlatformCards;
