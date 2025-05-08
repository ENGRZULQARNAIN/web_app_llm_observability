import React, { useState, useEffect } from "react";
import { MoreVertical, Plus, Edit, Trash2 } from "lucide-react";
import CreateProjectModal from "./CreateProjectModal";

const ACCESS_TOKEN = "F30DFC";

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [editModal, setEditModal] = useState({ open: false, project: null });
  const [deleteModal, setDeleteModal] = useState({ open: false, project: null, error: null });
  const menuRef = React.useRef();

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://obamai.us-east-1.elasticbeanstalk.com/api/v1/all-projects/', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_token: ACCESS_TOKEN
        })
      });
      const data = await response.json();
      if (data.status === "ok") {
        setProjects(data.projects);
        if (data.projects.length > 0) {
          setSelectedProject(data.projects[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (menuOpenId === null) return;
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpenId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpenId]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleMenuToggle = (projectId) => {
    setMenuOpenId(menuOpenId === projectId ? null : projectId);
  };

  const handleEdit = (project) => {
    setEditModal({ open: true, project });
    setMenuOpenId(null);
  };

  const handleEditSubmit = async (formData) => {
    const payload = {
      project: {
        project_name: formData.projectName,
        content_type: formData.contentType,
        target_url: formData.targetUrl,
        end_point: '',
        header_keys: ["string"],
        header_values: ["string"],
        payload_body: formData.payloadBody,
        is_active: formData.isActive,
        test_interval_in_hrs: Number(formData.testInterval),
        benchmark_knowledge_id: "string",
      },
      token_data: {
        access_token: ACCESS_TOKEN
      }
    };
    try {
      await fetch(`http://obamai.us-east-1.elasticbeanstalk.com/api/v1/update-project/${editModal.project.project_id}`, {
        method: 'PUT',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      setEditModal({ open: false, project: null });
      fetchProjects();
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const handleToggleActive = (project) => {
    // Implement toggle active logic here
    setMenuOpenId(null);
  };

  const handleDelete = (project) => {
    setDeleteModal({ open: true, project, error: null });
    setMenuOpenId(null);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.project) return;
    try {
      const response = await fetch(`http://obamai.us-east-1.elasticbeanstalk.com/api/v1/delete-project/${deleteModal.project.project_id}`, {
        method: 'DELETE',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ access_token: ACCESS_TOKEN })
      });
      if (response.status === 200) {
        setDeleteModal({ open: false, project: null, error: null });
        fetchProjects();
      } else {
        const data = await response.json();
        setDeleteModal((prev) => ({ ...prev, error: data.message || 'Failed to delete project.' }));
      }
    } catch (error) {
      setDeleteModal((prev) => ({ ...prev, error: 'Failed to delete project.' }));
    }
  };

  return (
    <aside className="w-72 min-h-screen bg-gradient-to-b from-[#f6f3ff] to-[#f9f5ff] border-r border-gray-200 flex flex-col">
      {/* Section Title */}
      <div className="px-6 pt-8 pb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-[#8a3aff] tracking-wide">Projects</h2>
          <span className="text-xs font-medium text-[#8a3aff] bg-[#8a3aff]/10 px-2 py-1 rounded-full">
            {projects.length} Active
          </span>
        </div>
        <div className="h-px bg-gradient-to-r from-[#8a3aff] to-transparent" />
      </div>

      {/* Projects List */}
      <div className="flex-1 px-4 space-y-3 overflow-y-auto pb-4 scrollbar-thin scrollbar-thumb-[#8a3aff]/20 scrollbar-track-transparent">
        {projects.map((project) => (
          <div
            key={project.project_id}
            onClick={() => handleProjectClick(project)}
            ref={menuOpenId === project.project_id ? menuRef : null}
            className={`group relative flex items-center justify-between gap-2 p-4 rounded-xl transition-all duration-300 cursor-pointer
              ${selectedProject?.project_id === project.project_id 
                ? 'bg-white border-[#8a3aff] shadow-lg shadow-[#8a3aff]/10 scale-[1.02]' 
                : 'bg-white/50 border-gray-100 hover:bg-white hover:shadow-md hover:scale-[1.01]'
              } border`}
          >
            <div className="flex items-center gap-3 w-4/5">
              <div className={`h-3 w-3 rounded-full transition-all duration-300 ${
                project.is_active 
                  ? 'bg-[#8a3aff] ring-4 ring-[#8a3aff]/20' 
                  : 'bg-gray-300'
              }`} />
              <div className="flex flex-col">
                <span className={`truncate font-medium text-gray-800 group-hover:text-[#8a3aff] transition-colors duration-300 ${
                  selectedProject?.project_id === project.project_id ? 'text-[#8a3aff]' : ''
                }`}>
                  {project.project_name}
                </span>
                <span className="text-xs text-gray-500 truncate">
                  {project.target_url || 'No URL set'}
                </span>
              </div>
            </div>
            <button
              className="p-1.5 rounded-full hover:bg-[#f6f3ff] transition-colors duration-300"
              onClick={e => {
                e.stopPropagation();
                handleMenuToggle(project.project_id);
              }}
            >
              <MoreVertical className="h-5 w-5 text-gray-400 group-hover:text-[#8a3aff] transition-colors duration-300" />
            </button>

            {/* Dropdown menu */}
            {menuOpenId === project.project_id && (
              <div className="absolute right-2 top-14 z-20 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-2 flex flex-col gap-1 animate-fade-in">
                <button
                  className="flex items-center gap-2 px-4 py-2.5 hover:bg-[#f6f3ff] text-gray-700 rounded-md transition-colors duration-200"
                  onClick={e => {
                    e.stopPropagation();
                    handleEdit(project);
                  }}
                >
                  <Edit className="h-4 w-4" /> Edit
                </button>
                <div className="flex items-center gap-2 px-4 py-2.5">
                  <span className="text-gray-700">Make It active</span>
                  <label className="ml-auto inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={project.is_active}
                      onChange={e => {
                        e.stopPropagation();
                        handleToggleActive(project);
                      }}
                    />
                    <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-[#8a3aff] after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4 after:shadow-md relative"></div>
                  </label>
                </div>
                <button
                  className="flex items-center gap-2 px-4 py-2.5 hover:bg-red-50 text-red-600 rounded-md transition-colors duration-200"
                  onClick={e => {
                    e.stopPropagation();
                    handleDelete(project);
                  }}
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Add Button */}
        <div className="px-6 pb-6 pt-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-[#8a3aff] to-[#b18cff] text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-lg group"
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/20 mr-2 group-hover:bg-white/30 transition-colors duration-300">
              <Plus className="h-5 w-5" />
            </span>
            Add Project
          </button>
        </div>
      </div>
      {/* Modals */}
      {isModalOpen && <CreateProjectModal onClose={() => setIsModalOpen(false)} />}
      {editModal.open && (
        <CreateProjectModal
          onClose={() => setEditModal({ open: false, project: null })}
          isEdit={true}
          initialData={editModal.project}
          onSubmit={handleEditSubmit}
        />
      )}
      {/* Delete confirmation modal */}
      {deleteModal.open && (
        <div className="fixed z-20 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[350px] relative">
            <h2 className="text-lg font-semibold mb-4 text-red-600">Delete Project</h2>
            <p className="mb-4">Are you sure you want to delete <span className="font-bold">{deleteModal.project?.project_name}</span>?</p>
            {deleteModal.error && <div className="mb-2 text-red-500 text-sm">{deleteModal.error}</div>}
            <div className="flex justify-end space-x-3 mt-6">
              <button onClick={() => setDeleteModal({ open: false, project: null, error: null })} className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300">
                Cancel
              </button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
