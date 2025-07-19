
import DashboardTabs from "@/components/DashboardComponents/DashboardTabs";
import React from "react";

export const metadata = {
  title: "Codev - Dashboard",
  description:
    "Access your personalized Codev dashboard to manage your coding profiles, showcase your projects and skills, and share your developer portfolio with others.",
};

const Dashboard = () => {
  return (
    <main className="px-4 sm:px-12 lg:px-48 py-6">
      <div className="flex flex-col gap-4 sm:gap-6 w-full bg-zinc-900 p-4 sm:p-6 rounded-md border border-white/5">
        <h1 className="text-4xl lg:text-5xl font-medium">Dashboard</h1>
        <DashboardTabs />
      </div>
    </main>
  );
};

export default Dashboard;
