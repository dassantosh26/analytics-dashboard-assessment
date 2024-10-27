/** @format */

import { useContext } from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { BellDot, Moon, SunMoon } from "lucide-react";
import logo from "./../assets/logo.png";
import { AppContext } from "./context/AppContext";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

const Header = () => {
  const { isDarkMode, setIsDarkMode } = useContext(AppContext);
  const toggleDarkMode = () => {
    localStorage.setItem("darkMode", !isDarkMode);
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex justify-between items-center px-4 py-4 border-b border-gray-200 fixed top-0 w-full max-w-full bg-white dark:bg-[#020817] shadow-md z-50 dark:border-gray-700">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="text-black dark:text-white" />
        <img src={logo} alt="" className="w-32" />
      </div>
      <div className="flex items-center justify-center gap-2">
        {isDarkMode ? (
          <Moon
            onClick={toggleDarkMode}
            className="w-6 h-6 text-green-700 dark:text-green-700"
          />
        ) : (
          <SunMoon
            className="w-6 h-6 text-green-700 dark:text-green-700"
            onClick={toggleDarkMode}
          />
        )}
        <BellDot className="w-6 h-6 text-green-700 dark:text-green-700" />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Header;
