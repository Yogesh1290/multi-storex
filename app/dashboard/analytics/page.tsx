export default function AnalyticsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-gray-500 mt-1">View performance metrics for your stores</p>
      </div>

      <div className="bg-white border rounded-lg p-8 text-center">
        <h2 className="text-lg font-medium mb-2">No analytics data available</h2>
        <p className="text-gray-500">Start selling to see analytics data</p>
      </div>
    </div>
  )
}
