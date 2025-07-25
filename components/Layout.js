"use client"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Sidebar from "./Sidebar"
import Header from "./Header"

export default function Layout({ children }) {
  const [user, setUser] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else if (pathname !== "/login" && pathname !== "/register") {
      router.push("/login")
    }
  }, [pathname, router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  if (!user && pathname !== "/login" && pathname !== "/register") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (pathname === "/login" || pathname === "/register") {
    return children
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar user={user} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} onLogout={handleLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} setSidebarOpen={setSidebarOpen} onLogout={handleLogout} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">{children}</main>
      </div>
    </div>
  )
}
