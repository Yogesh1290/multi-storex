"use server"

import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import clientPromise from "@/lib/mongodb"
import { revalidatePath } from "next/cache"
import { ObjectId } from "mongodb"

// Get admin dashboard stats
export async function getAdminStats() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email || session.user.role !== "admin") {
      throw new Error("Unauthorized")
    }

    const client = await clientPromise
    const db = client.db()

    // Get total users
    const totalUsers = await db.collection("users").countDocuments({ role: { $ne: "admin" } })

    // Get new users today
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const newUsersToday = await db.collection("users").countDocuments({
      role: { $ne: "admin" },
      createdAt: { $gte: today },
    })

    // Get active stores
    const activeStores = await db.collection("stores").countDocuments({ status: "active" })

    // Get new stores today
    const newStoresToday = await db.collection("stores").countDocuments({
      createdAt: { $gte: today.toISOString() },
    })

    // Get active trials
    const activeTrials = await db.collection("users").countDocuments({
      trialActive: true,
      trialEndDate: { $gte: new Date() },
    })

    // Get new trials today
    const newTrialsToday = await db.collection("users").countDocuments({
      trialActive: true,
      createdAt: { $gte: today },
    })

    // Calculate monthly revenue (simplified for demo)
    // In a real app, you would sum actual payment records
    const monthlyRevenue = await calculateMonthlyRevenue(db)

    // Calculate revenue change (simplified)
    const revenueChange = 12.5 // Placeholder for demo

    return {
      totalUsers,
      newUsersToday,
      activeStores,
      newStoresToday,
      activeTrials,
      newTrialsToday,
      monthlyRevenue,
      revenueChange,
    }
  } catch (error) {
    console.error("Error getting admin stats:", error)
    return {
      totalUsers: 0,
      newUsersToday: 0,
      activeStores: 0,
      newStoresToday: 0,
      activeTrials: 0,
      newTrialsToday: 0,
      monthlyRevenue: 0,
      revenueChange: 0,
    }
  }
}

// Helper function to calculate monthly revenue
async function calculateMonthlyRevenue(db: any) {
  try {
    // Get current month's start and end dates
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

    // In a real app, you would query your payments collection
    // For this demo, we'll estimate based on active subscriptions
    const basicPlanUsers = await db.collection("users").countDocuments({
      subscriptionPlan: "Basic",
      trialActive: false,
    })

    const professionalPlanUsers = await db.collection("users").countDocuments({
      subscriptionPlan: "Professional",
      trialActive: false,
    })

    const enterprisePlanUsers = await db.collection("users").countDocuments({
      subscriptionPlan: "Enterprise",
      trialActive: false,
    })

    // Calculate revenue based on plan prices
    const basicRevenue = basicPlanUsers * 250
    const professionalRevenue = professionalPlanUsers * 999
    const enterpriseRevenue = enterprisePlanUsers * 2999

    return basicRevenue + professionalRevenue + enterpriseRevenue
  } catch (error) {
    console.error("Error calculating monthly revenue:", error)
    return 0
  }
}

// Get all users with pagination
export async function getUsers(page = 1, limit = 10, search = "") {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email || session.user.role !== "admin") {
      throw new Error("Unauthorized")
    }

    const client = await clientPromise
    const db = client.db()

    const skip = (page - 1) * limit

    // Build query
    const query: any = { role: { $ne: "admin" } }

    // Add search if provided
    if (search) {
      query.$or = [{ name: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }]
    }

    // Get users
    const users = await db.collection("users").find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray()

    // Get total count for pagination
    const total = await db.collection("users").countDocuments(query)

    return {
      users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  } catch (error) {
    console.error("Error getting users:", error)
    return {
      users: [],
      pagination: {
        total: 0,
        page,
        limit,
        totalPages: 0,
      },
    }
  }
}

// Get all stores
export async function getStores() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email || session.user.role !== "admin") {
      throw new Error("Unauthorized")
    }

    const client = await clientPromise
    const db = client.db()

    // Get all stores
    const stores = await db.collection("stores").find({}).sort({ createdAt: -1 }).limit(100).toArray()

    // Get user information for each store
    const storesWithUserInfo = await Promise.all(
      stores.map(async (store) => {
        let userName = "Unknown"
        let userEmail = ""

        if (store.userId) {
          const user = await db.collection("users").findOne({ _id: new ObjectId(store.userId) })
          if (user) {
            userName = user.name || "Unknown"
            userEmail = user.email || ""
          }
        }

        return {
          ...store,
          id: store._id.toString(),
          userName,
          userEmail,
        }
      }),
    )

    // Get store stats
    const total = await db.collection("stores").countDocuments({})
    const active = await db.collection("stores").countDocuments({ status: "active" })
    const inactive = await db.collection("stores").countDocuments({ status: "inactive" })

    return {
      stores: storesWithUserInfo,
      stats: {
        total,
        active,
        inactive,
      },
    }
  } catch (error) {
    console.error("Error getting stores:", error)
    return {
      stores: [],
      stats: {
        total: 0,
        active: 0,
        inactive: 0,
      },
    }
  }
}

// Update user subscription
export async function updateUserSubscription(
  userId: string,
  data: {
    subscriptionPlan?: string
    billingCycle?: "monthly" | "yearly"
    trialActive?: boolean
    trialEndDate?: Date
  },
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email || session.user.role !== "admin") {
      throw new Error("Unauthorized")
    }

    const client = await clientPromise
    const db = client.db()

    // Update user
    await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          ...data,
          updatedAt: new Date(),
        },
      },
    )

    revalidatePath("/admin/users")
    revalidatePath(`/admin/users/${userId}`)
    revalidatePath("/admin/subscriptions")

    return { success: true }
  } catch (error) {
    console.error("Error updating user subscription:", error)
    return { success: false, error: "Failed to update subscription" }
  }
}

// Get recent users
export async function getRecentUsers(limit = 5) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email || session.user.role !== "admin") {
      throw new Error("Unauthorized")
    }

    const client = await clientPromise
    const db = client.db()

    // Get recent users
    const users = await db
      .collection("users")
      .find({ role: { $ne: "admin" } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray()

    return users
  } catch (error) {
    console.error("Error getting recent users:", error)
    return []
  }
}

// Get users with upcoming trial expirations
export async function getUpcomingTrialExpirations(limit = 5) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email || session.user.role !== "admin") {
      throw new Error("Unauthorized")
    }

    const client = await clientPromise
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
      .limit(limit)
      .toArray()

    return users
  } catch (error) {
    console.error("Error getting upcoming trial expirations:", error)
    return []
  }
}

// Get subscription stats
export async function getSubscriptionStats() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email || session.user.role !== "admin") {
      throw new Error("Unauthorized")
    }

    const client = await clientPromise
    const db = client.db()

    // Get counts by plan
    const basicCount = await db.collection("users").countDocuments({ subscriptionPlan: "Basic" })
    const professionalCount = await db.collection("users").countDocuments({ subscriptionPlan: "Professional" })
    const enterpriseCount = await db.collection("users").countDocuments({ subscriptionPlan: "Enterprise" })

    // Get counts by billing cycle
    const monthlyCount = await db.collection("users").countDocuments({ billingCycle: "monthly" })
    const yearlyCount = await db.collection("users").countDocuments({ billingCycle: "yearly" })

    // Get trial stats
    const activeTrials = await db.collection("users").countDocuments({
      trialActive: true,
      trialEndDate: { $gte: new Date() },
    })

    const expiredTrials = await db.collection("users").countDocuments({
      trialActive: true,
      trialEndDate: { $lt: new Date() },
    })

    return {
      plans: {
        basic: basicCount,
        professional: professionalCount,
        enterprise: enterpriseCount,
      },
      billingCycles: {
        monthly: monthlyCount,
        yearly: yearlyCount,
      },
      trials: {
        active: activeTrials,
        expired: expiredTrials,
      },
    }
  } catch (error) {
    console.error("Error getting subscription stats:", error)
    return {
      plans: { basic: 0, professional: 0, enterprise: 0 },
      billingCycles: { monthly: 0, yearly: 0 },
      trials: { active: 0, expired: 0 },
    }
  }
}

// Get user by ID
export async function getUserById(userId: string) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email || session.user.role !== "admin") {
      throw new Error("Unauthorized")
    }

    const client = await clientPromise
    const db = client.db()

    // Convert string ID to ObjectId
    let objectId
    try {
      objectId = new ObjectId(userId)
    } catch (error) {
      console.error("Invalid ObjectId:", error)
      return null
    }

    // Get user
    const user = await db.collection("users").findOne({ _id: objectId })

    if (!user) {
      return null
    }

    // Get store count for this user
    const storeCount = await db.collection("stores").countDocuments({ userId: userId })

    return {
      ...user,
      storeCount,
    }
  } catch (error) {
    console.error("Error getting user by ID:", error)
    return null
  }
}
