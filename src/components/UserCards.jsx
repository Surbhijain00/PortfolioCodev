
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiShareBoxFill } from "react-icons/ri";
import { SlLocationPin } from "react-icons/sl";

const UserCards = (props) => {
  return (
    <div className="w-full flex flex-col border-2 border-white/10 rounded-lg overflow-hidden hover:scale-101 hover:border-blue-500/50 duration-300">
      <div className="flex items-center gap-2 p-3 border-b-2 border-white/10 bg-zinc-900">
        <div className="relative w-10 h-10 bg-white border border-blue-500 rounded-full overflow-hidden">
          <Image
            src={props.profilePhoto}
            alt="user-img"
            fill
            className="object-cover"
          />
        </div>
        <h3 className="text-xl">{props.username}</h3>
      </div>
      <div className="flex flex-col justify-between gap-2 p-4 flex-1">
        <div className="flex flex-col gap-4">
          <p className="text-sm opacity-90">{props.about}</p>
          {props.location && <p className="flex items-center gap-1 text-sm opacity-75"> <SlLocationPin />{props.location}</p>}
          <div className="flex flex-col gap-1">
            <p>{props.platforms.length} Coding Profiles</p>
            <p>{props.projects.length} Projects</p> 
          </div>
        </div>
        <Link
          href={`${process.env.NEXT_PUBLIC_API_URL}/explore/${props.username}`}
          className="flex items-center gap-1 self-end pb-2 pr-2 text-blue-500 duration-300 hover:scale-102"
        >
          View Profile <RiShareBoxFill />
        </Link>
      </div>
    </div>
  );
};

export default UserCards;
