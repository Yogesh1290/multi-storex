"use server"

import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { getSellerByEmail, upsertSeller } from "@/lib/db"
import { revalidatePath } from "next/cache"

// Check if user is authenticated
export async function getSession() {
  const session = await getServerSession(authOptions)
  return session
}

// Create or update seller after sign in
export async function createOrUpdateSeller() {
  const session = await getSession()

  if (!session?.user?.email) {
    throw new Error("User not authenticated")
  }

  const existingSeller = await getSellerByEmail(session.user.email)

  if (existingSeller) {
    // Seller exists, no need to update basic info
    return existingSeller
  }

  // Create new seller
  const newSeller = {
    name: session.user.name || "",
    email: session.user.email,
    subscriptionPlan: "free", // Default plan
    registrationDate: new Date(),
    credentials: {
      hasVercelToken: false,
      hasMongoDBUri: false,
      hasCloudinaryKey: false,
    },
  }

  const result = await upsertSeller(newSeller)
  revalidatePath("/dashboard")

  return {
    ...newSeller,
    _id: result.insertedId,
  }
}
