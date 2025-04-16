import { HelpCircle, Bell } from "lucide-react";
import { NavLink } from "react-router-dom"; // Using React Router

const SubNavbar = () => {
  return (
    <header className="flex items-center justify-between p-2 border-b border-[#e9eaeb] bg-white">
      {/* Navigation Links */}
      <div className="flex space-x-6">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `font-bold  ${
              isActive
  ? "text-[#8a3aff] bg-gray-50 p-1 rounded-sm transition-all duration-300 ease-in-out"
  : "text-[#717680] transition-all duration-300 ease-in-out"

            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `font-bold  ${
              isActive
              ? "text-[#8a3aff] bg-gray-50 p-1 rounded-sm transition-all duration-300 ease-in-out"
              : "text-[#717680] transition-all duration-300 ease-in-out"
            
            }`
          }
        >
          Analytics
        </NavLink>
      </div>
      
    </header>
  );
};

export default SubNavbar;
