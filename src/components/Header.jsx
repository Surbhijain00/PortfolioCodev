
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { CgMenuRight } from "react-icons/cg";
import { LuUser } from "react-icons/lu";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  let path = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const linkClass = (href) => {
    return path === href ? "text-blue-500" : "hover:text-blue-500 transition";
  };

  if(path.startsWith('/dashboard'))  {
    path = '/dashboard';
  }

  return (
    <header className="sticky top-0 left-0 z-[999] black-bg h-18 flex justify-between items-center border-b border-white/10 px-4 sm:px-12 lg:px-20">
      <div className="logo">
        <Link href="/">
          <h2 className="text-2xl font-semibold text-blue-500 text-shadow-blue">
            {"<"}Codev{" />"}
          </h2>
        </Link>
      </div>
      <span 
        className="sm:hidden text-4xl"
        onClick={() => setIsOpen(!isOpen)}>
        <CgMenuRight />
      </span>
      <nav className={`z-[999] fixed sm:static flex flex-col sm:flex-row items-center gap-10 sm:gap-5 text-2xl sm:text-lg top-18 transition-all duration-500 py-20 sm:py-0 sm:bg-transparent bg-zinc-900/80 backdrop-blur-md w-full sm:w-auto h-screen sm:h-auto ${isOpen ? 'right-0' : '-right-full'}`}>
        <Link href="/explore" className={linkClass("/explore")} onClick={() => setIsOpen(false)}>
          Explore
        </Link>
        {user ? (
          <div className="flex items-center gap-5">
            <Link href="/dashboard" className={linkClass("/dashboard")} onClick={() => setIsOpen(false)}>
              Dashboard
            </Link>
            <h3 className="hidden sm:flex items-center gap-1">
              <LuUser />
              {user?.username}
            </h3>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-2">
            <Link
              href="/login"
              className="px-4 text-xl sm:text-base py-1.5 border border-white/20 rounded-sm hover:bg-zinc-800 hover:border-transparent hover:scale-102 transition-all duration-300"
              onClick={() => setIsOpen(false)}

            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 text-xl sm:text-base py-1.5 bg-blue-500 border border-transparent rounded-sm hover:bg-blue-600 hover:scale-102 transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Signup
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
