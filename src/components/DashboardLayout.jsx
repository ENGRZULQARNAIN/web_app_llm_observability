/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BarChart3 } from "lucide-react";
import { Header } from "./header";
import  Sidebar  from './Sidebar'
import  SubNavbar  from "./SubNavbar"; // Importing SubNavbar

const DashboardLayout = ({ children }) => {
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
  ];

  const isActive = (path) => location.pathname === path;

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
          {/* SubNavbar positioned here */}
          <SubNavbar />

          {/* Page Content */}
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
