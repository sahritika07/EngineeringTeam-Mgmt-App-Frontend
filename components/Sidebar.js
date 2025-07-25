"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"

const navigation = {
  admin: [
    { name: "Executive Dashboard", href: "/dashboard", icon: "dashboard" },
    { name: "Projects", href: "/projects", icon: "projects" },
    { name: "Engineers", href: "/engineers", icon: "engineers" },
    { name: "Assignments", href: "/assignments", icon: "assignments" },
    { name: "Analytics", href: "/analytics", icon: "analytics" },
    { name: "Settings", href: "/settings", icon: "settings" },
  ],
  manager: [
    { name: "Manager Dashboard", href: "/dashboard", icon: "dashboard" },
    { name: "Projects", href: "/projects", icon: "projects" },
    { name: "Engineers", href: "/engineers", icon: "engineers" },
    { name: "Assignments", href: "/assignments", icon: "assignments" },
    { name: "Analytics", href: "/analytics", icon: "analytics" },
    { name: "Settings", href: "/settings", icon: "settings" },
  ],
  engineer: [
    { name: "My Dashboard", href: "/dashboard", icon: "dashboard" },
    { name: "My Projects", href: "/projects", icon: "projects" },
    { name: "My Assignments", href: "/assignments", icon: "assignments" },
    { name: "Settings", href: "/settings", icon: "settings" },
  ],
}

const icons = {
  dashboard: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
    </svg>
  ),
  projects: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
    </svg>
  ),
  engineers: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
    </svg>
  ),
  assignments: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
        clipRule="evenodd"
      />
    </svg>
  ),
  analytics: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
    </svg>
  ),
  settings: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
        clipRule="evenodd"
      />
    </svg>
  ),
}

export default function Sidebar({ user, sidebarOpen, setSidebarOpen, onLogout }) {
  const pathname = usePathname()
  const userNavigation = navigation[user?.role] || navigation.engineer

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 flex z-40 md:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-slate-800">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <SidebarContent user={user} userNavigation={userNavigation} pathname={pathname} onLogout={onLogout} />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col flex-grow bg-slate-800 overflow-y-auto">
            <SidebarContent user={user} userNavigation={userNavigation} pathname={pathname} onLogout={onLogout} />
          </div>
        </div>
      </div>
    </>
  )
}

function SidebarContent({ user, userNavigation, pathname, onLogout }) {
  return (
    <>
      <div className="flex items-center flex-shrink-0 px-4 py-6">
        <div className="flex items-center">
          <div className="bg-blue-600 p-2 rounded-lg">
 <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
  <path d="M10 2a2 2 0 00-2 2v2h8V4a2 2 0 00-2-2h-4zm-6 6v2h16V8H4zm0 4v2h16v-2H4zm0 4v2a2 2 0 002 2h12a2 2 0 002-2v-2H4z" />
</svg>






          </div>
          <div className="ml-3">
            <h1 className="text-white text-lg font-sm">Engineering Resource</h1>
            <p className="text-slate-300 text-sm"> Management System</p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex-1 flex flex-col">
        <nav className="flex-1 px-2 space-y-1">
          {userNavigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  isActive ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-700 hover:text-white"
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150`}
              >
                {icons[item.icon]}
                <span className="ml-3">{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="flex-shrink-0 flex border-t border-slate-700 p-4">
        <div className="flex items-center w-full">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">{user?.name?.charAt(0) || "U"}</span>
            </div>
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-white">{user?.name}</p>
            <p className="text-xs text-slate-300 capitalize">{user?.role}</p>
          </div>
          <button onClick={onLogout} className="ml-3 text-slate-400 hover:text-white" title="Logout">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}
