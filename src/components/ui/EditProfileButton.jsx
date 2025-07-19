import Link from "next/link";
import React from "react";

const EditProfileButton = () => {
  return (
    <Link
      href="/dashboard/edit-profile"
      className="flex justify-center w-full sm:w-56 py-1.5 bg-blue-500 border border-transparent rounded-sm hover:bg-blue-600 hover:scale-102 transition-all duration-300"
    >
      Edit Profile
    </Link>
  );
};

export default EditProfileButton;