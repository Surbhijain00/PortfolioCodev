
"use client";

import axios from "axios";
import React, { useState } from "react";
import { notifyError, notifySuccess } from "../ui/Toast";

const ProjectForm = ({ setIsOpen, setProjects }) => {
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    link: "",
    technologies: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, projectData, { withCredentials: true });
      const newProject = response.data.addedProject;
      setProjects(prev => [...prev, newProject]);
      setIsOpen(false);
      notifySuccess(response.data.message);
    } catch (err) {
      notifyError(err.response.data.message);
    }
  };

  return (
    <div className="flex flex-col gap-6 rounded-md p-4 sm:p-8 border-2 border-white/10">
      <h2 className="text-xl">Upload a Project</h2>
      <form onSubmit={submitHandler} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            value={projectData.title}
            onChange={changeHandler}
            placeholder="Project Title"
            required
            className="black-bg border border-white/10 rounded-md p-2 outline-none focus:border-blue-500"
          />
          <input
            type="text"
            name="link"
            value={projectData.link}
            onChange={changeHandler}
            placeholder="GitHub / Live Link"
            required
            className="black-bg border border-white/10 rounded-md p-2 outline-none focus:border-blue-500"
          />
        </div>

        <input
          type="text"
          name="technologies"
          value={projectData.technologies}
          onChange={changeHandler}
          placeholder="Technologies (comma-separated)"
          required
          className="black-bg w-full border border-white/10 rounded-md p-2 outline-none focus:border-blue-500"
        />

        <textarea
          name="description"
          value={projectData.description}
          onChange={changeHandler}
          placeholder="Project Description"
          rows={4}
          required
          className="w-full border border-white/10 rounded-md p-2 outline-none focus:border-blue-500 bg-transparent resize-none"
        />

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 rounded-sm hover:bg-blue-600 hover:scale-102 transition-all duration-300 cursor-pointer"
        >
          Upload Project
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
