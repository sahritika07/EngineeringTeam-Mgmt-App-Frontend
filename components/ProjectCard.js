import { useState } from "react";

export default function ProjectCard({ project }) {
  const [progress, setProgress] = useState(project.progress);

  // API call to update progress
  const updateProgress = async (newProgress) => {
    try {
      const res = await fetch(`/api/assignments/${project.assignmentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}` // if using auth
        },
        body: JSON.stringify({ progress: newProgress })
      });

      const data = await res.json();
      if (data.success) {
        setProgress(newProgress); // Update progress bar
      } else {
        alert("Failed to update progress");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating progress");
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "on-hold":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      {/* Heading */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900 mb-2">{project.name}</h3>
          <p className="text-sm text-gray-600 mb-3">{project.description}</p>
          <div className="flex items-center space-x-2 mb-3">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                project.status
              )}`}
            >
              {project.status}
            </span>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                project.priority
              )}`}
            >
              {project.priority}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div
          className="w-full bg-gray-200 rounded-full h-2 cursor-pointer"
          onClick={() => updateProgress(progress + 10)} // 👈 Example: increase 10% when clicked
        >
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Manager */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center">
          <img
            className="w-8 h-8 rounded-full"
            src={
              project.manager?.avatar ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt={project.manager?.name}
          />
          <div className="ml-3">
            <p className="text-xs text-gray-500">Project Manager</p>
            <p className="text-sm font-medium text-gray-900">
              {project.manager?.fullName}
            </p>
          </div>
        </div>
        <button className="text-blue-600 text-sm hover:text-blue-800 font-medium">
          View Details
        </button>
      </div>
    </div>
  );
}
