import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const CreateProjectModal = ({ onClose, isEdit = false, initialData = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    projectName: "",
    testInterval: 0,
    baseUrl: "",
    endPoint: "",
    contentType: "",
    payloadBody: "",
    isActive: false,
  });

  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        projectName: initialData.project_name || "",
        testInterval: initialData.test_interval_in_hrs || 0,
        baseUrl: initialData.target_url || "",
        endPoint: initialData.end_point || "",
        contentType: initialData.content_type || "",
        payloadBody: initialData.payload_body || "",
        isActive: initialData.is_active || false,
      });
    }
  }, [isEdit, initialData]);

  const updateField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleCreateOrEdit = () => {
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed z-10 pt-6 pb-6 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-semibold mb-4">{isEdit ? "Edit project" : "Create your project"}</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium">Project Name</label>
          <input
            type="text"
            placeholder="e.g project name"
            value={formData.projectName}
            onChange={(e) => updateField("projectName", e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Test Intervals</label>
          <input
            type="range"
            min="0"
            max="25"
            value={formData.testInterval}
            onChange={(e) => updateField("testInterval", e.target.value)}
            className="w-full"
          />
          <p className="text-sm">{formData.testInterval} Hr</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Base URL</label>
          <input
            type="text"
            value={formData.baseUrl}
            placeholder="Base URL"
            onChange={(e) => updateField("baseUrl", e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">End Point</label>
          <input
            type="text"
            value={formData.endPoint}
            placeholder="End Point"
            onChange={(e) => updateField("endPoint", e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Content Type</label>
          <select
            value={formData.contentType}
            onChange={(e) => updateField("contentType", e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-md"
          >
            <option value="">Select</option>
            <option value="JSON">JSON</option>
            <option value="XML">XML</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Payload Body</label>
          <textarea
            value={formData.payloadBody}
            onChange={(e) => updateField("payloadBody", e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={formData.isActive}
            onChange={(e) => updateField("isActive", e.target.checked)}
            className="mr-2"
          />
          <label className="text-sm">Make it active</label>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 bg-white border rounded-md text-gray-700 hover:bg-gray-100">
            Cancel
          </button>
          <button onClick={handleCreateOrEdit} className="px-4 py-2 bg-[#8a3aff] text-white rounded-md hover:bg-[#7a2ff5]">
            {isEdit ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;
