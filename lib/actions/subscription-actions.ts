"use server"

import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import clientPromise from "@/lib/mongodb"
import { revalidatePath } from "next/cache"

export async function selectPlan(plan: string, billingCycle: "monthly" | "yearly" = "monthly") {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return { success: false, error: "Authentication required" }
    }

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

    // Revalidate the dashboard page - this should be outside of the render function
    // and inside a server action
    revalidatePath("/dashboard")

    return { success: true }
  } catch (error) {
    console.error("Error selecting plan:", error)
    return { success: false, error: "Failed to select plan" }
  }
}

export async function getUserSubscription() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return null
    }

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db()

    // Get user's subscription information
    const user = await db.collection("users").findOne({ email: session.user.email })

    if (!user || !user.subscriptionPlan) {
      return null
    }

    return {
      plan: user.subscriptionPlan,
      billingCycle: user.billingCycle || "monthly",
      trialEndDate: user.trialEndDate,
      trialActive: user.trialActive,
    }
  } catch (error) {
    console.error("Error getting user subscription:", error)
    return null
  }
}
