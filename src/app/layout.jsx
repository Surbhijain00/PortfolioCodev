
import "./globals.css";
import Header from "@/components/Header";
import { ReduxProvider } from "./provider";
import Toast from "@/components/ui/Toast";

export const metadata = {
  title: "Codev - Developer Portfolio Hub",
  description: "Codev is a developer portfolio platform that lets you showcase your coding profiles, projects, and skills—all in one place. Instantly connect your GitHub, LeetCode, Codeforces, and more to build a powerful, sharable profile that replaces cluttered resume links.",
  icons: {
    icon: '/favicon.png'
  }
};

export default async function RootLayout({
  children,
}) {

  return (
    <html lang="en">
      <body
        className={`antialiased font-mulish`}
      > 
      <Toast />
        <ReduxProvider>
          <Header />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
