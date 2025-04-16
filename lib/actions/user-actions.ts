"use server"

import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

interface ProfileData {
  name?: string
  phoneNumber?: string
  whatsappNumber?: string
  countryCode?: string
}

// Update the updateUserProfile function to handle ObjectId properly
export async function updateUserProfile(data: ProfileData) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" }
    }

    const client = await clientPromise
    const db = client.db()

    // Try to convert to ObjectId if possible
    let userId
    try {
      userId = new ObjectId(session.user.id)
    } catch (error) {
      // If it's not a valid ObjectId, use the string ID
      userId = session.user.id
    }

    // Find the user by ID or email
    const existingUser = await db.collection("users").findOne({
      $or: [{ _id: userId }, { email: session.user.email }],
    })

    if (existingUser) {
      // Update existing user
      await db.collection("users").updateOne(
        { _id: existingUser._id },
        {
          $set: {
            ...(data.name && { name: data.name }),
            ...(data.phoneNumber && { phoneNumber: data.phoneNumber }),
            ...(data.whatsappNumber && { whatsappNumber: data.whatsappNumber }),
            ...(data.countryCode && { countryCode: data.countryCode }),
            updatedAt: new Date(),
          },
        },
      )
    } else {
      // Create a new user profile document
      await db.collection("users").insertOne({
        email: session.user.email,
        name: data.name || session.user.name,
        image: session.user.image,
        phoneNumber: data.phoneNumber,
        whatsappNumber: data.whatsappNumber,
        countryCode: data.countryCode,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    revalidatePath("/dashboard/profile")

    return { success: true }
  } catch (error) {
    console.error("Error updating user profile:", error)
    return { success: false, error: "Failed to update profile" }
  }
}

// Update the getUserProfile function to handle ObjectId properly
export async function getUserProfile() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id || !session?.user?.email) {
      return null
    }

    const client = await clientPromise
    const db = client.db()

    // Try to convert to ObjectId if possible
    let userId
    try {
      userId = new ObjectId(session.user.id)
    } catch (error) {
      // If it's not a valid ObjectId, use the string ID
      userId = session.user.id
    }

    // Find the user by ID or email
    const user = await db.collection("users").findOne({
      $or: [{ _id: userId }, { email: session.user.email }],
    })

    return user
  } catch (error) {
    console.error("Error getting user profile:", error)
    return null
  }
}
