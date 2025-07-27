"use client"
import { useEffect, useState } from "react"
import ProjectCard from "../ProjectCard"
import EnhancedChart from "../EnhancedChart"

export default function ManagerDashboard({ user }) {
  const [projects, setProjects] = useState([])
  const [overviewPer, setOverviewPer] = useState([])
  const [teamSize, setTeamSize] = useState(0)
  const [activeProjects, setActiveProjects] = useState(0)

useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token")
      const API_BASE = "http://localhost:5000"  // your backend port

      console.log("🔹 User ID:", user?._id)

      // Fetch engineers
      const teamRes = await fetch(`${API_BASE}/api/users?role=engineer`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!teamRes.ok) throw new Error("Team API failed")
      const teamData = await teamRes.json()
      console.log("🔹 Team Data:", teamData)


      

      if (teamData.success && Array.isArray(teamData.data)) {
        setTeamSize(teamData.data.length)
      }

      // Fetch projects
      const projectRes = await fetch(`${API_BASE}/api/projects`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!projectRes.ok) throw new Error("Project API failed")
      const projectData = await projectRes.json()
      console.log("🔹 Project Data:", projectData)



      if (projectData.success && Array.isArray(projectData.data)) {
        setProjects(projectData.data)
        setActiveProjects(projectData.data.length)
      }

      const overviewRes = await fetch(`${API_BASE}/api/projects/stats/overview`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!overviewRes.ok) throw new Error("Team API failed")
      const overview = await overviewRes.json()
      console.log("🔹 Team Data:", overview)
      console.log(overview.success)

      if (overview.success && (overview.data)) {
        setOverviewPer(overview.data?.utilization)
        console.log(overview.data)
        // setActiveProjects(overview.data.length)
      }

    } catch (error) {
      console.error("❌ Error fetching data:", error)
    }
  }

  if (user) fetchData()

}, [user])


console.log(overviewPer)


  const metrics = [
    {
      title: "My Team Size",
      value: teamSize,
      change: "+2 new members",
      changeType: "positive",
      icon: "users",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Active Projects",
      value: activeProjects,
      change: "1 completed this week",
      changeType: "positive",
      icon: "projects",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Team Utilization",
      value: overviewPer,
      change: "Above average",
      changeType: "positive",
      icon: "chart",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "Budget Used",
      value: "65%",
      change: "On track",
      changeType: "neutral",
      icon: "dollar",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ]


  // const [projects] = useState([
  //   {
  //     id: 1,
  //     name: "E-commerce Platform v2.0",
  //     description: "Next-generation e-commerce platform with AI recommendations",
  //     status: "active",
  //     priority: "high",
  //     progress: 75,
  //     deadline: "Jun 15, 2024",
  //     budget: "$500,000",
  //     teamSize: 8,
  //     manager: {
  //       name: "Sarah Chen",
  //       avatar: "/placeholder.svg?height=32&width=32",
  //     },
  //   },
  // ])

  // const metrics = [
  //   {
  //     title: "My Team Size",
  //     value: "8",
  //     change: "+2 new members",
  //     changeType: "positive",
  //     icon: "users",
  //     iconBg: "bg-blue-100",
  //     iconColor: "text-blue-600",
  //   },
  //   {
  //     title: "Active Projects",
  //     value: "3",
  //     change: "1 completed this week",
  //     changeType: "positive",
  //     icon: "projects",
  //     iconBg: "bg-green-100",
  //     iconColor: "text-green-600",
  //   },
  //   {
  //     title: "Team Utilization",
  //     value: "85%",
  //     change: "Above average",
  //     changeType: "positive",
  //     icon: "chart",
  //     iconBg: "bg-yellow-100",
  //     iconColor: "text-yellow-600",
  //   },
  //   {
  //     title: "Budget Used",
  //     value: "65%",
  //     change: "On track",
  //     changeType: "neutral",
  //     icon: "dollar",
  //     iconBg: "bg-purple-100",
  //     iconColor: "text-purple-600",
  //   },
  // ]

  const teamMembers = [
    {
      name: "Alan Walker",
      role: " Full Stack",
      efficiency: "98%",
      avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    { name: "Krish S", role: "Mobile Apps", efficiency: "96%", avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png" },
    { name: "Bob Bob", role: " Full Stack", efficiency: "94%", avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png" },
  ]

  const aiRecommendations = [
    {
      type: "optimize",
      title: "Team Optimization",
      description: "Consider redistributing workload to balance team capacity more effectively",
      confidence: "85% confidence",
      color: "blue",
    },
    {
      type: "skill",
      title: "Skill Development",
      description: "Team would benefit from advanced React training for upcoming projects",
      confidence: "78% confidence",
      color: "green",
    },
  ]

  const recentActivity = [
    {
      type: "milestone",
      message: "Mobile App Redesign milestone completed by your team",
      time: "Jul 9, 2025 at 9:59 AM",
      icon: "check",
    },
    {
      type: "team",
      message: "Alex Rodriguez submitted code review for E-commerce Platform",
      time: "Jul 9, 2025 at 8:30 AM",
      icon: "code",
    },
  ]

  const upcomingDeadlines = [
    {
      title: "Mobile App Redesign",
      description: "Complete redesign of mobile application with new UX",
      date: "MAY 15",
      progress: "60%",
      status: "At Risk",
    },
    {
      title: "API Integration",
      description: "Backend API integration for new features",
      date: "JUN 1",
      progress: "80%",
      status: "On Track",
    },
  ]

  return (
 <div className="p-6 space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className={`${metric.iconBg} p-3 rounded-lg`}>
                <svg className={`w-6 h-6 ${metric.iconColor}`} fill="currentColor" viewBox="0 0 20 20">
                  {metric.icon === "users" && (
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  )}
                  {metric.icon === "projects" && (
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                  )}
                  {metric.icon === "chart" && (
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  )}
                  {metric.icon === "dollar" && (
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267zM10 0C4.477 0 0 4.484 0 10s4.477 10 10 10 10-4.484 10-10S15.523 0 10 0zM9 5a1 1 0 012 0v.092a4.535 4.535 0 013.5 1.676 1 1 0 11-1.414 1.414A2.58 2.58 0 0010 7.414V9.85c.175.04.34.087.5.14a1 1 0 11-.5 1.94V13a1 1 0 11-2 0v-.092a4.535 4.535 0 01-3.5-1.676 1 1 0 111.414-1.414A2.58 2.58 0 009 10.586V8.15a3.56 3.56 0 01-.5-.14 1 1 0 11.5-1.94V5z" />
                  )}
                </svg>
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <p
                  className={`text-sm mt-1 ${
                    metric.changeType === "positive"
                      ? "text-green-600"
                      : metric.changeType === "warning"
                      ? "text-yellow-600"
                      : "text-gray-600"
                  }`}
                >
                  {metric.change}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Team Utilization Trend</h3>
            <span className="text-sm text-gray-500">Last 6 months</span>
          </div>
          <EnhancedChart type="line" />
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Project Progress Overview</h3>
            <button className="text-blue-600 text-sm hover:text-blue-800 font-medium">View Details</button>
          </div>
          <EnhancedChart type="donut" data={projects} />
        </div>
      </div>

      {/* Technology Stack Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Team Technology Stack</h3>
          <span className="text-sm text-gray-500">Current expertise distribution</span>
        </div>
        <EnhancedChart type="tech-donut" />
      </div>

      {/* Manager-specific sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Performance */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Performance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Project Delivery Rate</span>
              <span className="text-sm font-medium text-green-600">94%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Code Quality Score</span>
              <span className="text-sm font-medium text-blue-600">8.7/10</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Team Satisfaction</span>
              <span className="text-sm font-medium text-green-600">4.2/5</span>
            </div>
          </div>
          <button className="w-full mt-4 text-blue-600 text-sm font-medium hover:text-blue-800">
            View Detailed Report
          </button>
        </div>

        {/* My Team */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">My Team</h3>
          <div className="space-y-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={member.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                    alt={member.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
               
                  <div>
                    <p className="text-sm font-medium text-gray-900">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-green-600">{member.efficiency}</p>
                  <p className="text-xs text-gray-500">Efficiency</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-blue-600 text-sm font-medium hover:text-blue-800">
            View All Team Members
          </button>
        </div>

        {/* AI Recommendations */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900">Team Insights</h3>
            </div>
          </div>
          <div className="space-y-4">
            {aiRecommendations.map((rec, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${rec.color === "blue" ? "bg-blue-50" : rec.color === "green" ? "bg-green-50" : "bg-gray-50"}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-900">{rec.title}</h4>
                  <button className="text-xs text-blue-600 hover:text-blue-800">Apply Suggestion</button>
                </div>
                <p className="text-xs text-gray-600 mb-2">{rec.description}</p>
                <p className="text-xs text-gray-500">{rec.confidence}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">My Projects</h3>
            <p className="text-sm text-gray-600">Projects under your management</p>
          </div>
          <button className="btn-blue">New Project</button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Team Activity</h3>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-800">View All</button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start">
                <div
                  className={`p-2 rounded-full mr-3 ${activity.type === "milestone" ? "bg-green-100" : "bg-blue-100"}`}
                >
                  <svg
                    className={`w-4 h-4 ${activity.type === "milestone" ? "text-green-600" : "text-blue-600"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    {activity.icon === "check" && (
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    )}
                    {activity.icon === "code" && (
                      <path
                        fillRule="evenodd"
                        d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    )}
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h3>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-800">View Calendar</button>
          </div>
          <div className="space-y-4">
            {upcomingDeadlines.map((deadline, index) => (
              <div key={index} className="border-l-4 border-yellow-400 pl-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900">{deadline.title}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      deadline.status === "At Risk" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                    }`}
                  >
                    {deadline.status}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-2">{deadline.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">{deadline.date}</span>
                  <span className="text-xs text-gray-600">{deadline.progress}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
