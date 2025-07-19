
import React from "react";
import ProfileProjects from "./ProfileProjects";
import ProfileCodingPlatforms from "./ProfileCodingPlatforms";

const ProfileCodefolio = ({ profileData }) => {
  return (
    <div className="black-bg flex flex-col gap-5 p-4 sm:p-8 rounded-md">
      {profileData.skills.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-xl lg:text-2xl">Skills</h2>
          <div className="flex flex-wrap items-center gap-2">
            {profileData.skills.map((skill, idx) => {
              return (
                <span
                  key={idx}
                  className="text-sm sm:text-base py-1 px-4 border border-blue-500/50 rounded-lg"
                >
                  {skill}
                </span>
              );
            })}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-6">
        <ProfileCodingPlatforms platforms={profileData.platforms} />
        <ProfileProjects projects={profileData.projects} />
      </div>
    </div>
  );
};

export default ProfileCodefolio;
