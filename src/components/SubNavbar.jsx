import { HelpCircle, Bell, LayoutDashboard, BarChart2, FileText, Settings, Search } from "lucide-react";
import { NavLink } from "react-router-dom";

const SubNavbar = () => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 ease-in-out ${
                isActive
                  ? "text-[#8a3aff] bg-[#8a3aff]/10 font-medium"
                  : "text-gray-600 hover:text-[#8a3aff] hover:bg-gray-50"
              }`
            }
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </NavLink>
          
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 ease-in-out ${
                isActive
                  ? "text-[#8a3aff] bg-[#8a3aff]/10 font-medium"
                  : "text-gray-600 hover:text-[#8a3aff] hover:bg-gray-50"
              }`
            }
          >
            <BarChart2 className="h-4 w-4" />
            <span>Analytics</span>
          </NavLink>
          
          <NavLink
            to="/documentation"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 ease-in-out ${
                isActive
                  ? "text-[#8a3aff] bg-[#8a3aff]/10 font-medium"
                  : "text-gray-600 hover:text-[#8a3aff] hover:bg-gray-50"
              }`
            }
          >
            <FileText className="h-4 w-4" />
            <span>Documentation</span>
          </NavLink>
          
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 ease-in-out ${
                isActive
                  ? "text-[#8a3aff] bg-[#8a3aff]/10 font-medium"
                  : "text-gray-600 hover:text-[#8a3aff] hover:bg-gray-50"
              }`
            }
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </NavLink>
        </div>
        
        {/* Quick Actions */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Quick search..."
              className="w-56 pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8a3aff]/30 focus:border-[#8a3aff]"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          
          <button className="p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-[#8a3aff] transition-colors">
            <HelpCircle className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubNavbar;
