import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function CheckRolePage() {
  const session = await getServerSession(authOptions)

  // If not authenticated, redirect to sign in
  if (!session) {
    redirect("/auth/signin?callbackUrl=/admin")
  }

  // If not admin, redirect to dashboard
  if (session.user.role !== "admin") {
    redirect("/dashboard")
  }

  // Get the raw user data from MongoDB to compare
  let dbUser = null
  try {
    const { MongoClient } = require("mongodb")
    const client = new MongoClient(process.env.MONGODB_URI)
    await client.connect()
    const db = client.db()

    if (session?.user?.email) {
      dbUser = await db.collection("users").findOne({ email: session.user.email })
    }

    await client.close()
  } catch (error) {
    console.error("Error fetching user from DB:", error)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Role Verification</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Admin Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-800 font-medium">✅ You have admin access</p>
              <p className="text-green-700 mt-1">
                Your account is properly configured with admin privileges. You can access all admin features.
              </p>
            </div>

            <div className="flex justify-end">
              <Button asChild>
                <Link href="/admin/dashboard">Go to Admin Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium">User Email:</p>
              <p>{session?.user?.email}</p>
            </div>

            <div>
              <p className="font-medium">User Role:</p>
              <p className="text-green-600 font-bold">{session?.user?.role}</p>
            </div>

            {dbUser && (
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="font-medium">Database Information:</p>
                <p className="text-sm mt-2">
                  Role in database: <span className="font-bold">{dbUser.role || "No role set"}</span>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
