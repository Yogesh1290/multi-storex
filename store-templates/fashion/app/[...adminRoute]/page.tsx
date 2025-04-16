import { getSession } from "@/lib/session"

export default async function AdminDashboard() {
  const session = await getSession()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500">Welcome to your store admin dashboard!</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Store Overview</h2>
          <p className="text-gray-500">View your store statistics and performance.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Products</h2>
          <p className="text-gray-500">Manage your product catalog.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Orders</h2>
          <p className="text-gray-500">Track and manage customer orders.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Account Information</h2>
        <div className="space-y-2">
          <p>
            <span className="font-medium">Name:</span> {session?.name || "Admin User"}
          </p>
          <p>
            <span className="font-medium">Email:</span> {session?.email}
          </p>
          <p>
            <span className="font-medium">Role:</span> {session?.role}
          </p>
        </div>
      </div>
    </div>
  )
}
