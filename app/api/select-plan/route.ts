import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import clientPromise from "@/lib/mongodb"

export async function POST(request: Request) {
  try {
    // Get the current session
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // Parse the request body
    const { plan, billingCycle } = await request.json()

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db()

    // Calculate trial end date (7 days from now)
    const trialEndDate = new Date()
    trialEndDate.setDate(trialEndDate.getDate() + 7)

    // Update or create user subscription information
    await db.collection("users").updateOne(
      { email: session.user.email },
      {
        $set: {
          subscriptionPlan: plan,
          billingCycle,
          trialEndDate,
          trialActive: true,
          updatedAt: new Date(),
        },
      },
      { upsert: true },
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error selecting plan:", error)
    return NextResponse.json({ error: "Failed to select plan" }, { status: 500 })
  }
}
