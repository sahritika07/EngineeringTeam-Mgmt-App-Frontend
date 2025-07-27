"use client"
import { useState, useEffect } from "react"
import CreateAssignmentModal from "../../components/modals/CreateAssignmentModal"
import EditAssignmentModal from "../../components/modals/EditAssignmentModal"

export default function Assignments() {
  const [user, setUser] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [editValues, setEditValues] = useState({}) // store engineer edits temporarily

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
    const response = await fetch("https://engineeringteam-mgmt-app-backend.onrender.com/api/assignments", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.success) {
      let filteredAssignments = data.data;

      // 🔹 If logged-in user is an engineer, show only their tasks
      if (user && user.role === "engineer") {
        filteredAssignments = data.data.filter(
          (a) => a.assignee?._id === user._id
        );
      }

      setAssignments(filteredAssignments);

      // Initialize edit values
      const initial = {};
      filteredAssignments.forEach((a) => {
        initial[a._id] = {
          status: a.status,
          progress: a.progress || 0,
          actualHours: a.actualHours || 0,
        };
      });
      setEditValues(initial);
    } else {
      console.error("Failed to fetch assignments:", data.message);
    }
  } catch (error) {
    console.error("Error fetching assignments:", error);
  } finally {
    setLoading(false);
  }
};


  const handleCreateAssignment = async (assignmentData) => {
    const token = localStorage.getItem("token")

    try {
      const response = await fetch("https://engineeringteam-mgmt-app-backend.onrender.com/api/assignments", {
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

  // const handleEditAssignment = async (id, updatedData) => {
  //   const token = localStorage.getItem("token")

  //   try {
  //     const response = await fetch(`http://localhost:5000/api/assignments/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(updatedData),
  //     })

  //     const data = await response.json()

  //     if (data.success) {
  //       setAssignments(assignments.map((a) => (a._id === id ? data.data : a)))
  //       setShowEditModal(false)
  //       setSelectedAssignment(null)
  //     } else {
  //       alert(data.message || "Failed to update assignment")
  //     }
  //   } catch (error) {
  //     console.error("Error updating assignment:", error)
  //     alert("Failed to update assignment. Please try again.")
  //   }
  // }


const handleEditAssignment = async (id, updatedData) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`https://engineeringteam-mgmt-app-backend.onrender.com/api/assignments/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    const data = await response.json();

    if (data.success) {
      setAssignments(assignments.map((a) => (a._id === id ? data.data : a)));
      setShowEditModal(false);
      setSelectedAssignment(null);

      // 🔄 Trigger event so Projects.js refreshes
      window.dispatchEvent(new Event("projectProgressUpdated"));

    } else {
      alert(data.message || "Failed to update assignment");
    }
  } catch (error) {
    console.error("Error updating assignment:", error);
    alert("Failed to update assignment. Please try again.");
  }
};


  // engineer updates all fields together
  const handleEngineerUpdate = async (id) => {
    const token = localStorage.getItem("token")
    const values = editValues[id]

    try {
      const response = await fetch(`https://engineeringteam-mgmt-app-backend.onrender.com/api/assignments/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (data.success) {
        setAssignments(assignments.map((a) => (a._id === id ? data.data : a)))
        alert("Updated successfully!")
      } else {
        alert(data.message || "Failed to update")
      }
    } catch (error) {
      console.error("Engineer update error:", error)
    }
  }

  const handleDeleteAssignment = async (id) => {
    if (!confirm("Are you sure you want to delete this assignment?")) {
      return
    }

    const token = localStorage.getItem("token")

    try {
      const response = await fetch(`hhttps://engineeringteam-mgmt-app-backend.onrender.com/api/assignments/${id}`, {
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

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {user.role === "engineer" ? "My Assignments" : "Assignments"}
          </h1>
          <p className="text-sm text-gray-600">
            {user.role === "engineer"
              ? "Update your progress and status here"
              : "Manage engineer-project assignments and resource allocation"}
          </p>
        </div>
        {user.role !== "engineer" && (
          <button onClick={() => setShowCreateModal(true)} className="btn-blue">
            + New Assignment
          </button>
        )}
      </div>

      {/* Assignment List */}
      {assignments.length === 0 ? (
        <p>No assignments yet.</p>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assignee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assignments.map((assignment) => (
                <tr key={assignment._id}>
                  <td className="px-6 py-4">{assignment.title}</td>
                  <td className="px-6 py-4">{assignment.project?.name || "N/A"}</td>
                  <td className="px-6 py-4">
                    {assignment.assignee?.firstName} {assignment.assignee?.lastName}
                  </td>
                  <td className="px-6 py-4">{assignment.priority}</td>

                  {/* Engineer status */}
                  <td className="px-6 py-4">
                    {user.role === "engineer" ? (
                      <select
                        value={editValues[assignment._id]?.status || assignment.status}
                        onChange={(e) =>
                          setEditValues({
                            ...editValues,
                            [assignment._id]: {
                              ...editValues[assignment._id],
                              status: e.target.value,
                            },
                          })
                        }
                        className="border rounded p-1"
                      >
                        <option value="pending">Pending</option>
                        <option value="active">Active</option>
                        <option value="in-progress">In-Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    ) : (
                      assignment.status
                    )}
                  </td>

                  {/* Progress */}
                  <td className="px-6 py-4">
                    {user.role === "engineer" ? (
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={editValues[assignment._id]?.progress || 0}
                        onChange={(e) =>
                          setEditValues({
                            ...editValues,
                            [assignment._id]: {
                              ...editValues[assignment._id],
                              progress: Number(e.target.value),
                            },
                          })
                        }
                        className="w-16 border rounded p-1"
                      />
                    ) : (
                      `${assignment.progress || 0}%`
                    )}
                  </td>

                  {/* Actual hours */}
                  <td className="px-6 py-4">
                    {user.role === "engineer" ? (
                      <input
                        type="number"
                        min="0"
                        value={editValues[assignment._id]?.actualHours || 0}
                        onChange={(e) =>
                          setEditValues({
                            ...editValues,
                            [assignment._id]: {
                              ...editValues[assignment._id],
                              actualHours: Number(e.target.value),
                            },
                          })
                        }
                        className="w-16 border rounded p-1"
                      />
                    ) : (
                      assignment.actualHours || 0
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 flex gap-2">
                    {user.role === "engineer" ? (
                      <button
                        onClick={() => handleEngineerUpdate(assignment._id)}
                        className="text-blue-600 font-medium"
                      >
                        Update
                      </button>
                    ) : (
                      <>
                        <button
                          className="text-blue-600"
                          onClick={() => {
                            setSelectedAssignment(assignment)
                            setShowEditModal(true)
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteAssignment(assignment._id)}
                          className="text-red-600"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      {showCreateModal && (
        <CreateAssignmentModal onClose={() => setShowCreateModal(false)} onSubmit={handleCreateAssignment} />
      )}

      {showEditModal && selectedAssignment && (
        <EditAssignmentModal
          assignment={selectedAssignment}
          onClose={() => setShowEditModal(false)}
          onSubmit={(updatedData) => handleEditAssignment(selectedAssignment._id, updatedData)}
        />
      )}
    </div>
  )
}
