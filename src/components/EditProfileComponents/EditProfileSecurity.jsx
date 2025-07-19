
"use client";

import React from "react";
import { motion } from "motion/react";
import DeleteAccount from "./DeleteAccount";
import ChangePassword from "./ChangePassword";

const EditProfileSecurity = () => {
  return (
    <motion.div
      className="black-bg flex flex-col gap-8 p-4 sm:p-8 rounded-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl sm:text-3xl font-semibold">Change Password</h2>
      <ChangePassword />
      <div className="h-0.5 w-full bg-zinc-900" />
      <DeleteAccount />
    </motion.div>
  );
};

export default EditProfileSecurity;
