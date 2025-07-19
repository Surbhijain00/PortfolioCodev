
'use client';

import { login, logout } from "@/redux/features/authSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const ReduxInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
      const getUser = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, { withCredentials: true });
          if(response.data === null) {
            dispatch(logout());
            return;
          }
          dispatch(login(response.data));
        } catch (err) {
          console.error('User not logged in or token expired');
          dispatch(logout());
        }
      };
      
      getUser();
    }, [dispatch]);
    
  return null;
};

export default ReduxInitializer;
