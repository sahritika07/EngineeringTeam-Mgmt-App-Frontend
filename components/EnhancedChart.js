export default function EnhancedChart({ type, data }) {
  if (type === "line") {
    return (
      <div className="h-64 relative">
        <svg className="w-full h-full" viewBox="0 0 400 200">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#f3f4f6" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Y-axis labels */}
          <text x="20" y="20" className="text-xs fill-gray-500">
            90
          </text>
          <text x="20" y="60" className="text-xs fill-gray-500">
            85
          </text>
          <text x="20" y="100" className="text-xs fill-gray-500">
            80
          </text>
          <text x="20" y="140" className="text-xs fill-gray-500">
            75
          </text>

          {/* X-axis labels */}
          <text x="60" y="190" className="text-xs fill-gray-500">
            Jan
          </text>
          <text x="120" y="190" className="text-xs fill-gray-500">
            Feb
          </text>
          <text x="180" y="190" className="text-xs fill-gray-500">
            Mar
          </text>
          <text x="240" y="190" className="text-xs fill-gray-500">
            Apr
          </text>
          <text x="300" y="190" className="text-xs fill-gray-500">
            May
          </text>
          <text x="360" y="190" className="text-xs fill-gray-500">
            Jun
          </text>

          {/* Line chart */}
          <polyline fill="none" stroke="#3b82f6" strokeWidth="3" points="60,140 120,120 180,100 240,85 300,70 360,50" />

          {/* Data points */}
          <circle cx="60" cy="140" r="4" fill="#3b82f6" />
          <circle cx="120" cy="120" r="4" fill="#3b82f6" />
          <circle cx="180" cy="100" r="4" fill="#3b82f6" />
          <circle cx="240" cy="85" r="4" fill="#3b82f6" />
          <circle cx="300" cy="70" r="4" fill="#3b82f6" />
          <circle cx="360" cy="50" r="4" fill="#3b82f6" />
        </svg>
      </div>
    )
  }

  if (type === "donut") {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
            {/* Mobile App Redesign - 65% */}
            <circle
              cx="50"
              cy="50"
              r="35"
              stroke="#3b82f6"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray="142 76"
              strokeDashoffset="0"
            />
            {/* E-commerce Platform - 75% */}
            <circle
              cx="50"
              cy="50"
              r="35"
              stroke="#10b981"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray="76 142"
              strokeDashoffset="-142"
            />
          </svg>
        </div>
        <div className="ml-8 space-y-3">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
            <span className="text-sm text-gray-600 mr-4">Mobile App Redesign</span>
            <span className="text-sm font-medium text-gray-900">65%</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            <span className="text-sm text-gray-600 mr-4">E-commerce Platform v2.0</span>
            <span className="text-sm font-medium text-gray-900">75%</span>
          </div>
        </div>
      </div>
    )
  }

  if (type === "tech-donut") {
    const techStack = [
      { name: "AWS", color: "#ff9500", percentage: 20 },
      { name: "React", color: "#10b981", percentage: 25 },
      { name: "Node.js", color: "#f59e0b", percentage: 20 },
      { name: "TypeScript", color: "#ef4444", percentage: 15 },
      { name: "Docker", color: "#8b5cf6", percentage: 10 },
      { name: "Kubernetes", color: "#3b82f6", percentage: 10 },
    ]

    let cumulativePercentage = 0

    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
            {techStack.map((tech, index) => {
              const strokeDasharray = `${tech.percentage * 2.2} ${220 - tech.percentage * 2.2}`
              const strokeDashoffset = -cumulativePercentage * 2.2
              cumulativePercentage += tech.percentage

              return (
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r="35"
                  stroke={tech.color}
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                />
              )
            })}
          </svg>
        </div>
        <div className="ml-8 space-y-2">
          {techStack.map((tech, index) => (
            <div key={index} className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: tech.color }}></div>
              <span className="text-sm text-gray-600">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return <div className="h-64 flex items-center justify-center text-gray-500">Chart placeholder</div>
}
