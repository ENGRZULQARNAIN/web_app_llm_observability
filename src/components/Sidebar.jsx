import React, { useState } from "react";
import { MoreVertical, Plus } from "lucide-react";
import CreateProjectModal from "./CreateProjectModal"; // Import modal component
import Toggle from '../components/ui/Togglebutton'

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <aside className="w-64 border-r border-gray-200">
      <div className="p-2 flex justify-around items-center my-4">
        <h2 className=" text-md text-gray-700">University Website Bot</h2>
        <button className="w-13 h-4 mt-2 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100">
          {/* <MoreVertical className="h-5 w-5" /> */}
          <Toggle/>
        </button>
      </div>
      <div className="px-4 pb-4">
        <button
          onClick={() => setIsModalOpen(true)} // Open modal on click
          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-[#f9f5ff] text-[#8a3aff] rounded-md hover:bg-[#f0e8ff]"
        >
          <Plus className="h-4 w-4" />
          Add
        </button>
      </div>

      {/* Render the modal when isModalOpen is true */}
      {isModalOpen && <CreateProjectModal onClose={() => setIsModalOpen(false)} />}
    </aside>
  );
};

export default Sidebar;
