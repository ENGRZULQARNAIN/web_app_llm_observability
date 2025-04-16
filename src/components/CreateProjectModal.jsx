import React, { useState } from "react";
import { X } from "lucide-react";

const CreateProjectModal = ({ onClose }) => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    projectName: "",
    testInterval: 0,
    baseUrl: "",
    targetUrl: "",
    contentType: "",
    payloadBody: "",
    files: [],
    benchmarkUrl: "",
    isActive: false,
  });

  const updateField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileUpload = (e) => {
    const uploaded = Array.from(e.target.files);
    updateField("files", [...formData.files, ...uploaded]);
  };

  const removeFile = (index) => {
    const updated = formData.files.filter((_, i) => i !== index);
    updateField("files", updated);
  };

  const handleCreate = () => {
    setStep(3); // Just switch to the confirmation screen
  };

  return (
    <div className="fixed z-10 pt-6 pb-6 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </button>

        {/* Step 1 */}
        {step === 1 && (
          <>
            <h2 className="text-lg font-semibold mb-4">Create your project</h2>

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
                placeholder="BaseUrl"
                onChange={(e) => updateField("baseUrl", e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Target URL</label>
              <input
                type="text"
                value={formData.targetUrl}
                placeholder="Target Url"
                onChange={(e) => updateField("targetUrl", e.target.value)}
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

            <div className="flex justify-between">
              <button disabled className="px-4 py-2 text-gray-400 cursor-not-allowed">Previous</button>
              <button onClick={() => setStep(2)} className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                Next
              </button>
            </div>
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <>
            <h2 className="text-lg font-semibold mb-4">Upload benchmark content</h2>

            <div className="mb-4">
              <div className="border border-dashed border-gray-300 p-4 rounded-md text-center cursor-pointer">
                <input type="file" multiple onChange={handleFileUpload} className="hidden" id="file-upload" />
                <label htmlFor="file-upload" className="text-gray-600 cursor-pointer">
                  Click to upload or drag and drop
                </label>
              </div>
            </div>

            {formData.files.map((file, index) => (
              <div key={index} className="mb-2 flex justify-between items-center bg-gray-100 px-3 py-2 rounded-md">
                <span className="text-sm">{file.name}</span>
                <button onClick={() => removeFile(index)} className="text-red-500">✕</button>
              </div>
            ))}

            <div className="mb-4">
              <label className="block text-sm font-medium">Benchmark Website URL</label>
              <input
                type="text"
                placeholder="Benchmark"
                value={formData.benchmarkUrl}
                onChange={(e) => updateField("benchmarkUrl", e.target.value)}
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

            <div className="flex justify-between">
              <button onClick={() => setStep(1)} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">
                Previous
              </button>
              <button onClick={handleCreate} className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                Create
              </button>
            </div>
          </>
        )}

        {/* Step 3 - Confirmation */}
        {step === 3 && (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-2 rounded-full">
                <svg
                  className="h-6 w-6 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-lg font-semibold">Your project has been created</h2>
            <p className="text-sm text-gray-500 mt-1">
              Check your spam and promotions folder if it doesn't appear in your main mailbox.
            </p>

            <div className="flex justify-end space-x-3 mt-6">
              <button onClick={onClose} className="px-4 py-2 bg-white border rounded-md text-gray-700 hover:bg-gray-100">
                Cancel
              </button>
              <button onClick={onClose} className="px-4 py-2 bg-[#8a3aff] text-white rounded-md hover:bg-[#7a2ff5]">
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateProjectModal;
