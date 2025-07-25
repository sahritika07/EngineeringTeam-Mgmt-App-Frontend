"use client"
import { useState, useEffect } from "react"
import CreateAssignmentModal from "../../components/modals/CreateAssignmentModal"

export default function Assignments() {
  const [user, setUser] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    const token = localStorage.getItem("token")

    if (userData && token) {
      setUser(JSON.parse(userData))
      fetchAssignments(token)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchAssignments = async (token) => {
    try {
      const response = await fetch("http://localhost:5000/api/assignments", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (data.success) {
        setAssignments(data.data)
      } else {
        console.error("Failed to fetch assignments:", data.message)
      }
    } catch (error) {
      console.error("Error fetching assignments:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateAssignment = async (assignmentData) => {
    const token = localStorage.getItem("token")

    try {
      const response = await fetch("http://localhost:5000/api/assignments", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assignmentData),
      })

      const data = await response.json()

      if (data.success) {
        setAssignments([data.data, ...assignments])
        setShowCreateModal(false)
      } else {
        alert(data.message || "Failed to create assignment")
      }
    } catch (error) {
      console.error("Error creating assignment:", error)
      alert("Failed to create assignment. Please try again.")
    }
  }

  const handleDeleteAssignment = async (id) => {
    if (!confirm("Are you sure you want to delete this assignment?")) {
      return
    }

    const token = localStorage.getItem("token")

    try {
      const response = await fetch(`http://localhost:5000/api/assignments/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (data.success) {
        setAssignments(assignments.filter((a) => a._id !== id))
      } else {
        alert(data.message || "Failed to delete assignment")
      }
    } catch (error) {
      console.error("Error deleting assignment:", error)
      alert("Failed to delete assignment. Please try again.")
    }
  }

  if (loading) {
    return <div className="p-6">Loading...</div>
  }

  if (!user) {
    return <div className="p-6">Please log in to view assignments.</div>
  }

  const getPageTitle = () => {
    switch (user.role) {
      case "engineer":
        return "My Assignments"
      default:
        return "Assignments"
    }
  }

  const getPageDescription = () => {
    switch (user.role) {
      case "engineer":
        return "View your current project assignments and tasks"
      default:
        return "Manage engineer-project assignments and resource allocation"
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{getPageTitle()}</h1>
            <p className="text-sm text-gray-600">{getPageDescription()}</p>
          </div>
          {user.role !== "engineer" && (
            <button onClick={() => setShowCreateModal(true)} className="btn-blue flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>New Assignment</span>
            </button>
          )}
        </div>
      </div>

      {assignments.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No assignments yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            {user.role === "engineer"
              ? "You have no active assignments at the moment."
              : "Get started by creating your first assignment."}
          </p>
          {user.role !== "engineer" && (
            <div className="mt-6">
              <button onClick={() => setShowCreateModal(true)} className="btn-blue flex items-center space-x-2 mx-auto">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Create Assignment</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Assignment List</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assignee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {assignments.map((assignment) => (
                  <tr key={assignment._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {assignment.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {assignment.project?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {assignment.assignee?.firstName} {assignment.assignee?.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          assignment.priority === "high"
                            ? "bg-red-100 text-red-800"
                            : assignment.priority === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {assignment.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          assignment.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : assignment.status === "active" || assignment.status === "in-progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {assignment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${assignment.progress}%` }}
                          ></div>
                        </div>
                        <span>{assignment.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                      {user.role !== "engineer" && (
                        <button
                          onClick={() => handleDeleteAssignment(assignment._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showCreateModal && (
        <CreateAssignmentModal onClose={() => setShowCreateModal(false)} onSubmit={handleCreateAssignment} />
      )}
    </div>
  )
}
