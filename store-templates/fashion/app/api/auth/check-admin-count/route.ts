import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"

export async function GET() {
  try {
    // Get MongoDB URI from environment variable
    const uri = process.env.MONGODB_URI

    if (!uri || uri === "not_set") {
      // If MongoDB URI is not set, allow admin creation (first-time setup)
      return NextResponse.json({ canCreate: true })
    }

    // Connect to MongoDB
    const client = new MongoClient(uri)
    await client.connect()

    const db = client.db()

    // Count admin users
    const adminCount = await db.collection("users").countDocuments({ role: "admin" })

    // Close the connection
    await client.close()

    // Allow only 1 admin account for simplicity
    return NextResponse.json({ canCreate: adminCount < 1 })
  } catch (error) {
    console.error("Error checking admin count:", error)
    // If there's an error, default to allowing admin creation
    return NextResponse.json({ canCreate: true })
  }
}
