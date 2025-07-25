"use client"
import { useState, useEffect } from "react"
import AdminDashboard from "../../components/dashboards/AdminDashboard"
import ManagerDashboard from "../../components/dashboards/ManagerDashboard"
import EngineerDashboard from "../../components/dashboards/EngineerDashboard"

export default function Dashboard() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  if (!user) {
    return <div className="p-6">Loading...</div>
  }

  switch (user.role) {
    case "admin":
      return <AdminDashboard user={user} />
    case "manager":
      return <ManagerDashboard user={user} />
    case "engineer":
      return <EngineerDashboard user={user} />
    default:
      return <AdminDashboard user={user} />
  }
}
