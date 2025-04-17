import { useState, useRef, useEffect } from "react";
import { Bell, HelpCircle, ChevronDown } from "lucide-react";
import { FaUser } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import Toggle from '../../src/components/ui/Togglebutton'
import { BsLightningChargeFill } from "react-icons/bs";
import img from '../pages/logo.png'

export function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showHelpPanel, setShowHelpPanel] = useState(false);

  const notificationRef = useRef(null);
  const userMenuRef = useRef(null);
  const dropdownRef = useRef(null);
  const helpPanelRef = useRef(null);

  // Function to close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (helpPanelRef.current && !helpPanelRef.current.contains(event.target)) {
        setShowHelpPanel(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between px-2  border-b border-gray-200">
      
      {/* Logo */}
      <div className="flex items-center">
        <div className="flex items-center mr-2">
        <img src={img} alt="" className="w-16 h-16" />
          <span className="text-[#8a3aff] font-bold text-lg">OBAM AI</span>
          <span className="text-gray-500 text-xs ml-1">LLM OBSERVABILITY TOOL</span>
        </div>
      </div>

      {/* Icons & Menus */}
      <div className="flex items-center gap-4">
        {/* Help Icon with Panel */}
        <div className="relative" ref={helpPanelRef}>
          <button
            onClick={() => {
              setShowHelpPanel(!showHelpPanel);
              setShowNotifications(false);
              setShowUserMenu(false);
            }}
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
          >
            <HelpCircle className="h-5 w-5" />
          </button>

          {/* Help Panel (Edit/Make Active) */}
          {showHelpPanel && (
            <div className="absolute z-20 right-0 mt-2 w-56 bg-white shadow-lg rounded-md p-4">
              <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 w-full mb-2">
                <FiEdit className="w-5 h-5" />
                <span>Edit</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-700  w-full gap-8">
              <span className="text-md text-nowrap">Make It active</span>
                <Toggle/>
              </button>
            </div>
          )}
        </div>

        {/* Notification Icon */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
              setShowHelpPanel(false);
            }}
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
          >
            <Bell className="h-5 w-5" />
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute z-10 right-0 mt-2 w-64 bg-white shadow-lg rounded-md p-3">
              <h3 className="text-gray-500 text-sm mb-2">Notifications</h3>
              <div className="bg-gray-100 p-2 rounded-md mb-2">
                <strong>Notification 1</strong>{" "}
                <span className="text-xs text-gray-400">23 mins ago</span>
                <p className="text-sm text-gray-600">
                  The latest industry news, updates, and info.
                </p>
              </div>
              <div className="bg-gray-100 p-2 rounded-md">
                <strong>Notification 2</strong>{" "}
                <span className="text-xs text-gray-400">45 mins ago</span>
                <p className="text-sm text-gray-600">
                  Your system update is complete.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
              setShowHelpPanel(false);
            }}
            className="h-8 w-8 rounded-full overflow-hidden border-2 border-gray-300"
          >
            <FaUser className="text-center mx-auto" />
          </button>

          {/* User Menu */}
          {showUserMenu && (
            <div className="absolute z-10 right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-3">
              <div className="flex items-center gap-2">
                <FaUser />
                <div>
                  <h3 className="text-sm font-semibold">Olivia Rye</h3>
                  <p className="text-xs text-gray-500">olivia@untitled.ai</p>
                </div>
              </div>
              <div className="mt-3">
                <button className="block w-full text-left px-3 py-2 hover:bg-gray-100 text-sm">
                  View profile
                </button>
                <button className="block w-full text-left px-3 py-2 hover:bg-gray-100 text-sm">
                  Settings
                </button>
                <button className="block w-full text-left px-3 py-2 hover:bg-gray-100 text-sm">
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}