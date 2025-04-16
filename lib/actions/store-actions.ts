"use server"

import { revalidatePath } from "next/cache"
import { deployToVercel } from "../vercel-api"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { createStore as dbCreateStore, updateStore } from "@/lib/db"
import type { Store } from "@/lib/types"

// Update the StoreData interface to include new fields
interface StoreData {
  name: string
  description: string
  vercelToken: string
  template: string
  customDomain: boolean
  domain: string
  adminRoute: string
  mongoDBUri: string
  cloudinaryKey: string
  cloudinarySecret: string
  cloudinaryName: string
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
    vercelToken: "***", // Hide token in logs
    mongoDBUri: data.mongoDBUri ? "***" : "not_set", // Hide MongoDB URI in logs
  })

  try {
    // Validate input data
    if (!data.name) {
      return { success: false, error: "Store name is required" }
    }

    if (!data.vercelToken) {
      return { success: false, error: "Vercel token is required" }
    }

    // Get the current user session
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return { success: false, error: "You must be logged in to create a store" }
    }

    // Validate MongoDB URI if provided
    if (data.mongoDBUri && !data.mongoDBUri.startsWith("mongodb")) {
      return { success: false, error: "Invalid MongoDB URI format" }
    }

    // Update the deployToVercel call to pass the new fields
    const deploymentResult = await deployToVercel({
      token: data.vercelToken,
      name: data.name,
      template: data.template,
      customDomain: data.customDomain ? data.domain : undefined,
      mongoDBUri: data.mongoDBUri || "not_set",
      cloudinaryKey: data.cloudinaryKey || "not_set",
      cloudinarySecret: data.cloudinarySecret || "not_set",
      cloudinaryName: data.cloudinaryName || "not_set",
      adminRoute: data.adminRoute || "admin",
    })

    if (!deploymentResult.success) {
      return {
        success: false,
        error: deploymentResult.error || "Failed to deploy store",
      }
    }

    // Extract the correct URL from the deployment result
    const storeUrl = deploymentResult.url

    // Update the storeData object to include adminRoute and MongoDB URI status
    const storeData = {
      name: data.name,
      description: data.description,
      url: storeUrl,
      template: data.template,
      customDomain: data.customDomain ? data.domain : undefined,
      adminRoute: data.adminRoute || "admin",
      status: "active" as const,
      products: 0,
      orders: 0,
      lastDeployed: new Date().toISOString(),
      userId: session.user.id,
      hasDatabase: !!data.mongoDBUri && data.mongoDBUri !== "not_set",
    }

    const store = await dbCreateStore(storeData)

    if (!store) {
      return {
        success: false,
        error: "Failed to save store to database",
      }
    }

    // Revalidate the dashboard page to show the new store
    revalidatePath("/dashboard")
    revalidatePath("/dashboard/stores")

    return {
      success: true,
      storeId: store.id,
      url: storeUrl,
    }
  } catch (error) {
    console.error("Error creating store:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    }
  }
}

// Get all stores for the current user
export async function getUserStores(): Promise<Store[]> {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return []
    }

    const stores = await import("@/lib/db").then((module) => module.getStoresByUserId(session.user.id))

    return stores
  } catch (error) {
    console.error("Error getting user stores:", error)
    return []
  }
}

// Update a store's URL if it's incorrect
export async function updateStoreUrl(storeId: string, vercelToken: string): Promise<boolean> {
  try {
    const store = await import("@/lib/db").then((module) => module.getStoreById(storeId))

    if (!store) {
      return false
    }

    // Extract project ID from the URL
    const urlParts = store.url.split("/")
    const domain = urlParts[2] // e.g., "project-name.vercel.app"
    const projectName = domain.split(".")[0] // e.g., "project-name"

    // Get projects from Vercel
    const projectsResponse = await fetch("https://api.vercel.com/v9/projects", {
      headers: {
        Authorization: `Bearer ${vercelToken}`,
      },
    })

    if (!projectsResponse.ok) {
      return false
    }

    const projects = await projectsResponse.json()
    const project = projects.projects.find((p: any) => p.name === projectName)

    if (!project) {
      return false
    }

    // Get the correct production domain
    const { getProductionDomain } = await import("@/lib/vercel-api")
    const productionDomain = await getProductionDomain(vercelToken, project.id)

    if (!productionDomain) {
      return false
    }

    const correctUrl = `https://${productionDomain}`

    // Update the store URL if it's different
    if (correctUrl !== store.url) {
      await updateStore(storeId, { url: correctUrl })
      revalidatePath("/dashboard")
      revalidatePath("/dashboard/stores")
      return true
    }

    return false
  } catch (error) {
    console.error("Error updating store URL:", error)
    return false
  }
}
