const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
    this.token = null

    // Initialize token from localStorage if available
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("token")
    }
  }

  setToken(token) {
    this.token = token
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem("token", token)
      } else {
        localStorage.removeItem("token")
      }
    }
  }

  getAuthHeaders() {
    const headers = {
      "Content-Type": "application/json",
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    return headers
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: this.getAuthHeaders(),
      ...options,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`)
      }

      return data
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  }

  // Auth methods
  async login(credentials) {
    const response = await this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })

    if (response.success && response.token) {
      this.setToken(response.token)
    }

    return response
  }

  async register(userData) {
    const response = await this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })

    if (response.success && response.token) {
      this.setToken(response.token)
    }

    return response
  }

  async getCurrentUser() {
    return this.request("/auth/me")
  }

  async updateProfile(profileData) {
    return this.request("/auth/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    })
  }

  async changePassword(passwordData) {
    return this.request("/auth/change-password", {
      method: "PUT",
      body: JSON.stringify(passwordData),
    })
  }

  async logout() {
    try {
      await this.request("/auth/logout", { method: "POST" })
    } finally {
      this.setToken(null)
    }
  }

  // Users methods
  async getUsers(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.request(`/users${queryString ? `?${queryString}` : ""}`)
  }

  async getUser(id) {
    return this.request(`/users/${id}`)
  }

  async createUser(userData) {
    return this.request("/users", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  async updateUser(id, userData) {
    return this.request(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    })
  }

  async deleteUser(id) {
    return this.request(`/users/${id}`, {
      method: "DELETE",
    })
  }

  async getUserStats() {
    return this.request("/users/stats/overview")
  }

  async getAvailableEngineers(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.request(`/users/available-engineers${queryString ? `?${queryString}` : ""}`)
  }

  // Projects methods
  async getProjects(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.request(`/projects${queryString ? `?${queryString}` : ""}`)
  }

  async getProject(id) {
    return this.request(`/projects/${id}`)
  }

  async createProject(projectData) {
    return this.request("/projects", {
      method: "POST",
      body: JSON.stringify(projectData),
    })
  }

  async updateProject(id, projectData) {
    return this.request(`/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(projectData),
    })
  }

  async deleteProject(id) {
    return this.request(`/projects/${id}`, {
      method: "DELETE",
    })
  }

  async addTeamMember(projectId, memberData) {
    return this.request(`/projects/${projectId}/team-members`, {
      method: "POST",
      body: JSON.stringify(memberData),
    })
  }

  async removeTeamMember(projectId, userId) {
    return this.request(`/projects/${projectId}/team-members/${userId}`, {
      method: "DELETE",
    })
  }

  async getProjectStats() {
    return this.request("/projects/stats/overview")
  }

  // Assignments methods
  async getAssignments(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.request(`/assignments${queryString ? `?${queryString}` : ""}`)
  }

  async getAssignment(id) {
    return this.request(`/assignments/${id}`)
  }

  async createAssignment(assignmentData) {
    return this.request("/assignments", {
      method: "POST",
      body: JSON.stringify(assignmentData),
    })
  }

  async updateAssignment(id, assignmentData) {
    return this.request(`/assignments/${id}`, {
      method: "PUT",
      body: JSON.stringify(assignmentData),
    })
  }

  async deleteAssignment(id) {
    return this.request(`/assignments/${id}`, {
      method: "DELETE",
    })
  }

  async addComment(assignmentId, commentData) {
    return this.request(`/assignments/${assignmentId}/comments`, {
      method: "POST",
      body: JSON.stringify(commentData),
    })
  }

  async addTimeEntry(assignmentId, timeData) {
    return this.request(`/assignments/${assignmentId}/time-entries`, {
      method: "POST",
      body: JSON.stringify(timeData),
    })
  }

  async getAssignmentStats() {
    return this.request("/assignments/stats/overview")
  }

  // Engineers methods
  async getEngineers(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.request(`/engineers${queryString ? `?${queryString}` : ""}`)
  }

  async getEngineer(id) {
    return this.request(`/engineers/${id}`)
  }

  async updateEngineerMetrics(id, metricsData) {
    return this.request(`/engineers/${id}/metrics`, {
      method: "PUT",
      body: JSON.stringify(metricsData),
    })
  }

  async getEngineerWorkload(id) {
    return this.request(`/engineers/${id}/workload`)
  }

  // Analytics methods
  async getDashboardAnalytics() {
    return this.request("/analytics/dashboard")
  }

  async getUtilizationAnalytics() {
    return this.request("/analytics/utilization")
  }

  async getProjectAnalytics() {
    return this.request("/analytics/projects")
  }

  async getTimeTrackingAnalytics() {
    return this.request("/analytics/time-tracking")
  }
}

export default new ApiService()
