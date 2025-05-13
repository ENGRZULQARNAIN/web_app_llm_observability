import React, { useState, useEffect } from "react";
import { X, ChevronRight, ChevronLeft, Upload, FileText, File, Trash2 } from "lucide-react";

const CreateProjectModal = ({ onClose, isEdit = false, initialData = {}, onSubmit }) => {
  const [step, setStep] = useState(1); // Always start at step 1
  const [formData, setFormData] = useState({
    projectName: "",
    testInterval: 0,
    baseUrl: "",
    endPoint: "",
    contentType: "",
    payloadBody: "",
    isActive: false,
    files: [],
  });
  
  // For file drag and drop
  const [isDragging, setIsDragging] = useState(false);

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
        files: initialData.files || [],
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

  const nextStep = () => {
    setStep(current => current + 1);
  };

  const prevStep = () => {
    setStep(current => current - 1);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    addFiles(selectedFiles);
  };

  const addFiles = (selectedFiles) => {
    // Filter for supported file types
    const supportedFiles = selectedFiles.filter(file => 
      file.type === "text/plain" || 
      file.type === "application/pdf" || 
      file.type === "text/csv" || 
      file.name.endsWith('.txt') || 
      file.name.endsWith('.pdf') || 
      file.name.endsWith('.csv')
    );

    if (supportedFiles.length > 0) {
      setFormData(prev => ({
        ...prev,
        files: [...prev.files, ...supportedFiles]
      }));
    }
  };

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      addFiles(files);
    }
  };

  const getFileIcon = (fileName) => {
    if (fileName.endsWith('.pdf')) return <FileText className="text-red-500" />;
    if (fileName.endsWith('.txt')) return <File className="text-blue-500" />;
    if (fileName.endsWith('.csv')) return <FileText className="text-green-500" />;
    return <File />;
  };

  // If in edit mode, render the simpler UI
  if (isEdit) {
    return (
      <div className="fixed z-10 pt-6 pb-6 inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative">
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-semibold mb-4">Edit project</h2>
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
              Update
            </button>
          </div>
        </div>
      </div>
    );
  }

  // For new project creation, keep the multi-step UI
  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-6">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 1 ? 'bg-[#8a3aff] text-white' : 'bg-gray-200 text-gray-600'}`}>1</div>
        <div className={`h-1 w-10 ${step > 1 ? 'bg-[#8a3aff]' : 'bg-gray-200'}`}></div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 2 ? 'bg-[#8a3aff] text-white' : step > 2 ? 'bg-[#8a3aff] text-white' : 'bg-gray-200 text-gray-600'}`}>2</div>
        <div className={`h-1 w-10 ${step > 2 ? 'bg-[#8a3aff]' : 'bg-gray-200'}`}></div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 3 ? 'bg-[#8a3aff] text-white' : 'bg-gray-200 text-gray-600'}`}>3</div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
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
          </>
        );
      case 2:
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Upload Files</label>
              <div 
                className={`border-2 border-dashed p-6 rounded-lg text-center cursor-pointer transition-colors ${isDragging ? 'border-[#8a3aff] bg-[#8a3aff]/5' : 'border-gray-300'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-upload').click()}
              >
                <Upload className="h-10 w-10 mx-auto mb-2 text-[#8a3aff]" />
                <p className="text-gray-600">Drag & drop files here or click to browse</p>
                <p className="text-xs text-gray-500 mt-1">Supported formats: .txt, .pdf, .csv</p>
                <input 
                  id="file-upload" 
                  type="file" 
                  multiple 
                  accept=".txt,.pdf,.csv" 
                  className="hidden" 
                  onChange={handleFileChange}
                />
              </div>
            </div>
            {formData.files.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Selected Files:</h3>
                <div className="max-h-40 overflow-y-auto">
                  {formData.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded-md mb-2 bg-gray-50">
                      <div className="flex items-center gap-2">
                        {getFileIcon(file.name)}
                        <span className="text-sm truncate max-w-[180px]">{file.name}</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => removeFile(index)}
                        className="p-1 rounded-full hover:bg-gray-200"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        );
      case 3:
        return (
          <>
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
          </>
        );
      case 4: // Review step
        return (
          <div className="space-y-4">
            <h3 className="font-medium text-lg text-center mb-4">Review Project Details</h3>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="font-medium mb-1">Basic Information</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm text-gray-600">Project Name:</div>
                <div className="text-sm font-medium">{formData.projectName}</div>
                <div className="text-sm text-gray-600">Test Interval:</div>
                <div className="text-sm font-medium">{formData.testInterval} Hr</div>
                <div className="text-sm text-gray-600">Active Status:</div>
                <div className="text-sm font-medium">{formData.isActive ? "Active" : "Inactive"}</div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="font-medium mb-1">API Details</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm text-gray-600">Base URL:</div>
                <div className="text-sm font-medium truncate">{formData.baseUrl}</div>
                <div className="text-sm text-gray-600">End Point:</div>
                <div className="text-sm font-medium truncate">{formData.endPoint}</div>
                <div className="text-sm text-gray-600">Content Type:</div>
                <div className="text-sm font-medium">{formData.contentType}</div>
              </div>
            </div>
            
            {formData.files.length > 0 && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-medium mb-1">Uploaded Files ({formData.files.length})</h4>
                <div className="max-h-20 overflow-y-auto">
                  {formData.files.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 mb-1">
                      {getFileIcon(file.name)}
                      <span className="text-sm truncate">{file.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const renderStepButtons = () => {
    return (
      <div className="flex justify-between mt-6">
        {step > 1 ? (
          <button 
            onClick={prevStep} 
            className="px-4 py-2 flex items-center gap-1 bg-white border rounded-md text-gray-700 hover:bg-gray-100"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </button>
        ) : (
          <div></div> // Empty div to maintain flex layout
        )}
        
        {step < 4 ? (
          <button 
            onClick={nextStep} 
            className="px-4 py-2 flex items-center gap-1 bg-[#8a3aff] text-white rounded-md hover:bg-[#7a2ff5]"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button 
            onClick={handleCreateOrEdit} 
            className="px-4 py-2 bg-[#8a3aff] text-white rounded-md hover:bg-[#7a2ff5]"
          >
            Create Project
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="fixed z-10 pt-6 pb-6 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[450px] relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-semibold mb-4">Create your project</h2>
        
        {/* Step Indicators */}
        {renderStepIndicator()}
        
        {/* Step Content */}
        {renderStepContent()}
        
        {/* Step Buttons */}
        {renderStepButtons()}
      </div>
    </div>
  );
};

export default CreateProjectModal;
