/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BarChart3 } from "lucide-react";
import { Header } from "./Header";
import  Sidebar  from './Sidebar'
import  SubNavbar  from "./SubNavbar"; // Importing SubNavbar

const DashboardLayout = ({ children }) => {
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Main Header */}
      <Header />

      {/* Main Layout: Sidebar + Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 overflow-auto">
          {/* Navigation */}
          <nav className="bg-white border-b border-gray-200 px-6 py-3">
            <div className="flex items-center space-x-8">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-[#8a3aff]/10 text-[#8a3aff] font-medium"
                        : "text-gray-600 hover:bg-gray-50 hover:text-[#8a3aff]"
                    }`}
                  >
                    <item.icon
                      className={`h-5 w-5 transition-colors duration-300 ${
                        isActive ? "text-[#8a3aff]" : "text-gray-400 group-hover:text-[#8a3aff]"
                      }`}
                    />
                    <span className="text-sm font-medium">{item.name}</span>
                    {isActive && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5  rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Page Content */}
          <main className="flex-1 p-6 bg-gray-50">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
