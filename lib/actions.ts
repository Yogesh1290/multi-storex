"use server"

import { revalidatePath } from "next/cache"
import { deployToVercel } from "./vercel-api"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { getSellerByEmail } from "@/lib/db"

interface StoreData {
  name: string
  description: string
  template: string
  customDomain: boolean
  domain: string
}

// This function creates a store by deploying it to the user's Vercel account
export async function createStore(data: StoreData): Promise<{
  success: boolean
  storeId?: string
  url?: string
  error?: string
}> {
  console.log("Creating store with data:", {
    ...data,
  })

  try {
    // Validate input data
    if (!data.name) {
      return { success: false, error: "Store name is required" }
    }

    // Get the current user session
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return { success: false, error: "You must be logged in to create a store" }
    }

    // Get the seller from the database
    const seller = await getSellerByEmail(session.user.email)

    if (!seller) {
      return { success: false, error: "Seller not found" }
    }

    // Check if the seller has all required credentials
    if (
      !seller.credentials ||
      !seller.credentials.hasVercelToken ||
      !seller.credentials.hasMongoDBUri ||
      !seller.credentials.hasCloudinaryKey
    ) {
      return {
        success: false,
        error: "Missing required credentials. Please set up your credentials first.",
      }
    }

    // In a real application, you would retrieve the actual credentials from a secure storage
    // For this example, we'll simulate having the credentials
    const vercelToken = "simulated_vercel_token"
    const mongoDBUri = "simulated_mongodb_uri"
    const cloudinaryKey = "simulated_cloudinary_key"

    // Deploy to Vercel using the user's token and file upload method
    const deploymentResult = await deployToVercel({
      token: vercelToken,
      name: data.name,
      template: data.template,
      customDomain: data.customDomain ? data.domain : undefined,
      mongoDBUri: mongoDBUri,
      cloudinaryKey: cloudinaryKey,
    })

    if (!deploymentResult.success) {
      return {
        success: false,
        error: deploymentResult.error || "Failed to deploy store",
      }
    }

    // In a real application, you would save the store details in your database
    // For this example, we'll just generate a random ID
    const storeId = Math.random().toString(36).substring(2, 10)

    // Save store data to your database
    // await db.stores.create({
    //   id: storeId,
    //   name: data.name,
    //   description: data.description,
    //   url: deploymentResult.url,
    //   template: data.template,
    //   customDomain: data.customDomain ? data.domain : null,
    //   userId: session.user.id, // You would get this from the session
    //   createdAt: new Date(),
    // });

    // Revalidate the dashboard page to show the new store
    revalidatePath("/dashboard")

    return {
      success: true,
      storeId,
      url: deploymentResult.url,
    }
  } catch (error) {
    console.error("Error creating store:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    }
  }
}
