
"use client";

import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import ProfileProjectCards from "./ProfileProjectCards";

const ProfileProjects = ({ projects }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = projects.filter((project) => {
    const term = searchTerm.toLowerCase();
    const name = project.title.toLowerCase();
    const technologies = project.technologies.join(" ").toLowerCase();
    return name.includes(term) || technologies.includes(term);
  });

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl lg:text-2xl">Projects</h2>
      {projects.length > 0 ? (
        <>
          <div className="w-full relative">
            <span className="absolute top-1/2 -translate-y-1/2 left-3 text-lg opacity-50">
              <IoSearch />
            </span>
            <input
              className="w-full border border-white/10 rounded-sm py-2.5 pl-9 outline-none focus:border-blue-500 placeholder:font-light"
              type="text"
              name="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-8">
            {filteredProjects.map(project => {
              return (
                <ProfileProjectCards
                  key={project._id}
                  title={project.title}
                  description={project.description}
                  link={project.link}
                  technologies={project.technologies}
                />
              );
            })}
          </div>
        </>
      ) : (
        <h2 className="text-xl text-center opacity-75">No Projects To Show!</h2>
      )}
    </div>
  );
};

export default ProfileProjects;
