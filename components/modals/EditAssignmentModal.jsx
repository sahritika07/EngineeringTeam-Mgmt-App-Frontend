"use client"
import { useState, useEffect } from "react"

export default function EditAssignmentModal({ assignment, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    project: "",
    assignee: "",
    priority: "medium",
    deadline: "",
    estimatedHours: "",
    status: "active",
  })
  const [projects, setProjects] = useState([])
  const [engineers, setEngineers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (assignment) {
      setFormData({
        title: assignment.title,
        description: assignment.description,
        project: assignment.project?._id || assignment.project,
        assignee: assignment.assignee?._id || assignment.assignee,
        priority: assignment.priority,
        deadline: assignment.deadline?.split("T")[0],
        estimatedHours: assignment.estimatedHours,
        status: assignment.status || "active",
      })
    }
    fetchData()
  }, [assignment])

  const fetchData = async () => {
    const token = localStorage.getItem("token")

    try {
      const [projectsRes, engineersRes] = await Promise.all([
        fetch("https://engineeringteam-mgmt-app-backend.onrender.com/api/projects", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("https://engineeringteam-mgmt-app-backend.onrender.com/api/engineers", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ])

      const projectsData = await projectsRes.json()
      const engineersData = await engineersRes.json()

      if (projectsData.success) setProjects(projectsData.data)
      if (engineersData.success) setEngineers(engineersData.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 p-6">
        <h2 className="text-xl font-semibold mb-4">Edit Assignment</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border rounded-lg px-3 py-2"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Title"
            required
          />
          <textarea
            className="w-full border rounded-lg px-3 py-2"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Description"
            required
          />
          <select
            className="w-full border rounded-lg px-3 py-2"
            value={formData.project}
            onChange={(e) => handleChange("project", e.target.value)}
          >
            <option value="">Select Project</option>
            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>

          <select
            className="w-full border rounded-lg px-3 py-2"
            value={formData.assignee}
            onChange={(e) => handleChange("assignee", e.target.value)}
          >
            <option value="">Select Assignee</option>
            {engineers.map((e) => (
              <option key={e._id} value={e._id}>
                {e.firstName} {e.lastName}
              </option>
            ))}
          </select>

          <input
            type="date"
            className="w-full border rounded-lg px-3 py-2"
            value={formData.deadline}
            onChange={(e) => handleChange("deadline", e.target.value)}
          />

          <select
            className="w-full border rounded-lg px-3 py-2"
            value={formData.priority}
            onChange={(e) => handleChange("priority", e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>

          <select
            className="w-full border rounded-lg px-3 py-2"
            value={formData.status}
            onChange={(e) => handleChange("status", e.target.value)}
          >
            <option value="active">Active</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="btn-gray">
              Cancel
            </button>
            <button type="submit" className="btn-blue">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
