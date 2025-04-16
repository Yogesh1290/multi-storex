import { getSession } from "@/lib/session"
import { getMongoClient } from "@/lib/auth"
import { Package, ShoppingBag, Users } from "lucide-react"

interface AdminDashboardProps {
  params: {
    adminRoute: string
  }
}

export default async function AdminDashboard({ params }: AdminDashboardProps) {
  const session = await getSession()

  // Check MongoDB connection
  let mongoConnected = false
  let productCount = 0
  let orderCount = 0
  let customerCount = 0

  try {
    const client = await getMongoClient()
    await client.connect()

    // Check if we can connect to MongoDB
    await client.db().admin().ping()
    mongoConnected = true

    // Get counts if connected
    const db = client.db()
    productCount = (await db.collection("products").countDocuments()) || 0
    orderCount = (await db.collection("orders").countDocuments()) || 0
    customerCount = (await db.collection("customers").countDocuments()) || 0

    await client.close()
  } catch (error) {
    console.error("MongoDB connection error:", error)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Welcome, {session?.name || "Admin"}</h1>
        <p className="text-gray-500">Here's what's happening with your store today.</p>
      </div>

      {!mongoConnected && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>MongoDB connection failed.</strong> Please check your MongoDB URI in the environment variables.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Products</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{productCount}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href={`/${params.adminRoute}/products`} className="font-medium text-indigo-600 hover:text-indigo-500">
                View all
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{orderCount}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href={`/${params.adminRoute}/orders`} className="font-medium text-green-600 hover:text-green-500">
                View all
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Customers</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{customerCount}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href={`/${params.adminRoute}/customers`} className="font-medium text-purple-600 hover:text-purple-500">
                View all
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href={`/${params.adminRoute}/products/new`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add New Product
          </a>
          <a
            href={`/${params.adminRoute}/orders`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            View Orders
          </a>
          <a
            href={`/${params.adminRoute}/settings`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Store Settings
          </a>
        </div>
      </div>
    </div>
  )
}
