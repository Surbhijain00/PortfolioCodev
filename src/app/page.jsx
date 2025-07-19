
import Footer from "@/components/Footer";
import Divider from "@/components/ui/Divider";
import HomepageInfoCards from "@/components/ui/HomepageInfoCards";
import MarqueeBanner from "@/components/ui/MarqueeBanner";
import { getUserFromToken } from "@/lib/auth";
import Link from "next/link";
import React from "react";
import { FiShare2 } from "react-icons/fi";
import { MdArrowOutward } from "react-icons/md";
import { RiCodeSSlashFill, RiPencilLine } from "react-icons/ri";

const Home = async () => {

  const user = await getUserFromToken();
  const InfoCards = [
    {
      icon: <RiPencilLine />,
      heading: "Create Your Profile",
      description:
        "Customize your profile and add details about your coding journey.",
    },
    {
      icon: <RiCodeSSlashFill />,
      heading: "Connect Your Coding Profiles",
      description:
        "Add usernames from LeetCode, Codeforces, HackerRank, and many more.",
    },
    {
      icon: <FiShare2 />,
      heading: "Share Your Skills",
      description:
        "Share your unique profile URL with recruiters, friends, or on social media and let people find the best of you.",
    },
  ];

  return (
    <>
      <main className="text-center flex flex-col items-center gap-6 sm:gap-10 py-12 sm:py-16 lg:py-20 px-4 sm:px-12 lg:px-20">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-blue-500 text-shadow-blue">
          {"<"}Codev{" />"}
        </h1>
        <div className="flex flex-col gap-2">
          <p className="text-base sm:text-lg lg:text-xl opacity-75 font-light">
            Showcase all your coding skills at one place.
          </p>
          <p className="text-base sm:text-lg lg:text-xl opacity-75 font-light">
            Connect, Share, and discover exceptional coders and developers.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={user ? "/dashboard" : "/signup"}
            className="flex items-center gap-1 px-4 sm:px-6 text-sm sm:text-base py-2.5 bg-blue-500 border border-transparent rounded-sm hover:bg-blue-600 hover:scale-102 transition-all duration-300"
          >
            {user ? <>Dashboard <MdArrowOutward /></> : <>Get Started <MdArrowOutward /></>}
          </Link>
          <Link
            href="/explore"
            className="px-4 sm:px-6 text-sm sm:text-base py-2.5 border border-white/20 rounded-sm hover:bg-zinc-800 hover:border-transparent hover:scale-102 transition-all duration-300"
          >
            Explore Profiles
          </Link>
        </div>
        <div className="flex flex-col items-center gap-8 mt-5">
          <h2 className="text-xl sm:text-2xl">How It Works ?</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {InfoCards.map((card, idx) => {
              return (
                <HomepageInfoCards
                  key={idx}
                  icon={card.icon}
                  heading={card.heading}
                  description={card.description}
                />
              );
            })}
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 mt-5">
          <h2 className="text-xl sm:text-2xl">Supported Platforms</h2>
          <p className="text-base opacity-75 font-light mb-5">
            Connect all your coding profiles in one showcase
          </p>
          <Divider />
          <MarqueeBanner />
          <Divider />
        </div>
        <div className="flex flex-col gap-6">
          <h2 className="text-xl sm:text-2xl">
            Ready To Showcase Your Skills ?
          </h2>
          <p className="text-base opacity-75 font-light">
            Join Codev today and create your developer profile in minutes.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
