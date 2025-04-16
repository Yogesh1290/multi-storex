import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    // Check authentication and authorization
    const session = await getServerSession(authOptions)

    if (!session?.user?.email || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let client
    try {
      client = await clientPromise
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error)
      return NextResponse.json(
        {
          error: "Database connection error",
          users: [],
        },
        { status: 503 },
      )
    }

    const db = client.db()

    // Get current date
    const now = new Date()

    // Get date 7 days from now
    const sevenDaysFromNow = new Date()
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7)

    // Find users with active trials ending in the next 7 days
    const users = await db
      .collection("users")
      .find({
        trialActive: true,
        trialEndDate: {
          $gte: now,
          $lte: sevenDaysFromNow,
        },
      })
      .sort({ trialEndDate: 1 }) // Sort by closest expiration date
      .limit(10)
      .toArray()

    return NextResponse.json({ users })
  } catch (error) {
    console.error("Error fetching upcoming trials:", error)
    return NextResponse.json({ error: "Failed to fetch upcoming trials", users: [] }, { status: 500 })
  }
}
