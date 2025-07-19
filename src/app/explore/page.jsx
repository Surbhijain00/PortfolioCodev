
"use client";

import UserCards from "@/components/UserCards";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { motion } from "motion/react";
import Loader from "@/components/ui/Loader";
import { notifyError } from "@/components/ui/Toast";

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    const getProfiles = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
          { withCredentials: true }
        );
        setProfiles(response.data);
      } catch (err) {
        notifyError(err.response.data.message);
      }
    };
    getProfiles();
  }, []);

  if (!profiles) return <Loader />;

  const filteredProfiles = profiles.filter((profile) => {
    const query = searchTerm.toLowerCase();
    const username = profile.username.toLowerCase();
    const skills =
      profile.skills.map((skill) => skill.toLowerCase()).join(" ") || "";

    return username.includes(query) || skills.includes(query);
  });

  return (
    <main className="flex flex-col gap-6 py-10 px-4 sm:px-12 lg:px-20">
      <h1 className="text-2xl sm:text-4xl font-medium">
        Find Coders & Developers
      </h1>
      <div className="w-full relative">
        <span className="absolute top-1/2 -translate-y-1/2 left-3 text-lg opacity-50">
          <IoSearch />
        </span>
        <input
          className="w-full border border-white/10 rounded-sm py-2.5 pl-9 outline-none focus:border-blue-500 placeholder:font-light"
          type="text"
          name="search"
          placeholder="Search by name or skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {profiles.length > 0 ? (
        <motion.div
          className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {filteredProfiles.map((profile) => {
            return (
              <UserCards
                key={profile._id}
                username={profile.username}
                profilePhoto={profile.profilePhoto}
                about={profile.about}
                location={profile.location}
                projects={profile.projects}
                platforms={profile.platforms}
              />
            );
          })}
        </motion.div>
      ) : (
        <h2 className="text-xl text-center opacity-75">
          No Profiles To Show!
        </h2>
      )}
    </main>
  );
};

export default Explore;
