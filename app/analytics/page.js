"use client"
import { useState, useEffect } from "react"

export default function AnalyticsPage() {
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState("skills")

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  // Mock data for analytics
  const metrics = [
    {
      title: "Team Utilization",
      value: "78%",
      change: "5% from last month",
      trend: "up",
      icon: "users",
      progressValue: 78,
    },
    {
      title: "Total Revenue",
      value: "$2,840,000",
      change: "12% growth",
      trend: "up",
      icon: "dollar",
      progressValue: null,
    },
    {
      title: "Efficiency Score",
      value: "87%",
      change: "94% completion rate",
      trend: "up",
      icon: "chart",
      progressValue: 87,
    },
    {
      title: "Avg. Hours/Project",
      value: "42h",
      change: "Per project delivery",
      trend: "neutral",
      icon: "clock",
      progressValue: null,
    },
  ]

  const skillDistribution = [
    { name: "React", supply: 65, demand: 85, engineers: 8 },
    { name: "Node.js", supply: 55, demand: 80, engineers: 6 },
    { name: "Python", supply: 45, demand: 75, engineers: 5 },
  ]

  const skillGaps = [
    { name: "Python", engineersNeeded: 3, priority: "high" },
    { name: "AWS", engineersNeeded: 5, priority: "high" },
  ]

  const tabs = [
    { id: "utilization", label: "Utilization" },
    { id: "revenue", label: "Revenue" },
    { id: "productivity", label: "Productivity" },
    { id: "skills", label: "Skills Analysis" },
  ]

  const renderIcon = (iconType) => {
    const iconClasses = "w-6 h-6 text-gray-500"
    switch (iconType) {
      case "users":
        return (
          <svg className={iconClasses} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
        )
      case "dollar":
        return (
          <svg className={iconClasses} fill="currentColor" viewBox="0 0 20 20">
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267zM10 0C4.477 0 0 4.484 0 10s4.477 10 10 10 10-4.484 10-10S15.523 0 10 0zM9 5a1 1 0 012 0v.092a4.535 4.535 0 013.5 1.676 1 1 0 11-1.414 1.414A2.58 2.58 0 0010 7.414V9.85c.175.04.34.087.5.14a1 1 0 11-.5 1.94V13a1 1 0 11-2 0v-.092a4.535 4.535 0 01-3.5-1.676 1 1 0 111.414-1.414A2.58 2.58 0 009 10.586V8.15a3.56 3.56 0 01-.5-.14 1 1 0 11.5-1.94V5z" />
          </svg>
        )
      case "chart":
        return (
          <svg className={iconClasses} fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
          </svg>
        )
      case "clock":
        return (
          <svg className={iconClasses} fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
        )
      default:
        return null
    }
  }

  if (!user) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="p-6 space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
              <div className="p-1 rounded-full">{renderIcon(metric.icon)}</div>
            </div>
            <div className="flex flex-col">
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              <div className="flex items-center mt-1">
                {metric.trend === "up" && (
                  <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <span className="text-sm text-green-600">{metric.change}</span>
              </div>
            </div>
            {metric.progressValue !== null && (
              <div className="mt-4">
                <div className="w-full bg-blue-100 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${metric.progressValue}%` }}></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 text-sm font-medium border-b-2 ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Skills Analysis Content */}
      {activeTab === "skills" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Skills Distribution */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Skills Distribution</h3>
            <p className="text-sm text-gray-500 mb-6">Current skill distribution vs market demand</p>

            <div className="space-y-8">
              {skillDistribution.map((skill, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{skill.name}</span>
                    <span className="text-sm text-gray-500">{skill.engineers} engineers</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">Supply</span>
                      </div>
                      <div className="w-full bg-blue-100 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${skill.supply}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">Demand</span>
                      </div>
                      <div className="w-full bg-blue-100 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${skill.demand}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Gaps */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Skill Gaps</h3>
            <p className="text-sm text-gray-500 mb-6">Critical skill shortages requiring attention</p>

            <div className="space-y-4">
              {skillGaps.map((gap, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-md font-medium text-gray-900">{gap.name}</h4>
                      <p className="text-sm text-gray-600">{gap.engineersNeeded} engineers needed</p>
                    </div>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                      high priority
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Placeholder for other tabs */}
      {activeTab === "utilization" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Utilization Analytics</h3>
          <p className="text-gray-600">Detailed utilization metrics will appear here.</p>
        </div>
      )}

      {activeTab === "revenue" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Analytics</h3>
          <p className="text-gray-600">Detailed revenue metrics will appear here.</p>
        </div>
      )}

      {activeTab === "productivity" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Productivity Analytics</h3>
          <p className="text-gray-600">Detailed productivity metrics will appear here.</p>
        </div>
      )}
    </div>
  )
}
