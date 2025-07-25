"use client"
import { useState } from "react"

export default function Header({ user, setSidebarOpen, onLogout }) {
  const [showNotifications, setShowNotifications] = useState(false)

  const getDashboardTitle = () => {
    switch (user?.role) {
      case "admin":
        return "Executive Dashboard"
      case "manager":
        return "Manager Dashboard"
      case "engineer":
        return "Engineer Dashboard"
      default:
        return "Dashboard"
    }
  }

  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow px-4 sm:px-6 lg:px-8">
      {/* Mobile Menu Button */}
      <button
        className="mr-2 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </button>

      <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between overflow-hidden">
        {/* Dashboard Title + Subtitle */}
        <div className="text-center sm:text-left">
          <h1 className="text-lg sm:text-2xl font-semibold text-gray-900 truncate">{getDashboardTitle()}</h1>
          <p className="text-xs sm:text-sm text-gray-600 truncate">
            Resource utilization and project performance overview
          </p>
        </div>

        {/* Right Side Buttons */}
        <div className="mt-2 sm:mt-0 flex flex-wrap justify-center sm:justify-end items-center gap-2 sm:gap-4">
          {/* AI Recommendations - Hidden on small screens */}
          <button className="hidden sm:flex btn-green items-center space-x-1 text-sm sm:text-base px-2 sm:px-4 py-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>3 AI Recommendations</span>
          </button>

          {/* Notifications - Hidden on small screens */}
          <div className="relative hidden sm:flex">
            <button
              className="bg-gray-50 p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 border border-gray-200 hover:border-gray-300"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <span className="sr-only">View notifications</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-5 5v-5zM11 19H6.5A2.5 2.5 0 014 16.5v-9A2.5 2.5 0 016.5 5h11A2.5 2.5 0 0120 7.5v3.5"
                />
              </svg>
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white">1</span>
              </span>
            </button>
          </div>

          {/* Export Report - Hidden on small screens */}
          <button className="hidden sm:flex btn-blue items-center space-x-1 text-sm sm:text-base px-2 sm:px-4 py-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>Export</span>
          </button>
        </div>
      </div>
    </div>
  )
}
