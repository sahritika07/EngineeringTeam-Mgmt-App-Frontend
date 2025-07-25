export default function Chart({ type }) {
  if (type === "line") {
    return (
      <div className="h-64 flex items-end justify-between space-x-2">
        {/* Simple line chart representation */}
        <div className="flex flex-col items-center space-y-2">
          <div className="h-32 w-8 bg-blue-200 rounded-t flex items-end">
            <div className="w-full h-24 bg-blue-600 rounded-t"></div>
          </div>
          <span className="text-xs text-gray-500">Jan</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="h-32 w-8 bg-blue-200 rounded-t flex items-end">
            <div className="w-full h-26 bg-blue-600 rounded-t"></div>
          </div>
          <span className="text-xs text-gray-500">Feb</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="h-32 w-8 bg-blue-200 rounded-t flex items-end">
            <div className="w-full h-28 bg-blue-600 rounded-t"></div>
          </div>
          <span className="text-xs text-gray-500">Mar</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="h-32 w-8 bg-blue-200 rounded-t flex items-end">
            <div className="w-full h-30 bg-blue-600 rounded-t"></div>
          </div>
          <span className="text-xs text-gray-500">Apr</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="h-32 w-8 bg-blue-200 rounded-t flex items-end">
            <div className="w-full h-31 bg-blue-600 rounded-t"></div>
          </div>
          <span className="text-xs text-gray-500">May</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="h-32 w-8 bg-blue-200 rounded-t flex items-end">
            <div className="w-full h-32 bg-blue-600 rounded-t"></div>
          </div>
          <span className="text-xs text-gray-500">Jun</span>
        </div>
      </div>
    )
  }

  if (type === "doughnut") {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
            {/* Mobile App Redesign - 65% */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#3B82F6"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray="163 87"
              strokeDashoffset="0"
            />
            {/* E-commerce Platform - 75% */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#10B981"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray="87 163"
              strokeDashoffset="-163"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">2</div>
              <div className="text-sm text-gray-500">Projects</div>
            </div>
          </div>
        </div>
        <div className="ml-8 space-y-2">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Mobile App Redesign</span>
            <span className="ml-auto text-sm font-medium">65%</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">E-commerce Platform v2.0</span>
            <span className="ml-auto text-sm font-medium">75%</span>
          </div>
        </div>
      </div>
    )
  }

  return <div className="h-64 flex items-center justify-center text-gray-500">Chart placeholder</div>
}
