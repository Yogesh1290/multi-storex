"use server"

import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { getSellerByEmail, updateSellerCredentials } from "@/lib/db"
import { revalidatePath } from "next/cache"

// Save seller credentials to environment variables
export async function saveSellerCredentials(formData: FormData) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    throw new Error("User not authenticated")
  }

  const seller = await getSellerByEmail(session.user.email)

  if (!seller) {
    throw new Error("Seller not found")
  }

  const vercelToken = formData.get("vercelToken") as string
  const mongoDBUri = formData.get("mongoDBUri") as string
  const cloudinaryKey = formData.get("cloudinaryKey") as string

  // In a real application, you would securely store these credentials
  // For this example, we'll just update the status in the database
  await updateSellerCredentials(seller._id.toString(), {
    hasVercelToken: !!vercelToken,
    hasMongoDBUri: !!mongoDBUri,
    hasCloudinaryKey: !!cloudinaryKey,
  })

  // Store credentials in environment variables for the seller's store
  // This is a simplified example - in a real app, you would use a more secure approach
  // such as storing encrypted credentials or using a service like Vercel Environment Variables

  revalidatePath("/dashboard")

  return { success: true }
}

// Check if seller has all required credentials
export async function checkSellerCredentials() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return { hasAllCredentials: false }
  }

  const seller = await getSellerByEmail(session.user.email)

  if (!seller || !seller.credentials) {
    return { hasAllCredentials: false }
  }

  const { hasVercelToken, hasMongoDBUri, hasCloudinaryKey } = seller.credentials

  return {
    hasAllCredentials: hasVercelToken && hasMongoDBUri && hasCloudinaryKey,
    credentials: seller.credentials,
  }
}
