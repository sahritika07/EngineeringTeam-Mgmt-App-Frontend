"use client";
import { useState, useEffect } from "react";

export default function CreateAssignmentModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    project: "",
    assignee: "",
    priority: "medium",
    deadline: "",
    estimatedHours: "",
    tags: [],
  });

  const [errors, setErrors] = useState({});
  const [projects, setProjects] = useState([]);
  const [engineers, setEngineers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

const fetchData = async () => {
  const token = localStorage.getItem("token");

  try {
    const [projectsResponse, engineersResponse] = await Promise.all([
      fetch("https://engineeringteam-mgmt-app-backend.onrender.com/api/projects", {
        method: "GET",   // ✅ Added method explicitly
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }),
      fetch("https://engineeringteam-mgmt-app-backend.onrender.com/api/engineers", {
        method: "GET",   // ✅ Added method explicitly
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }),
    ]);

    const projectsData = await projectsResponse.json();
    const engineersData = await engineersResponse.json();

    if (projectsData.success) {
      setProjects(projectsData.data);
    }

    if (engineersData.success) {
      setEngineers(engineersData.data);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    setLoading(false);
  }
};


  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.project) newErrors.project = "Project is required";
    if (!formData.assignee) newErrors.assignee = "Assignee is required";
    if (!formData.deadline) newErrors.deadline = "Deadline is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData); // Pass data directly to Assignments page
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Create New Assignment</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter assignment title"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={4}
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Describe the assignment details"
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* Project */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project *</label>
              <select
                value={formData.project}
                onChange={(e) => handleInputChange("project", e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.project ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select a project</option>
                {projects.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.name}
                  </option>
                ))}
              </select>
              {errors.project && <p className="text-red-500 text-sm mt-1">{errors.project}</p>}
            </div>

            {/* Assignee */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Assignee *</label>
              <select
                value={formData.assignee}
                onChange={(e) => handleInputChange("assignee", e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.assignee ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select an engineer</option>
                {engineers.map((engineer) => (
                  <option key={engineer._id} value={engineer._id}>
                    {engineer.firstName} {engineer.lastName} - {engineer.department}
                  </option>
                ))}
              </select>
              {errors.assignee && <p className="text-red-500 text-sm mt-1">{errors.assignee}</p>}
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => handleInputChange("priority", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Deadline *</label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => handleInputChange("deadline", e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.deadline ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline}</p>}
            </div>

            {/* Estimated Hours */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Hours per Week</label>
              <input
                type="number"
                value={formData.estimatedHours}
                onChange={(e) => handleInputChange("estimatedHours", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter estimated hours per week"
                min="1"
                max="60"
                step="1"
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
            <button type="button" onClick={onClose} className="btn-gray">
              Cancel
            </button>
            <button type="submit" className="btn-blue">
              Create Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
