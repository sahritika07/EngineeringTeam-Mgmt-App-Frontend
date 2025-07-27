export default function EngineerCard({ engineer }) {
  const getExperienceBadge = (level) => {
    const badges = {
      junior: "bg-green-100 text-green-800",
      mid: "bg-blue-100 text-blue-800",
      senior: "bg-orange-100 text-orange-800",
      lead: "bg-purple-100 text-purple-800",
      principal: "bg-red-100 text-red-800",
    }
    return badges[level] || "bg-gray-100 text-gray-800"
  }

  const getUtilizationColor = (utilization) => {
    if (utilization >= 90) return "text-red-600"
    if (utilization >= 70) return "text-orange-600"
    return "text-green-600"
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4 mb-4">
       <img
  className="w-16 h-16 rounded-full"
  src={
    engineer.avatarUrl?.trim() ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      `${engineer.firstName} ${engineer.lastName}`
    )}&background=random`
  }
  alt={`${engineer.firstName} ${engineer.lastName}`}
/>

        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900">
            {engineer.firstName} {engineer.lastName}
          </h3>
          <div className="flex items-center space-x-2 mt-1">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getExperienceBadge(engineer.experienceLevel)}`}
            >
              {engineer.experienceLevel}
            </span>
            <span className="text-sm text-gray-600">{engineer.department}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          {engineer.email}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {engineer.location}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Utilization</p>
          <p className={`text-lg font-semibold ${getUtilizationColor(engineer.utilization)}`}>
            {engineer.utilization}%
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Efficiency</p>
          <p className="text-lg font-semibold text-green-600">{engineer.efficiency}%</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {engineer.availability}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Skills</p>
        <div className="flex flex-wrap gap-1">
          {engineer.skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800"
            >
              {skill}
            </span>
          ))}
          {engineer.skills.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
              +{engineer.skills.length - 3} more
            </span>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Current Projects</p>
            <p className="text-sm font-medium text-gray-900">{engineer.currentProjects} active assignments</p>
          </div>
          <button className="text-blue-600 text-sm hover:text-blue-800 font-medium">View Profile</button>
        </div>
      </div>
    </div>
  )
}
