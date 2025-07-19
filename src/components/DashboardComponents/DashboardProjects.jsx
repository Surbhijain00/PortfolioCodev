
"use client";

import React, { useEffect, useState } from "react";
import { RiAddLargeLine } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import ProjectForm from "./ProjectForm";
import axios from "axios";
import DashboardProjectCards from "./DashboardProjectCards";
import { IoSearch } from "react-icons/io5";
import { notifyError } from "../ui/Toast";

const DashboardProjects = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects`,
        { withCredentials: true }
        );
        setProjects(response.data);
      } catch (err) {
        notifyError(err.response.data.message);
      }
    };
    getProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    const term = searchTerm.toLowerCase();
    const name = project.title.toLowerCase();
    const technologies = project.technologies.join(' ').toLowerCase();
    return (
      name.includes(term) || technologies.includes(term)
    );
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex flex-row justify-between items-center gap-2">
        <h2 className="text-xl lg:text-2xl">Projects</h2>
        <button
          className={`px-4 py-1.5 ${
            isOpen
              ? "bg-[#2F1E1E] text-[#E63E3E]"
              : "bg-blue-500 hover:bg-blue-600"
          } border border-transparent rounded-sm hover:scale-102 transition-all duration-200 cursor-pointer`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <span className="flex items-center gap-1">
              <RxCross1 /> Cancel
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <RiAddLargeLine /> Add Projects
            </span>
          )}
        </button>
      </div>
      {isOpen && <ProjectForm setIsOpen={setIsOpen} setProjects={setProjects} />}
      <div className='w-full relative'>
          <span className="absolute top-1/2 -translate-y-1/2 left-3 text-lg opacity-50">
            <IoSearch />
          </span>
          <input 
            className="w-full border border-white/10 rounded-sm py-2.5 pl-9 outline-none focus:border-blue-500 placeholder:font-light"
            type="text"
            name='search'
            placeholder='Search...' 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
      </div>
      <div className="flex flex-col gap-8">
        {filteredProjects.map(project => {
          return (
            <DashboardProjectCards
            key={project._id}
            id={project._id}
            title={project.title}
            description={project.description}
            link={project.link}
            technologies={project.technologies}
            setProjects={setProjects}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DashboardProjects;
