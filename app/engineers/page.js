"use client"

import { useState, useEffect } from "react"
import EngineerCard from "../../components/EngineerCard"
import AddEngineerModal from "../../components/modals/AddEngineerModal"

export default function Engineers() {
  const [user, setUser] = useState(null)
  const [engineers, setEngineers] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const userData = localStorage.getItem("user")
  // console.log(userData)
  const token = localStorage.getItem("token")
  useEffect(() => {
  
    if (token) {
      console.log(userData)
      const parsedUser = JSON.stringify(userData)
      setUser(parsedUser)
      fetchEngineers(token)
      console.log(parsedUser)
    }
  }, [])



  const fetchEngineers = async () => {
   
    // const token = localStorage.getItem("token") 
    //  console.log(token)
    try {
      const res = await fetch("https://engineeringteam-mgmt-app-backend.onrender.com/api/engineers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()
      if (data.success) {
        setEngineers(data.data)
      } else {
        console.error(data.message)
      }
    } catch (err) {
      console.error("Fetch engineers error:", err)
    } finally {
      setLoading(false)
    }
  }

  if (!user) return <div className="p-6">Loading...</div>

  if (user.role === "engineer") {
    return (
      <div className="p-6 text-center py-12">
        <h3 className="text-lg font-semibold text-gray-900">Access Restricted</h3>
        <p className="text-sm text-gray-500">You don't have permission to view this page.</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Engineers</h1>
          <p className="text-sm text-gray-600">Manage engineers in your organization</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Engineer
        </button>
      </div>

      {loading ? (
        <p>Loading engineers...</p>
      ) : engineers.length === 0 ? (
        <p>No engineers found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {engineers.map((eng) => (
            <EngineerCard key={eng._id || eng.id} engineer={eng} />
          ))}
        </div>
      )}

      {showAddModal && (
        <AddEngineerModal
          onClose={() => setShowAddModal(false)}
          onEngineerAdded={() => fetchEngineers(user.token)}
        />
      )}
    </div>
  )
}
