
"use client";

import React from "react";
import toast, { Toaster } from "react-hot-toast";

export const notifySuccess = (message) => {
  toast.success(message, {
    style: {
      border: '1px solid #155DFC',
      padding: '6px',
      background: '#0d1117',  
      color: '#79b8ff',       
    },
    iconTheme: {
      primary: '#155DFC',     
      secondary: '#FAFAFA',    
    },
  });
};

export const notifyError = (message) => toast.error(message);

const Toast = () => {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Toast;
