"use client"
import { useEffect, useState } from "react"
import MetricCard from "../MetricCard"

export default function EngineerDashboard({ user }) {

  const [projects, setProjects] = useState([])
  const [activeProjects, setActiveProjects] = useState([])
  const [teamSize, setTeamSize] = useState([])
  const [overviewPer, setOverviewPer] = useState([])
  const [activeAssignments, setActiveAssignments] = useState([])


  useEffect(() => {
  const fetchOverviewData = async () => {
    try {
      const token = localStorage.getItem("token")
      const API_BASE = "https://engineeringteam-mgmt-app-backend.onrender.com"  // your backend port

      // Fetch Engineers Overview
      const overviewRes = await fetch(`${API_BASE}/api/engineers/overview`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!overviewRes.ok) throw new Error("Overview API failed")
      const overview = await overviewRes.json()
      console.log("🔹 Engineers Overview Data:", overview)

      if (overview.success && overview.data) {
        // Destructure the data
        const { projects, assignments, engineers } = overview.data

        // Example: Update your states (update based on your existing states)
        setProjects(projects.totalProjects)
        setActiveProjects(projects.activeProjects)
        setTeamSize(engineers.totalEngineers)
        setOverviewPer(projects.budgetUtilization) // utilization percentage
        // You can also set more states for assignments if needed:
        setActiveAssignments(assignments.activeAssignments)
      }

    } catch (error) {
      console.error("❌ Error fetching Engineers Overview:", error)
    }
  }



  if (user) fetchOverviewData()

}, [user])


console.log(projects)
console.log(activeProjects)

console.log(teamSize)
console.log(overviewPer)

  const [assignments] = useState([
    {
      id: 1,
      project: "ChatBot",
      role: "Full Stack",
      hours: 32,
      deadline: "Jun 15, 2024",
      status: "active",
    },
    {
      id: 2,
      project: "Finance",
      role: "Frontend",
      hours: 8,
      deadline: "May 15, 2024",
      status: "active",
    },
    {
      id: 3,
      project: "HRMS",
      role: "Full Stack",
      hours: 8,
      deadline: "May 15, 2024",
      status: "active",
    },
  ])

  const metrics = [
    {
      title: "Active Assignments",
      value: activeAssignments,
      change: "1 new this week",
      changeType: "positive",
      icon: "assignments",
    },
    {
      title: "Hours This Week",
      value: "40",
      change: "Full capacity",
      changeType: "neutral",
      icon: "clock",
    },
    {
      title: "Completed Tasks",
      value: "12",
      change: "+3 from last week",
      changeType: "positive",
      icon: "check",
    },
    {
      title: "Performance Score",
      value: "94%",
      change: "Above average",
      changeType: "positive",
      icon: "star",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Engineer-specific sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">My Skills</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">React</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "90%" }}></div>
                </div>
                <span className="text-xs text-gray-500">90%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Node.js</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
                <span className="text-xs text-gray-500">85%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">TypeScript</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: "75%" }}></div>
                </div>
                <span className="text-xs text-gray-500">75%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-900">Completed user authentication module</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-900">Started working on payment integration</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-900">Code review requested for API endpoints</p>
                <p className="text-xs text-gray-500">2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Assignments Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">My Assignments</h3>
          <p className="text-sm text-gray-600">Current project assignments and tasks</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{assignment.project}</h4>
                    <p className="text-sm text-gray-600">{assignment.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{assignment.hours}h/week</p>
                    <p className="text-xs text-gray-500">Due: {assignment.deadline}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      assignment.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {assignment.status}
                  </span>
                  <button className="text-blue-600 text-sm hover:text-blue-800">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
