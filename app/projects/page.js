"use client"
import { useState, useEffect } from "react"
import axios from "axios"
import ProjectCard from "../../components/ProjectCard"
import CreateProjectModal from "../../components/modals/CreateProjectModal"

export default function Projects() {
  const [user, setUser] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   const userData = localStorage.getItem("user")
  //   if (userData) {
  //     setUser(JSON.parse(userData))
  //   }

  //   fetchProjects()
  // }, [])

 useEffect(() => {
  const userData = localStorage.getItem("user");
  if (userData) {
    setUser(JSON.parse(userData));
  }

  fetchProjects();

  // 🔄 Listen for updates
  const refresh = () => fetchProjects();
  window.addEventListener("projectProgressUpdated", refresh);

  return () => {
    window.removeEventListener("projectProgressUpdated", refresh);
  };
}, []);




  const fetchProjects = async () => {
    
    try {
      const token = localStorage.getItem("token")
      console.log(token)
      const response = await axios.get("http://localhost:5000/api/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setProjects(response.data.data)
    } catch (error) {
      console.error("Fetch projects error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateProject = async (formData) => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post(
        "http://localhost:5000/api/projects",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )

      setProjects((prev) => [...prev, response.data.data])
      setShowCreateModal(false)
    } catch (error) {
      console.error("Create project error:", error)
      alert(
        error.response?.data?.message || "Error creating project"
      )
    }
  }

  if (!user || loading) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {user.role === "engineer" ? "My Projects" : "Projects"}
            </h1>
            <p className="text-sm text-gray-600">
              {user.role === "engineer"
                ? "Projects you are currently assigned to"
                : "Manage and track all engineering projects"}
            </p>
          </div>
          {user.role !== "engineer" && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>New Project</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>

      {projects.length === 0 && !loading && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No projects</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new project.</p>
          {user.role !== "engineer" && (
            <div className="mt-6">
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                New Project
              </button>
            </div>
          )}
        </div>
      )}

      {showCreateModal && (
  <CreateProjectModal
    onClose={() => {
      setShowCreateModal(false);
      fetchProjects();
    }}
    // onSubmit={handleCreateProject}
  />
)}
    </div>
  )
}
